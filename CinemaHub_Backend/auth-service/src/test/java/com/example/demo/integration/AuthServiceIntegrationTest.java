package com.example.demo.integration;

import com.example.demo.entity.User;
import com.example.demo.repository.userrepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthServiceIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private userrepo userRepository;

    @Test
    void testFullAuthFlow() {
        // Register user
        User user = new User();
        user.setUsername("integrationuser");
        user.setEmail("integration@example.com");
        user.setPassword("password123");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<User> registerRequest = new HttpEntity<>(user, headers);
        ResponseEntity<String> registerResponse = restTemplate.postForEntity(
                "http://localhost:" + port + "/api/auth/register",
                registerRequest,
                String.class
        );

        assertEquals(HttpStatus.OK, registerResponse.getStatusCode());
        assertEquals("User registered successfully!", registerResponse.getBody());

        // Login user
        HttpEntity<User> loginRequest = new HttpEntity<>(user, headers);
        ResponseEntity<String> loginResponse = restTemplate.postForEntity(
                "http://localhost:" + port + "/api/auth/login",
                loginRequest,
                String.class
        );

        assertEquals(HttpStatus.OK, loginResponse.getStatusCode());
        assertNotNull(loginResponse.getBody());
        assertTrue(loginResponse.getBody().length() > 0); // JWT token should be returned
    }
}
