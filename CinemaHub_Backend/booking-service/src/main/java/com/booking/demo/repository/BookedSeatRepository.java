package com.booking.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.demo.entity.BookedSeat;

public interface BookedSeatRepository extends JpaRepository<BookedSeat, Long> {
}
