import React, { useMemo, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaStar, FaClock, FaFilm } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = "http://localhost:8080";

const Movies = () => {
  const { isDarkMode, colors } = useTheme();
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/movies/approved`, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Transform API data to match frontend structure
          const transformedMovies = data.map((movie) => ({
            id: movie.id,
            title: movie.title,
            description: movie.description,
            duration: `${movie.duration} min`,
            rating: movie.rating ? movie.rating.toString() : "4.5",
            tagline: movie.description?.substring(0, 100) + "...",
            genres: movie.genres || ["Action", "Drama"],
            thumbnail: movie.posterUrl || "/cinemas/c.jpg",
          }));
          setMovies(transformedMovies);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [token]);

  const categories = useMemo(() => {
    const unique = new Set();
    movies.forEach((movie) =>
      movie.genres.forEach((genre) => unique.add(genre))
    );
    return ["All Movies", ...Array.from(unique)];
  }, [movies]);

  const [activeCategory, setActiveCategory] = useState("All Movies");
  const [moviesToShow, setMoviesToShow] = useState(6);

  const filteredMovies =
    activeCategory === "All Movies"
      ? movies
      : movies.filter((movie) => movie.genres.includes(activeCategory));

  const displayedMovies = filteredMovies.slice(0, moviesToShow);
  const hasMoreMovies = filteredMovies.length > moviesToShow;

  const handleLoadMore = () => {
    setMoviesToShow((prev) => prev + 6);
  };

  useEffect(() => {
    setMoviesToShow(6);
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pb-20 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-black via-[#0f0f0f] to-[#1a1a1a] text-white"
          : "bg-gradient-to-b from-white via-gray-50 to-white text-gray-900"
      }`}
    >
      {/* Hero */}
      <section
        className={`relative overflow-hidden rounded-b-[40px] shadow-2xl border-b transition-colors duration-300 ${
          isDarkMode ? "border-white/10" : "border-gray-200"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-b transition-colors duration-300 ${
            isDarkMode
              ? "from-black via-[#1c1c1c]/90 to-transparent"
              : "from-white via-white/90 to-transparent"
          }`}
        />
        <img
          src="/cinemas/c.jpg"
          alt="Cinema"
          className={`w-full h-72 object-cover transition-opacity duration-300 opacity-60 `}
        />
        <div className="relative container mx-auto px-4 md:px-10 py-12 space-y-3">
          <div
            className="flex items-center gap-3 text-lg font-semibold"
            style={{ color: colors.primary }}
          >
            <FaFilm />
            Now Showing
          </div>
          <h1
            className={`text-3xl md:text-4xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Discover this week's blockbusters
          </h1>
          <p
            className={`max-w-3xl ${
              isDarkMode ? "text-gray-200" : "text-gray-600"
            }`}
          >
            Choose from the latest releases and timeless classics. Book your
            perfect showtime, favorite seats, and premium cinema experience
            today.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="container mx-auto px-4 md:px-10 mt-10">
        <div
          className={`flex flex-wrap gap-3 rounded-2xl p-4 shadow-inner border transition-colors duration-300 ${
            isDarkMode
              ? "bg-[#161616] border-white/5"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition tracking-wide ${
                  isActive
                    ? "text-white shadow-lg"
                    : isDarkMode
                    ? "bg-transparent text-gray-300 hover:text-white"
                    : "bg-transparent text-gray-600 hover:text-gray-900"
                }`}
                style={isActive ? { backgroundColor: colors.primary } : {}}
              >
                {category}
              </button>
            );
          })}
        </div>
        <p
          className={`text-sm mt-4 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Showing {filteredMovies.length}{" "}
          {filteredMovies.length === 1 ? "movie" : "movies"}
        </p>
      </section>

      <section className="container mx-auto px-4 md:px-10 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedMovies.map((movie) => (
            <article
              key={movie.id}
              className={`rounded-3xl border shadow-lg overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${
                isDarkMode
                  ? "bg-[#111111] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="relative h-[30rem] overflow-hidden">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                />
                <div
                  className={`absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                    isDarkMode
                      ? "bg-black/80 text-white"
                      : "bg-black/80 text-white"
                  }`}
                >
                  <FaStar style={{ color: colors.primary }} />
                  {movie.rating}
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <h3
                    className={`text-2xl font-semibold mb-1 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {movie.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres &&
                      Array.isArray(movie.genres) &&
                      movie.genres.map((genre) => (
                        <span
                          key={genre}
                          className={`px-3 py-1 text-xs rounded-full border transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-white/5 text-gray-200 border-white/10"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                          }`}
                        >
                          {genre}
                        </span>
                      ))}
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <FaClock style={{ color: colors.primary }} />
                  {movie.duration}
                </div>
                <p
                  className={`text-sm flex-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {movie.tagline}
                </p>
                <div className="flex gap-3">
                  <Link
                    to={token ? `/movies/${movie.id}` : `/login`}
                    state={token ? {} : { from: { pathname: `/movies/${movie.id}` } }}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex-1 text-center px-4 py-2.5 rounded-full border font-semibold transition-colors duration-300"
                    style={{
                      borderColor: colors.primary,
                      color: colors.primary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary;
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = colors.primary;
                    }}
                  >
                    View Details
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (token) {
                        navigate(`/movies/${movie.id}`);
                      } else {
                        navigate("/login", { state: { from: { pathname: `/movies/${movie.id}` } } });
                      }
                    }}
                    className="flex-1 text-center px-4 py-2.5 rounded-full font-semibold text-white transition-all duration-300"
                    style={{
                      backgroundColor: colors.primary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = colors.primary;
                      e.currentTarget.style.border = `2px solid ${colors.primary}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary;
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.border = "none";
                    }}
                  >
                    Book Ticket
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        
        {hasMoreMovies && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className={`px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                isDarkMode
                  ? "bg-[#111111] border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              More Movies
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Movies;
