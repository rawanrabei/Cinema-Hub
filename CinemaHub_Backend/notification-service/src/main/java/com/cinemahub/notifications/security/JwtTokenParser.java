package com.cinemahub.notifications.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Component
public class JwtTokenParser {

    @Value("${jwt.secret}")
    private String jwtSecret;

    private SecretKey key;

    @PostConstruct
    void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public boolean populateAttributes(String token, Map<String, Object> attributes) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
            String role = claims.get("role", String.class);
            if (role != null) {
                attributes.put("role", role.toUpperCase());
            }
            Object uid = claims.get("userId");
            if (uid instanceof Number) {
                attributes.put("userId", ((Number) uid).longValue());
            }
            attributes.put("email", claims.getSubject());
            return role != null;
        } catch (Exception e) {
            log.warn("Invalid JWT for WebSocket: {}", e.getMessage());
            return false;
        }
    }

    public Optional<JwtPrincipal> parseBearer(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return Optional.empty();
        }
        String token = authorizationHeader.substring(7).trim();
        if (token.isEmpty()) {
            return Optional.empty();
        }
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
            String role = claims.get("role", String.class);
            if (role == null) {
                return Optional.empty();
            }
            Long userId = null;
            Object uid = claims.get("userId");
            if (uid instanceof Number) {
                userId = ((Number) uid).longValue();
            }
            return Optional.of(new JwtPrincipal(userId, role.toUpperCase(), claims.getSubject()));
        } catch (Exception e) {
            log.warn("Invalid JWT: {}", e.getMessage());
            return Optional.empty();
        }
    }
}
