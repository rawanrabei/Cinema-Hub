package com.cinemahub.notifications.service;

import com.cinemahub.notifications.policy.NotificationPolicies;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationDeliveryService {

    private final PayloadUserIdExtractor payloadUserIdExtractor;

    public boolean shouldDeliver(String role, Long sessionUserId, String topic, String payload) {
        if (role == null || topic == null) {
            return false;
        }
        String r = role.toUpperCase();
        if ("ADMIN".equals(r)) {
            return true;
        }
        if ("MANAGER".equals(r)) {
            return NotificationPolicies.MANAGER_TOPICS.contains(topic);
        }
        if ("USER".equals(r) || "MEMBER".equals(r)) {
            if (!NotificationPolicies.USER_TOPICS.contains(topic)) {
                return false;
            }
            Long payloadUserId = payloadUserIdExtractor.extractUserId(payload);
            if (payloadUserId == null || sessionUserId == null) {
                return false;
            }
            return payloadUserId.equals(sessionUserId);
        }
        return false;
    }
}
