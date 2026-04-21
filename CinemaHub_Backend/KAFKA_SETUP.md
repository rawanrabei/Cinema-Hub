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

## Event Flow Examples

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

Run with:
```bash
docker-compose -f kafka-docker-compose.yml up -d
```

### Option 2: Individual Docker Containers
```bash
# Pull Zookeeper
docker pull confluentinc/cp-zookeeper:7.5.0

# Pull Kafka
docker pull confluentinc/cp-kafka:7.5.0

# Run Zookeeper
docker run -d --name zookeeper \
  -p 2181:2181 \
  -e ZOOKEEPER_CLIENT_PORT=2181 \
  -e ZOOKEEPER_TICK_TIME=2000 \
  confluentinc/cp-zookeeper:7.5.0

# Run Kafka
docker run -d --name kafka \
  -p 9092:9092 \
  --link zookeeper:zookeeper \
  -e KAFKA_BROKER_ID=1 \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  confluentinc/cp-kafka:7.5.0
```

### Option 3: Local Installation
Download Kafka from: https://kafka.apache.org/downloads

```bash
# Start Zookeeper
bin/zookeeper-server-start.sh config/zookeeper.properties

# Start Kafka
bin/kafka-server-start.sh config/server.properties
```

## Service Configuration

Each service has Kafka configuration in `application.properties`:

```properties
# Kafka Configuration
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.consumer.group-id=<service-name>-group
spring.kafka.consumer.auto-offset-reset=earliest
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.consumer.value-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
spring.kafka.producer.value-serializer=org.apache.kafka.common.serialization.StringSerializer
```

## Testing Kafka

### Create a Topic
```bash
docker exec -it kafka kafka-topics --create \
  --topic test-topic \
  --bootstrap-server localhost:9092 \
  --partitions 1 \
  --replication-factor 1
```

### List Topics
```bash
docker exec -it kafka kafka-topics --list \
  --bootstrap-server localhost:9092
```

### Produce a Message
```bash
docker exec -it kafka kafka-console-producer \
  --topic test-topic \
  --bootstrap-server localhost:9092
```

### Consume Messages
```bash
docker exec -it kafka kafka-console-consumer \
  --topic test-topic \
  --bootstrap-server localhost:9092 \
  --from-beginning
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

## Troubleshooting

### Kafka Connection Issues
- Verify Kafka is running: `docker ps | grep kafka`
- Check Kafka logs: `docker logs kafka`
- Verify port 9092 is accessible: `netstat -an | findstr 9092`

### Topic Not Found
- Topics are auto-created by Spring Boot on startup
- Verify topics exist: `docker exec -it kafka kafka-topics --list --bootstrap-server localhost:9092`

### Consumer Not Receiving Messages
- Check consumer group ID matches
- Verify topic subscription
- Check consumer logs for errors

## Monitoring

### Kafka UI (Optional)
Add to docker-compose.yml:
```yaml
  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    ports:
      - "8085:8080"
    environment:
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:9092
      KAFKA_CLUSTERS_0_ZOOKEEPER: zookeeper:2181
```

Access at: http://localhost:8085

## Production Considerations

1. **Replication Factor**: Set to 3 for production
2. **Partitions**: Increase based on expected load
3. **Retention**: Configure appropriate retention policies
4. **Security**: Enable SSL/SASL for production
5. **Monitoring**: Use Kafka Manager or Confluent Control Center
6. **Backup**: Regular backups of Kafka topics

## Cleanup

```bash
# Stop containers
docker-compose -f kafka-docker-compose.yml down

# Remove volumes
docker-compose -f kafka-docker-compose.yml down -v

# Remove all Kafka data
docker volume prune
```
