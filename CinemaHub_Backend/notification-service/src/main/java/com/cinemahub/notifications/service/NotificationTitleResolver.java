package com.cinemahub.notifications.service;

import com.cinemahub.notifications.policy.NotificationPolicies;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationTitleResolver {

    private final ObjectMapper objectMapper;

    public String resolve(String topic, String rawPayload) {
        if ("user-logged-in".equals(topic) && rawPayload != null && !rawPayload.isBlank()) {
            try {
                JsonNode root = objectMapper.readTree(rawPayload);
                String name = firstNonBlank(text(root, "username"), text(root, "name"));
                if (name != null) {
                    return "Welcome back, " + name + "!";
                }
            } catch (Exception ignored) {
                // fall through
            }
            return "Welcome back!";
        }
        return NotificationPolicies.titleFor(topic);
    }

    private static String text(JsonNode root, String field) {
        if (root == null || !root.has(field)) {
            return null;
        }
        JsonNode n = root.get(field);
        return n != null && n.isTextual() ? n.asText().trim() : null;
    }

    private static String firstNonBlank(String... values) {
        for (String v : values) {
            if (v != null && !v.isBlank()) {
                return v.trim();
            }
        }
        return null;
    }
}
