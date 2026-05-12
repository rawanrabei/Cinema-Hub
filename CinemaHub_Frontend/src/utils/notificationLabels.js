/** English labels for Kafka topic keys (matches notification-service). */
const TOPIC_LABEL_EN = {
  "user-registered": "User registered",
  /** Intentionally empty: login uses title only ("Welcome back, …") from the server. */
  "user-logged-in": "",
  "user-logged-out": "Signed out",
  "booking-created": "Booking created",
  "booking-cancelled": "Booking cancelled",
  "seats-booked": "Seats booked",
  "payment-requested": "Payment requested",
  "payment-completed": "Payment completed",
  "payment-failed": "Payment failed",
  "movie-added": "Movie added",
  "movie-updated": "Movie updated",
  "movie-deleted": "Movie deleted",
};

export function topicLabelEn(topic) {
  if (!topic) return "";
  if (Object.prototype.hasOwnProperty.call(TOPIC_LABEL_EN, topic)) {
    return TOPIC_LABEL_EN[topic];
  }
  return topic.replace(/-/g, " ");
}
