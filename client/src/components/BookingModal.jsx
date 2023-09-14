import React, { useState, useContext } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import { Button1, Button2 } from "./Button";
import { CloseIcon } from "./Icons";

export default function BookingModal() {
  const { toggleViewBooking, setToggleViewBooking } = useContext(ToggleContext);

  const toggleBookingModal = () => {
    setToggleViewBooking(false);
  };
  return (
    <>
      <div className="modal font-satoshi bg-neutral-700/80 w-screen h-screen z-10 top-0 left-0 right-0 bottom-0 fixed flex justify-center items-center">
        <div className="bg-white shadow-custom3 w-[550px] h-[470px] rounded-xl flex flex-col justify-between">
          <div className="text-headLine4 py-4 flex justify-between px-5">
            Booking Detail
            <button onClick={toggleBookingModal}>
              <CloseIcon />
            </button>
          </div>
          <hr />

          <div className="px-5 py-5 text-body3 text-primaryGray3 flex flex-col justify-between gap-3">
            <div className="flex-1">Waiting for confirm</div>
            <div className="flex-1">
              <p>Transaction Date</p>
              <p>Transaction No</p>
            </div>
            <div className="flex-1">
              <div className="text-primaryGray3">Pet Sitter:</div>
              <div className="text-black">Pet Sitter Name</div>
            </div>
            <div className="flex-1 flex flex-row">
              <div className="flex-1">
                <div className="text-primaryGray3">Date & Time:</div>
                <div className="text-black">|</div>
              </div>
              <div className="flex-1">
                <div className="text-primaryGray3">Duration:</div>
                <div className="text-black">3 hours</div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-primaryGray3">Pet:</div>
              <div className="text-black">Name</div>
            </div>
          </div>
          <div className="flex justify-center">
            <hr className="w-11/12 " />
          </div>

          <div className="px-5 mb-7 pt-2 w-full flex justify-between items-start">
            <h1>Total</h1>
            <h1>900 THB</h1>
          </div>
        </div>
      </div>
    </>
  );
}
