import React, { useState, useContext } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import profile_user from "../assets/icons/profile.svg";

function BookingHistory() {
  const { toggleViewBooking, setToggleViewBooking } = useContext(ToggleContext);
  const toggleBookingModal = () => {
    setToggleViewBooking(true);
  };
  return (
    <>
      <div className="w-full h-full flex flex-col justify-start shadow-custom3 rounded-lg p-12">
        <div className="text-headLine3">Booking History</div>
        <div className="booking-wrapper">
          <div
            onClick={toggleBookingModal}
            className="booking-card border-2 border-primaryGray5 w-full h-2/12 my-5 p-5 rounded-2xl flex flex-col cursor-pointer hover:border-primaryOrange4"
          >
            <div className="flex flex-row gap-5 p-2">
              <img
                src={profile_user}
                className="rounded-full w-[60px] h-[60px]"
                alt="pet sitter profile picture"
              />
              <div className="flex flex-col justify-center w-2/3 h-full">
                <h1 className="text-headLine3">petSitterName</h1>
                <h1 className="text-body1">By username</h1>
              </div>
              <div className="w-full h-full flex flex-col justify-center items-end pr-5">
                <div className="text-primaryGray3">transaction</div>
                <div className="text-secondaryGreen1 ">status</div>
              </div>
            </div>
            <hr />
            <div className="date-section p-3 py-5 flex justify-between">
              <div className="flex-1">
                <div className="text-primaryGray3">Date&Time:</div>
                <div className="">|</div>
              </div>
              <div className="border-l-2 pl-8 flex-1">
                <div className="text-primaryGray3">Duration:</div>
                <div className="">3 hours</div>
              </div>
              <div className="border-l-2 pl-8 flex-1">
                <div className="text-primaryGray3">Pet:</div>
                <div className="">Name</div>
              </div>
            </div>
            <div className="status-section text-primaryGray3 w-full h-[80px] bg-primaryGray6 rounded-lg px-5 flex justify-between items-center">
              message
              <span>x</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingHistory;
