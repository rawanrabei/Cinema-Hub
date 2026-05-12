/** English labels for Kafka topic keys (matches notification-service). */
const TOPIC_LABEL_EN = {
  "user-registered": "User registered",
  "user-logged-in": "User signed in",
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
  return TOPIC_LABEL_EN[topic] || topic.replace(/-/g, " ");
}
