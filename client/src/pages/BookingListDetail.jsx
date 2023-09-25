import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import SideBarPetsitter from "../components/SideBarPetsitter";
import HeaderPetsitter from "../components/HeaderPetsitter";
import { BackIcon, EyeIcon } from "../components/Icons";
import profile_user from "../assets/icons/profile.svg";

function BookingListDetail() {
  const [allpets, setAllpets] = useState([]);
  const [toggleViewPet, setToggleViewPet] = useState(false);
  const [petID, setPetID] = useState("");
  const navigate = useNavigate();
  const handleToggleViewPet = (id) => {
    setPetID(id);
    setToggleViewPet(true);
    // console.log(petID);
  };

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
            <div className="h-auto w-full px-20 pt-12 pb-10 bg-white flex flex-col gap-8 mt-1 shadow-custom4 rounded-lg">
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Pet Owner Name
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="">Name</div>
                  <button className="text-primaryOrange2 flex flex-row">
                    <EyeIcon />
                    ViewProfile
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Pet(s)
                </div>
                <div className="">2</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Pet Detail
                </div>
                <div className="">
                  <div
                    onClick={() => handleToggleViewPet("id")}
                    className="pet-card cursor-pointer border-2 border-primaryGray5 w-[200px] h-[230px] rounded-3xl flex flex-col justify-evenly items-center hover:border-primaryOrange4"
                  >
                    <img
                      src={profile_user}
                      className="rounded-full w-[80px] h-[80px] mt-4"
                      alt="pet sitter profile picture"
                    />
                    <h1 className="text-headLine3">Name</h1>
                    Type
                  </div>
                  {/* {allpets.map((pet) => {
                return (
                  <div
                    key={pet.pet_id}
                    onClick={() => handleToggleViewPet(pet.pet_id)}
                    className="pet-card cursor-pointer mb-5 border-2 border-primaryGray5 w-[200px] h-[230px] rounded-3xl flex flex-col justify-evenly items-center hover:border-primaryOrange4"
                  >
                    <img
                      src={pet.image_profile}
                      className="rounded-full w-[80px] h-[80px] mt-4"
                      alt="pet sitter profile picture"
                    />
                    <h1 className="text-headLine3">{pet.petname}</h1>
                    {handleChip(pet.pettype)}
                  </div>
                );
              })} */}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Duration
                </div>
                <div className="">2 hours</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Booking Date
                </div>
                <div className="">date | time</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Transaction Date
                </div>
                <div className="">2 Sep</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Transaction No
                </div>
                <div className="">2</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Additional Message
                </div>
                <div className="">msg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingListDetail;
