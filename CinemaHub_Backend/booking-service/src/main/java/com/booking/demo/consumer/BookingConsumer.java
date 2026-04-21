package com.booking.demo.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class BookingConsumer {

    private static final Logger logger = LoggerFactory.getLogger(BookingConsumer.class);

    @KafkaListener(topics = "payment-completed", groupId = "booking-service-group")
    public void handlePaymentCompleted(String message) {
        logger.info("Received payment completed event: {}", message);
        // Update booking status to CONFIRMED
        // Send confirmation to user
    }

    @KafkaListener(topics = "payment-failed", groupId = "booking-service-group")
    public void handlePaymentFailed(String message) {
        logger.info("Received payment failed event: {}", message);
        // Release booked seats
        // Update booking status to CANCELLED
    }
}
