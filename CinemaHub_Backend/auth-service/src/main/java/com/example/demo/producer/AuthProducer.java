package com.example.demo.producer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AuthProducer {

    private static final Logger logger = LoggerFactory.getLogger(AuthProducer.class);

    @Autowired(required = false)
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    public void sendUserRegisteredEvent(Object user) {
        if (kafkaTemplate == null) {
            logger.warn("Kafka is disabled, skipping user registered event");
            return;
        }
        try {
            String message = objectMapper.writeValueAsString(user);
            kafkaTemplate.send("user-registered", message);
            logger.info("User registered event sent: {}", message);
        } catch (JsonProcessingException e) {
            logger.error("Error serializing user event", e);
        }
    }

    public void sendUserLoggedInEvent(Object user) {
        if (kafkaTemplate == null) {
            logger.warn("Kafka is disabled, skipping user logged in event");
            return;
        }
        try {
            String message = objectMapper.writeValueAsString(user);
            kafkaTemplate.send("user-logged-in", message);
            logger.info("User logged in event sent: {}", message);
        } catch (JsonProcessingException e) {
            logger.error("Error serializing user event", e);
        }
    }
}
