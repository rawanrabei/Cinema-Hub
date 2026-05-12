package com.cinemahub.notifications.web;

import com.cinemahub.notifications.security.JwtTokenParser;
import com.cinemahub.notifications.service.NotificationQueryService;
import com.cinemahub.notifications.web.dto.NotificationResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final JwtTokenParser jwtTokenParser;
    private final NotificationQueryService notificationQueryService;

    @GetMapping
    public ResponseEntity<?> list(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size
    ) {
        return jwtTokenParser.parseBearer(authorization)
                .map(p -> ResponseEntity.ok(notificationQueryService.list(p, page, size)))
                .orElse(ResponseEntity.status(401).build());
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAll(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        return jwtTokenParser.parseBearer(authorization)
                .map(p -> {
                    notificationQueryService.deleteAllByUserId(p.userId());
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.status(401).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        return jwtTokenParser.parseBearer(authorization)
                .map(p -> {
                    notificationQueryService.deleteById(id, p.userId());
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.status(401).build());
    }
}
