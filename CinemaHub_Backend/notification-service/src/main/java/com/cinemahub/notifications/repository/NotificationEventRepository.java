package com.cinemahub.notifications.repository;

import com.cinemahub.notifications.domain.NotificationEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface NotificationEventRepository extends JpaRepository<NotificationEvent, Long> {

    Page<NotificationEvent> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<NotificationEvent> findByTopicInOrderByCreatedAtDesc(Collection<String> topics, Pageable pageable);

    Page<NotificationEvent> findByTopicInAndPayloadUserIdOrderByCreatedAtDesc(
            Collection<String> topics,
            Long payloadUserId,
            Pageable pageable
    );

    List<NotificationEvent> findByPayloadUserId(Long userId);
}
