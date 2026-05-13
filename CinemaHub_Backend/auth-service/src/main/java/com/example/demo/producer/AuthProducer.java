package com.example.demo.producer;

import com.example.demo.entity.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class AuthProducer {

    private static final Logger logger = LoggerFactory.getLogger(AuthProducer.class);

    @Autowired(required = false)
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Publishes only id, username, email, role — never password hashes.
     */
    private Map<String, Object> publicUserSnapshot(User u) {
        Map<String, Object> m = new LinkedHashMap<>();
        if (u.getId() != null) {
            m.put("id", u.getId());
        }
        m.put("username", u.getUsername());
        m.put("email", u.getEmail());
        if (u.getRole() != null) {
            m.put("role", u.getRole().name());
        }
        return m;
    }

    private String toEventJson(Object user) throws JsonProcessingException {
        if (user instanceof User u) {
            return objectMapper.writeValueAsString(publicUserSnapshot(u));
        }
        // Handle JPA proxies by checking class name
        if (user != null && user.getClass().getName().contains("User")) {
            try {
                // Use reflection to extract fields from proxy
                Map<String, Object> snapshot = new LinkedHashMap<>();
                Object id = user.getClass().getMethod("getId").invoke(user);
                Object username = user.getClass().getMethod("getUsername").invoke(user);
                Object email = user.getClass().getMethod("getEmail").invoke(user);
                Object role = user.getClass().getMethod("getRole").invoke(user);
                
                if (id != null) {
                    snapshot.put("id", id);
                }
                if (username != null) {
                    snapshot.put("username", username);
                }
                if (email != null) {
                    snapshot.put("email", email);
                }
                if (role != null) {
                    snapshot.put("role", role.toString());
                }
                return objectMapper.writeValueAsString(snapshot);
            } catch (Exception e) {
                logger.error("Failed to extract user fields via reflection", e);
            }
        }
        return objectMapper.writeValueAsString(user);
    }

    public void sendUserRegisteredEvent(Object user) {
        if (kafkaTemplate == null) {
            logger.warn("Kafka is disabled, skipping user registered event");
            return;
        }
        try {
            String message = toEventJson(user);
            kafkaTemplate.send("user-registered", message);
            logger.info("User registered event sent: {}", message);
        } catch (JsonProcessingException e) {
            logger.error("Error serializing user event", e);
        }
    }

}
