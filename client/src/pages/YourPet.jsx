import { Button2 } from "../components/Button";
import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "./AuthenticatedApp";
import profile_user from "../assets/icons/profile.svg";
import CreatePet from "../components/CreatePet";
import DeleteModal from "../components/DeleteModal";
import ViewPet from "../components/ViewPet";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import fetchUserData from "../hooks/fetchUserData";
import {
  ChipsOrange,
  ChipsPink,
  ChipsGreen,
  ChipsBlue,
} from "../components/Chips.jsx";

function YourPet() {
  const { getAllPets, allpets, setAllpets, isError, isLoading } =
    fetchUserData();
  const navigate = useNavigate();
  const {
    toggleCreatePet,
    setToggleCreatePet,
    toggleDeletePet,
    setToggleDeletePet,
    toggleViewPet,
    setToggleViewPet,
    petID,
    setPetID,
    isAllPetChange,
    setIsAllPetChange,
  } = useContext(ToggleContext);

  const handleToggleCreatePet = () => {
    setToggleCreatePet(true);
  };

  const handleToggleViewPet = (id) => {
    setPetID(id);
    setToggleViewPet(true);
    console.log(petID);
  };

  useEffect(() => {
    getAllPets();

    // console.log(isAllPetChange);
    console.log(allpets);
  }, [isAllPetChange]);

  const handleChip = (pet) => {
    if (pet === "dog") {
      return <ChipsGreen petType="Dog" />;
    }
    if (pet === "cat") {
      return <ChipsPink petType="Cat" />;
    }
    if (pet === "bird") {
      return <ChipsBlue petType="Bird" />;
    }
    if (pet === "rabbit") {
      return <ChipsOrange petType="Rabbit" />;
    }
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
          <div className="z-1 w-full h-full flex flex-col mr-10 justify-start items-center shadow-custom3 rounded-lg p-12">
            <div className="flex w-full justify-between">
              <div className="text-headLine3">Your Pet</div>
              <button
                onClick={handleToggleCreatePet}
                className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3"
              >
                Create Pet
              </button>
            </div>

            <div className="pet-wrapper py-12 grid grid-cols-4 gap-4 mt-5 ">
              {isError ? <h1>Request failed</h1> : null}
              {isLoading ? <h1>Loading ....</h1> : null}

              <div
                onClick={() => handleToggleViewPet("id")}
                className="pet-card cursor-pointer border-2 border-primaryGray5 w-[220px] h-[250px] rounded-3xl flex flex-col justify-evenly items-center"
              >
                <img
                  src={profile_user}
                  className="rounded-full w-[80px] h-[80px] mt-4"
                  alt="pet sitter profile picture"
                />
                <h1 className="text-headLine3">Name</h1>
                Type
              </div>
              {allpets.map((pet) => {
                return (
                  <div
                    key={pet.pet_id}
                    onClick={() => handleToggleViewPet(pet.pet_id)}
                    className="pet-card cursor-pointer mb-5 border-2 border-primaryGray5 w-[220px] h-[250px] rounded-3xl flex flex-col justify-evenly items-center"
                  >
                    <img
                      src={pet.image_profile}
                      className="rounded-full w-[80px] h-[80px] mt-4"
                      alt="pet sitter profile picture"
                    />
                    <h1 className="text-headLine3">{pet.petname}</h1>
                    {handleChip(pet.pettype)}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default YourPet;
