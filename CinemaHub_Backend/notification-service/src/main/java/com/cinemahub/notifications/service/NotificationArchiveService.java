package com.cinemahub.notifications.service;

import com.cinemahub.notifications.domain.NotificationEvent;
import com.cinemahub.notifications.repository.NotificationEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NotificationArchiveService {

    private final NotificationEventRepository repository;
    private final PayloadUserIdExtractor payloadUserIdExtractor;
    private final NotificationTitleResolver titleResolver;

    @Transactional
    public NotificationEvent persist(String topic, String rawPayload) {
        NotificationEvent event = new NotificationEvent();
        event.setTopic(topic);
        event.setTitle(titleResolver.resolve(topic, rawPayload));
        event.setPayload(rawPayload);
        event.setPayloadUserId(payloadUserIdExtractor.extractUserId(rawPayload));
        return repository.save(event);
    }
}
