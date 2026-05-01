package movie_service.movie_service.repository;

import movie_service.movie_service.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByStatus(Movie.Status status);
}
