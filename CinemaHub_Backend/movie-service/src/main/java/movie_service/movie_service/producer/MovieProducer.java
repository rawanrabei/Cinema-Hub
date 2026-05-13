package movie_service.movie_service.producer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class MovieProducer {

    private static final Logger logger = LoggerFactory.getLogger(MovieProducer.class);

    @Autowired(required = false)
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    public void sendMovieAddedEvent(Object movie) {
        if (kafkaTemplate == null) {
            logger.warn("Kafka is disabled, skipping movie added event");
            return;
        }
        try {
            String message = objectMapper.writeValueAsString(movie);
            kafkaTemplate.send("movie-added", message);
            logger.info("Movie added event sent: {}", message);
        } catch (JsonProcessingException e) {
            logger.error("Error serializing movie event", e);
        }
    }

    public void sendMovieUpdatedEvent(Object movie) {
        if (kafkaTemplate == null) {
            logger.warn("Kafka is disabled, skipping movie updated event");
            return;
        }
        try {
            String message = objectMapper.writeValueAsString(movie);
            kafkaTemplate.send("movie-updated", message);
            logger.info("Movie updated event sent: {}", message);
        } catch (JsonProcessingException e) {
            logger.error("Error serializing movie event", e);
        }
    }

    public void sendMovieDeletedEvent(Long movieId, String movieTitle) {
        if (kafkaTemplate == null) {
            logger.warn("Kafka is disabled, skipping movie deleted event");
            return;
        }
        try {
            Map<String, Object> body = new LinkedHashMap<>();
            body.put("id", movieId);
            if (movieTitle != null && !movieTitle.isBlank()) {
                body.put("title", movieTitle.trim());
            }
            String message = objectMapper.writeValueAsString(body);
            kafkaTemplate.send("movie-deleted", message);
            logger.info("Movie deleted event sent: {}", message);
        } catch (JsonProcessingException e) {
            logger.error("Error serializing movie event", e);
        }
    }
}
