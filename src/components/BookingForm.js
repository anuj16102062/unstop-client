import React, { useState } from "react";

const BookingForm = ({ fetchRooms }) => {
  const [roomsToBook, setRoomsToBook] = useState(1);

  const handleBooking = async () => {
    const response = await fetch("https://unstop-backend-2.onrender.com/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rooms: roomsToBook }),
    });
    const data = await response.json();
    alert(data.message || "Booking successful!");
    fetchRooms();
  };

  const handleReset = async () => {
    await fetch("https://unstop-backend-2.onrender.com/api/reset", { method: "POST" });
    alert("All bookings have been reset.");
    fetchRooms();
  };

  const handleGenerateRandom = async () => {
    await fetch("https://unstop-backend-2.onrender.com/api/generate-random-occupancy", { method: "POST" });
    alert("Random occupancy generated.");
    fetchRooms();
  };

  return (
    <div className="booking-form">
      <label>
        Number of Rooms:
        <input
          type="number"
          value={roomsToBook}
          onChange={(e) => setRoomsToBook(Math.min(5, Math.max(1, e.target.value)))}
          min="1"
          max="5"
        />
      </label>
      <button onClick={handleBooking}>Book Rooms</button>
      <button onClick={handleReset}>Reset Bookings</button>
      <button onClick={handleGenerateRandom}>Generate Random Occupancy</button>
    </div>
  );
};

export default BookingForm;
