-- Movie Data Insertion for Cinema Hub
-- This file contains 13 movies with complete details
-- Note: Genres are stored as @ElementCollection in JPA, creating a separate table automatically

-- Insert movies into the database
INSERT INTO movie (title, description, duration, rating, amount, status, director, language, poster_url) VALUES
('Finding Nemo', 'A timid clownfish sets out on a journey to bring his son home from Sydney.', 100, 8.2, 14.99, 'Active', 'Andrew Stanton', 'English', NULL),
('How to Train Your Dragon: The Hidden World', 'Hiccup seeks a dragon utopia called "The Hidden World" while Furies fall in love.', 104, 7.4, 14.99, 'Active', 'Dean DeBlois', 'English', NULL),
('Toy Story', 'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him.', 81, 8.3, 14.99, 'Active', 'John Lasseter', 'English', NULL),
('The Lion King', 'A lion prince is cast out of his pride by his cruel uncle and must find his way back.', 88, 8.5, 14.99, 'Active', 'Allers & Minkoff', 'English', NULL),
('Elemental', 'Follows Ember and Wade in a city where fire-, water-, land-, and air-residents live together.', 101, 7.0, 19.99, 'Active', 'Peter Sohn', 'English', NULL),
('Cloudy with a Chance of Meatballs', 'A scientist''s invention makes food fall from the sky, leading to unintended consequences.', 90, 6.9, 12.99, 'Active', 'Lord & Miller', 'English', NULL),
('Inside Out 2', 'Teenager Riley encounters a new set of complex emotions at headquarters.', 96, 7.8, 19.99, 'Active', 'Kelsey Mann', 'English', NULL),
('Onward', 'Two elven brothers embark on a quest to bring their father back for one day.', 102, 7.4, 14.99, 'Active', 'Dan Scanlon', 'English', NULL),
('Ratatouille', 'A rat who can cook makes an alliance with a young kitchen worker at a famous restaurant.', 111, 8.1, 14.99, 'Active', 'Brad Bird', 'English', NULL),
('Migration', 'A family of ducks tries to convince their overprotective father to go on a vacation.', 83, 6.6, 14.99, 'Active', 'Benjamin Renner', 'English', NULL),
('Encanto', 'A Colombian girl must save her family''s magic after discovering she is the only one without a gift.', 102, 7.2, 14.99, 'Active', 'Bush & Howard', 'English', NULL),
('Lady and the Tramp', 'The romantic tale of a sheltered uptown Cocker Spaniel and a streetwise mutt.', 76, 7.3, 12.99, 'Active', 'Clyde Geronimi', 'English', NULL),
('Tangled', 'The long-haired Rapunzel strikes a deal with a charming thief to see the floating lanterns.', 100, 7.7, 14.99, 'Active', 'Greno & Howard', 'English', NULL);

-- Insert genres for each movie
-- Note: JPA @ElementCollection creates a table named 'movie_genres' with columns (movie_id, genres)

-- Finding Nemo - Animation, Adventure
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'Finding Nemo'), 'Animation'),
((SELECT id FROM movie WHERE title = 'Finding Nemo'), 'Adventure');

-- How to Train Your Dragon: The Hidden World - Animation, Action
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'How to Train Your Dragon: The Hidden World'), 'Animation'),
((SELECT id FROM movie WHERE title = 'How to Train Your Dragon: The Hidden World'), 'Action');

-- Toy Story - Animation, Adventure
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'Toy Story'), 'Animation'),
((SELECT id FROM movie WHERE title = 'Toy Story'), 'Adventure');

-- The Lion King - Animation, Drama
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'The Lion King'), 'Animation'),
((SELECT id FROM movie WHERE title = 'The Lion King'), 'Drama');

-- Elemental - Animation, Comedy
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'Elemental'), 'Animation'),
((SELECT id FROM movie WHERE title = 'Elemental'), 'Comedy');

-- Cloudy with a Chance of Meatballs - Animation, Sci-Fi
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'Cloudy with a Chance of Meatballs'), 'Animation'),
((SELECT id FROM movie WHERE title = 'Cloudy with a Chance of Meatballs'), 'Sci-Fi');

-- Inside Out 2 - Animation, Family
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'Inside Out 2'), 'Animation'),
((SELECT id FROM movie WHERE title = 'Inside Out 2'), 'Family');

-- Onward - Animation, Fantasy
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'Onward'), 'Animation'),
((SELECT id FROM movie WHERE title = 'Onward'), 'Fantasy');

-- Ratatouille - Animation, Comedy
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'Ratatouille'), 'Animation'),
((SELECT id FROM movie WHERE title = 'Ratatouille'), 'Comedy');

-- Migration - Animation, Adventure
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'Migration'), 'Animation'),
((SELECT id FROM movie WHERE title = 'Migration'), 'Adventure');

-- Encanto - Animation, Musical
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'Encanto'), 'Animation'),
((SELECT id FROM movie WHERE title = 'Encanto'), 'Musical');

-- Lady and the Tramp - Animation, Romance
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'Lady and the Tramp'), 'Animation'),
((SELECT id FROM movie WHERE title = 'Lady and the Tramp'), 'Romance');

-- Tangled - Animation, Musical
INSERT INTO movie_genres (movie_id, genres) VALUES
((SELECT id FROM movie WHERE title = 'Tangled'), 'Animation'),
((SELECT id FROM movie WHERE title = 'Tangled'), 'Musical');
