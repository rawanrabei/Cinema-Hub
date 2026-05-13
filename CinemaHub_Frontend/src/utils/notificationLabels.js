/** English labels for Kafka topic keys (matches notification-service). */
const TOPIC_LABEL_EN = {
  "booking-created": "Booking created",
  "booking-cancelled": "Booking cancelled",
  "seats-booked": "Seats booked",
  "payment-requested": "Payment requested",
  "payment-completed": "Payment completed",
  "payment-failed": "Payment failed",
  /** Main line uses movie title; chip stays minimal. */
  "movie-added": "",
  "movie-updated": "",
  "movie-deleted": "",
};

export function isUserTopic(topic) {
  return typeof topic === "string" && topic.startsWith("user-");
}

export function topicLabelEn(topic) {
  if (!topic) return "";
  if (isUserTopic(topic)) return "";
  if (Object.prototype.hasOwnProperty.call(TOPIC_LABEL_EN, topic)) {
    return TOPIC_LABEL_EN[topic];
  }
  return topic.replace(/-/g, " ");
}

function pickMovieTitle(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return "";
  const t = payload.title;
  return typeof t === "string" && t.trim() ? t.trim() : "";
}

/** Prefer payload title when the stored title is still generic (older rows). */
export function displayNotificationTitle(n) {
  const topic = n?.topic;
  if (isUserTopic(topic)) return "";
  const title = n?.title ?? "";
  const p = n?.payload;
  const movieTitle = pickMovieTitle(p);

  if (topic === "movie-added" && movieTitle) return `${movieTitle} was added`;
  if (topic === "movie-updated" && movieTitle) return `${movieTitle} was updated`;
  if (topic === "movie-deleted") {
    if (movieTitle) return `${movieTitle} was removed`;
    if (typeof p === "number") return `Movie removed (ID ${p})`;
    if (typeof p === "string" && /^\d+$/.test(p.trim())) {
      return `Movie removed (ID ${p.trim()})`;
    }
  }

  const trimmed = typeof title === "string" ? title.trim() : "";
  if (trimmed) return trimmed;

  if (topic && !isUserTopic(topic)) {
    const fromMap = topicLabelEn(topic);
    if (fromMap) return fromMap;
    return topic.replace(/-/g, " ");
  }

  return "";
}

/** Line shown on toast / browser notification — never blank for non-user topics. */
export function toastNotificationLine(n) {
  const line = displayNotificationTitle(n);
  if (line) return line;
  if (isUserTopic(n?.topic)) return "";
  const t = n?.title;
  if (typeof t === "string" && t.trim()) return t.trim();
  const topic = n?.topic;
  if (typeof topic === "string" && topic.length) {
    return topic.replace(/-/g, " ");
  }
  return "New update";
}
