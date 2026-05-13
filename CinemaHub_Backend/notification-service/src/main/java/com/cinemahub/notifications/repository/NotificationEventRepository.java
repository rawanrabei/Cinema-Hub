package com.cinemahub.notifications.repository;

import com.cinemahub.notifications.domain.NotificationEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface NotificationEventRepository extends JpaRepository<NotificationEvent, Long> {

    Page<NotificationEvent> findAllByOrderByCreatedAtDesc(Pageable pageable);

    /** Excludes auth/account topics (user-*) from the admin feed. */
    @Query("SELECT e FROM NotificationEvent e WHERE e.topic NOT LIKE 'user-%' ORDER BY e.createdAt DESC")
    Page<NotificationEvent> findAllExcludingUserTopicsOrderByCreatedAtDesc(Pageable pageable);

    Page<NotificationEvent> findByTopicInOrderByCreatedAtDesc(Collection<String> topics, Pageable pageable);

    Page<NotificationEvent> findByTopicInAndPayloadUserIdOrderByCreatedAtDesc(
            Collection<String> topics,
            Long payloadUserId,
            Pageable pageable
    );

    /** Member feed: personal booking/payment rows plus catalog movie events (no payload user). */
    @Query("SELECT e FROM NotificationEvent e WHERE (e.topic IN :userTopics AND e.payloadUserId = :userId) OR e.topic IN :movieTopics ORDER BY e.createdAt DESC")
    Page<NotificationEvent> findMemberFeed(
            @Param("userTopics") Collection<String> userTopics,
            @Param("movieTopics") Collection<String> movieTopics,
            @Param("userId") Long userId,
            Pageable pageable
    );

    List<NotificationEvent> findByPayloadUserId(Long userId);
}
