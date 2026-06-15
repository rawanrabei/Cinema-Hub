export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:18080";

export const WS_NOTIFICATIONS_URL = API_BASE_URL.replace(/^http/, "ws")
  + "/ws/notifications";
