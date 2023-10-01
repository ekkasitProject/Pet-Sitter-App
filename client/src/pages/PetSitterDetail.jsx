import React, { useState, useEffect } from "react";
import LocationIcon from "../assets/icons/icon_location.svg";
import HeaderAuth from "../components/HeaderAuth";
import AdvancedCarousel from "../components/Carousel";
import useFilter from "../hooks/useFilter";
import icon_arrow1 from "../assets/icons/iconarrow1.svg";
import icon_arrow2 from "../assets/icons/iconarrow2.svg";
import calendarIcon from "../assets/icons/icon=calender.svg";
import clockIcon from "../assets/icons/icon=clock.svg";
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

const today = dayjs();
const tomorrow = dayjs().add(1, "day");

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
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 7); // Limit to the next 7 days

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
      <div className="py-5 bg-primaryGray6">
        <AdvancedCarousel />
      </div>

      <div className="flex p-5 bg-primaryGray6">
        <div className="flex-1 py-8 bg-primaryGray6 p-10">
          <h1 className="text-5xl font-bold text-black ">
            {petSitterDetail.pet_sitter_name}
          </h1>
          <section className="mt-4 py-10">
            <h2 className="text-xl font-semibold ">Introduction</h2>
            <p className="text-gray-700 mt-2">{petSitter.introduction}</p>
          </section>
          <section className="mt-8 py-2">
            <h2 className="text-xl font-semibold">Service</h2>
            <p className="text-gray-700 mt-2">{petSitterDetail.services}</p>
          </section>
          <section className="mt-8 py-2">
            <h3 className="text-xl font-semibold">My Place</h3>
            <p className="text-gray-700 mt-2">{petSitterDetail.my_place}</p>
          </section>
        </div>
        <div className="sticky bg-white m-4 rounded-2xl w-[416px] h-[550px] ">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl just h-full w-full ">
            <div className="flex items-center justify-center ">
              <img
                src={petSitter.image_profile}
                alt="profileImg"
                className="w-[160px] h-[160px] rounded-full"
              />
            </div>
            <div className="text-center mt-4 w-full">
              <h1 className="text-4xl font-bold">
                {petSitterDetail.pet_sitter_name}
              </h1>
              <div className="mt-2">
                <h2 className="text-xl font-semibold">{petSitter.username}</h2>
                <h2 className="text-lg text-green-500">
                  {petSitterDetail.experience} Years Exp.
                </h2>
              </div>
              <div className="flex items-center justify-center mt-2 p-5">
                <img
                  src={LocationIcon}
                  alt="locationIcon"
                  className="w-5 h-5"
                />
                <h3 className="text-gray-700 ml-2 text-lg">
                  {petSitterDetail.my_place}
                </h3>
              </div>
              <div className="mt-4 my-5 rounded-full flex flex-row items-center justify-center">
                {petSitterDetail.pet_type.map((pet, index) => (
                  <span className="mx-1" key={index}>
                    {handleChip(pet)}
                  </span>
                ))}
              </div>
              <hr className="border-primaryGray5 border-t-2 " />
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
                  <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[560px] bg-white border rounded-lg shadow-md py-4 ">
                    <div className="flex justify-between items-center px-8">
                      <h1 className="text-2xl font-bold mb-4 ">Booking</h1>
                      <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none "
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <hr className="border-gray-300 my-2" />
                    <div className="flex items-center justify-center flex-col my-3">
                      <div className="px-5 ">
                        <h2 className="text-gray-500 mb-2 ">
                          Select a date and time you want to schedule the
                          service.
                        </h2>
                      </div>
                      <div className="space-y-6 w-[440px] ">
                        <div className="flex flex-row ">
                          <img
                            src={calendarIcon}
                            alt="calendarIcon"
                            className="px-1"
                          />
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                      borderColor: "#AEB1C3",
                                    },
                                    "&:hover fieldset": {
                                      borderColor: "#FF7037",
                                    },
                                    "&.Mui-focused fieldset": {
                                      borderColor: "#FF7037",
                                    },
                                  },
                                }}
                                label=""
                                defaultValue={tomorrow}
                                minDate={tomorrow}
                                value={selectedDate}
                                onChange={handleDateChange}
                                className=" border rounded-md p-2 focus:ring focus:ring-blue-200 w-[450px]"
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </div>

                        <div className="flex items-center">
                          <div className="flex space-x-4">
                            <div className="flex flex-row items-center justify-between gap-1">
                              <div>
                                <img
                                  src={clockIcon}
                                  alt="Clock_Icon"
                                  className="px-1"
                                />
                              </div>
                              <select
                                className="border border-primaryGray4 rounded-md py-3 px-2 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 bg-white w-[180px] "
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
                            <div className="text-primaryGray4">
                              <h1>_</h1>
                            </div>
                            <div className="flex flex-col">
                              <select
                                className="border border-primaryGray4 rounded-md py-3 px-5 w-[180px] focus:ring-2 focus:ring-orange-200 focus:border-orange-500 bg-white "
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
                          className="rounded-full bg-gradient-to-r from-primaryOrange2 to-primaryOrange3 hover:from-primaryOrange1 hover:to-primaryOrange2 text-white py-2 font-semibold hover:shadow-md transition duration-300 ease-in-out w-[480px]"
                          onClick={() => {
                            handleClose();
                            navigate("/booking/yourPet", {
                              state: {
                                bookingDetails: {
                                  selectedBookingDate:
                                    selectedDate.format("YYYY-MM-DD"),
                                  startTime,
                                  endTime,
                                  petSitterName:
                                    petSitterDetail.pet_sitter_name,
                                  petSitterUsername: petSitter.username,
                                  petSitterId: petSitterDetail.petsitter_id,
                                },
                              },
                            });
                          }}
                        >
                          Continue
                        </button>
                      </div>
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
