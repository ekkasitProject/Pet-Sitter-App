import React, { useEffect, useState } from "react";
import logo from "../assets/images/elements/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authentication";

const Header = () => {
  const { logout } = useAuth();
  console.log(logout);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const result = await axios.get("http://localhost:4000/petOwnerUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(result.data[0]);
    } catch (error) {
      // Handle authentication error here
      console.error("Authentication error:", error);
    }
  };

  useEffect(() => {
    getProfile();
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

  const handleToFindAPetSitter =() =>{
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
                    className="w-[40px] mr-4 mt-2"
                    src={profile.image_profile}
                    alt="Profile"
                  />
                </button>
              ) : null}
              {isDropdownOpen && (
                <div className="absolute top-10 right-[-1.7rem] mt-2 bg-white border rounded shadow-md px-10 pb-4 pt-2 z-50">
                  {/* Dropdown menu contents here */}
                  <ul>
                    <li className="">
                      <a href="/profile">Profile</a>
                    </li>
                    <li className="mt-2">
                      <a onClick={() => logout()}>Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button className="mr-6" onClick={handleToLogin}>
              Login
            </button>
          )}
          <button className="bg-[#FF7037] px-3 py-2 rounded-full text-white font-medium " onClick={handleToFindAPetSitter}>
            Find A Pet Sitter
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
