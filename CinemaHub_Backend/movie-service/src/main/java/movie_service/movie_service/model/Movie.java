package movie_service.movie_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * OCL Constraints for Movie Entity:
 * 
 * context Movie inv:
 *   self.title.size() >= 1 and self.title.size() <= 200
 *   self.description.size() >= 10 and self.description.size() <= 2000
 *   self.duration >= 30 and self.duration <= 300
 *   self.rating >= 0 and self.rating <= 10
 *   self.amount >= 0
 *   self.status <> null
 *   self.genres->size() >= 1
 *   self.genres->forAll(g | g.size() >= 2)
 * 
 * context Movie::addMovie() : Boolean
 *   pre: self.title.size() >= 1 and self.description.size() >= 10
 *   post: self.id <> null and self.status = Status.Active
 * 
 * context Movie::updateMovie() : Boolean
 *   pre: self.id <> null
 *   post: self.title.size() >= 1 and self.description.size() >= 10
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * OCL: self.title.size() >= 1 and self.title.size() <= 200
     */
    @Column(nullable = false, length = 200)
    private String title;

    /**
     * OCL: self.description.size() >= 10 and self.description.size() <= 2000
     */
    @Column(nullable = false, length = 2000)
    private String description;

    /**
     * OCL: self.duration >= 30 and self.duration <= 300
     */
    @Column(nullable = false)
    private int duration;

    /**
     * OCL: self.rating >= 0 and self.rating <= 10
     */
    @Column(nullable = false)
    private double rating;

    /**
     * OCL: self.amount >= 0
     */
    @Column(nullable = false)
    private double amount;

    @Column(length = 500)
    private String posterUrl;

    /**
     * OCL: self.director.size() >= 2 if self.director <> null
     */
    @Column(length = 100)
    private String director;

    /**
     * OCL: self.language.size() >= 2 if self.language <> null
     */
    @Column(length = 50)
    private String language;

    public enum Status{
        Active,
        InActive
    }

    /**
     * OCL: self.status <> null
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    /**
     * OCL: self.genres->size() >= 1
     * OCL: self.genres->forAll(g | g.size() >= 2)
     */
    @ElementCollection
    private List<String> genres;

}
