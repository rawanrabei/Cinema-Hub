package movie_service.movie_service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
	"spring.datasource.url=jdbc:mysql://mysql:3306/demo_db",
	"spring.datasource.username=root",
	"spring.datasource.password=root",
	"spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver",
	"spring.jpa.hibernate.ddl-auto=create-drop",
	"spring.jpa.show-sql=true",
	"spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect",
	"eureka.client.enabled=false",
	"spring.cloud.discovery.enabled=false",
	"spring.kafka.auto-startup=false"
})
class MovieServiceApplicationTests {

	@Test
	void contextLoads() {
	}

}
