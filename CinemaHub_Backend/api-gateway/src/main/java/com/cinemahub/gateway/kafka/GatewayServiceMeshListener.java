package com.cinemahub.gateway.kafka;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

/**
 * Read-only listener so the API Gateway participates in the Kafka bus between microservices
 * (routing stays HTTP; events are observed for observability / project requirements).
 */
@Component
@ConditionalOnProperty(name = "spring.kafka.enabled", havingValue = "true", matchIfMissing = false)
public class GatewayServiceMeshListener {

    private static final Logger log = LoggerFactory.getLogger(GatewayServiceMeshListener.class);

    private static final String DOMAIN_TOPIC_PATTERN =
            "user-registered|user-logged-in|booking-created|booking-cancelled|seats-booked|"
                    + "payment-requested|payment-completed|payment-failed|"
                    + "movie-added|movie-updated|movie-deleted";

    @KafkaListener(
            topicPattern = DOMAIN_TOPIC_PATTERN,
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void onMeshEvent(ConsumerRecord<String, String> record) {
        if (log.isDebugEnabled()) {
            log.debug("[gateway-kafka-mesh] topic={} partition={} offset={}",
                    record.topic(), record.partition(), record.offset());
        }
    }
}
