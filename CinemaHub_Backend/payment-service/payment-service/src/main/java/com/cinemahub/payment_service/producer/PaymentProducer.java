package com.cinemahub.payment_service.producer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PaymentProducer {

    private static final Logger logger = LoggerFactory.getLogger(PaymentProducer.class);

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    public void sendPaymentRequestedEvent(Object paymentRequest) {
        try {
            String message = objectMapper.writeValueAsString(paymentRequest);
            kafkaTemplate.send("payment-requested", message);
            logger.info("Payment requested event sent: {}", message);
        } catch (JsonProcessingException e) {
            logger.error("Error serializing payment request event", e);
        }
    }

    public void sendPaymentCompletedEvent(Object payment) {
        try {
            String message = objectMapper.writeValueAsString(payment);
            kafkaTemplate.send("payment-completed", message);
            logger.info("Payment completed event sent: {}", message);
        } catch (JsonProcessingException e) {
            logger.error("Error serializing payment event", e);
        }
    }

    public void sendPaymentFailedEvent(Object payment) {
        try {
            String message = objectMapper.writeValueAsString(payment);
            kafkaTemplate.send("payment-failed", message);
            logger.info("Payment failed event sent: {}", message);
        } catch (JsonProcessingException e) {
            logger.error("Error serializing payment event", e);
        }
    }
}
