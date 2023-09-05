import React from "react";
import logo from "../assets/images/elements/logo.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate("/login");
  };

  const handleToHome = () => {
    navigate("/");
  };

  return (
    <header className="overflow-hidden">
      <nav className="flex justify-between items-center w-[80%] mx-auto h-[80px] ">
        <div>
          <img onClick={handleToHome} src={logo} alt="logo" />
        </div>
        <div>
          <button className="mr-6" onClick={handleToLogin}>
            Login
          </button>
          <button className="bg-[#FF7037] px-3 py-2 rounded-full text-white font-medium">
            Find A Pet Sitter
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
