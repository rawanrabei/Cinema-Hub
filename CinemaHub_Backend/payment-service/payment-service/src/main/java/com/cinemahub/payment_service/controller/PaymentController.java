package com.cinemahub.payment_service.controller;

import com.cinemahub.payment_service.dto.PaymentRequestDTO;
import com.cinemahub.payment_service.dto.PaymentResponseDTO;
import com.cinemahub.payment_service.producer.PaymentProducer;
import com.cinemahub.payment_service.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final PaymentProducer paymentProducer;

    public PaymentController(PaymentService paymentService, PaymentProducer paymentProducer) {
        this.paymentService = paymentService;
        this.paymentProducer = paymentProducer;
    }

    @PostMapping
    public ResponseEntity<PaymentResponseDTO> processPayment(@Valid @RequestBody PaymentRequestDTO requestDTO) {
        PaymentResponseDTO payment = paymentService.processPayment(requestDTO);

        // Send payment event based on status
        if (payment.getStatus().toString().equals("SUCCESS")) {
            paymentProducer.sendPaymentCompletedEvent(payment);
        } else if (payment.getStatus().toString().equals("FAILED")) {
            paymentProducer.sendPaymentFailedEvent(payment);
        }

        return new ResponseEntity<>(payment, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponseDTO> getPaymentById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }

    @GetMapping
    public ResponseEntity<List<PaymentResponseDTO>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }
}
