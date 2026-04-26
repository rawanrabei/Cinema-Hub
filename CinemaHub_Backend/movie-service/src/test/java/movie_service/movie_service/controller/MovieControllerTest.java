package movie_service.movie_service.controller;

import movie_service.movie_service.model.Movie;
import movie_service.movie_service.service.MovieService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MovieControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private MovieService movieService;

    private Movie movie;

    @BeforeEach
    void setUp() {
        movie = new Movie();
        movie.setId(1L);
        movie.setTitle("Test Movie");
        movie.setDescription("Test Description");
        movie.setDuration(120);
        movie.setStatus(Movie.Status.Active);
    }

    @Test
    void testGetAllMovies_Success() throws Exception {
        List<Movie> movies = Arrays.asList(movie);
        when(movieService.getAllMovies()).thenReturn(movies);

        mockMvc.perform(get("/movies"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetMovieById_Success() throws Exception {
        when(movieService.getMovieById(1L)).thenReturn(movie);

        mockMvc.perform(get("/movies/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testAddMovie_Success() throws Exception {
        when(movieService.addMovie(any())).thenReturn(movie);

        mockMvc.perform(post("/movies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(movie)))
                .andExpect(status().isOk());
    }

    @Test
    void testUpdateMovie_Success() throws Exception {
        when(movieService.updateMovie(any(), any())).thenReturn(movie);

        mockMvc.perform(put("/movies/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(movie)))
                .andExpect(status().isOk());
    }

    @Test
    void testDeleteMovie_Success() throws Exception {
        mockMvc.perform(delete("/movies/1"))
                .andExpect(status().isOk());
    }
}
