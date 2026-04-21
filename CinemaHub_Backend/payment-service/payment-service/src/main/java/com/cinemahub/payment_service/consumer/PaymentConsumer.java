package com.cinemahub.payment_service.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class PaymentConsumer {

    private static final Logger logger = LoggerFactory.getLogger(PaymentConsumer.class);

    @KafkaListener(topics = "booking-created", groupId = "payment-service-group")
    public void handleBookingCreated(String message) {
        logger.info("Received booking created event: {}", message);
        // Initiate payment process for the booking
        // Send payment request to payment gateway
    }

    @KafkaListener(topics = "booking-cancelled", groupId = "payment-service-group")
    public void handleBookingCancelled(String message) {
        logger.info("Received booking cancelled event: {}", message);
        // Cancel pending payment if any
        // Refund if payment already processed
    }
}
