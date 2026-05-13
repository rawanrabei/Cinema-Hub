# Kafka Setup Guide - Cinema Hub

## Overview
Cinema Hub uses Apache Kafka for event-driven communication between microservices. This guide explains the Kafka integration and deployment.

## Architecture

### Event-Driven Communication Flow

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│ Auth Service│─────▶│    Kafka    │◀─────│Booking Service│
└─────────────┘      └─────────────┘      └─────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│Movie Service│─────▶│   Topics    │◀─────│Payment Service│
└─────────────┘      └─────────────┘      └─────────────┘
```

## Kafka Topics

### Auth Service Topics
- **user-registered**: Published when a new user registers
- **user-logged-in**: Published when a user logs in

### Booking Service Topics
- **booking-created**: Published when a booking is created
- **booking-cancelled**: Published when a booking is cancelled
- **seats-booked**: Published when seats are booked

### Payment Service Topics
- **payment-requested**: Published when payment is requested
- **payment-completed**: Published when payment succeeds
- **payment-failed**: Published when payment fails

### Movie Service Topics
- **movie-added**: Published when a movie is added
- **movie-updated**: Published when a movie is updated
- **movie-deleted**: Published when a movie is deleted

## Event Flow 

### Booking Flow
1. **User creates booking** → Booking Service publishes to `booking-created`
2. **Payment Service listens** → `booking-created` → Initiates payment
3. **Payment completes** → Payment Service publishes to `payment-completed`
4. **Booking Service listens** → `payment-completed` → Confirms booking
5. **Auth Service listens** → `payment-completed` → Sends confirmation email

### Cancellation Flow
1. **User cancels booking** → Booking Service publishes to `booking-cancelled`
2. **Payment Service listens** → `booking-cancelled` → Refunds payment
3. **Movie Service listens** → `booking-cancelled` → Updates seat availability

## Deployment Options

### Option 1: Docker Compose (Development)
```yaml
version: '3.8'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
```



## Service Startup Order

1. **Start Infrastructure**
   - MySQL Database
   - Zookeeper
   - Kafka
   - Eureka Server

2. **Start Services** (can be started in parallel)
   - Auth Service
   - Movie Service
   - Booking Service
   - Payment Service
   - API Gateway







