import React, { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileIcon, PetIcon, MenuIcon } from "./Icons";
import { ToggleContext } from "../pages/AuthenticatedApp";

function SideBar() {
  const { petOwnerID } = useContext(ToggleContext);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const yourpetRef = useRef(null);
  const historyRef = useRef(null);

  const { setToggleCreatePet } = useContext(ToggleContext);

  const currentURL = window.location.href;
  const checkURL = () => {
    if (currentURL.includes("profile")) {
      profileRef.current.focus();
    }
    if (currentURL.includes("yourpet")) {
      yourpetRef.current.focus();
    }
    if (currentURL.includes("history")) {
      historyRef.current.focus();
    }
  };

  useEffect(() => {
    checkURL();
  }, []);

  return (
    <>
      <div className="  w-2/5 h-full flex justify-center px-11">
        <div className=" shadow-custom3 w-[300px] h-2/12 rounded-xl  ml-10 flex flex-col flex-wrap leading-[3rem]">
          <div className="text-headLine4 flex justify-start items-center  pl-7">
            Account
          </div>
          <button
            ref={profileRef}
            onClick={() => {
              navigate(`/user/profile/${petOwnerID}`);
              setToggleCreatePet(false);
            }}
            className="text-headLine5 gap-4 text-primaryGray3  flex justify-start items-center p-4 pl-7 hover:text-primaryOrange2 active:text-primaryOrange2 active:bg-primaryOrange6 focus:text-primaryOrange2 focus:bg-primaryOrange6 hover:fill-primaryOrange2 focus:fill-primaryOrange2 active:fill-primaryOrange2"
          >
            <ProfileIcon />
            Profile
          </button>
          <button
            ref={yourpetRef}
            onClick={() => {
              navigate(`/user/yourpet/${petOwnerID}`);
              setToggleCreatePet(false);
            }}
            className="text-headLine5 gap-4 text-primaryGray3  flex justify-start items-center p-4 pl-7 hover:text-primaryOrange2 active:text-primaryOrange2 active:bg-primaryOrange6 focus:text-primaryOrange2 focus:bg-primaryOrange6 hover:fill-primaryOrange2 focus:fill-primaryOrange2 active:fill-primaryOrange2"
          >
            <PetIcon />
            Your Pet
          </button>
          <button
            ref={historyRef}
            onClick={() => {
              navigate(`/user/history/${petOwnerID}`);
              setToggleCreatePet(false);
            }}
            className="text-headLine5 pb-5 gap-4 text-primaryGray3  flex justify-start items-center p-4 pl-7 hover:text-primaryOrange2 active:text-primaryOrange2 active:bg-primaryOrange6 focus:text-primaryOrange2 focus:bg-primaryOrange6 hover:fill-primaryOrange2 focus:fill-primaryOrange2 active:fill-primaryOrange2"
          >
            <MenuIcon />
            Booking History
          </button>
        </div>
      </div>
    </>
  );
}

export default SideBar;
