package com.cinemahub.notifications.service;

import com.cinemahub.notifications.domain.NotificationEvent;
import com.cinemahub.notifications.policy.NotificationPolicies;
import com.cinemahub.notifications.repository.NotificationEventRepository;
import com.cinemahub.notifications.security.JwtPrincipal;
import com.cinemahub.notifications.web.dto.NotificationResponseDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationQueryService {

    private final NotificationEventRepository repository;
    private final ObjectMapper objectMapper;

    public List<NotificationResponseDto> list(JwtPrincipal principal, int page, int size) {
        int capped = Math.min(Math.max(size, 1), 100);
        Pageable pageable = PageRequest.of(Math.max(page, 0), capped);
        String role = principal.role() == null ? "" : principal.role().toUpperCase();

        Page<NotificationEvent> result;
        if ("ADMIN".equals(role)) {
            result = repository.findAllByOrderByCreatedAtDesc(pageable);
        } else if ("MANAGER".equals(role)) {
            result = repository.findByTopicInOrderByCreatedAtDesc(NotificationPolicies.MANAGER_TOPICS, pageable);
        } else {
            Long uid = principal.userId();
            if (uid == null) {
                result = Page.empty(pageable);
            } else {
                result = repository.findByTopicInAndPayloadUserIdOrderByCreatedAtDesc(
                        NotificationPolicies.USER_TOPICS,
                        uid,
                        pageable
                );
            }
        }

        return result.stream().map(this::toDto).toList();
    }

    private NotificationResponseDto toDto(NotificationEvent e) {
        JsonNode payloadNode;
        try {
            payloadNode = objectMapper.readTree(e.getPayload());
        } catch (Exception ex) {
            payloadNode = objectMapper.getNodeFactory().textNode(e.getPayload());
        }
        return new NotificationResponseDto(
                e.getId(),
                e.getTopic(),
                e.getTitle(),
                e.getCreatedAt().toString(),
                payloadNode
        );
    }

    public void deleteAllByUserId(Long userId) {
        List<NotificationEvent> events = repository.findByPayloadUserId(userId);
        repository.deleteAll(events);
    }

    public void deleteById(Long id, Long userId) {
        NotificationEvent event = repository.findById(id).orElse(null);
        if (event != null) {
            // Allow deletion if the notification belongs to the user or if it's a global notification (payloadUserId is null)
            if (event.getPayloadUserId() == null || event.getPayloadUserId().equals(userId)) {
                repository.deleteById(id);
            }
        }
    }
}
