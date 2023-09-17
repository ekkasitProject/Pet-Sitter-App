import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import YourPet from "./YourPet";
import BookingHistory from "./BookingHistory";
import DeleteModal from "../components/DeleteModal";
import BookingModal from "../components/BookingModal";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

function UserManagement() {
  return (
    <>
      <Header />

      <div className="w-full h-full flex mt-10 mb-5 font-satoshi">
        <SideBar />
        <div className="w-full flex justify-center  mr-20 mb-20">
          <UserProfile />
        </div>
      </div>
    </>
  );
}

export default UserManagement;
