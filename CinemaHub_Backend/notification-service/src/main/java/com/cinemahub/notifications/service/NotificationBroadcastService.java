package com.cinemahub.notifications.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.cinemahub.notifications.policy.NotificationPolicies;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.time.Instant;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationBroadcastService {

    private final NotificationDeliveryService deliveryService;
    private final ObjectMapper objectMapper;

    private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();

    public void register(WebSocketSession session) {
        sessions.add(session);
    }

    public void unregister(WebSocketSession session) {
        sessions.remove(session);
    }

    public void broadcast(String topic, String rawPayload, Long eventId, Instant createdAt) {
        String title = NotificationPolicies.titleFor(topic);
        String json = buildEnvelope(topic, title, rawPayload, eventId, createdAt);
        for (WebSocketSession session : java.util.Set.copyOf(sessions)) {
            if (!session.isOpen()) {
                sessions.remove(session);
                continue;
            }
            String role = (String) session.getAttributes().get("role");
            Long userId = (Long) session.getAttributes().get("userId");
            if (deliveryService.shouldDeliver(role, userId, topic, rawPayload)) {
                try {
                    synchronized (session) {
                        session.sendMessage(new TextMessage(json));
                    }
                } catch (IOException e) {
                    log.warn("Failed to push notification: {}", e.getMessage());
                }
            }
        }
    }

    private String buildEnvelope(String topic, String title, String rawPayload, Long eventId, Instant createdAt) {
        ObjectNode root = objectMapper.createObjectNode();
        root.put("topic", topic);
        root.put("title", title);
        root.put("timestamp", createdAt.toString());
        if (eventId != null) {
            root.put("id", eventId);
        }
        try {
            JsonNode payloadNode = objectMapper.readTree(rawPayload);
            root.set("payload", payloadNode);
        } catch (Exception e) {
            root.put("payload", rawPayload);
        }
        try {
            return objectMapper.writeValueAsString(root);
        } catch (Exception e) {
            return "{\"topic\":\"" + topic + "\",\"title\":\"" + title + "\"}";
        }
    }
}
