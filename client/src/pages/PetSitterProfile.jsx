import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import SideBarPetsitter from "../components/SideBarPetsitter";
import HeaderPetsitter from "../components/HeaderPetsitter";

function PetSitterProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="w-screen h-full flex flex-row justify-center font-satoshi">
        <SideBarPetsitter />
        <div className=" w-5/6 h-auto flex flex-col items-center ">
          <HeaderPetsitter />
          <div className="h-auto w-full px-14 flex flex-col pt-4 pb-14 bg-[#F6F6F9]">
            <div className="h-[100px] w-full flex justify-between items-center ">
              <div className="text-headLine3">Pet Sitter Profile</div>
              <button
                type="submit"
                className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3"
              >
                Update Profile
              </button>
            </div>
            <div className="h-[2500px] w-full flex flex-col gap-10 mt-1">
              <div className="bg-white w-full h-2/6 shadow-custom4 rounded-lg">
                y
              </div>
              <div className="bg-white w-full h-3/6 shadow-custom4 rounded-lg">
                z
              </div>
              <div className="bg-white w-full h-1/6 shadow-custom4 rounded-lg">
                z
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetSitterProfile;
