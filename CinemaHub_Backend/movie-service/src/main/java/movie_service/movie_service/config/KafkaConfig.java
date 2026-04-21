package movie_service.movie_service.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    // Topics for Movie Service
    @Bean
    public NewTopic movieAddedTopic() {
        return TopicBuilder.name("movie-added")
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic movieUpdatedTopic() {
        return TopicBuilder.name("movie-updated")
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic movieDeletedTopic() {
        return TopicBuilder.name("movie-deleted")
                .partitions(3)
                .replicas(1)
                .build();
    }
}
