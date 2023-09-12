import React, { useState, useEffect } from "react";
import LocationIcon from "../assets/icons/icon_location.svg";
import Header from "../components/Header";
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

const PetSitterDetail = () => {
  const { petsister_id } = useParams();
  const { petSitter, getPetSitterById } = useFilter();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(dayjs("2022-04-17"));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_ACCESS_TOKEN' with your actual access token or API key
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:4000/petsitteruser/${petsister_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getPetSitterById(petsister_id); // Assuming this updates the petSitter state
        setLoading(false);
      } catch (error) {
        // Handle error here
        console.error("Error fetching pet sitter data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [petsister_id, getPetSitterById]);

  const handleChip = (pet) => {
    // ... Your existing code for handleChip function
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  if (loading) {
    // Optionally, you can render a loading indicator here
    return <div>Loading...</div>;
  }

  if (
    !petSitter ||
    !petSitter.petsisterdetail ||
    petSitter.petsisterdetail.length === 0
  ) {
    // Handle the case when petSitter data is not available or empty
    return <div>No data available for this pet sitter.</div>;
  }

  const petSisterDetail = petSitter.petsisterdetail[0];

  return (
    <div className="flex-row">
      <Header />
      <div>
        <AdvancedCarousel />
      </div>

      <div className="flex p-10 bg-white">
        <div className="flex-1 py-8 bg-white p-10">
          <h1 className="text-5xl font-bold text-black">
            {petSisterDetail.pet_sister_name}
          </h1>
          <section className="mt-4">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p className="text-gray-700 mt-2">{petSitter.introduction}</p>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold">Service</h2>
            <p className="text-gray-700 mt-2">{petSisterDetail.services}</p>
          </section>
          <section className="mt-8">
            <h3 className="text-xl font-semibold">My Place</h3>
            <p className="text-gray-700 mt-2">{petSisterDetail.my_place}</p>
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
                {petSisterDetail.pet_sister_name}
              </h1>
              <div className="mt-2">
                <h2 className="text-lg">{petSitter.username}</h2>
                <h2 className="text-sm">1.5 Years Exp.</h2>
              </div>
              <div className="flex items-center justify-center mt-2 p-5">
                <img
                  src={LocationIcon}
                  alt="locationIcon"
                  className="w-5 h-5"
                />
                <h3 className="text-gray-700 ml-2">
                  {petSisterDetail.my_place}
                </h3>
              </div>
              <div className="mt-4 ">
                {petSisterDetail.pet_type.map((pet, index) => (
                  <span className="mx-1" key={index}>
                    {handleChip(pet)}
                  </span>
                ))}
              </div>

              <div className="p-5 flex justify-center">
                <button
                  className="w-[300px] h-[50px] py-2 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3 "
                  onClick={handleOpen}
                >
                  Book Now
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white border rounded-lg shadow-md p-4">
                    <div>
                      <h1 className="text-2xl font-bold mb-4">Booking</h1>
                    </div>
                    <hr className="border-gray-300 my-4" />
                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Select a date and time for your booking
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePiker"]}>
                          <DatePicker
                            label=""
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <TimeRangePicker />
                    </div>
                    <div className="mt-4">
                      <button
                        className="w-full bg-gradient-to-r from-primaryOrange2 to-primaryOrange3 hover:from-primaryOrange1 hover:to-primaryOrange2 text-white py-2 rounded-md font-semibold hover:shadow-md transition duration-300 ease-in-out"
                        onClick={() => {
                          handleClose();
                          navigate("/booking");
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
};

export default PetSitterDetail;
