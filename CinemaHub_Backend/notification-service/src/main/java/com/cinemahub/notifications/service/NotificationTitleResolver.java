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
        if (rawPayload == null || rawPayload.isBlank()) {
            return NotificationPolicies.titleFor(topic);
        }
        try {
            JsonNode root = objectMapper.readTree(rawPayload);
            return switch (topic) {
                case "movie-added" -> movieTitledLine(root, "was added", "movie-added");
                case "movie-updated" -> movieTitledLine(root, "was updated", "movie-updated");
                case "movie-deleted" -> movieDeletedLine(root);
                default -> NotificationPolicies.titleFor(topic);
            };
        } catch (Exception ignored) {
            return NotificationPolicies.titleFor(topic);
        }
    }

    private String movieTitledLine(JsonNode root, String suffix, String fallbackTopic) {
        String title = objectTitle(root);
        if (title != null) {
            return title + " " + suffix;
        }
        return NotificationPolicies.titleFor(fallbackTopic);
    }

    private String movieDeletedLine(JsonNode root) {
        String title = objectTitle(root);
        if (title != null) {
            return title + " was removed";
        }
        if (root.isIntegralNumber() || root.isLong() || root.isInt()) {
            return "Movie removed (ID " + root.asLong() + ")";
        }
        if (root.isTextual()) {
            String t = root.asText().trim();
            if (!t.isBlank()) {
                return "Movie removed (ID " + t + ")";
            }
        }
        return NotificationPolicies.titleFor("movie-deleted");
    }

    private static String objectTitle(JsonNode root) {
        if (root == null || !root.isObject()) {
            return null;
        }
        return text(root, "title");
    }

    private static String text(JsonNode root, String field) {
        if (root == null || !root.isObject() || !root.has(field)) {
            return null;
        }
        JsonNode n = root.get(field);
        if (n == null || n.isNull() || !n.isTextual()) {
            return null;
        }
        String v = n.asText().trim();
        return v.isEmpty() ? null : v;
    }
}
