import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import MovieDetailsHeader from "./MovieDetailsHeader";
import MovieDetailsCast from "./MovieDetailsCast";
import MovieDetailsBooking from "./MovieDetailsBooking";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { token } = useAuth();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
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
  }, [id, token]);

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
