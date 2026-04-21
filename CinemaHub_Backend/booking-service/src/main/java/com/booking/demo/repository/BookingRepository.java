package com.booking.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.demo.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
}