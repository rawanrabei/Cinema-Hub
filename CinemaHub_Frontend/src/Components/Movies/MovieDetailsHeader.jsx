import React from "react";
import { Typography, Chip } from "@material-tailwind/react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const MovieDetailsHeader = ({ movieData }) => {
  const backgroundStyle = {
    backgroundImage: `url(${movieData.backgroundImg || "/placeholder-bg.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="relative min-h-screen w-full">
      <section
        style={backgroundStyle}
        className="headerTop relative w-full bg-black h-[40%] md:h-[65%] flex flex-col justify-end"
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-40 flex flex-col align-bottom pb-4 md:pb-28 px-4 md:px-8 lg:ms-96">
          <Typography
            variant="h1"
            color="white"
            className="text-3xl md:text-4xl lg:text-6xl font-extrabold mb-2 md:mb-3"
          >
            {movieData.title}
          </Typography>
          <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8 flex-wrap">
            <div className="flex items-center gap-1 text-amber-400 text-lg md:text-2xl">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                if (ratingValue - 0.5 === movieData.rating) {
                  return <FaStarHalfAlt key={index} className="w-4 h-4 md:w-6 md:h-6" />;
                }
                if (ratingValue <= movieData.rating) {
                  return <FaStar key={index} className="w-4 h-4 md:w-6 md:h-6" />;
                }
                return (
                  <FaRegStar
                    key={index}
                    className="w-4 h-4 md:w-6 md:h-6 text-white opacity-40"
                  />
                );
              })}
            </div>
            {movieData.genres && Array.isArray(movieData.genres) && movieData.genres.map((genre) => (
              <Chip
                key={genre}
                value={genre}
                color="blue-gray"
                className="font-semibold text-xs md:text-sm"
                size="sm"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative z-50 px-4 md:px-8 lg:ms-20 mt-[-60px] md:mt-0">
        <img
          src={movieData.posterImg || "/placeholder-poster.jpg"}
          alt={movieData.title}
          className="w-40 md:w-56 lg:w-64 h-56 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl border-4 absolute md:-translate-y-1/2"
        />
      </section>
      <section className="bg-white py-8 md:py-11 text-gray-800 relative z-30 min-h-[200px] md:h-60 px-4 md:px-8 lg:px-0 lg:ms-96 mt-24 md:mt-0">
        <div className="">
          <div className="flex flex-col">
            <div className="">
              <Typography
                variant="paragraph"
                className="mb-4 md:mb-6 text-sm md:text-lg text-gray-700"
              >
                {movieData.description}
              </Typography>
              <div className="flex flex-col md:flex-row gap-4 md:gap-10 text-sm md:text-base font-medium">
                <p>
                  <strong>Director:</strong>{" "}
                  <span className="font-normal">{movieData.director}</span>
                </p>
                <p>
                  <strong>Language:</strong>{" "}
                  <span className="font-normal">{movieData.language}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetailsHeader;
