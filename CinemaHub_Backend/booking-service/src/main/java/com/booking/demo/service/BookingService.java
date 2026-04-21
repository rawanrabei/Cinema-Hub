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
import com.booking.demo.repository.BookedSeatRepository;
import com.booking.demo.repository.BookingRepository;
import com.booking.demo.repository.SeatRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SeatRepository seatRepository;
    private final BookedSeatRepository bookedSeatRepository;

    public BookingService(BookingRepository bookingRepository,
                          SeatRepository seatRepository,
                          BookedSeatRepository bookedSeatRepository) {
        this.bookingRepository = bookingRepository;
        this.seatRepository = seatRepository;
        this.bookedSeatRepository = bookedSeatRepository;
    }


    @Transactional
    public BookingResponse createBooking(Long userId, Long showtimeId, List<Long> seatIds) {

        List<Long> notFound = new ArrayList<>();
        List<Long> alreadyBooked = new ArrayList<>();

        for (Long seatId : seatIds) {
            Optional<Seat> seatOpt = seatRepository.findById(seatId);

            if (seatOpt.isEmpty()) {
                notFound.add(seatId);
                continue;
            }

            Seat seat = seatOpt.get();

            if (seat.isBooked()) {
                alreadyBooked.add(seatId);
                continue;
            }

            seat.setBooked(true);
            seatRepository.save(seat);
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
        booking.setStatus("CONFIRMED");
        booking.setBookingTime(LocalDateTime.now());

        Booking savedBooking = bookingRepository.save(booking);

        double totalPrice = 0;
        List<Long> finalSeatIds = new ArrayList<>();

        for (Long seatId : seatIds) {
            Seat seat = seatRepository.findById(seatId)
                    .orElseThrow(() -> new RuntimeException("Seat not found"));

            finalSeatIds.add(seatId);
            totalPrice += getSeatPrice(seat.getType());
        }

        for (Long seatId : seatIds) {
            BookedSeat bs = new BookedSeat();
            bs.setBookingId(savedBooking.getId());
            bs.setSeatId(seatId);
            bookedSeatRepository.save(bs);
        }

        return mapToResponse(savedBooking, finalSeatIds, totalPrice);
    }


    public BookingResponse getBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        List<Long> seatIds = bookedSeatRepository.findById(id)
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

        char[] rows = {'A', 'B', 'C', 'D', 'E'};

        for (char row : rows) {
        for (int i = 1; i <= 10; i++) {

            Seat seat = new Seat();
            seat.setSeatNumber(row + String.valueOf(i));
            seat.setShowtimeId(showtimeId);
            seat.setBooked(false);

            if (row == 'A' || row == 'B') {
                seat.setType(SeatType.STANDARD);
            } else if (row == 'C' || row == 'D') {
                seat.setType(SeatType.VIP);
            } else {
                seat.setType(SeatType.RECLINER);
            }

            seatRepository.save(seat);
        }
    }
}

    public List<BookingResponse> getUserBookings(Long userId) {

        List<Booking> bookings = bookingRepository.findByUserId(userId);
        List<BookingResponse> responses = new ArrayList<>();

        for (Booking booking : bookings) {

            List<Long> seatIds = bookedSeatRepository.findById(booking.getId())
                    .stream()
                    .map(BookedSeat::getSeatId)
                    .toList();

            double totalPrice = 0;

            for (Long seatId : seatIds) {
                Seat seat = seatRepository.findById(seatId)
                        .orElseThrow();
                totalPrice += getSeatPrice(seat.getType());
            }

            responses.add(mapToResponse(booking, seatIds, totalPrice));
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
    }


    private BookingResponse mapToResponse(Booking booking, List<Long> seatIds, double totalPrice) {

        BookingResponse response = new BookingResponse();

        response.setBookingId(booking.getId());
        response.setUserId(booking.getUserId());
        response.setShowtimeId(booking.getShowtimeId());
        response.setStatus(booking.getStatus());
        response.setBookingTime(booking.getBookingTime());
        response.setSeatIds(seatIds);
        response.setTotalPrice(totalPrice);

        return response;
    }
}