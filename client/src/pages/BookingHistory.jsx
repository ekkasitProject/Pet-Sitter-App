import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "./AuthenticatedApp";
import profile_user from "../assets/icons/profile.svg";
import SideBar from "../components/SideBar";
import HeaderAuth from "../components/HeaderAuth";
import BookingModal from "../components/BookingModal";
import fetchUserData from "../hooks/fetchUserData";
import { PhoneIcon } from "../components/Icons";
import {
  calculateDuration,
  formatDate,
  formatTime,
} from "../components/calculateDate";
import axios from "axios";

function BookingHistory() {
  const { getBooking, bookingHistory, setBookingHistory, isError, isLoading } =
    fetchUserData();
  const { toggleViewBooking, setToggleViewBooking, bookingID, setBookingID } =
    useContext(ToggleContext);
  const toggleBookingModal = () => {
    setToggleViewBooking(true);
  };

  const handleToggleBookingModal = (id) => {
    setBookingID(id);
    setToggleViewBooking(true);
    console.log(bookingID);
  };

  // useEffect(() => {
  //   getBooking();
  //   console.log(bookingHistory);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getBooking();
      console.log(bookingHistory);

      for (let index = 0; index < bookingHistory.length; index++) {
        const booking = bookingHistory[index];
        const currentTime = new Date().toISOString();

        if (currentTime > booking.endTime) {
          await isBookingTimePassed(
            booking.booking_id,
            booking.status_booking,
            booking.petSitter.petSitterDetail[0].petsitter_id
          );
        }

        if (currentTime > booking.startTime) {
          if (
            currentTime >= booking.startTime &&
            currentTime <= booking.endTime
          ) {
            await isDuringBookingTime(
              booking.booking_id,
              booking.status_booking,
              booking.petSitter.petSitterDetail[0].petsitter_id
            );
          } else {
            await isBookingTimeNotConfirm(
              booking.booking_id,
              booking.status_booking,
              booking.petSitter.petSitterDetail[0].petsitter_id
            );
          }
        }
      }
    };

    fetchData();
  }, [bookingHistory]);

  const isBookingTimeNotConfirm = async (
    bookingID,
    bookingStatus,
    petSitterID
  ) => {
    if (bookingStatus === "Waiting for confirm") {
      try {
        const token = localStorage.getItem("token");
        const data = {
          bookingId: bookingID,
        };
        await axios.put(
          `http://localhost:6543/booking/petsitter/${petSitterID}/cancel`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.json({ message: "isBookingTimeNotConfirm ok" });
      } catch (error) {
        console.log(error);
      }
      console.log("petsitter not confirm during booking time");
      return null;
    } else {
      return null;
    }
  };

  const isBookingTimePassed = async (bookingID, bookingStatus, petSitterID) => {
    if (bookingStatus === "In service") {
      try {
        const token = localStorage.getItem("token");
        const data = {
          bookingId: bookingID,
        };
        await axios.put(
          `http://localhost:6543/booking/petsitter/${petSitterID}/end-service`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.json({ message: "isBookingTimePassed ok" });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("error booking time passed");
      return null;
    }
  };

  const isDuringBookingTime = async (bookingID, bookingStatus, petSitterID) => {
    if (bookingStatus === "Waiting for service") {
      try {
        const token = localStorage.getItem("token");
        const data = {
          bookingId: bookingID,
        };
        await axios.put(
          `http://localhost:6543/booking/petsitter/${petSitterID}/in-service`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.json({ message: "isDuringBookingTime ok" });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("during booking time");
      return null;
    }
  };

  // bookingHistory.forEach(async (booking, index) => {
  //   const currentTime = new Date().toISOString();
  //   if (currentTime > booking.endTime) {
  //     await isBookingTimePassed(
  //       booking.booking_id,
  //       booking.status_booking,
  //       booking.petSitter.petSitterDetail[0].petsitter_id
  //     );
  //   }
  //   if (currentTime > booking.startTime) {
  //     if (currentTime >= booking.startTime && currentTime <= booking.endTime) {
  //       await isDuringBookingTime(
  //         booking.booking_id,
  //         booking.status_booking,
  //         booking.petSitter.petSitterDetail[0].petsitter_id
  //       );
  //     } else {
  //       await isBookingTimeNotConfirm(
  //         booking.booking_id,
  //         booking.status_booking,
  //         booking.petSitter.petSitterDetail[0].petsitter_id
  //       );
  //     }
  //   }
  //   return null;
  // });

  return (
    <>
      <HeaderAuth />
      {toggleViewBooking ? <BookingModal /> : null}
      <div className="w-full h-full flex mt-10 font-satoshi">
        <SideBar />
        <div className="w-full h-full flex flex-col justify-start shadow-custom3 rounded-lg p-12 mr-20">
          <div className="text-headLine3">Booking History</div>
          <div className="booking-wrapper">
            {isError ? <h1>Request failed</h1> : null}
            {isLoading ? <h1>Loading ....</h1> : null}
            {/*mapping */}
            {bookingHistory.map((booking) => {
              return (
                <div
                  key={booking.booking_id}
                  onClick={() => handleToggleBookingModal(booking.booking_id)}
                  className={
                    booking.status_booking == "In service"
                      ? "booking-card border-2 w-full h-2/12 my-5 p-5 rounded-2xl flex flex-col cursor-pointer border-secondaryBlue1 hover:border-primaryOrange4"
                      : "booking-card border-2 border-primaryGray5 w-full h-2/12 my-5 p-5 rounded-2xl flex flex-col cursor-pointer hover:border-primaryOrange4"
                  }
                >
                  <div className="flex flex-row gap-5 p-2">
                    <img
                      src={profile_user}
                      className="rounded-full w-[60px] h-[60px]"
                      alt="pet sitter profile picture"
                    />
                    <div className="flex flex-col justify-center w-2/3 h-full">
                      <h1 className="text-headLine3">
                        {booking.petSitter.petSitterDetail[0].pet_sitter_name}
                      </h1>
                      <h1 className="text-body1">
                        By {booking.petSitter.username}
                      </h1>
                    </div>
                    <div className="w-full h-full flex flex-col justify-center items-end pr-5">
                      <div className="text-primaryGray3">
                        {booking.status_booking == "Success" ? (
                          <p>Booking date: {formatDate(booking.datetime)}</p>
                        ) : booking.status_booking == "In service" ? (
                          <p>Booking date: {formatDate(booking.datetime)}</p>
                        ) : booking.status_booking == "Waiting for confirm" ? (
                          <p>
                            Transaction date: {formatDate(booking.datetime)}
                          </p>
                        ) : booking.status_booking == "Waiting for service" ? (
                          <p>Booking date: {formatDate(booking.datetime)}</p>
                        ) : booking.status_booking == "Canceled" ? (
                          <p>Canceled date: {formatDate(booking.datetime)}</p>
                        ) : null}
                      </div>
                      <div
                        className={
                          booking.status_booking == "Success"
                            ? "text-secondaryGreen1"
                            : booking.status_booking == "In service"
                            ? "text-secondaryBlue1"
                            : booking.status_booking == "Waiting for confirm"
                            ? "text-secondaryPink1"
                            : booking.status_booking == "Waiting for service"
                            ? "text-amber-500"
                            : booking.status_booking == "Canceled"
                            ? "text-red-500"
                            : null
                        }
                      >
                        ● {booking.status_booking}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="date-section p-3 py-5 flex justify-between">
                    <div className="flex-1 ">
                      <div className="text-primaryGray3">Date&Time:</div>
                      <div className="flex justify-evenly">
                        <span>Start: {formatDate(booking.startTime)}</span>|
                        <span>
                          {formatTime(booking.startTime)} -{" "}
                          {formatTime(booking.endTime)}
                        </span>
                      </div>
                    </div>
                    <div className="border-l-2 pl-8 basis-1/4">
                      <div className="text-primaryGray3">Duration:</div>
                      <div className="">
                        {calculateDuration(booking.startTime, booking.endTime)}
                      </div>
                    </div>
                    <div className="border-l-2 pl-8 basis-1/4">
                      <div className="text-primaryGray3">Pet:</div>
                      <div className="">
                        {booking.petname.map((pet) => {
                          return `${pet} `;
                        })}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      booking.status_booking == "Success"
                        ? "status-section text-secondaryGreen1 w-full h-[80px] bg-secondaryGreen2 rounded-lg px-5 flex justify-between items-center"
                        : booking.status_booking == "Canceled"
                        ? "status-section text-red-500 w-full h-[80px] bg-red-100 rounded-lg px-5 flex justify-between items-center"
                        : "status-section text-primaryGray3 w-full h-[80px] bg-primaryGray6 rounded-lg px-5 flex justify-between items-center"
                    }
                  >
                    {booking.status_booking == "Success" ? (
                      <p>
                        Success date: {formatDate(booking.endTime)} |{" "}
                        {formatTime(booking.endTime)}
                      </p>
                    ) : booking.status_booking == "In service" ? (
                      <p>Your pet is already in Pet Sitter care!</p>
                    ) : booking.status_booking == "Waiting for confirm" ? (
                      <p>Waiting Pet Sitter for confirm booking </p>
                    ) : booking.status_booking == "Waiting for service" ? (
                      <p>Pet Sitter is waiting to service </p>
                    ) : booking.status_booking == "Canceled" ? (
                      <p>Service was canceled </p>
                    ) : null}
                    <span>
                      {booking.status_booking == "In service" && (
                        <div className="w-[50px] h-[50px] rounded-full bg-primaryOrange6 text-primaryOrange2 flex justify-center items-center">
                          <PhoneIcon />
                        </div>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingHistory;
