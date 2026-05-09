package com.booking.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

/**
 * OCL Constraints for Seat Entity:
 * 
 * context Seat inv:
 *   self.seatNumber <> null
 *   self.seatNumber.size() >= 2 and self.seatNumber.size() <= 10
 *   self.seatNumber.matches('^[A-Z][0-9]+$')
 *   self.showtimeId <> null
 *   self.price >= 0
 *   self.type <> null
 *   self.type = SeatType.VIP implies self.price >= 50
 *   self.type = SeatType.REGULAR implies self.price >= 20
 * 
 * context Seat::bookSeat() : Boolean
 *   pre: self.booked = false
 *   post: self.booked = true
 * 
 * context Seat::releaseSeat() : Boolean
 *   pre: self.booked = true
 *   post: self.booked = false
 */
@Entity
@Table(name = "seat")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * OCL: self.seatNumber <> null
     * OCL: self.seatNumber.size() >= 2 and self.seatNumber.size() <= 10
     * OCL: self.seatNumber.matches('^[A-Z][0-9]+$')
     */
    @Column(nullable = false, length = 10)
    private String seatNumber;

    /**
     * OCL: self.showtimeId <> null
     */
    @Column(nullable = false)
    private Long showtimeId;

    /**
     * OCL: self.booked = false implies can book
     * OCL: self.booked = true implies cannot book
     */
    @Column(nullable = false)
    private boolean booked;

    /**
     * OCL: self.price >= 0
     * OCL: self.type = SeatType.VIP implies self.price >= 50
     * OCL: self.type = SeatType.REGULAR implies self.price >= 20
     */
    @Column(nullable = false)
    private double price;
    
    /**
     * OCL: self.type <> null
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SeatType type;

    public Long getId() { return id; }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

    public Long getShowtimeId() { return showtimeId; }
    public void setShowtimeId(Long showtimeId) { this.showtimeId = showtimeId; }

    public boolean isBooked() { return booked; }
    public void setBooked(boolean booked) { this.booked = booked; }

    public double getPrice() {return price;}
    public void setPrice(double price) {this.price = price;}

    public SeatType getType() {return type;}
    public void setType(SeatType type) {this.type = type;}
}