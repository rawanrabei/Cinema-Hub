package com.cinemahub.notifications.security;

public record JwtPrincipal(Long userId, String role, String email) {
}
