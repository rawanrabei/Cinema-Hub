package com.booking.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "seat")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seatNumber;
    private Long showtimeId;
    private boolean booked;
    private double price;
    
    @Enumerated(EnumType.STRING)
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