import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../Utils/AxiosConfig";
import "../styles/Seats.css";


const Seat = () => {
  const [searchParams] = useSearchParams();
  const screeningId = searchParams.get("screeningId");
  const roomId = searchParams.get("roomId"); // Ensure roomId is retrieved here

  const [seatCount, setSeatCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [takenSeats, setTakenSeatas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (screeningId) {
      // Gets seats and already occupied seats
      const fetchSeatCount = async () => {
        try {
          const response = await axiosInstance.get(
              `/api/v1/screenings/seatCount?screeningId=${screeningId}`
          );
          console.log(response);
          setSeatCount(response.data);

          const res = await axiosInstance.get(
              `/api/v1/screenings/seats?screeningId=${screeningId}`
          );
          console.log("Taken seats: " + res);
          setTakenSeatas(res.data);
        } catch (err) {
          console.error("Error during fetch" + err);
        }
      };
      fetchSeatCount();
    }
  }, [screeningId]);

  // Seat selection logic
  const handleSeatClick = (seatId) => {
    if (takenSeats.includes(seatId)) {
      return;
    }
    setSelectedSeats(
        (prevSelected) =>
            prevSelected.includes(seatId)
                ? prevSelected.filter((id) => id !== seatId) // Deselect seat
                : [...prevSelected, seatId] // Select seat
    );
  };


  const handleReserva = async () => {
    // Only can reserve one seat or more
    if (selectedSeats.length === 0) {
      alert("No seats selected!");
      return;
    }

    // Reaches to end point and if successful redirects to homepage
    try {
      const response = await axiosInstance.post(
          `/api/v1/screenings/reserve?screeningId=${screeningId}&seatNumbers=${selectedSeats}`
      );

      if (response.status === 200) {
        alert("Seats booked successfully!");
        setSelectedSeats([]);
        navigate("/");

      } else {
        alert("Failed to book seats. Please try again.");
      }
    } catch (error) {
      console.error("Error booking seats", error);
      alert("An erroroccured while booking seats");
    }
  };

  return (
      <div>
        <h2>Selecciona tus asientos</h2>
        <div className="seats-container">
          <div className="seats-grid">
            {Array.from({ length: seatCount }, (_, index) => {
              const seatId = 150 * roomId + (index + 1); // Calculate seatId
              const isTaken = takenSeats.includes(seatId); // Check if seat is taken
              return (
                  <div
                      key={index}
                      className={`seat ${
                          selectedSeats.includes(seatId) ? "selected" : ""
                      } ${isTaken ? "taken" : ""}`}
                      onClick={() => handleSeatClick(seatId)} // Pass seatId here
                  >
                    {index + 1}
                  </div>
              );
            })}
          </div>
        </div>
        <button className="seat-button" onClick={handleReserva}>
          Reserve
        </button>
      </div>
  );
};

export default Seat;