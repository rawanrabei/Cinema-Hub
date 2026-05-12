package com.cinemahub.notifications.websocket;

import com.cinemahub.notifications.service.NotificationBroadcastService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationWebSocketHandler extends TextWebSocketHandler {

    private final NotificationBroadcastService broadcastService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        broadcastService.register(session);
        log.info("WebSocket connected user={} role={}", session.getAttributes().get("email"),
                session.getAttributes().get("role"));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        // Ping/pong optional — ignore client messages
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        broadcastService.unregister(session);
        log.debug("WebSocket closed: {}", status);
    }
}
