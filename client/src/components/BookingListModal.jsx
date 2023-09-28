import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import { Button1, Button2 } from "./Button";
import fetchUserData from "../hooks/fetchUserData";
import closeIcon from "../assets/icons/iconClose.svg";
import { CloseIcon } from "./Icons";

import {
  calculateDuration,
  formatDate,
  formatTime,
} from "../components/calculateDate";

export default function BookingListModal() {
  const {
    petID,
    setPetID,
    toggleViewBooking,
    setToggleViewBooking,
    bookingID,
    setBookingID,
    OpenPetModal,
    setOpenPetModal,
  } = useContext(ToggleContext);
  const {
    booking,
    setBooking,
    getBookingByID,
    isError,
    isLoading,
    getPetByID,
    petDetail,
    setPetDetail,
  } = fetchUserData();
  const toggleBookingModal = () => {
    setToggleViewBooking(false);
  };

  const handleClosePetModal = () => {
    setOpenPetModal(false);
    console.log(OpenPetModal);
  };

  useEffect(() => {
    getPetByID();
    //console.log(bookingID);
    // console.log(booking);
  }, [petID]);

  return (
    <>
      <div className="modal font-satoshi bg-neutral-700/80 w-screen h-screen z-10 top-0 left-0 right-0 bottom-0 fixed flex justify-center items-center">
        <div className="flex items-center justify-center w-[800px] h-[552px] bg-white rounded-2xl">
          <div className="w-full h-full py-5">
            <div className="flex items-center justify-between py-3 px-10">
              <h1 className="text-2xl font-semibold text-primaryGray3 flex flex-row justify-between">
                {petDetail.petname}
              </h1>
              <button onClick={handleClosePetModal}>
                <CloseIcon />
              </button>
            </div>
            <hr className="border-t-2 h-4 w-full" />
            <div className="flex items-center space-x-12 p-8">
              <div>
                <img
                  src={petDetail.image_profile}
                  alt="Profile"
                  className="w-[240px] h-[240px] rounded-full"
                />
                <div className="flex items-center justify-center">
                  <h1 className="text-xl font-semibold">{petDetail.petname}</h1>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-primaryGray7 w-[440px] h-[394px] p-8 rounded-2xl">
                <div className="mb-2">
                  <h1 className="text-lg font-semibold text-primaryGray4">
                    Pet Type
                  </h1>
                  <a>{petDetail.pettype}</a>
                </div>
                <div className="mb-2">
                  <h1 className="text-lg font-semibold text-primaryGray4">
                    Breed
                  </h1>
                  <a>{petDetail.breed}</a>
                </div>
                <div className="mb-2">
                  <h1 className="text-lg font-semibold text-primaryGray4">
                    Sex
                  </h1>
                  <a>{petDetail.sex}</a>
                </div>
                <div className="mb-2">
                  <h1 className="text-lg font-semibold text-primaryGray4">
                    Age
                  </h1>
                  <a>{petDetail.age} year(s)</a>
                </div>
                <div className="mb-2">
                  <h1 className="text-lg font-semibold text-primaryGray4">
                    Color
                  </h1>
                  <a>{petDetail.color}</a>
                </div>
                <div className="mb-2">
                  <h1 className="text-lg font-semibold text-primaryGray4">
                    Weight
                  </h1>
                  {petDetail.weight} Kilogram
                </div>
                <div className="mb-2">
                  <h1 className="text-lg font-semibold text-primaryGray4">
                    About
                  </h1>
                  <a>{petDetail.about}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
