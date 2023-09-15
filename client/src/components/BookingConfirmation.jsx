import React, { useState } from "react";
import dayjs from "dayjs";

const BookingConfirmation = (props) => {
  // Initialize state values
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedPets, setSelectedPets] = useState(0);

  // Calculate the total cost based on the number of selected pets
  const totalCost = selectedPets * 200; // Assuming 200THB per pet

  // Function to handle booking submission
  const handleBooking = () => {
    // You can handle the booking submission here.
    // You can send the selectedDate, startTime, endTime, and selectedPets to your server or perform any other necessary actions.
    console.log("Booking Submitted:", {
      selectedDate,
      startTime,
      endTime,
      selectedPets,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-medium px-8 pt-4">Booking Detail</h2>
      <hr className="mt-4" />
      <div className="px-8 pt-4 mt-4">
        <h3 className="text-[#7B7E8F] tracking-wide">Pet Sitter:</h3>
        <p className="tracking-wide text-[#3A3B46]">{props.petSitterName}</p>
      </div>
      <div className="px-8 pt-4 mt-4">
        <h3 className="text-[#7B7E8F] tracking-wide">Date & Time:</h3>
        <p className="tracking-wide text-[#3A3B46]">
          {selectedDate} | {startTime} - {endTime}
        </p>
      </div>

      <div className="px-8 pt-4 mt-4">
        <h3 className="text-[#7B7E8F] tracking-wide">Duration:</h3>
        <p className="tracking-wide text-[#3A3B46]">
          {startTime} - {endTime}
        </p>
      </div>

      <div className="px-8 pt-4 mt-4">
        <h3 className="text-[#7B7E8F] tracking-wide">Pet:</h3>
        <ul className="tracking-wide text-[#3A3B46]">
          {/* Display the selected pets here */}
          <li>Selected Pets: {selectedPets}</li>
        </ul>
      </div>

      <div className="py-8 pt-4 flex mt-12 justify-between bg-black">
        <p className="mx-8 text-white">Total</p>
        <p className="mx-8 text-white">{totalCost} THB</p>
      </div>

      <button
        onClick={handleBooking}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingConfirmation;
