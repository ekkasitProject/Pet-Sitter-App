import React from "react";
import logo from "../assets/images/elements/logowhite.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-center h-[280px] flex justify-center flex-col items-center">
      <img src={logo} alt="" />
      <h2 className="text-white tracking-wider mt-4 text-lg">
        Find your perfect pet sitter with us.
      </h2>
    </footer>
  );
};

export default Footer;
