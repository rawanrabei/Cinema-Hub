package com.booking.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.booking.demo.dto.BookingResponse;
import com.booking.demo.entity.BookedSeat;
import com.booking.demo.entity.Booking;
import com.booking.demo.entity.Seat;
import com.booking.demo.entity.SeatType;
import com.booking.demo.producer.BookingProducer;
import com.booking.demo.repository.BookedSeatRepository;
import com.booking.demo.repository.BookingRepository;
import com.booking.demo.repository.SeatRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SeatRepository seatRepository;
    private final BookedSeatRepository bookedSeatRepository;
    private final BookingProducer bookingProducer;

    public BookingService(BookingRepository bookingRepository,
                          SeatRepository seatRepository,
                          BookedSeatRepository bookedSeatRepository,
                          BookingProducer bookingProducer) {
        this.bookingRepository = bookingRepository;
        this.seatRepository = seatRepository;
        this.bookedSeatRepository = bookedSeatRepository;
        this.bookingProducer = bookingProducer;
    }


    @Transactional
    public BookingResponse createBooking(Long userId, Long showtimeId, Long movieId, List<String> seatNumbers) {
        // Generate seats if they don't exist or if seat count is incorrect (should be 96 for 8 rows x 12 seats)
        List<Seat> allSeats = seatRepository.findByShowtimeId(showtimeId);
        if (allSeats.isEmpty() || allSeats.size() != 96) {
            generateSeats(showtimeId);
        }
        
        List<Seat> seats = seatRepository.findByShowtimeIdAndSeatNumberIn(showtimeId, seatNumbers);
        
        List<String> notFound = new ArrayList<>();
        List<String> alreadyBooked = new ArrayList<>();
        List<Long> seatIds = new ArrayList<>();

        for (String seatNumber : seatNumbers) {
            Optional<Seat> seatOpt = seats.stream()
                    .filter(s -> s.getSeatNumber().equals(seatNumber))
                    .findFirst();

            if (seatOpt.isEmpty()) {
                notFound.add(seatNumber);
                continue;
            }

            Seat seat = seatOpt.get();

            if (seat.isBooked()) {
                alreadyBooked.add(seatNumber);
                continue;
            }

            seat.setBooked(true);
            seatRepository.save(seat);
            seatIds.add(seat.getId());
        }

        if (!notFound.isEmpty()) {
            throw new RuntimeException("Seats not found: " + notFound);
        }

        if (!alreadyBooked.isEmpty()) {
            throw new RuntimeException("Seats already booked: " + alreadyBooked);
        }

        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setShowtimeId(showtimeId);
        booking.setMovieId(movieId);
        booking.setStatus("PENDING_PAYMENT");
        booking.setBookingTime(LocalDateTime.now());

        Booking savedBooking = bookingRepository.save(booking);

        double totalPrice = 0;

        for (Long seatId : seatIds) {
            Seat seat = seatRepository.findById(seatId)
                    .orElseThrow(() -> new RuntimeException("Seat not found"));
            totalPrice += getSeatPrice(seat.getType());
        }

        for (Long seatId : seatIds) {
            BookedSeat bs = new BookedSeat();
            bs.setBookingId(savedBooking.getId());
            bs.setSeatId(seatId);
            bookedSeatRepository.save(bs);
        }

        return mapToResponse(savedBooking, seatIds, totalPrice);
    }

    /**
     * Marks a checkout as final after payment succeeds. Until then the booking stays
     * {@code PENDING_PAYMENT} and should not appear as a completed ticket for the user.
     */
    @Transactional
    public BookingResponse confirmBookingAfterPayment(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if ("CANCELLED".equalsIgnoreCase(booking.getStatus())) {
            throw new RuntimeException("Cannot confirm a cancelled booking");
        }
        if ("CONFIRMED".equalsIgnoreCase(booking.getStatus())) {
            return getBooking(bookingId);
        }
        if (!"PENDING_PAYMENT".equalsIgnoreCase(booking.getStatus())) {
            throw new RuntimeException("Booking cannot be confirmed from status: " + booking.getStatus());
        }

        booking.setStatus("CONFIRMED");
        bookingRepository.save(booking);

        BookingResponse confirmed = getBooking(bookingId);
        bookingProducer.sendBookingCreatedEvent(confirmed);
        return confirmed;
    }


    public BookingResponse getBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        List<Long> seatIds = bookedSeatRepository.findByBookingId(id)
                .stream()
                .map(BookedSeat::getSeatId)
                .toList();

        double totalPrice = 0;

        for (Long seatId : seatIds) {
            Seat seat = seatRepository.findById(seatId)
                    .orElseThrow(() -> new RuntimeException("Seat not found"));
            totalPrice += getSeatPrice(seat.getType());
        }

        return mapToResponse(booking, seatIds, totalPrice);
    }

    public void generateSeats(Long showtimeId) {
        // Delete existing seats for this showtime to avoid duplicates
        seatRepository.deleteByShowtimeId(showtimeId);

        char[] rows = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'};

        for (char row : rows) {
            for (int i = 1; i <= 12; i++) {

                Seat seat = new Seat();
                seat.setSeatNumber(row + String.valueOf(i));
                seat.setShowtimeId(showtimeId);
                seat.setBooked(false);

                if (row == 'A' || row == 'B' || row == 'C' || row == 'D') {
                    seat.setType(SeatType.STANDARD);
                } else if (row == 'E' || row == 'F') {
                    seat.setType(SeatType.VIP);
                } else {
                    seat.setType(SeatType.RECLINER);
                }

                seatRepository.save(seat);
            }
        }
    }

    public List<BookingResponse> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        List<BookingResponse> responses = new ArrayList<>();

        for (Booking booking : bookings) {
            List<Long> seatIds = bookedSeatRepository.findByBookingId(booking.getId())
                    .stream()
                    .map(BookedSeat::getSeatId)
                    .toList();

            double totalPrice = 0;
            List<Long> validSeatIds = new ArrayList<>();

            for (Long seatId : seatIds) {
                Optional<Seat> seatOpt = seatRepository.findById(seatId);
                if (seatOpt.isPresent()) {
                    totalPrice += getSeatPrice(seatOpt.get().getType());
                    validSeatIds.add(seatId);
                }
                // Skip seats that don't exist (they may have been deleted during seat regeneration)
            }

            responses.add(mapToResponse(booking, validSeatIds, totalPrice));
        }

        return responses;
    }

    public List<BookingResponse> getUserBookings(Long userId) {

        List<Booking> bookings = bookingRepository.findByUserId(userId);
        List<BookingResponse> responses = new ArrayList<>();

        for (Booking booking : bookings) {
            if (!"CONFIRMED".equalsIgnoreCase(booking.getStatus())) {
                continue;
            }

            List<Long> seatIds = bookedSeatRepository.findByBookingId(booking.getId())
                    .stream()
                    .map(BookedSeat::getSeatId)
                    .toList();

            double totalPrice = 0;
            List<Long> validSeatIds = new ArrayList<>();

            for (Long seatId : seatIds) {
                Optional<Seat> seatOpt = seatRepository.findById(seatId);
                if (seatOpt.isPresent()) {
                    totalPrice += getSeatPrice(seatOpt.get().getType());
                    validSeatIds.add(seatId);
                }
                // Skip seats that don't exist (they may have been deleted during seat regeneration)
            }

            responses.add(mapToResponse(booking, validSeatIds, totalPrice));
        }

        return responses;
    }

    private double getSeatPrice(SeatType type) {
    return switch (type) {
        case STANDARD -> 12;
        case VIP -> 18;
        case RECLINER -> 25;
    };
}

    @Transactional
    public void cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);

        // Release the seats associated with this booking
        List<Long> seatIds = bookedSeatRepository.findByBookingId(id)
                .stream()
                .map(BookedSeat::getSeatId)
                .toList();

        for (Long seatId : seatIds) {
            Seat seat = seatRepository.findById(seatId)
                    .orElseThrow(() -> new RuntimeException("Seat not found"));
            seat.setBooked(false);
            seatRepository.save(seat);
        }

        bookingProducer.sendBookingCancelledEvent(id);
    }


    private BookingResponse mapToResponse(Booking booking, List<Long> seatIds, double totalPrice) {

        BookingResponse response = new BookingResponse();

        response.setBookingId(booking.getId());
        response.setUserId(booking.getUserId());
        response.setShowtimeId(booking.getShowtimeId());
        response.setMovieId(booking.getMovieId());
        response.setStatus(booking.getStatus());
        response.setBookingTime(booking.getBookingTime());
        response.setSeatIds(seatIds);
        response.setTotalPrice(totalPrice);

        return response;
    }
}