import React, { useState, useEffect, useContext } from "react";
import HeaderAuth from "../components/HeaderAuth.jsx";
import greenStar from "../assets/star/greenstar.svg";
import shapeBlue from "../assets/star/shapeblue.svg";
import { Link } from "react-router-dom";
import axios from "axios";
//import PetBookingCard from "../components/PetBookingCard";
import BookingConfirmation from "../components/BookingConfirmation";
//import addIcon from "../assets/icons/addIcon.svg";
import fetchUserData from "../hooks/fetchUserData";
import { useNavigate } from "react-router-dom";
import { ToggleContext } from "./AuthenticatedApp";

import {
  ChipsOrange,
  ChipsPink,
  ChipsGreen,
  ChipsBlue,
} from "../components/Chips.jsx";
import { AddIcon } from "../components/Icons.jsx";

const BookingYourPet = (props) => {
  const [selectedBookingDate, setSelectedBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numberOfSelectedPets, setNumberOfSelectedPets] = useState(0);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [totalCost, setTotalCost] = useState(0); //
  const { getAllPets, isError, isLoading } = fetchUserData();
  const navigate = useNavigate();
  //const [selectedPets, setSelectedPets] = useState([]);
  const [petID, setPetID] = useState(0);

  const {
    setToggleViewPet,
    isAllPetChange,
    allpets,
    selectedPets,
    setSelectedPets,
    selectedPetsName,
    selectedPetsitterID,
    setSelectedPetsName,
  } = useContext(ToggleContext);

  const handleCheckboxChange = (e, petId, petName) => {
    if (e.target.checked) {
      // Add 1 to the selectedPets.length when a checkbox is checked
      setSelectedPets([...selectedPets, petId]);
      setSelectedPetsName([...selectedPetsName, petName]);
    } else {
      // Remove the petId from the selectedPets array if it's unchecked
      setSelectedPets(selectedPets.filter((pet) => pet !== petId));
      setSelectedPetsName(selectedPetsName.filter((p) => p !== petName));
    }
  };

  const handleToggleViewPet = (id, petName) => {
    // กำหนดค่า petID เพื่อให้สามารถใช้ไปต่อในโค้ดอื่น
    setPetID(id);

    // กำหนดสถานะของ selectedPetId โดยให้มันเป็น null ถ้า pet ที่ถูกคลิกนั้นถูกเลือกอยู่แล้ว หรือเป็น id ของ pet นั้นถ้ามันยังไม่ถูกเลือก
    setSelectedPetId((prevSelectedPetId) =>
      prevSelectedPetId === id ? null : id
    );

    // ใช้ฟังก์ชันที่ให้คุณสามารถอัปเดต selectedPets ได้
    setSelectedPets((prevSelectedPets) => {
      if (prevSelectedPets.includes(id)) {
        return prevSelectedPets.filter((petId) => petId !== id);
      } else {
        return [...prevSelectedPets, id];
      }
    });

    // ใช้ฟังก์ชันที่ให้คุณสามารถอัปเดต selectedPetsName ได้
    setSelectedPetsName((prevSelectedPetsName) => {
      if (prevSelectedPetsName.includes(petName)) {
        return prevSelectedPetsName.filter((p) => p !== petName);
      } else {
        return [...prevSelectedPetsName, petName];
      }
    });
  };

  useEffect(() => {
    getAllPets();

    // console.log(isAllPetChange);
    // console.log(allpets);
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

  const handleDateChange = (newDate) => {
    setSelectedBookingDate(newDate);
  };

  const handleStartTimeChange = (newStartTime) => {
    setStartTime(newStartTime);
  };

  const handleEndTimeChange = (newEndTime) => {
    setEndTime(newEndTime);
  };

  const handlePetSelection = (selectedPets) => {
    setNumberOfSelectedPets(selectedPets);
  };

  const calculateDuration = (startTime, endTime) => {
    const startTimeObj = new Date(`2023-09-15 ${startTime}`);
    const endTimeObj = new Date(`2023-09-15 ${endTime}`);
    const duration = (endTimeObj - startTimeObj) / (60 * 60 * 1000);
    return duration;
  };

  const duration = calculateDuration(startTime, endTime);
  const total = duration * 200 + selectedPets.length * 300;

  const cardClasses = `pet-sitter-list-card shadow-custom2 w-[240px] h-[240px] my-6 mx-3 p-2 rounded-md flex flex-col justify-center items-center cursor-pointer border-2 bg-orange-200`;

  const handleNext = () => {
    if (selectedPets.length > 0) {
      navigate(`/booking/information`);
    } else {
      alert("select at least 1 pet");
    }
  };

  return (
    <div>
      <HeaderAuth />
      <section className="w-[100%] overflow-hidden relative bg-[#F5F5F5]">
        <div className="w-[90%] flex mx-auto">
          <div className="mt-6 mx-auto w-3/4 mr-8 mb-16">
            <div className="flex justify-center items-center h-[96px] bg-white mb-4 rounded-xl">
              <div className="flex items-center pr-12">
                <div className="bg-[#FF7037] text-[1.5rem] font-semibold text-white w-[3rem] h-[3rem] flex justify-center items-center rounded-full">
                  1
                </div>
                <p className="text-[1.2rem] ml-4">Your Pet</p>
              </div>
              <div className="flex items-center pr-12">
                <div className="bg-[#F6F6F9] text-[1.5rem] text-[#7B7E8F] font-semibold w-[3rem] h-[3rem] flex justify-center items-center rounded-full">
                  2
                </div>
                <p className="text-[1.2rem] ml-4 text-[#7B7E8F]">Information</p>
              </div>
              <div className="flex items-center pr-12">
                <div className="bg-[#F6F6F9] text-[1.5rem] text-[#7B7E8F] font-semibold w-[3rem] h-[3rem] flex justify-center items-center rounded-full">
                  3
                </div>
                <p className="text-[1.2rem] ml-4 text-[#7B7E8F]">Payment</p>
              </div>
            </div>

            {/* form */}
            <div className="bg-white h-[720px] w-full rounded-xl p-14 flex flex-col ">
              <div className="text-xl font-semibold px-10">
                <h1>Choose your pet</h1>
              </div>
              <div className="flex flex-wrap px-10 py-3 justify-start w-full ml-3  gap-x-10">
                {allpets.map((pet) => {
                  // Create a CSS class for the card based on whether the pet is selected or not
                  const cardClasses = `pet-card cursor-pointer mb-5 border-2 w-[240px] h-[240px] rounded-3xl flex flex-col justify-evenly items-center hover:border-primaryOrange4 ${
                    selectedPets.includes(pet.pet_id)
                      ? "border-primaryOrange4"
                      : "border-primaryGray5"
                  }`;

                  return (
                    <div
                      key={pet.pet_id}
                      onClick={() => {
                        if (pet.status_pet === false) {
                          handleToggleViewPet(pet.pet_id);
                        }
                      }}
                      className={`${cardClasses} ${
                        pet.status_pet === true
                          ? "disabled-pet opacity-70 bg-gray-200/50 cursor-not-allowed   hover:border-primaryGray5"
                          : ""
                      }`}
                      style={{ position: "relative" }}
                    >
                      {pet.status_pet === false ? (
                        <input
                          type="checkbox"
                          id={`checkbox-${pet.pet_id}`}
                          className={`absolute top-2 right-2 cursor-pointer checked-checkbox accent-orange-600 `}
                          value={pet.pet_id}
                          onChange={(e) => {
                            if (pet.status_pet === false) {
                              handleCheckboxChange(e, pet.pet_id, pet.petname);
                            }
                          }}
                          checked={selectedPets.includes(pet.pet_id)}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "20px",
                            width: "24px",
                            height: "24px",
                          }}
                          disabled={pet.status_pet} // ถ้า status_pet เป็น true จะทำให้ checkbox ไม่สามารถคลิกได้
                        />
                      ) : null}

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

                <Link to="/user/yourpet/:userId">
                  <div className="relative pet-card cursor-pointer mb-5 border-2  w-[240px] h-[240px] rounded-3xl flex flex-col justify-evenly items-center hover:border-primaryOrange4 bg-primaryOrange6">
                    <div className="flex items-center flex-col justify-center w-full h-full">
                      <div className=" cursor-pointer text-primaryOrange2">
                        <AddIcon />
                      </div>
                      <div className="pet-sitter-profile w-2/3 h-auto flex flex-col justify-around">
                        <div className="flex flex-row gap-5">
                          <div className="flex flex-col justify-center items-center w-full">
                            <h1 className="text-lg text-primaryOrange2">
                              Create a new pet
                            </h1>
                          </div>
                        </div>
                        <div className="flex flex-row gap-2"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className=" flex justify-between items-end ">
                <Link to={`/petsitterlist/view/${selectedPetsitterID}`}>
                  {" "}
                  {/* Updated link */}
                  <button className="bg-[#FFF1EC] text-[#FF7037] px-10 py-3 rounded-3xl font-bold ">
                    Back
                  </button>
                </Link>

                <button
                  onClick={handleNext}
                  className="bg-[#FF7037] text-white px-10 py-3 rounded-3xl font-bold "
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="w-1/4 mt-6 h-[484px] bg-white rounded-xl overflow-hidden">
            <BookingConfirmation
              selectedDate={selectedBookingDate}
              startTime={startTime}
              endTime={endTime}
              numberOfSelectedPets={numberOfSelectedPets}
              totalCost={total}
              selectedPets={selectedPets}
              allpets={allpets} // Pass the allpets array as a prop
            />
          </div>
        </div>

        <img
          className="absolute bottom-[25%] right-10"
          src={shapeBlue}
          alt=""
        />
        <img
          className="absolute bottom-[-14%] right-10"
          src={greenStar}
          alt=""
        />
      </section>
    </div>
  );
};

export default BookingYourPet;
