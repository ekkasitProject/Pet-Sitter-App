import { Button2 } from "../components/Button";
import React, { useState, useContext } from "react";
import { ToggleContext } from "./AuthenticatedApp";
import profile_user from "../assets/icons/profile.svg";
import CreatePet from "../components/CreatePet";
import DeleteModal from "../components/DeleteModal";
import ViewPet from "../components/ViewPet";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

function YourPet() {
  const navigate = useNavigate();
  const {
    toggleCreatePet,
    setToggleCreatePet,
    toggleDeletePet,
    setToggleDeletePet,
    toggleViewPet,
    setToggleViewPet,
  } = useContext(ToggleContext);

  const handleToggleCreatePet = () => {
    setToggleCreatePet(true);
  };

  const handleToggleViewPet = () => {
    setToggleViewPet(true);
  };

  return (
    <>
      <Header />
      {toggleDeletePet ? <DeleteModal /> : null}
      <div className="w-full h-full flex mt-10 font-satoshi">
        <SideBar />
        {toggleCreatePet ? (
          <CreatePet />
        ) : toggleViewPet ? (
          <ViewPet />
        ) : (
          <div className="z-1 w-full h-full flex flex-col justify-start shadow-custom3 rounded-lg p-12">
            <div className="flex justify-between">
              <div className="text-headLine3">Your Pet</div>
              <button
                onClick={handleToggleCreatePet}
                className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3"
              >
                Create Pet
              </button>
            </div>

            <div className="pet-wrapper py-12">
              <div
                onClick={handleToggleViewPet}
                className="pet-card cursor-pointer border-2 border-primaryGray5 w-[250px] h-[280px] rounded-3xl flex flex-col justify-evenly items-center"
              >
                <img
                  src={profile_user}
                  className="rounded-full w-[130px] h-[130px] mt-4"
                  alt="pet sitter profile picture"
                />
                <h1 className="text-headLine3">Name</h1>
                Type
                {/*  {petSitter.pet_type.map((pet, index) => {
                    return <span key={index}>{handleChip(pet)}</span>;
                  })}
                  */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default YourPet;