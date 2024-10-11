// src/components/MovieList.js
import React, { useState, useEffect } from "react";
import "./MovieList.css"; // Import the CSS file
import axiosInstance from "./AxiosConfig";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/movies");
        const movieData = response.data;
        if (movieData.image) {
          // Convert byte array to base64 string
          const base64Image = btoa(
            String.fromCharCode(...new Uint8Array(movieData.image))
          );
          movieData.image = `data:image/jpeg;base64,${base64Image}`; // Adjust image type if needed
        }

        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load movies.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-header">Movie List</h1>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-list-item">
            <div className="movie-title">{movie.title}</div>
            <div className="movie-info">{movie.description}</div>
            {movie.image && <img src={movie.image} alt={movie.title} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
