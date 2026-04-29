import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaClock, FaFilm, FaGlobe } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const MovieDetailsHeader = ({ movieData }) => {
  const { isDarkMode } = useTheme();
  
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url(${movieData.posterUrl || "/placeholder-bg.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
  };

  const bgColor = isDarkMode ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-gray-100 to-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const subTextColor = isDarkMode ? "text-gray-300" : "text-gray-600";
  const cardBg = isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-md";
  const cardText = isDarkMode ? "text-white/60" : "text-gray-500";
  const cardValue = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section
        style={backgroundStyle}
        className="relative w-full min-h-[500px] md:min-h-[600px] flex items-end pb-8 md:pb-12"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-end">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={movieData.posterUrl || "/placeholder-poster.jpg"}
                alt={movieData.title}
                className="w-40 md:w-56 lg:w-72 h-56 md:h-80 lg:h-96 object-cover rounded-xl shadow-2xl border-4 border-white/20"
              />
            </div>
            
            {/* Movie Info */}
            <div className="flex-1 text-white mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                {movieData.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 text-amber-400 text-xl md:text-2xl">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    if (ratingValue - 0.5 === movieData.rating) {
                      return <FaStarHalfAlt key={index} className="w-5 h-5 md:w-6 md:h-6" />;
                    }
                    if (ratingValue <= movieData.rating) {
                      return <FaStar key={index} className="w-5 h-5 md:w-6 md:h-6" />;
                    }
                    return (
                      <FaRegStar
                        key={index}
                        className="w-5 h-5 md:w-6 md:h-6 text-white/40"
                      />
                    );
                  })}
                </div>
                <span className="text-lg md:text-xl font-semibold">{movieData.rating}</span>
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movieData.genres && Array.isArray(movieData.genres) && movieData.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base text-white/80">
                <div className="flex items-center gap-2">
                  <FaClock className="text-white/60" />
                  <span>{movieData.duration} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaFilm className="text-white/60" />
                  <span>{movieData.director}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-white/60" />
                  <span>{movieData.language}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Description Section */}
      <section className={`${bgColor} py-8 md:py-12 px-4 md:px-8 transition-colors duration-300`}>
        <div className="container mx-auto max-w-4xl">
          <h2 className={`text-2xl md:text-3xl font-bold ${textColor} mb-4`}>About the Movie</h2>
          <p className={`${subTextColor} text-base md:text-lg leading-relaxed mb-6`}>
            {movieData.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`${cardBg} rounded-lg p-4 border transition-colors duration-300`}>
              <p className={`text-sm ${cardText} mb-1`}>Director</p>
              <p className={`font-semibold ${cardValue}`}>{movieData.director}</p>
            </div>
            <div className={`${cardBg} rounded-lg p-4 border transition-colors duration-300`}>
              <p className={`text-sm ${cardText} mb-1`}>Language</p>
              <p className={`font-semibold ${cardValue}`}>{movieData.language}</p>
            </div>
            <div className={`${cardBg} rounded-lg p-4 border transition-colors duration-300`}>
              <p className={`text-sm ${cardText} mb-1`}>Duration</p>
              <p className={`font-semibold ${cardValue}`}>{movieData.duration} min</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetailsHeader;
