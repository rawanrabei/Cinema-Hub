package com.booking.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.booking.demo.entity.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByShowtimeId(Long showtimeId);
    List<Seat> findByShowtimeIdAndBookedFalse(Long showtimeId);
    List<Seat> findByShowtimeIdAndSeatNumberIn(Long showtimeId, List<String> seatNumbers);
    
    @Transactional
    void deleteByShowtimeId(Long showtimeId);
}