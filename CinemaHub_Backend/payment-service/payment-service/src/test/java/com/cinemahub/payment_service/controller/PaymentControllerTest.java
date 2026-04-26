package com.cinemahub.payment_service.controller;

import com.cinemahub.payment_service.dto.PaymentRequestDTO;
import com.cinemahub.payment_service.dto.PaymentResponseDTO;
import com.cinemahub.payment_service.service.PaymentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PaymentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PaymentService paymentService;

    private PaymentRequestDTO paymentRequest;
    private PaymentResponseDTO paymentResponse;

    @BeforeEach
    void setUp() {
        paymentRequest = new PaymentRequestDTO();
        paymentRequest.setBookingId(1L);
        paymentRequest.setUserId(1L);
        paymentRequest.setAmount(50.0);
        paymentRequest.setPaymentMethod("CREDIT_CARD");

        paymentResponse = new PaymentResponseDTO();
        paymentResponse.setId(1L);
        paymentResponse.setBookingId(1L);
        paymentResponse.setUserId(1L);
        paymentResponse.setAmount(50.0);
        paymentResponse.setPaymentMethod("CREDIT_CARD");
    }

    @Test
    void testProcessPayment_Success() throws Exception {
        when(paymentService.processPayment(any())).thenReturn(paymentResponse);

        mockMvc.perform(post("/api/payments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(paymentRequest)))
                .andExpect(status().isCreated());
    }

    @Test
    void testGetPaymentById_Success() throws Exception {
        when(paymentService.getPaymentById(1L)).thenReturn(paymentResponse);

        mockMvc.perform(get("/api/payments/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetAllPayments_Success() throws Exception {
        List<PaymentResponseDTO> payments = Arrays.asList(paymentResponse);
        when(paymentService.getAllPayments()).thenReturn(payments);

        mockMvc.perform(get("/api/payments"))
                .andExpect(status().isOk());
    }
}
