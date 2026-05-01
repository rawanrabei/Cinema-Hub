package movie_service.movie_service.service;

import movie_service.movie_service.model.Movie;
import movie_service.movie_service.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    //Add Movie
    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    //Get Movies
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }


    //Get Movies by id 
    public Movie getMovieById(Long id) {
    return movieRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Movie not found"));
    }

    
    //Update Movie
    public Movie updateMovie(Long id, Movie updatedMovie) {
        Movie movie = getMovieById(id);

        movie.setTitle(updatedMovie.getTitle());
        movie.setDescription(updatedMovie.getDescription());
        movie.setDuration(updatedMovie.getDuration());
        movie.setRating(updatedMovie.getRating());
        movie.setAmount(updatedMovie.getAmount());
        movie.setPosterUrl(updatedMovie.getPosterUrl());
        movie.setDirector(updatedMovie.getDirector());
        movie.setLanguage(updatedMovie.getLanguage());
        movie.setGenres(updatedMovie.getGenres());
        movie.setStatus(updatedMovie.getStatus());

        return movieRepository.save(movie);
    }


    //Delete Movie
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
    
}