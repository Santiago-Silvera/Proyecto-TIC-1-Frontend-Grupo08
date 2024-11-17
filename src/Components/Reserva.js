import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/Reservations.css";
import axiosInstance from "../Utils/AxiosConfig";
import Cookies from "js-cookie";
import moment from "moment";

const Reserva = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  // const [movies, setMovies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dates, setDates] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [noScreeningsExists, setNoScreeningsExists] = useState(false);

  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      navigate("/login"); // Reemplaza "/login" con la ruta de tu página de inicio de sesión
    }
  }, [navigate]);

  const selectedMovie = searchParams.get("movie");

  useEffect(() => {
    // Load the locations
    const fetchScreenings = async () => {
      try {
        console.log("Fetching theaters for movie:" + selectedMovie);
        const response = await axiosInstance.get(
          `/api/v1/movies/theaters?movieId=${selectedMovie}`
        );
        setLoading(false);
        console.log(response);
        if (response.data.length === 0) {
          setNoScreeningsExists(true);
        }
        const uniqueLocations = response.data.reduce((acc, ele) => {
          if (!acc.some((loc) => loc.id === ele.theaterId)) {
            acc.push({ id: ele.theaterId, name: ele.theaterZone });
          }
          return acc;
        }, []);
        setLocations(uniqueLocations);
        console.log(locations);
      } catch (err) {
        console.error(err);
        setError("Error getting theater for the movie");
      }
    };
    fetchScreenings();
  }, [selectedMovie]);

  useEffect(() => {
    // Reset what's needed, only get data if possible
    if (selectedLocationId === "") {
      setDates([])
      setRooms([])
      setSelectedRoomId(null)
      setSelectedDate("");
    }
    if (
      selectedLocationId !== null &&
      selectedLocationId !== "" &&
      selectedLocationId !== " "
    ) {
      setDates([])
      setRooms([])
      setSelectedRoomId(null)
      setSelectedDate("");

      const fetchDates = async () => {
        try {
          console.log(
            "Fetching for times with movieId: " +
              selectedMovie +
              " and theaterId: " +
              selectedLocationId
          );
          const response = await axiosInstance.get(
            `/api/v1/movies/times?movieId=${selectedMovie}&theaterId=${selectedLocationId}`
          );
          console.log(response.data);
          setDates(response.data);
        } catch (err) {
          console.error(err);
          setError("Error getting the available times");
        }
      };
      fetchDates();
    }
  }, [selectedLocationId]);

  // Same as getting dates from location, but seats from date and location
  useEffect(() => {
    if (
        selectedLocationId !== null &&
        selectedLocationId !== "" &&
        selectedLocationId !== " " &&
        selectedDate !== ""
    ) {
      setRooms([])
      setSelectedRoomId(null)
      const fetchRooms = async () => {
        try {
          console.log("Fetching rooms");
          const formattedDate = moment(selectedDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          const response = await axiosInstance.get(
            `/api/v1/movies/rooms?movieId=${selectedMovie}&theaterId=${selectedLocationId}&startTime=${formattedDate}`
          );
          console.log(response.data);
          const rooms = response.data.map((roomDTO) => roomDTO.roomId);
          setRooms(rooms);
        } catch (err) {
          console.error(err);
          setError("Error getting the room");
        }
      };

      fetchRooms();
    }
  }, [selectedDate]);

  // Keeps all tada and moves to the seats reserving webpage
  const handleReserve = async () => {
    try {
      console.log("Finding screening");
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD HH:mm:ss");
      const response = await axiosInstance.get(
        `/api/v1/movies/screenings?movieId=${selectedMovie}&roomId=${selectedRoomId}&startTime=${formattedDate}`
      );
      console.log(response.data);
      const screeningId = response.data;
      navigate(`/seats?screeningId=${screeningId}&roomId=${selectedRoomId}`);
    } catch (err) {
      console.error(err);
      setError("Error finding the screening");
    }
  };

  // Stops you from doing something if it is loading or there's and error
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (noScreeningsExists)
    // Exception in case there are no screenings
    return (
      <div className="error">
        "Lo sentimos, pero no existen proyecciones de esta pelicula"
      </div>
    );

  return (
    <div className="reserva-container">
      <h2 className="reserva-title">Make your movie reservation</h2>
      {/* Select the cinema*/}
      <div className="reserva-field">
        <label>Select the location:</label>
        <select
          value={selectedLocationId}
          onChange={(e) => {
            const selectedId = e.target.value;
            setSelectedLocationId(selectedId);
          }}
        >
          <option value="">Select the location</option>
          {locations
              .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
              .map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
              ))}
        </select>
      </div>

      {/* Selection of date*/}
      <div>
        {dates.length > 0 && (
          <div className="reserva-field">
            <label>Select the date:</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">Select the date</option>
              {dates
                  .sort((a, b) => moment(a).isBefore(moment(b)) ? -1 : 1) // Se ordenan las fechas
                  .map((date) => (
                      <option key={date} value={date}>
                        {moment(date).format("DD-MM HH:mm")}
                      </option>
                  ))}
            </select>
          </div>
        )}
      </div>

      {/* Selection of room*/}
      <div>
        {rooms.length > 0 && (
          <div className="reserva-field">
            <label>Select the room:</label>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
            >
              <option value="">Select the room</option>
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {"Sala " + room}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Confirm reservation */}
      <button className="reserva-button" onClick={handleReserve}>
        Continue
      </button>
    </div>
  );
};

export default Reserva;
