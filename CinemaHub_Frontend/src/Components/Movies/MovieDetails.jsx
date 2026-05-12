import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import MovieDetailsHeader from "./MovieDetailsHeader";
import MovieDetailsCast from "./MovieDetailsCast";
import MovieDetailsBooking from "./MovieDetailsBooking";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:18080/api/movies/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovieData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
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

  if (isLoading) {
    return <div className="text-center p-10 min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-10 min-h-screen text-red-500">Error: {error}</div>;
  }

  if (!movieData) {
    return <div className="text-center p-10 min-h-screen">Movie not found</div>;
  }

  return (
    <div className="space-y-10 pb-16">
      <MovieDetailsHeader movieData={movieData} />

      <MovieDetailsBooking movieData={movieData} />
    </div>
  );
};

export default MovieDetails;
