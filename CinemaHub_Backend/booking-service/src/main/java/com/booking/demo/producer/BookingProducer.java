package com.booking.demo.producer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class BookingProducer {

    private static final Logger logger = LoggerFactory.getLogger(BookingProducer.class);

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    public void sendBookingCreatedEvent(Object booking) {
        try {
            String message = objectMapper.writeValueAsString(booking);
            kafkaTemplate.send("booking-created", message);
            logger.info("Booking created event sent: {}", message);
        } catch (JsonProcessingException e) {
            logger.error("Error serializing booking event", e);
        }
    }

    public void sendBookingCancelledEvent(Object booking) {
        try {
            String message = objectMapper.writeValueAsString(booking);
            kafkaTemplate.send("booking-cancelled", message);
            logger.info("Booking cancelled event sent: {}", message);
        } catch (JsonProcessingException e) {
            logger.error("Error serializing booking event", e);
        }
    }

    public void sendSeatsBookedEvent(Object seats) {
        try {
            String message = objectMapper.writeValueAsString(seats);
            kafkaTemplate.send("seats-booked", message);
            logger.info("Seats booked event sent: {}", message);
        } catch (JsonProcessingException e) {
            logger.error("Error serializing seats event", e);
        }
    }
}
