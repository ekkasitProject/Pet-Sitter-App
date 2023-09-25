import React, { useEffect, useState, useContext } from "react";
import logo from "../assets/images/elements/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authentication";
import profile_user from "../assets/icons/profile.svg";
import pet from "../assets/icons/pet1.svg";
import history from "../assets/icons/history.svg";
import logout_user from "../assets/icons/logout.svg";
import { dropdown } from "../data/dropdownprofile";
import { ToggleContext } from "../pages/AuthenticatedApp";
import jwtDecode from "jwt-decode";
import fetchUserData from "../hooks/fetchUserData";

const HeaderPetsitter = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //const [profile, setProfile] = useState(null);
  //const [petSitterID, setpetSitterID] = useState(null);
  const { petSitterID, setPetSitterID } = useContext(ToggleContext);
  const {
    petsitterProfile,
    setPetsitterProfile,
    getPetsitterProfile,
    isError,
    isLoading,
  } = fetchUserData();

  useEffect(() => {
    getPetsitterProfile();
    //console.log(petSitterID);
  }, []);

  const dropDownChange = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleToLogin = () => {
    navigate("/login");
  };

  const handleToHome = () => {
    navigate("/");
  };

  return (
    <header className="header h-[72px] w-full flex flex-row justify-start items-center px-14 py-4 gap-1">
      <div className="">
        {petsitterProfile ? (
          <div className="relative flex justify-start items-center">
            {petsitterProfile.image_profile ? (
              <>
                <div>
                  <img
                    className="w-[40px] h-[40px] rounded-full mr-4 mt-2"
                    src={petsitterProfile.image_profile}
                    alt="Profile"
                  />
                </div>
                <span>{petsitterProfile.username}</span>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default HeaderPetsitter;
