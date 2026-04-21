package com.cinemahub.payment_service.dto;

import com.cinemahub.payment_service.model.enums.PaymentStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PaymentResponseDTO {
    private Long id;
    private Long bookingId;
    private Long userId;
    private Double amount;
    private String paymentMethod;
    private PaymentStatus status;
    private String transactionId;
    private LocalDateTime paymentDate;
    private String message;
}
