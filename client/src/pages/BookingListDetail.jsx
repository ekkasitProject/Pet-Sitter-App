import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import SideBarPetsitter from "../components/SideBarPetsitter";
import HeaderPetsitter from "../components/HeaderPetsitter";
import { BackIcon, EyeIcon } from "../components/Icons";

function BookingListDetail() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-screen min-h-screen flex flex-row justify-center font-satoshi">
        <SideBarPetsitter />
        <div className=" w-5/6 h-auto flex flex-col items-center ">
          <HeaderPetsitter />
          <div className="min-h-[90%] w-full px-14 flex flex-col pt-4 pb-14 bg-[#F6F6F9]">
            <div className="h-[100px] w-full flex justify-between items-center ">
              <div className="text-primaryGray3 flex flex-row items-center gap-3">
                <button
                  onClick={() => {
                    navigate("/petsitter/bookinglist/:petsitterId");
                  }}
                >
                  <BackIcon />
                </button>
                <div className="text-headLine3 text-black">Petsitter name</div>
                <div className="">
                  status
                  {/*
              <span
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
                      </span>
              */}
                </div>
              </div>

              <div className="flex gap-3">
                {/* อันนี้mockไว้ */}
                <button className="w-[150px] h-[50px] py-2  bg-primaryOrange6 rounded-full active:text-primaryOrange1 text-primaryOrange2 hover:text-primaryOrange3 disabled:bg-primaryGray6 disabled:text-primaryGray5">
                  Reject Booking
                </button>
                <button className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray5 disabled:text-primaryGray3">
                  Confirm Booking
                </button>
                {/*
                 {booking.status_booking == "Success" ? (
                      
                <button className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray5 disabled:text-primaryGray3">
                  Success
                </button>
                    ) : booking.status_booking == "In service" ? (
                      <button disabled className=" h-[50px] px-5 py-1 rounded-full disabled:bg-primaryGray4 disabled:text-primaryGray3">
                  Success
                </button>
                    ) : booking.status_booking == "Waiting for confirm" ? (
                     <>
                     <button className="w-[150px] h-[50px] py-2  bg-primaryOrange6 rounded-full active:text-primaryOrange1 text-primaryOrange2 hover:text-primaryOrange3 disabled:bg-primaryGray6 disabled:text-primaryGray5">
                  Reject Booking
                </button>
                <button className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3">
                  Confirm Booking
                </button>
                     </>
                    ) : booking.status_booking == "Waiting for service" ? (
                      <button className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3">
                  In Service
                </button>
                    ) : booking.status_booking == "Canceled" ? (
                      null
                    ) : null}
                */}
              </div>
            </div>
            <div className="h-auto w-full bg-white flex flex-col gap-10 mt-1 shadow-custom4 rounded-lg">
              <button className="text-primaryOrange2 flex flex-row">
                <EyeIcon />
                ViewProfile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingListDetail;
