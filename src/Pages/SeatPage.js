import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../Utils/AxiosConfig";
import "../styles/Seats.css";

const Seat = () => {
  const [searchParams] = useSearchParams();
  const screeningId = searchParams.get("screeningId");

  const [seatCount, setSeatCount] = useState(0); // State for the total number of seats
  const [selectedSeats, setSelectedSeats] = useState([]); // State for selected seats

  useEffect(() => {
    if (screeningId) {
      const fetchSeatCount = async () => {
        try {
          const response = await axiosInstance.get(
            `/api/v1/screenings/seatCount?screeningId=${screeningId}`
          );
          console.log(response);
          setSeatCount(response.data);
        } catch (err) {
          console.error("Error during fetch" + err);
        }
      };
      fetchSeatCount();
    }
  }, [screeningId]);

  // Function to toggle seat selection
  const handleSeatClick = (seatIndex) => {
    setSelectedSeats(
      (prevSelected) =>
        prevSelected.includes(seatIndex)
          ? prevSelected.filter((index) => index !== seatIndex) // Deselect seat
          : [...prevSelected, seatIndex] // Select seat
    );
  };

  return (
    <div>
      <h2>Screening {screeningId}</h2>
      <div className="seats-container">
        <div className="seats-grid">
          {Array.from({ length: seatCount }, (_, index) => (
            <div
              key={index}
              className={`seat ${
                selectedSeats.includes(index) ? "selected" : ""
              }`}
              onClick={() => handleSeatClick(index)}
            >
              {index + 1} {/* Display seat number (index + 1) */}
            </div>
          ))}
        </div>
      </div>

      <p>
        Selected seats: {selectedSeats.map((index) => index + 1).join(", ")}
      </p>
    </div>
  );
};

export default Seat;
