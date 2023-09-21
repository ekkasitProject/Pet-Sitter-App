// BookingContainer.jsx
import React, { useState } from "react";
import PetBookingCard from "./PetBookingCard";
import BookingConfirmation from "./BookingConfirmation";

function BookingContainer() {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Function to update selectedDateTime and selectedTime
  const handleDateTimeChange = (dateTime) => {
    setSelectedDateTime(dateTime);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  return (
    <div>
      {/* Pass state and update functions as props to PetBookingCard */}
      <PetBookingCard
        selectedDateTime={selectedDateTime}
        selectedTime={selectedTime}
        onDateTimeChange={handleDateTimeChange}
        onTimeChange={handleTimeChange}
      />

      {/* Pass state to BookingConfirmation */}
      <BookingConfirmation
        selectedDateTime={selectedDateTime}
        selectedTime={selectedTime}
      />
    </div>
  );
}

export default BookingContainer;
