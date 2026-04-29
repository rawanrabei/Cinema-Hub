package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.userrepo;
import com.example.demo.security.JwtUtil;
import com.example.demo.producer.AuthProducer;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private userrepo userRepository;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private PasswordEncoder encoder;

    @MockBean
    private JwtUtil jwtUtils;

    @MockBean
    private AuthProducer authProducer;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password123");
    }

    @Test
    void testRegisterUser_Success() throws Exception {
        when(userRepository.existsByEmail(any())).thenReturn(false);
        when(encoder.encode(any())).thenReturn("encodedPassword");
        when(userRepository.save(any())).thenReturn(user);

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk());
    }

    @Test
    void testRegisterUser_UserAlreadyExists() throws Exception {
        when(userRepository.existsByEmail(any())).thenReturn(true);

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk());
    }

    @Test
    void testLoginUser_Success() throws Exception {
        when(jwtUtils.generateToken(any(), any(), any())).thenReturn("jwt-token");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk());
    }
}
