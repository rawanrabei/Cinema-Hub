package com.cinemahub.payment_service.service;

import com.cinemahub.payment_service.dto.PaymentRequestDTO;
import com.cinemahub.payment_service.dto.PaymentResponseDTO;

import java.util.List;

public interface PaymentService {
    PaymentResponseDTO processPayment(PaymentRequestDTO requestDTO);
    PaymentResponseDTO getPaymentById(Long id);
    List<PaymentResponseDTO> getAllPayments();
}
