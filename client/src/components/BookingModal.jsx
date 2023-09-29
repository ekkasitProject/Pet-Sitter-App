import React, { useContext, useEffect } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import { CloseIcon } from "./Icons";
import fetchUserData from "../hooks/fetchUserData";
import {
  calculateDuration,
  formatDate,
  formatTime,
} from "../components/calculateDate";

export default function BookingModal() {
  const { setToggleViewBooking, bookingID } = useContext(ToggleContext);
  const { booking, getBookingByID } = fetchUserData();
  const toggleBookingModal = () => {
    setToggleViewBooking(false);
  };

  useEffect(() => {
    getBookingByID();
  }, [bookingID]);

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
            <div
              className={
                booking.status_booking == "Success"
                  ? "text-secondaryGreen1 flex-1"
                  : booking.status_booking == "In service"
                  ? "text-secondaryBlue1 flex-1"
                  : booking.status_booking == "Waiting for confirm"
                  ? "text-secondaryPink1 flex-1"
                  : booking.status_booking == "Waiting for service"
                  ? "text-amber-500 flex-1"
                  : booking.status_booking == "Canceled"
                  ? "text-red-500 flex-1"
                  : null
              }
            >
              {booking.status_booking}
            </div>
            <div className="flex-1">
              <p>Transaction Date: {formatDate(booking.startTime)}</p>
              <p>Transaction No: {booking.transaction_no}</p>
            </div>
            <div className="flex-1">
              <div className="text-primaryGray3">Pet Sitter:</div>
              <div className="text-black">
                {booking.petsitter
                  ? `${booking.petsitter.petsitterdetail[0].pet_sitter_name} By ${booking.petsitter.username}`
                  : null}
              </div>
            </div>
            <div className="flex-1 flex flex-row">
              <div className="flex-1">
                <div className="text-primaryGray3">Date & Time:</div>
                <div className="text-black">
                  <p>
                    Start: {formatDate(booking.startTime)} |
                    {formatTime(booking.startTime)} -{" "}
                    {formatTime(booking.endTime)}
                  </p>
                </div>
              </div>
              <div className="basis-1/4">
                <div className="text-primaryGray3">Duration:</div>
                <div className="text-black">
                  {" "}
                  {calculateDuration(booking.startTime, booking.endTime)}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-primaryGray3">Pet:</div>
              <div className="text-black">
                {booking.petdetails
                  ? booking.petdetails.map((pet, index) => {
                      return (
                        <span key={index}>
                          {pet}
                          {index < booking.petdetails.length - 1 && ", "}
                        </span>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <hr className="w-11/12 " />
          </div>

          <div className="px-5 mb-7 pt-2 w-full flex justify-between items-start">
            <h1>Total</h1>
            <h1>{booking.total_price} THB</h1>
          </div>
        </div>
      </div>
    </>
  );
}
