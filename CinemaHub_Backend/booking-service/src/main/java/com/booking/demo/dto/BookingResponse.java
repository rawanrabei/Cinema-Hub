package com.booking.demo.dto;

import java.time.LocalDateTime;
import java.util.List;

public class BookingResponse {

    private Long bookingId;
    private Long userId;
    private Long showtimeId;
    private Long movieId;
    private String status;
    private LocalDateTime bookingTime;
    private List<Long> seatIds;
    private Double totalPrice;

    public BookingResponse() {}

    public BookingResponse(Long bookingId,
                           Long userId,
                           Long showtimeId,
                           Long movieId,
                           String status,
                           LocalDateTime bookingTime,
                           List<Long> seatIds,
                           Double totalPrice) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.showtimeId = showtimeId;
        this.movieId = movieId;
        this.status = status;
        this.bookingTime = bookingTime;
        this.seatIds = seatIds;
        this.totalPrice = totalPrice;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(Long showtimeId) {
        this.showtimeId = showtimeId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public List<Long> getSeatIds() {
        return seatIds;
    }

    public void setSeatIds(List<Long> seatIds) {
        this.seatIds = seatIds;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
