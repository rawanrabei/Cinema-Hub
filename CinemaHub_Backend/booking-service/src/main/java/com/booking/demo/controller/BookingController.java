package com.booking.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.demo.dto.BookingRequest;
import com.booking.demo.dto.BookingResponse;
import com.booking.demo.producer.BookingProducer;
import com.booking.demo.service.BookingService;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService service;
    private final BookingProducer bookingProducer;

    public BookingController(BookingService service, BookingProducer bookingProducer) {
        this.service = service;
        this.bookingProducer = bookingProducer;
    }

    @PostMapping
    public BookingResponse create(@RequestBody BookingRequest req) {
        BookingResponse booking = service.createBooking(
                req.getUserId(),
                req.getShowtimeId(),
                req.getMovieId(),
                req.getSeatNumbers()
        );
        bookingProducer.sendBookingCreatedEvent(booking);
        return booking;
    }
    @PostMapping("/generate-seats/{showtimeId}")
    public String generateSeats(@PathVariable Long showtimeId) {
    service.generateSeats(showtimeId);
    return "Seats generated successfully";
}

    @GetMapping
    public List<BookingResponse> getAllBookings() {
        return service.getAllBookings();
    }

    @GetMapping("/{id}")
    public BookingResponse get(@PathVariable Long id) {
        return service.getBooking(id);
    }

    @GetMapping("/user/{userId}")
    public List<BookingResponse> getUserBookings(@PathVariable Long userId) {
        return service.getUserBookings(userId);
    }

    @DeleteMapping("/{id}")
    public String cancel(@PathVariable Long id) {
        service.cancelBooking(id);
        bookingProducer.sendBookingCancelledEvent(id);
        return "Booking cancelled successfully";
    }
}
