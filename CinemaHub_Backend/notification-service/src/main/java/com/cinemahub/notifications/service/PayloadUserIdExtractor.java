package com.cinemahub.notifications.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class PayloadUserIdExtractor {

    private final ObjectMapper objectMapper;

    public Long extractUserId(String payload) {
        if (payload == null || payload.isBlank()) {
            return null;
        }
        try {
            JsonNode root = objectMapper.readTree(payload);
            if (root.hasNonNull("userId")) {
                return root.get("userId").asLong();
            }
            if (root.isObject() && root.hasNonNull("id") && root.has("email")) {
                return root.get("id").asLong();
            }
        } catch (Exception e) {
            log.trace("Could not parse userId from payload: {}", e.getMessage());
        }
        return null;
    }
}
