import React, { useState, useContext } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import { Button1, Button2 } from "./Button";

export default function BookingModal() {
  const { toggleViewBooking, setToggleViewBooking } = useContext(ToggleContext);

  const toggleBookingModal = () => {
    setToggleViewBooking(false);
  };
  return (
    <>
      <div className="modal font-satoshi bg-neutral-700/80 w-screen h-screen z-10 top-0 left-0 right-0 bottom-0 fixed flex justify-center items-center">
        <div className="bg-white shadow-custom3 w-[350px] h-[200px] rounded-xl flex flex-col">
          <div className="text-headLine5 py-3 flex justify-between px-5">
            Booking Detail
            <button onClick={toggleBookingModal}>x</button>
          </div>
          <hr />

          <div className="px-5 py-5 text-body3 text-primaryGray3">
            Waiting for confirm
          </div>
          <div className="px-5 w-full h-full flex justify-between items-start">
            <div onClick={toggleBookingModal}>
              <Button1 button="Cancel" />
            </div>
            <div onClick="">
              <Button2 button="Delete" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
