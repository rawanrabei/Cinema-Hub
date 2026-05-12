package com.cinemahub.notifications.kafka;

import com.cinemahub.notifications.service.NotificationArchiveService;
import com.cinemahub.notifications.service.NotificationBroadcastService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Slf4j
@Component
@RequiredArgsConstructor
public class CinemaEventListener {

    private final NotificationBroadcastService broadcastService;
    private final NotificationArchiveService archiveService;

    @KafkaListener(
            topicPattern = "user-registered|user-logged-in|booking-created|booking-cancelled|seats-booked|"
                    + "payment-requested|payment-completed|payment-failed|"
                    + "movie-added|movie-updated|movie-deleted",
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void onDomainEvent(ConsumerRecord<String, String> record) {
        String topic = record.topic();
        String value = record.value();
        Long eventId = null;
        Instant createdAt = Instant.now();
        try {
            var saved = archiveService.persist(topic, value);
            eventId = saved.getId();
            createdAt = saved.getCreatedAt();
        } catch (Exception e) {
            log.error("Failed to persist notification event: {}", e.getMessage());
        }
        broadcastService.broadcast(topic, value, eventId, createdAt);
    }
}
