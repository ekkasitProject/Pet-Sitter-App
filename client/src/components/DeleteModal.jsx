import React, { useState, useContext } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import { Button1, Button2 } from "./Button";
import fetchUserData from "../hooks/fetchUserData";
import { CloseIcon } from "./Icons";

export default function DeleteModal() {
  const {
    setToggleDeletePet,

    setToggleViewPet,
    isAllPetChange,
    setIsAllPetChange,
  } = useContext(ToggleContext);
  const { deletePet } = fetchUserData();

  const toggleDeleteModal = () => {
    setToggleDeletePet(false);
    setToggleViewPet(true);
  };

  const handleDeletePet = () => {
    deletePet();
    setToggleDeletePet(false);
    setToggleViewPet(false);
    setIsAllPetChange(!isAllPetChange);
  };
  return (
    <>
      <div className="modal font-satoshi bg-neutral-700/80 w-screen h-screen z-10 top-0 left-0 right-0 bottom-0 fixed flex justify-center items-center">
        <div className="bg-white shadow-custom3 w-[350px] h-[200px] rounded-xl flex flex-col">
          <div className="text-headLine4 py-3 flex justify-between px-5">
            Delete Confirmation
            <button onClick={toggleDeleteModal} className="text-primaryGray3">
              <CloseIcon />
            </button>
          </div>
          <hr />

          <div className="px-5 py-5 text-body3 text-primaryGray3">
            Are You Sure To Delete This Pet?
          </div>
          <div className="px-5 w-full h-full flex justify-between items-start">
            <div onClick={toggleDeleteModal}>
              <Button1 button="Cancel" />
            </div>
            <div onClick={handleDeletePet}>
              <Button2 button="Delete" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
