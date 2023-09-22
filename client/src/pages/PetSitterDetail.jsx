import React, { useState, useEffect } from "react";
import LocationIcon from "../assets/icons/icon_location.svg";
import HeaderAuth from "../components/HeaderAuth";
import AdvancedCarousel from "../components/Carousel";
import useFilter from "../hooks/useFilter";
import {
  ChipsOrange,
  ChipsPink,
  ChipsGreen,
  ChipsBlue,
} from "../components/Chips.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Datetime from "../components/dateTime";
import TimeRangePicker from "../components/TimeRange";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ToggleContext } from "./AuthenticatedApp";
import { CloseIcon } from "../components/Icons.jsx";

function PetSitterDetail() {
  const {
    selectedDate,
    setSelectedDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    selectedTimes,
    setSelectedTimes,
    loading,
    setLoading,
    open,
    setOpen,
    bookingDetails,
    setBookingDetails,
    selectedPetsitterID,
    setSelectedPetsitterID,
    selectedPetsitterName,
    setSelectedPetsitterName,
    selectedPetsitterUser,
    setSelectedPetsitterUser,
  } = useContext(ToggleContext);

  const { petsitter_id } = useParams();
  const { petSitter, getPetSitterById } = useFilter();
  const handleOpen = () => setOpen(true);

  //console.log(startTime,endTime,selectedDate);

  const handleClose = () => {
    // Generate booking details based on the selected date, start time, and end time
    const bookingDetails = {
      selectedBookingDate: selectedDate.format("YYYY-MM-DD"),
      startTime,
      endTime,
      numberOfSelectedPets: 0, // You can set the number of selected pets here
    };

    // Update the booking details state with the generated details
    setBookingDetails(bookingDetails);

    // Close the modal
    setOpen(false);

    // Navigate to the booking confirmation page with the booking details
    // navigate("/booking/yourPet", { state: { bookingDetails } });
  };
  const navigate = useNavigate();
  const generateTimeOptions = () => {
    const timeOptions = [];
    const amPmOptions = ["AM", "PM"];

    for (let amPm of amPmOptions) {
      for (let hours = 0; hours < 12; hours++) {
        for (let minutes = 0; minutes < 60; minutes += 30) {
          const formattedHours = hours.toString().padStart(2, "0");
          const formattedMinutes = minutes.toString().padStart(2, "0");
          const time = `${formattedHours}:${formattedMinutes} ${amPm}`;
          timeOptions.push(time);
        }
      }
    }

    return timeOptions;
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    const selectedEndTime = e.target.value;

    // Check if selected end time is greater than or equal to the start time
    if (compareTimes(selectedEndTime, startTime) >= 0) {
      setEndTime(selectedEndTime);
    }
  };

  const handleTimeSelection = (e) => {
    const selectedTime = e.target.value;

    // Check if the selected time is not in the selectedTimes array
    if (!selectedTimes.includes(selectedTime)) {
      setSelectedTimes([...selectedTimes, selectedTime]);
    }
  };

  // Helper function to compare two time strings (HH:mm AM/PM)
  const compareTimes = (time1, time2) => {
    const time1Parts = time1.split(" ");
    const time2Parts = time2.split(" ");

    const time1AMPM = time1Parts[1];
    const time2AMPM = time2Parts[1];

    if (time1AMPM !== time2AMPM) {
      // If the AM/PM is different, compare based on it
      return time1AMPM.localeCompare(time2AMPM);
    } else {
      // If the AM/PM is the same, compare based on the time in 24-hour format
      const time1WithoutAMPM = time1Parts[0];
      const time2WithoutAMPM = time2Parts[0];

      return time1WithoutAMPM.localeCompare(time2WithoutAMPM);
    }
  };
  //แก้ด้วยfetch 2 รอบ
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_ACCESS_TOKEN' with your actual access token or API key
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:6543/petsitteruser/${petsitter_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getPetSitterById(petsitter_id); // Assuming this updates the petSitter state
        setLoading(false);
      } catch (error) {
        // Handle error here
        console.error("Error fetching pet sitter data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  const handleChip = (pet) => {
    // ... Your existing code for handleChip function
  };
  if (loading) {
    // Optionally, you can render a loading indicator here
    return <div>Loading...</div>;
  }
  if (
    !petSitter ||
    !petSitter.petsitterdetail ||
    petSitter.petsitterdetail.length === 0
  ) {
    // Handle the case when petSitter data is not available or empty
    return <div>No data available for this pet sitter.</div>;
  }
  const petSitterDetail = petSitter.petsitterdetail[0];

  const handleContinue = () => {
    setSelectedPetsitterID(petSitterDetail.petsitter_id);
    setSelectedPetsitterName(petSitterDetail.pet_sitter_name);
    setSelectedPetsitterUser(petSitter.username);
    console.log(selectedPetsitterID);
  };

  return (
    <div className="flex-row">
      <HeaderAuth />
      <div>
        <AdvancedCarousel />
      </div>

      <div className="flex p-10 bg-white">
        <div className="flex-1 py-8 bg-white p-10">
          <h1 className="text-5xl font-bold text-black">
            {petSitterDetail.pet_sitter_name}
          </h1>
          <section className="mt-4">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p className="text-gray-700 mt-2">{petSitter.introduction}</p>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold">Service</h2>
            <p className="text-gray-700 mt-2">{petSitterDetail.services}</p>
          </section>
          <section className="mt-8">
            <h3 className="text-xl font-semibold">My Place</h3>
            <p className="text-gray-700 mt-2">{petSitterDetail.my_place}</p>
          </section>
        </div>

        <div className="sticky w-3/12 border shadow-lg rounded-lg">
          <div className="flex-2 bg-white py-6 p-5 ">
            <div className="flex items-center justify-center">
              <img
                src={petSitter.image_profile}
                alt="profileImg"
                className="w-32 h-32"
              />
            </div>
            <div className="text-center mt-4">
              <h1 className="text-2xl font-semibold">
                {petSitterDetail.pet_sitter_name}
              </h1>
              <div className="mt-2">
                <h2 className="text-lg">{petSitter.username}</h2>
                <h2 className="text-sm">
                  {petSitterDetail.experience} Years Exp.
                </h2>
              </div>
              <div className="flex items-center justify-center mt-2 p-5">
                <img
                  src={LocationIcon}
                  alt="locationIcon"
                  className="w-5 h-5"
                />
                <h3 className="text-gray-700 ml-2">
                  {petSitterDetail.my_place}
                </h3>
              </div>
              <div className="mt-4 ">
                {petSitterDetail.pet_type.map((pet, index) => (
                  <span className="mx-1" key={index}>
                    {handleChip(pet)}
                  </span>
                ))}
              </div>

              <div className="p-5 flex justify-center">
                <button
                  className="w-[300px] h-[50px] py-2 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3 "
                  onClick={() => {
                    handleOpen();
                    handleContinue();
                  }}
                  // onClick={handleOpen}
                >
                  Book Now
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-560 h-438 bg-white border rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl font-bold mb-4">Booking</h1>
                      <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <hr className="border-gray-300 my-4" />
                    <div>
                      <h2 className="text-sm font-semibold text-gray-500 mb-2">
                        Select a date and time for your booking
                      </h2>
                    </div>
                    <div className="space-y-6">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label=""
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <div>
                        <div className="flex space-x-4">
                          <div className="flex flex-col">
                            <label className="text-sm text-gray-600">
                              Start Time:
                            </label>
                            <select
                              className="border rounded-md py-3 px-12 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
                              value={startTime}
                              onChange={handleStartTimeChange}
                            >
                              {generateTimeOptions().map((time) => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm text-gray-600">
                              End Time:
                            </label>
                            <select
                              className="border rounded-md py-3 px-12 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
                              value={endTime}
                              onChange={handleEndTimeChange}
                            >
                              {generateTimeOptions().map((time) => (
                                <option
                                  key={time}
                                  value={time}
                                  disabled={selectedTimes.includes(time)}
                                >
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 py-5 right-0">
                      <button
                        className="w-full bg-gradient-to-r from-primaryOrange2 to-primaryOrange3 hover:from-primaryOrange1 hover:to-primaryOrange2 text-white py-2 rounded-md font-semibold hover:shadow-md transition duration-300 ease-in-out"
                        onClick={() => {
                          handleClose();
                          navigate("/booking/yourPet", {
                            state: {
                              bookingDetails: {
                                selectedBookingDate:
                                  selectedDate.format("YYYY-MM-DD"),
                                startTime,
                                endTime,
                                petSitterName: petSitterDetail.pet_sitter_name,
                                petSitterUsername: petSitterDetail.username,
                                petSitterId: petSitterDetail.petsitter_id,
                              },
                            },
                          });
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetSitterDetail;
