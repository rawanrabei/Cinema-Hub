package movie_service.movie_service.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class MovieConsumer {

    private static final Logger logger = LoggerFactory.getLogger(MovieConsumer.class);

    @KafkaListener(topics = "booking-created", groupId = "movie-service-group")
    public void handleBookingCreated(String message) {
        logger.info("Received booking created event: {}", message);
        // Update movie booking statistics
        // Increment seat count for the movie
    }

    @KafkaListener(topics = "booking-cancelled", groupId = "movie-service-group")
    public void handleBookingCancelled(String message) {
        logger.info("Received booking cancelled event: {}", message);
        // Update movie booking statistics
        // Decrement seat count for the movie
    }
}
