import React, { useState } from "react";
import Header from "../components/Header";
import greenStar from "../assets/star/greenstar.svg";
import shapeBlue from "../assets/star/shapeblue.svg";
import { Link } from "react-router-dom";
import PetBookingCard from "../components/PetBookingCard";
import BookingConfirmation from "../components/BookingConfirmation";
import addIcon from "../assets/icons/addIcon.svg";

const BookingYourPet = () => {
  const [selectedBookingDate, setSelectedBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numberOfSelectedPets, setNumberOfSelectedPets] = useState(0);

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

  // Calculate duration and total cost based on user selections
  const calculateDuration = (startTime, endTime) => {
    // Replace this date format with the one you are using
    const startTimeObj = new Date(`2023-09-15 ${startTime}`);
    const endTimeObj = new Date(`2023-09-15 ${endTime}`);

    // Calculate the duration in hours
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
              <form action="">
                <div className="flex flex-wrap justify-center gap-4 p-4">
                  <PetBookingCard />
                  <PetBookingCard />
                  {/* Add more pet selection options */}
                  <Link to="/booking/yourPet">
                    {" "}
                    {/* Updated link */}
                    <div className="relative">
                      <div className={cardClasses}>
                        <div className="bg-orange-200 pet-sitter-image-card w-[104px] h-[104px] cursor-pointer">
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
                <div className="mt-[8rem] flex justify-between">
                  <Link to="/">
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
              </form>
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
