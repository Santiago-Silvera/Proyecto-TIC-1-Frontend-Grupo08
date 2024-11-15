// src/components/MovieList.js
import React, { useState, useEffect } from "react";
import "../styles/MovieList.css"; // Import the CSS file
import axiosInstance from "../Utils/AxiosConfig";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setMovieIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("");
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Fetching movies to backend");
        const response = await axiosInstance.get(
          "/api/v1/movies?page=0&size=5"
        );
        console.log(response.data);
        if (response.data.content.length === 0) {
          setError("No movies found.");
          setLoading(false);
        } else {
          setMovies(response.data.content);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load movies.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSlideDirection("");
      setAnimating(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [slideDirection]);

  const handleNext = () => {
    setAnimating(true);
    setSlideDirection("next");
    setMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handlePrevious = () => {
    setAnimating(true);
    setSlideDirection("prev");
    setMovieIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const currentMovie = movies[currentMovieIndex];
  const prevIndex =
    slideDirection === "next"
      ? (currentMovieIndex - 1 + movies.length) % movies.length
      : (currentMovieIndex + 1) % movies.length;
  const prevMovie = movies[prevIndex];

  return (
    <div className="movie-container">
      <div className="movie-wrapper">
        <div
          className={`movie-list-item ${
            slideDirection ? `slide-out-${slideDirection}` : ""
          }`}
        >
          <div className="movie-title">
            {animating ? prevMovie.title : currentMovie.title}
          </div>
          {/*
          <div className="movie-info">
            {animating ? prevMovie.description : currentMovie.description}
          </div>
          */}
          {currentMovie.image && (
            <img
              src={`data:image/jpeg;base64,${
                animating ? prevMovie.image : currentMovie.image
              }`}
              alt={currentMovie.title}
            />
          )}
        </div>

        {slideDirection && (
          <div className={`movie-list-item slide-in-${slideDirection}`}>
            <div className="movie-title">{currentMovie.title}</div>
            {/*<div className="movie-info">{currentMovie.description}</div>*/}
            {currentMovie.image && (
              <img
                src={`data:image/jpeg;base64,${currentMovie.image}`}
                alt={currentMovie.title}
              />
            )}
          </div>
        )}
      </div>

      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={animating}>
          Previous
        </button>
        <button onClick={handleNext} disabled={animating}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
