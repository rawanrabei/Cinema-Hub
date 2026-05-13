import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { useTheme } from "./ThemeContext";
import { getNotificationsPath } from "../Pages/Auth/components/auth.constants";
import { API_BASE_URL, WS_NOTIFICATIONS_URL } from "../config/api";
import { playNotificationChime } from "../utils/notificationSound";
import { topicLabelEn, isUserTopic, toastNotificationLine } from "../utils/notificationLabels";

const NotificationsContext = createContext(null);

const MAX_ITEMS = 200;
const TOAST_MS = 6000;
/** Skip duplicate client-side toasts (no server id) within this window */
const CLIENT_APPEND_DEDUPE_MS = 5000;

function ToastStack({ toasts, onDismiss }) {
  const { isDarkMode, colors } = useTheme();
  if (!toasts.length) return null;
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-stretch sm:items-center gap-2 pt-3 px-3 pointer-events-none sm:pt-4"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.toastId}
          className="pointer-events-auto w-full max-w-lg mx-auto rounded-xl border shadow-2xl px-4 py-3 backdrop-blur-md"
          style={{
            borderColor: colors.primary,
            backgroundColor: isDarkMode ? 'rgba(15, 15, 15, 0.95)' : 'white',
            color: colors.primary,
            animation: "toastIn 0.22s ease-out"
          }}
        >
          <div className="flex justify-between gap-3 items-start">
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm leading-snug">
                {toastNotificationLine(t)}
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 text-xl leading-none px-1 hover:opacity-70"
              style={{ color: colors.primary }}
              onClick={() => onDismiss(t.toastId)}
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export function NotificationsProvider({ children }) {
  const { token, user } = useAuth();
  const [items, setItems] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const wsRef = useRef(null);
  const reconnectTimer = useRef(null);
  const toastTimers = useRef(new Map());
  const itemsRef = useRef([]);
  const clientAppendDedupeRef = useRef(new Map());

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const dismissToast = useCallback((toastId) => {
    const tid = toastTimers.current.get(toastId);
    if (tid) clearTimeout(tid);
    toastTimers.current.delete(toastId);
    setToasts((prev) => prev.filter((x) => x.toastId !== toastId));
  }, []);

  const refreshFromApi = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/notifications?size=50`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const rows = await res.json();
      if (!Array.isArray(rows)) return;
      setItems(
        rows
          .filter((r) => !isUserTopic(r.topic))
          .map((r) => ({
            ...r,
            id: String(r.id),
          })),
      );
    } catch {
      /* ignore */
    }
  }, [token]);

  const append = useCallback(
    (data) => {
      const ephemeral = data.ephemeral === true;
      const skipToast = data.skipToast === true;
      const { ephemeral: _e, skipToast: _s, ...rest } = data;

      if (isUserTopic(rest.topic)) {
        return;
      }

      const prev = itemsRef.current;
      if (rest.id != null && prev.some((p) => String(p.id) === String(rest.id))) {
        return;
      }

      const rowId =
        rest.id != null
          ? String(rest.id)
          : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      if (rest.id == null) {
        const fpKey = `${rest.topic ?? ""}\u0000${rest.title ?? ""}\u0000${JSON.stringify(rest.payload ?? null)}`;
        const now = Date.now();
        const seenAt = clientAppendDedupeRef.current.get(fpKey);
        if (seenAt != null && now - seenAt < CLIENT_APPEND_DEDUPE_MS) {
          return;
        }
        clientAppendDedupeRef.current.set(fpKey, now);
        if (clientAppendDedupeRef.current.size > 64) {
          const cutoff = now - CLIENT_APPEND_DEDUPE_MS;
          for (const [k, t] of clientAppendDedupeRef.current.entries()) {
            if (t < cutoff) clientAppendDedupeRef.current.delete(k);
          }
        }
      }

      const toastId = `toast-${rowId}`;

      if (!ephemeral) {
        const nextItem = { ...rest, id: rowId };
        const next = [nextItem, ...prev].slice(0, MAX_ITEMS);
        itemsRef.current = next;
        setItems(next);
        setUnreadCount((c) => c + 1);
      }

      if (!skipToast) {
        playNotificationChime();
        setToasts((prev) =>
          [
            {
              toastId,
              title: rest.title,
              topic: rest.topic,
              payload: rest.payload,
              topicKey: rest.topic,
              topicDisplay: topicLabelEn(rest.topic),
            },
            ...prev,
          ].slice(0, 4),
        );
        const timer = setTimeout(() => dismissToast(toastId), TOAST_MS);
        toastTimers.current.set(toastId, timer);

        if (typeof document !== "undefined" && document.visibilityState === "hidden") {
          try {
            if (Notification.permission === "granted") {
              new Notification(toastNotificationLine(rest) || "Cinema Hub", {
                body: topicLabelEn(rest.topic) || (rest.topic ? rest.topic.replace(/-/g, " ") : ""),
                silent: true,
              });
            }
          } catch {
            /* ignore */
          }
        }
      }
    },
    [dismissToast],
  );

  const markAllRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
    setUnreadCount(0);
  }, []);

  const deleteAllNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/notifications`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setItems([]);
        setUnreadCount(0);
      }
    } catch {
      /* ignore */
    }
  }, [token]);

  const deleteNotification = useCallback(async (notificationId) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setItems(prev => prev.filter(n => n.id !== String(notificationId)));
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch {
      /* ignore */
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      itemsRef.current = [];
      setItems([]);
      setUnreadCount(0);
      return;
    }
    void refreshFromApi();
  }, [token, refreshFromApi]);

  useEffect(() => {
    return () => {
      toastTimers.current.forEach((t) => clearTimeout(t));
      toastTimers.current.clear();
    };
  }, []);

  useEffect(() => {
    if (!token) {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      return;
    }

    const connect = () => {
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
      const url = `${WS_NOTIFICATIONS_URL}?token=${encodeURIComponent(token)}`;
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        void refreshFromApi();
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (isUserTopic(data.topic)) {
            return;
          }
          append(data);
        } catch {
          /* ignore malformed */
        }
      };

      ws.onclose = () => {
        wsRef.current = null;
        if (token) {
          reconnectTimer.current = setTimeout(connect, 4000);
        }
      };

      ws.onerror = () => {
        try {
          ws.close();
        } catch {
          /* ignore */
        }
      };
    };

    connect();

    return () => {
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [token, append, refreshFromApi]);

  useEffect(() => {
    if (typeof Notification === "undefined" || Notification.permission !== "default") {
      return;
    }
    if (!user) return;
    const t = setTimeout(() => {
      Notification.requestPermission().catch(() => {});
    }, 2500);
    return () => clearTimeout(t);
  }, [user]);

  const notificationsHref = user ? getNotificationsPath(user.role) : "/home";

  const value = useMemo(
    () => ({
      items,
      unreadCount,
      markAllRead,
      clearAll,
      refreshFromApi,
      deleteAllNotifications,
      deleteNotification,
      append,
      notificationsHref,
      currentUser: user,
    }),
    [items, unreadCount, markAllRead, clearAll, refreshFromApi, deleteAllNotifications, deleteNotification, append, notificationsHref, user],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error("useNotifications must be used within NotificationsProvider");
  }
  return ctx;
}
