import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ToggleContext } from "../pages/AuthenticatedApp";

const BookingConfirmation = (props) => {
  const location = useLocation();
  const { bookingDetails } = location.state;
  const startTime = new Date(`2023-09-15 ${bookingDetails.startTime}`);
  const endTime = new Date(`2023-09-15 ${bookingDetails.endTime}`);
  const durationInMinutes = (endTime - startTime) / (1000 * 60 * 60);
  const { prices, setPrices, selectedPetsName, setSelectedPetsName } =
    useContext(ToggleContext);
  const ratePerPet = 300; // Replace with your actual rate per pet

const calculateTotalPrice = () => {
  let price = durationInMinutes * 300; // Calculate price for the first pet

  if (props.selectedPets.length >= 2) {
    price += (props.selectedPets.length - 1) * ratePerPet; // Add price for the second and subsequent pets
  }

  return price;
};

  // Initialize totalPriceInTHB with the initial calculation
  const [totalPriceInTHB, setTotalPriceInTHB] = useState(calculateTotalPrice());

  useEffect(() => {
    // Update totalPriceInTHB whenever selectedPets change
    setTotalPriceInTHB(calculateTotalPrice());
    setPrices(calculateTotalPrice());
    console.log(prices);
  }, [props.selectedPets]);

  return (
    <div className="w-full mt-6 h-[484px] relative bg-white rounded-xl overflow-hidden">
      <h2 className="text-2xl font-medium px-8 pt-4">Booking Detail</h2>
      <hr className="mt-4" />
      <div className="px-8 pt-4">
        <h3 className="text-[#7B7E8F] tracking-wide">Pet Sitter:</h3>
        <p className="tracking-wide text-[#3A3B46]">
          {bookingDetails.petSitterName}
        </p>
      </div>

      <div className="px-8  mt-4 ">
        <h3 className="text-[#7B7E8F] tracking-wide">Date & Time:</h3>
        <p className="tracking-wide text-[#3A3B46]">
          {bookingDetails.selectedBookingDate} | {bookingDetails.startTime} -
          {bookingDetails.endTime}
        </p>
      </div>

      <div className="px-8  mt-4">
        <h3 className="text-[#7B7E8F] tracking-wide">Duration:</h3>
        <p className="tracking-wide text-[#3A3B46]">
          {durationInMinutes} hours
        </p>
      </div>

      <div className="px-8  mt-4">
        <h3 className="text-[#7B7E8F] tracking-wide">Pet:</h3>
        <ul className="tracking-wide text-[#3A3B46] flex flex-row">
          {props.selectedPets.map((petId, index) => {
            const selectedPet = props.allpets.find(
              (pet) => pet.pet_id === petId
            );
            if (selectedPet) {
              //setSelectedPetsName([...selectedPetsName, selectedPet.petname]);
              return (
                <li key={selectedPet.pet_id}>
                  {selectedPet.petname}
                  {index < props.selectedPets.length - 1 && ", "}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>

      <div className="absolute flex items-center w-[100%] bottom-0 py-8 mt-12 justify-between bg-black ">
        <p className="mx-8 text-white">Total</p>
        <p className="mx-8 text-white"> {totalPriceInTHB}.00 THB</p>
      </div>
    </div>
  );
};

export default BookingConfirmation;
