package com.example.demo.security;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

  @Component
  @Slf4j
public class JwtUtil {
    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.expiration}")
    private int jwtExpirationMs;

    private SecretKey key;

    // @PostConstruct
    // public void init(){
    //     this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username, String role){
        
        return Jwts.builder()
               .setSubject(username)
               .claim("role", role)
               .setIssuedAt(new Date())
               .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
               .signWith(key)
               .compact();
    }

    public String getUserFromToken(String token){
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String token){
        try {
           Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;

        } catch (Exception e){
            log.error("JWT validation error:{}", e.getMessage());
        }
        return false;
    }
}