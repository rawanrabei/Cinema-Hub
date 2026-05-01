package movie_service.movie_service.controller;

import movie_service.movie_service.model.Movie;
import movie_service.movie_service.producer.MovieProducer;
import movie_service.movie_service.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private MovieProducer movieProducer;

    //Customer  view all movies
    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    //view movie by id
    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable Long id) {
        return movieService.getMovieById(id);
    }

    //Admin Add Moviea
    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        Movie savedMovie = movieService.addMovie(movie);
        movieProducer.sendMovieAddedEvent(savedMovie);
        return savedMovie;
    }

    //Admin Update Movie
    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        Movie updatedMovie = movieService.updateMovie(id, movie);
        movieProducer.sendMovieUpdatedEvent(updatedMovie);
        return updatedMovie;
    }

    //Admin Delete Movie
    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        movieProducer.sendMovieDeletedEvent(id);
    }

    //Admin approve movie
    @PutMapping("/{id}/approve")
    public Movie approveMovie(@PathVariable Long id) {
        return movieService.updateMovieStatus(id, Movie.Status.APPROVED);
    }

    //Admin reject movie
    @PutMapping("/{id}/reject")
    public Movie rejectMovie(@PathVariable Long id) {
        return movieService.updateMovieStatus(id, Movie.Status.REJECTED);
    }

    //Admin view pending movies
    @GetMapping("/pending")
    public List<Movie> getPendingMovies() {
        return movieService.getMoviesByStatus(Movie.Status.PENDING);
    }

    //View approved movies only
    @GetMapping("/approved")
    public List<Movie> getApprovedMovies() {
        return movieService.getMoviesByStatus(Movie.Status.APPROVED);
    }
}