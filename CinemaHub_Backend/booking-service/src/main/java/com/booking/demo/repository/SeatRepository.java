package com.booking.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.demo.entity.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByShowtimeIdAndBookedFalse(Long showtimeId);
}