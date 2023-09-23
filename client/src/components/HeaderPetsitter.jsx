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

const HeaderPetsitter = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  //const [petOwnerID, setPetOwnerID] = useState(null);
  const { petOwnerID, setPetOwnerID } = useContext(ToggleContext);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      // const id = localStorage.getItem("id");
      // setPetOwnerID(id);

      // const userDataFromToken = jwtDecode(token);
      //setPetOwnerID(userDataFromToken.userId);
      // console.log(petOwnerID);

      const result = await axios.get(
        `http://localhost:6543/petOwnerUser/${petOwnerID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //console.log(result.data.petOwnerUser);

      setProfile(result.data.petOwnerUser);
      //setPetOwnerID(result.data.petOwnerUser.petowner_id);
      // console.log(petOwnerID);
      //setProfile(result.data[0]);
    } catch (error) {
      // Handle authentication error here
      console.error("Authentication error:", error);
    }
  };

  useEffect(() => {
    getProfile();
    //console.log(petOwnerID);
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
    <header className="header h-[72px] w-full flex flex-row justify-start items-center px-14 gap-1">
      <div className="">
        {profile ? (
          <div className="relative flex justify-start items-center">
            {profile.image_profile ? (
              <>
                <button onClick={dropDownChange}>
                  <img
                    className="w-[40px] h-[40px] rounded-full mr-4 mt-2"
                    src={profile.image_profile}
                    alt="Profile"
                  />
                </button>
                <span>{profile.username}</span>
              </>
            ) : null}
          </div>
        ) : (
          <span>profile image & name </span>
        )}
      </div>
    </header>
  );
};

export default HeaderPetsitter;
