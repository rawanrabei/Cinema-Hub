package com.cinemahub.notifications.web.dto;

import com.fasterxml.jackson.databind.JsonNode;

public record NotificationResponseDto(
        Long id,
        String topic,
        String title,
        String timestamp,
        JsonNode payload
) {
}
