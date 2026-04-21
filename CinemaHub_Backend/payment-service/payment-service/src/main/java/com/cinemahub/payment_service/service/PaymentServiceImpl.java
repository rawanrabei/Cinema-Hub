package com.cinemahub.payment_service.service;

import com.cinemahub.payment_service.dto.PaymentRequestDTO;
import com.cinemahub.payment_service.dto.PaymentResponseDTO;
import com.cinemahub.payment_service.exception.PaymentNotFoundException;
import com.cinemahub.payment_service.model.Payment;
import com.cinemahub.payment_service.model.enums.PaymentStatus;
import com.cinemahub.payment_service.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public PaymentResponseDTO processPayment(PaymentRequestDTO requestDTO) {
        Payment payment = Payment.builder()
                .bookingId(requestDTO.getBookingId())
                .userId(requestDTO.getUserId())
                .amount(requestDTO.getAmount())
                .paymentMethod(requestDTO.getPaymentMethod())
                .status(PaymentStatus.SUCCESS)
                .transactionId(UUID.randomUUID().toString())
                .paymentDate(LocalDateTime.now())
                .build();

        Payment savedPayment = paymentRepository.save(payment);
        return mapToResponse(savedPayment, "Payment processed successfully");
    }

    @Override
    public PaymentResponseDTO getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new PaymentNotFoundException("Payment with ID " + id + " not found"));

        return mapToResponse(payment, "Payment retrieved successfully");
    }

    @Override
    public List<PaymentResponseDTO> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(payment -> mapToResponse(payment, "Payment retrieved successfully"))
                .toList();
    }

    private PaymentResponseDTO mapToResponse(Payment payment, String message) {
        return PaymentResponseDTO.builder()
                .id(payment.getId())
                .bookingId(payment.getBookingId())
                .userId(payment.getUserId())
                .amount(payment.getAmount())
                .paymentMethod(payment.getPaymentMethod())
                .status(payment.getStatus())
                .transactionId(payment.getTransactionId())
                .paymentDate(payment.getPaymentDate())
                .message(message)
                .build();
    }
}
