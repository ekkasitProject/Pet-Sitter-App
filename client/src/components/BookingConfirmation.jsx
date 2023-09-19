import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const BookingConfirmation = (props) => {
  const location = useLocation();
  const { bookingDetails } = location.state;
  const startTime = new Date(`2023-09-15 ${bookingDetails.startTime}`);
  const endTime = new Date(`2023-09-15 ${bookingDetails.endTime}`);
  const durationInMinutes = (endTime - startTime) / (1000 * 60 * 60);
  // Create state variables for selected pets and total price
  const [selectedPets, setSelectedPets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalAmount = (selectedPets, durationInMinutes) => {
    const basePricePerHour = 600;
    const additionalPricePerPet = 300;
    const numberOfPets = selectedPets.length;
    const baseTotalPrice = basePricePerHour * durationInMinutes;
    const additionalPriceForPets = additionalPricePerPet * (numberOfPets - 1);
    const totalPrice = baseTotalPrice + additionalPriceForPets;
    return totalPrice;
  };

  const totalAmount = calculateTotalAmount(selectedPets, durationInMinutes);

  // Update the total price whenever selectedPets or durationInMinutes changes
  useEffect(() => {
    const newTotalPrice = calculateTotalAmount(selectedPets, durationInMinutes);
    setTotalPrice(newTotalPrice);
  }, [selectedPets, durationInMinutes]);

  return (
    <div>
      <h2 className="text-2xl font-medium px-8 pt-4">Booking Detail</h2>
      <hr className="mt-4" />
      <div className="px-8 pt-4 mt-4">
        <h3 className="text-[#7B7E8F] tracking-wide">Pet Sitter:</h3>
        <p className="tracking-wide text-[#3A3B46]">
          {bookingDetails.petSitterName}
        </p>
      </div>
      <div className="px-8 pt-4 mt-4">
        <h3 className="text-[#7B7E8F] tracking-wide">Date & Time:</h3>
        <p className="tracking-wide text-[#3A3B46]">
          {bookingDetails.selectedBookingDate} | {bookingDetails.startTime} -
          {bookingDetails.endTime}
        </p>
      </div>

      <div className="px-8 pt-4 mt-4">
        <h3 className="text-[#7B7E8F] tracking-wide">Duration:</h3>
        <p className="tracking-wide text-[#3A3B46]">
          {durationInMinutes} Hours
        </p>
      </div>

      <div className="px-8 pt-4 mt-4">
        <h3 className="text-[#7B7E8F] tracking-wide">Pet:</h3>
        <ul className="tracking-wide text-[#3A3B46]">
          {selectedPets.map((pet) => (
            <li key={pet.pet_id}>{pet.petname}</li>
          ))}
        </ul>
      </div>

      <div className="py-8 pt-4 flex mt-12 justify-between bg-black">
        <p className="mx-8 text-white">Total</p>
        <p className="mx-8 text-white">{totalPrice} THB</p>
      </div>

      <button
        // onClick={handleBooking}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingConfirmation;
