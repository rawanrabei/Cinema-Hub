package com.booking.demo.controller;

import com.booking.demo.dto.BookingRequest;
import com.booking.demo.dto.BookingResponse;
import com.booking.demo.service.BookingService;
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
class BookingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private BookingService bookingService;

    private BookingRequest bookingRequest;
    private BookingResponse bookingResponse;

    @BeforeEach
    void setUp() {
        bookingRequest = new BookingRequest();
        bookingRequest.setUserId(1L);
        bookingRequest.setShowtimeId(1L);
        bookingRequest.setMovieId(1L);
        bookingRequest.setSeatNumbers(Arrays.asList("A1", "A2", "A3"));

        bookingResponse = new BookingResponse();
        bookingResponse.setBookingId(1L);
        bookingResponse.setUserId(1L);
        bookingResponse.setShowtimeId(1L);
        bookingResponse.setMovieId(1L);
    }

    @Test
    void testConfirmAfterPayment_Success() throws Exception {
        when(bookingService.confirmBookingAfterPayment(1L)).thenReturn(bookingResponse);

        mockMvc.perform(post("/api/bookings/1/confirm"))
                .andExpect(status().isOk());
    }

    @Test
    void testCreateBooking_Success() throws Exception {
        when(bookingService.createBooking(any(), any(), any(), any())).thenReturn(bookingResponse);

        mockMvc.perform(post("/api/bookings")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingRequest)))
                .andExpect(status().isOk());
    }

    @Test
    void testGetBooking_Success() throws Exception {
        when(bookingService.getBooking(1L)).thenReturn(bookingResponse);

        mockMvc.perform(get("/api/bookings/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetUserBookings_Success() throws Exception {
        List<BookingResponse> bookings = Arrays.asList(bookingResponse);
        when(bookingService.getUserBookings(1L)).thenReturn(bookings);

        mockMvc.perform(get("/api/bookings/user/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testCancelBooking_Success() throws Exception {
        mockMvc.perform(delete("/api/bookings/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testGenerateSeats_Success() throws Exception {
        mockMvc.perform(post("/api/bookings/generate-seats/1"))
                .andExpect(status().isOk());
    }
}
