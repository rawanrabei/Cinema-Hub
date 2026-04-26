import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaClock } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";

const API_BASE_URL = "http://localhost:8080";

const NowShowing = () => {
  const { isDarkMode, colors } = useTheme();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/movies`, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Transform API data to match frontend structure
          const transformedMovies = data.slice(0, 4).map((movie) => ({
            id: movie.id,
            title: movie.title,
            genre: movie.genres ? movie.genres.join(", ") : "Action",
            duration: `${movie.duration} min`,
            rating: movie.rating || 8.5,
            image: movie.posterUrl || "/moveis/m4.jpg",
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

  return (
    <section
      className={`relative py-20 overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800"
          : "bg-gradient-to-br from-white via-[#fff5f5] to-[#ffe0e0]"
      }`}
    >
      <div
        className="absolute -left-20 top-10 w-72 h-72 blur-3xl rounded-full pointer-events-none transition-colors duration-300"
        style={{ backgroundColor: `${colors.primary}10` }}
      />
      <div
        className="absolute -right-32 bottom-0 w-80 h-80 blur-3xl rounded-full pointer-events-none transition-colors duration-300"
        style={{ backgroundColor: `${colors.primary}05` }}
      />

      <div className="relative container mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p
              className={`text-xs font-extrabold uppercase tracking-[0.4em] ${
                isDarkMode ? "text-gray-300" : "text-gray-900"
              }`}
            >
              Now Showing
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: colors.primary }}
            >
              Book your tickets for these blockbusters
            </h2>
            <p
              className={`max-w-2xl ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Discover curated picks playing this week – premium seats,
              immersive sound, and unforgettable stories.
            </p>
          </div>
          <button
            onClick={() => {
              navigate("/movies");

              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border font-semibold shadow-md transition-all duration-300 ${
              isDarkMode
                ? "border-gray-700 text-white bg-gray-800 hover:border-gray-600"
                : "border-gray-300 text-gray-800 bg-white"
            }`}
            style={{
              borderColor: "currentColor",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.primary;
              e.currentTarget.style.color = colors.primary;
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isDarkMode
                ? "#374151"
                : "#d1d5db";
              e.currentTarget.style.color = isDarkMode ? "#ffffff" : "#1f2937";
              e.currentTarget.style.backgroundColor = isDarkMode
                ? "#1f2937"
                : "#ffffff";
            }}
          >
            View All
            <span className="text-lg">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movies/${movie.id}`)}
              className={`group relative flex flex-col h-full backdrop-blur rounded-[28px] border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer ${
                isDarkMode
                  ? "bg-[#111111] border-white/10"
                  : "bg-white/90 border-white"
              }`}
            >
              <div className="relative overflow-hidden h-96 ">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold shadow-lg ${
                    isDarkMode
                      ? "bg-black/80 text-white"
                      : "bg-black/80 text-white"
                  }`}
                >
                  <FaStar
                    style={{ color: isDarkMode ? colors.primary : "#FFBF00" }}
                  />
                  <span>{movie.rating}</span>
                </div>
              </div>
              <div className="flex-1 p-6 space-y-4">
                <div>
                  <h3
                    className={`text-xl font-semibold transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                    style={{
                      color: "currentColor",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                    }}
                  >
                    {movie.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {movie.genre &&
                      typeof movie.genre === "string" &&
                      movie.genre.split(",").map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-800 text-gray-300"
                              : "bg-gray-100 text-gray-600"
                          }`}
                          style={{
                            backgroundColor:
                              "currentColor" === colors.primary
                                ? `${colors.primary}10`
                                : undefined,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `${colors.primary}10`;
                            e.currentTarget.style.color = colors.primary;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isDarkMode
                              ? "#1f2937"
                              : "#f3f4f6";
                            e.currentTarget.style.color = isDarkMode
                              ? "#d1d5db"
                              : "#4b5563";
                          }}
                        >
                          {tag.trim()}
                        </span>
                      ))}
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <FaClock style={{ color: colors.primary }} />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/login`}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex-1 text-center px-4 py-2.5 rounded-lg border font-semibold transition-colors duration-300 text-sm"
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
                      e.stopPropagation();

                      navigate(`/login`);
                    }}
                    className="flex-1 py-2.5 rounded-lg font-semibold text-white transition-all duration-300 border-2 border-transparent shadow text-center text-sm"
                    style={{
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = colors.primary;
                      e.currentTarget.style.borderColor = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary;
                      e.currentTarget.style.color = "white";
                    }}
                  >
                    Book Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NowShowing;
