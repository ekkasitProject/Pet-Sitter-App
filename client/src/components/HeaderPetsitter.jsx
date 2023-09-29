import React, { useEffect, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/authentication";

import { ToggleContext } from "../pages/AuthenticatedApp";

import fetchUserData from "../hooks/fetchUserData";

const HeaderPetsitter = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { petSitterID, setPetSitterID } = useContext(ToggleContext);

  const {
    petsitterProfile,

    getPetsitterProfile,
  } = fetchUserData();

  useEffect(() => {
    getPetsitterProfile();
  }, [petsitterProfile]);

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
