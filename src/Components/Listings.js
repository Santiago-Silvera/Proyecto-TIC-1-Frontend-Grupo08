import { useState, useEffect } from "react";
import axiosInstance from "../Utils/AxiosConfig";
import "../styles/Listings.css";
import { Link } from "react-router-dom";

const Listings = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Load Movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get(
          `api/v1/movies?page=${page}&size=5`
        );
        setMovies(response.data.content); // Set the movies variable
        setTotalPages(response.data.totalPages); // Total amount of pages
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [page]);

  // Functions to allow scrolling between pages
  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      {/* Showing Movies*/}
      <h1>Movies</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <Link to={`/reserva?movie=${movie.movieId}`}>
            <div key={movie.movieId} className="movie-card">
              <img src={`data:image/jpeg;base64,${movie.image}`} alt="foto" />
                <h3>{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <div>
        {/* Buttons to scroll pages*/}
        <button className="buttons" onClick={handlePrevPage} disabled={page === 0}>
          Previous
        </button>
        <button className="buttons" onClick={handleNextPage} disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Listings;
