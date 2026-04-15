import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import MovieDetailsHeader from "./MovieDetailsHeader";
import MovieDetailsCast from "./MovieDetailsCast";
import MovieDetailsBooking from "./MovieDetailsBooking";
import moviesData from "../../data/moviesData";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const selectedMovie =
      moviesData.find((movie) => movie.id === Number(id)) || moviesData[0];
    setMovieData(selectedMovie);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (location.hash === "#booking" && !isLoading && movieData) {
      setTimeout(() => {
        const bookingSection = document.getElementById("booking");
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, [location.hash, isLoading, movieData]);

  if (isLoading || !movieData) {
    return <div className="text-center p-10 min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-10 pb-16">
      <MovieDetailsHeader movieData={movieData} />

      <MovieDetailsBooking movieData={movieData} />
    </div>
  );
};

export default MovieDetails;
