import { Button2 } from "./Button";
import React, { useState } from "react";
import profile_user from "../assets/icons/profile.svg";
import CreatePet from "./CreatePet";

function YourPet() {
  const [toggleCreatePet, setToggleCreatePet] = useState(false);

  const handleToggleCreatePet = () => {
    setToggleCreatePet(true);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col justify-start shadow-custom3 rounded-lg p-12">
        <div className="flex justify-between">
          <div className="text-headLine3">Your Pet</div>
          <button
            onClick={handleToggleCreatePet}
            className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3"
          >
            Create Pet
          </button>
        </div>
      </div>

      {toggleCreatePet ? <CreatePet /> : null}
    </>
  );
}

export default YourPet;
