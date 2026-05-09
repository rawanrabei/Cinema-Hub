package com.cinemahub.payment_service.model;

import com.cinemahub.payment_service.model.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * OCL Constraints for Payment Entity:
 * 
 * context Payment inv:
 *   self.bookingId <> null
 *   self.userId <> null
 *   self.amount > 0
 *   self.paymentMethod <> null
 *   self.paymentMethod = 'CREDIT_CARD' or self.paymentMethod = 'DEBIT_CARD' or self.paymentMethod = 'PAYPAL'
 *   self.status <> null
 *   self.transactionId <> null
 *   self.transactionId.size() = 36 (UUID format)
 *   self.paymentDate <> null
 *   self.paymentDate <= LocalDateTime.now()
 * 
 * context Payment::processPayment() : Boolean
 *   pre: self.bookingId <> null and self.amount > 0 and self.paymentMethod <> null
 *   post: self.status = PaymentStatus.SUCCESS and self.transactionId <> null
 * 
 * context Payment::refundPayment() : Boolean
 *   pre: self.status = PaymentStatus.SUCCESS
 *   post: self.status = PaymentStatus.REFUNDED
 */
@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * OCL: self.bookingId <> null
     */
    @Column(nullable = false)
    private Long bookingId;

    /**
     * OCL: self.userId <> null
     */
    @Column(nullable = false)
    private Long userId;

    /**
     * OCL: self.amount > 0
     */
    @Column(nullable = false)
    private Double amount;

    /**
     * OCL: self.paymentMethod <> null
     * OCL: self.paymentMethod = 'CREDIT_CARD' or self.paymentMethod = 'DEBIT_CARD' or self.paymentMethod = 'PAYPAL'
     */
    @Column(nullable = false, length = 50)
    private String paymentMethod;

    /**
     * OCL: self.status <> null
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;

    /**
     * OCL: self.transactionId <> null
     * OCL: self.transactionId.size() = 36 (UUID format)
     */
    @Column(unique = true, nullable = false, length = 36)
    private String transactionId;

    /**
     * OCL: self.paymentDate <> null
     * OCL: self.paymentDate <= LocalDateTime.now()
     */
    @Column(nullable = false)
    private LocalDateTime paymentDate;
}
