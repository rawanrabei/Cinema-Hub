package com.example.demo.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class AuthConsumer {

    private static final Logger logger = LoggerFactory.getLogger(AuthConsumer.class);

    @KafkaListener(topics = "booking-created", groupId = "auth-service-group")
    public void handleBookingCreated(String message) {
        logger.info("Received booking created event: {}", message);
        // Update user booking history
        // Send notification to user
    }

    @KafkaListener(topics = "payment-completed", groupId = "auth-service-group")
    public void handlePaymentCompleted(String message) {
        logger.info("Received payment completed event: {}", message);
        // Update user payment history
        // Send confirmation email
    }
}
