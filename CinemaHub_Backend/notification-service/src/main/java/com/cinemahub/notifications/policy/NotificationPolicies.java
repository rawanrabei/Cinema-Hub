package com.cinemahub.notifications.policy;

import java.util.Map;
import java.util.Set;

public final class NotificationPolicies {

    public static final Set<String> MANAGER_TOPICS = Set.of(
            "movie-added", "movie-updated", "movie-deleted",
            "booking-created", "booking-cancelled", "seats-booked",
            "payment-requested", "payment-completed", "payment-failed"
    );

    public static final Set<String> USER_TOPICS = Set.of(
            "booking-created", "booking-cancelled", "seats-booked",
            "payment-requested", "payment-completed", "payment-failed"
    );

    /** Shown to all signed-in members (payload has no userId). */
    public static final Set<String> MOVIE_TOPICS = Set.of(
            "movie-added", "movie-updated", "movie-deleted"
    );

    private static final Map<String, String> TOPIC_TITLES = Map.ofEntries(
            Map.entry("booking-created", "New booking"),
            Map.entry("booking-cancelled", "Booking cancelled"),
            Map.entry("seats-booked", "Seats booked"),
            Map.entry("payment-requested", "Payment requested"),
            Map.entry("payment-completed", "Payment completed"),
            Map.entry("payment-failed", "Payment failed"),
            Map.entry("movie-added", "Movie added"),
            Map.entry("movie-updated", "Movie updated"),
            Map.entry("movie-deleted", "Movie removed")
    );

    private NotificationPolicies() {
    }

    public static String titleFor(String topic) {
        return TOPIC_TITLES.getOrDefault(topic, topic);
    }
}
