import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/Reservations.css";
import axiosInstance from "../Utils/AxiosConfig";
import Cookies from "js-cookie";
import moment from "moment";
// Que falta
// Al seleccionar las peliculas, se reinicia cine y lo demas (Se actualiza selected Movie, se ven  los cines para esa peli y reinicia lo demas )
// Al seleccionar el cine, se reinicia horas fechas y asientos
// Selecciona fecha, reinicia horas y asientos
// Selecciona hora, reinicia asiento seleccionado

const Reserva = () => {
  // Opciones que el usuario puede seleccionar
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

  // Verificar si el usuario está logueado
  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      navigate("/login"); // Reemplaza "/login" con la ruta de tu página de inicio de sesión
    }
  }, [navigate]);

  const selectedMovie = searchParams.get("movie");

  // Una vez se selecciona la pelicula, se elige el cine, cuando pasa se reinician los valores de horas y dias
  // Siempre hay una pelicula seleccionada una vez se elige una
  useEffect(() => {
    // Se reinicia lo que viene despues
    setSelectedDate("");
    const fetchScreenings = async () => {
      try {
        console.log("Fetching theaters for movie:" + selectedMovie);
        const response = await axiosInstance.get(
          `/api/v1/movies/theaters?movieId=${selectedMovie}`
        );
        setLoading(false);
        console.log(response);
        console.log(response.data);
        console.log(response.data.length);
        if (response.data.length === 0) {
          setNoScreeningsExists(true);
        }
        // Ver localidades de las peliculas
        const uniqueLocations = response.data.reduce((acc, ele) => {
          if (!acc.some((loc) => loc.id === ele.theaterId)) {
            acc.push({ id: ele.theaterId, name: ele.theaterZone });
          }
          return acc;
        }, []);
        setLocations(uniqueLocations);
        console.log(locations)
      } catch (err) {
        console.error(err);
        setError("Error getting theater for the movie");
      }
    };
    fetchScreenings();
  }, [selectedMovie]);

  useEffect(() => {
    if (selectedLocationId !== null && selectedLocationId !== " ") {
      // Reset dependent states
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

  useEffect(() => {
    if (selectedDate !== "") {
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

  // Encontrar el screening dado los datos y seguir a seleccion de asientos
  const handleReserve = async () => {
    try {
      console.log("Finding screening");
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD HH:mm:ss");
      const response = await axiosInstance.get(
        `/api/v1/movies/screenings?movieId=${selectedMovie}&roomId=${selectedRoomId}&startTime=${formattedDate}`
      );
      console.log(response.data);
      const screeningId = response.data;
      navigate(`/seats?screeningId=${screeningId}`);
    } catch (err) {
      console.error(err);
      setError("Error finding the screening");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (noScreeningsExists) return <div className="error">"Lo sentimos, pero no existen proyecciones de esta pelicual"</div>

  return (
    <div className="reserva-container">
      <h2 className="reserva-title">Realiza la reserva de tu pelicula</h2>
      {/* Selección de Lugar (cine) ajustar a que a travez del lugar se seleccione el objeto, como arriba*/}
      <div className="reserva-field">
        <label>Selecciona el cine:</label>
        <select
          value={selectedLocationId}
          onChange={(e) => {
            const selectedId = e.target.value;
            setSelectedLocationId(selectedId);
          }}
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        {dates.length > 0 && (
          <div className="reserva-field">
            <label>Selecciona la fecha:</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">Seleccione una fecha</option>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {moment(date).format("DD-MM HH:mm")}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        {rooms.length > 0 && (
          <div className="reserva-field">
            <label>Selecciona la sala:</label>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
            >
              <option value="">Seleccione la sala</option>
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {"Sala " + room}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Botón de Confirmar Reserva */}
      <button className="reserva-button" onClick={handleReserve}>
        Siguiente
      </button>
    </div>
  );
};

export default Reserva;
