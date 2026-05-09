package com.booking.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * OCL Constraints for Booking Entity:
 * 
 * context Booking inv:
 *   self.userId <> null
 *   self.showtimeId <> null
 *   self.movieId <> null
 *   self.status <> null
 *   self.status = 'CONFIRMED' or self.status = 'CANCELLED' or self.status = 'PENDING'
 *   self.bookingTime <> null
 *   self.bookingTime <= LocalDateTime.now()
 * 
 * context Booking::bookSeats() : Boolean
 *   pre: self.userId <> null and self.showtimeId <> null and self.movieId <> null
 *   post: self.status = 'CONFIRMED' and self.bookingTime <> null
 * 
 * context Booking::cancelBooking() : Boolean
 *   pre: self.status = 'CONFIRMED' or self.status = 'PENDING'
 *   post: self.status = 'CANCELLED'
 */
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * OCL: self.userId <> null
     */
    @Column(nullable = false)
    private Long userId;

    /**
     * OCL: self.showtimeId <> null
     */
    @Column(nullable = false)
    private Long showtimeId;

    /**
     * OCL: self.movieId <> null
     */
    @Column(nullable = false)
    private Long movieId;

    /**
     * OCL: self.status <> null
     * OCL: self.status = 'CONFIRMED' or self.status = 'CANCELLED' or self.status = 'PENDING'
     */
    @Column(nullable = false, length = 20)
    private String status;

    /**
     * OCL: self.bookingTime <> null
     * OCL: self.bookingTime <= LocalDateTime.now()
     */
    @Column(nullable = false)
    private LocalDateTime bookingTime;

    public Long getId() { return id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getShowtimeId() { return showtimeId; }
    public void setShowtimeId(Long showtimeId) { this.showtimeId = showtimeId; }

    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getBookingTime() { return bookingTime; }
    public void setBookingTime(LocalDateTime bookingTime) { this.bookingTime = bookingTime; }
}