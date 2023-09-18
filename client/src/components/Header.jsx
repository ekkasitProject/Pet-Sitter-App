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

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [petOwnerID, setPetOwnerID] = useState(null);
  //const { petOwnerID, setPetOwnerID } = useContext(ToggleContext);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const userDataFromToken = jwtDecode(token);
      setPetOwnerID(userDataFromToken.userId);
      console.log(petOwnerID);

      const result = await axios.get(
        `http://localhost:6543/petOwnerUser/${petOwnerID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(result.data.petOwnerUser);

      setProfile(result.data.petOwnerUser);
      //setPetOwnerID(result.data.petOwnerUser.petowner_id);
      // console.log(petOwnerID);
      //setProfile(result.data[0]);

      /*
      const result = await axios.get("http://localhost:6543/petOwnerUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(result.data[0]);
      setPetOwnerID(id);
      */

    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  useEffect(() => {
    getProfile();

    console.log(petOwnerID);
  }, [petOwnerID]);


  const dropDownChange = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleToLogin = () => {
    navigate("/login");
  };

  const handleToHome = () => {
    navigate("/");
  };

  const handleToFindAPetSitter = () => {
    navigate("/petsitterlist");
  };

  return (
    <header className="">
      <nav className="flex justify-between items-center w-[80%] mx-auto h-[80px] ">
        <div>
          <img onClick={handleToHome} src={logo} alt="logo" />
        </div>
        <div className="flex justify-center items-center">
          {profile ? (
            <div className="relative">
              {profile.image_profile ? (
                <button onClick={dropDownChange}>
                  <img
                    className="w-[40px] h-[40px] rounded-full mr-4 mt-2"
                    src={profile.image_profile}
                    alt="Profile"
                  />
                </button>
              ) : null}
              {isDropdownOpen && (
                <div className="absolute top-12 right-[-10rem] mt-2 bg-white border rounded shadow-md w-[186px]     z-50">
                  <div className="">
                    <div
                      onClick={() => navigate(`/user/profile/${petOwnerID}`)}
                      className="flex  items-center h-[50px] hover:bg-slate-100 cursor-pointer"
                    >
                      <img className="ml-4 " src={profile_user} alt="" />
                      <span className="ml-4 ">Profile</span>
                    </div>
                    <div
                      onClick={() => navigate(`/user/yourpet/${petOwnerID}`)}
                      className="flex  items-center h-[50px] hover:bg-slate-100 cursor-pointer"
                    >
                      <img className="ml-4" src={pet} alt="" />
                      <span className="ml-4">Your Pet</span>
                    </div>
                    <div
                      onClick={() => navigate(`/user/history/${petOwnerID}`)}
                      className="flex  items-center h-[50px] hover:bg-slate-100 cursor-pointer"
                    >
                      <img className="ml-4" src={history} alt="" />
                      <span className="ml-4">History</span>
                    </div>
                    <hr className="" />
                    <div
                      className="flex  items-center h-[50px] hover:bg-slate-100 cursor-pointer"
                      onClick={() => logout()}
                    >
                      <img className="ml-4" src={logout_user} alt="" />
                      <span className="ml-4">Log Out</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button className="mr-6" onClick={handleToLogin}>
              Login
            </button>
          )}
          <button
            className="bg-[#FF7037] px-3 py-2 rounded-full text-white font-medium "
            onClick={handleToFindAPetSitter}
          >
            Find A Pet Sitter
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
