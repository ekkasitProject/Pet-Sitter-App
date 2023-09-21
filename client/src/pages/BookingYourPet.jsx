import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import greenStar from "../assets/star/greenstar.svg";
import shapeBlue from "../assets/star/shapeblue.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import PetBookingCard from "../components/PetBookingCard";
import BookingConfirmation from "../components/BookingConfirmation";
import addIcon from "../assets/icons/addIcon.svg";
import fetchUserData from "../hooks/fetchUserData";
import { useNavigate } from "react-router-dom";
import { ToggleContext } from "./AuthenticatedApp";
import {
  ChipsOrange,
  ChipsPink,
  ChipsGreen,
  ChipsBlue,
} from "../components/Chips.jsx";

const BookingYourPet = (props) => {
  const [selectedBookingDate, setSelectedBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numberOfSelectedPets, setNumberOfSelectedPets] = useState(0);
 const [selectedPetId, setSelectedPetId] = useState(null); 
 
    const { getAllPets, isError, isLoading } = fetchUserData();
    const navigate = useNavigate();
    const [selectedPets, setSelectedPets] = useState([]);
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
      allpets,
      setAllpets,
    } = useContext(ToggleContext);
    
const handleCheckboxChange = (e, petId) => {
  // Find the pet object from a source (e.g., props, or some list in state)
const pet = allpets.find((p) => p.pet_id === petId);
  if (e.target.checked) {
    // Add the pet to the selectedPets array if it's checked
    setSelectedPets((prevPets) => [...prevPets, pet]);
  } else {
    // Remove the pet from the selectedPets array if it's unchecked
    setSelectedPets((prevPets) => prevPets.filter((p) => p.pet_id !== petId));
  }
};
const handleToggleViewPet = (e, id) => {
  setPetID(id);
  setToggleViewPet(true);
  setSelectedPetId((prevSelectedPetId) =>
    prevSelectedPetId === id ? null : id
  );

  // Declare and initialize isPetSelected as a boolean variable
  let isPetSelected = false;

  // Check if the pet is already selected
  if (selectedPets.includes(id)) {
    isPetSelected = true;
    // If it's selected, remove it from the array
    setSelectedPets(selectedPets.filter((petId) => petId !== id));
  } else {
    // If it's not selected, add it to the array
    setSelectedPets([...selectedPets, id]);
  }
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
  const total = duration * 200 * numberOfSelectedPets;

  
  const cardClasses = `pet-sitter-list-card shadow-custom2 w-[240px] h-[240px] my-6 mx-3 p-2 rounded-md flex flex-col justify-center items-center cursor-pointer border-2 bg-orange-200`;

  return (
    <div>
      <Header />
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
            <div className="bg-white h-[720px] rounded-xl p-12">
              <div className="flex flex-wrap justify-start w-full gap-20 ml-3 ">
                {allpets.map((pet) => {
                  // Step 4: Conditionally apply the CSS class based on selection
                  const cardClasses = `pet-card cursor-pointer mb-5 border-2 w-[240px] h-[240px] rounded-3xl flex flex-col justify-evenly items-center hover:border-primaryOrange4 ${
                    selectedPets.includes(pet.pet_id)
                      ? "border-primaryOrange4"
                      : "border-primaryGray5"
                  }`;

                  return (
                    <div
                      key={pet.pet_id}
                      onClick={() => handleToggleViewPet(pet.pet_id)}
                      className={cardClasses}
                      style={{ position: "relative" }}
                    >
                      <input
                        type="checkbox"
                        id={`checkbox-${pet.pet_id}`}
                        className="absolute top-2 right-2 cursor-pointer checked-checkbox accent-orange-500"
                        value={pet.pet_id}
                        onChange={(e) => handleCheckboxChange(e, pet.pet_id)}
                        checked={selectedPets.includes(pet.pet_id)}
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "20px",
                          width: "24px",
                          height: "24px",
                        }}
                        sx={{
                          color: "#DCDFED",
                          "&.Mui-checked": {
                            color: "#FF7037",
                          },
                        }}
                      />
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
                  <div className="relative pet-card cursor-pointer mb-5 border-2  w-[240px] h-[250px] rounded-3xl flex flex-col justify-evenly items-center hover:border-primaryOrange4 bg-orange-200">
                    <div className="flex items-center flex-col justify-center w-full h-full">
                      <div className=" cursor-pointer">
                        <img
                          src={addIcon}
                          className="rounded-lg w-[104px] h-[104px] object-fill"
                          alt="pet sitter picture"
                        />
                      </div>
                      <div className="pet-sitter-profile w-2/3 h-auto pl-10 flex flex-col justify-around">
                        <div className="flex flex-row gap-5">
                          <div className="flex flex-col justify-center w-2/3">
                            <h1 className="text-lg">Create a new pet</h1>
                          </div>
                        </div>
                        <div className="flex flex-row gap-2"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className=" flex justify-between">
                <Link to={`/petsitterlist/view/${props.petsisterId}`}>
                  {" "}
                  {/* Updated link */}
                  <button className="bg-[#FFF1EC] text-[#FF7037] px-10 py-3 rounded-3xl font-bold">
                    Back
                  </button>
                </Link>
                <Link to="/booking/information">
                  <button className="bg-[#FF7037] text-white px-10 py-3 rounded-3xl font-bold">
                    Next
                  </button>
                </Link>
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
