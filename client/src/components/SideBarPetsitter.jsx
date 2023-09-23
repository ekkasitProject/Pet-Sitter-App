import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication";
import { ProfileIcon, PetIcon, MenuIcon, LogoutIcon } from "./Icons";
import { ToggleContext } from "../pages/AuthenticatedApp";
import logo from "../assets/images/elements/logo.svg";

function SideBarPetsitter() {
  const { logout } = useAuth();
  //const { petOwnerID } = useContext(ToggleContext);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const bookingRef = useRef(null);

  const currentURL = window.location.href;
  const checkURL = () => {
    if (currentURL.includes("profile")) {
      profileRef.current.focus();
    }
    if (currentURL.includes("bookinglist")) {
      bookingRef.current.focus();
    }
  };

  useEffect(() => {
    checkURL();
  }, []);

  const handleToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="h-screen w-1/6 flex flex-col justify-between border-r-2 ">
        <div className="">
          <div className="w-full h-[120px] flex justify-center items-center ">
            <img
              onClick={handleToHome}
              src={logo}
              alt="logo"
              className="cursor-pointer"
            />
          </div>

          <div className=" w-full h-[72px] flex flex-col ">
            <button
              ref={profileRef}
              onClick={() => navigate(`/petsitter/profile/:petsitterId`)}
              className="text-headLine5 gap-4 text-primaryGray3  flex justify-start items-center p-4 pl-7 hover:text-primaryOrange2 active:text-primaryOrange2 active:bg-primaryOrange6 focus:text-primaryOrange2 focus:bg-primaryOrange6 hover:fill-primaryOrange2 focus:fill-primaryOrange2 active:fill-primaryOrange2"
            >
              <ProfileIcon />
              Pet Sitter Profile
            </button>

            <button
              ref={bookingRef}
              onClick={() => navigate(`/petsitter/bookinglist/:petsitterId`)}
              className="text-headLine5 pb-5 gap-4 text-primaryGray3  flex justify-start items-center p-4 pl-7 hover:text-primaryOrange2 active:text-primaryOrange2 active:bg-primaryOrange6 focus:text-primaryOrange2 focus:bg-primaryOrange6 hover:fill-primaryOrange2 focus:fill-primaryOrange2 active:fill-primaryOrange2"
            >
              <MenuIcon />
              Booking List
            </button>
          </div>
        </div>
        <button
          className="text-headLine5 border-y-2 pb-5 gap-4 text-primaryGray3  flex justify-start items-center p-4 pl-7 hover:text-primaryOrange2 active:text-primaryOrange2 active:bg-primaryOrange6 focus:text-primaryOrange2 focus:bg-primaryOrange6 hover:fill-primaryOrange2 focus:fill-primaryOrange2 active:fill-primaryOrange2"
          onClick={() => logout()}
        >
          <LogoutIcon />
          <span className="ml-4">Log Out</span>
        </button>
      </div>
    </>
  );
}

export default SideBarPetsitter;
