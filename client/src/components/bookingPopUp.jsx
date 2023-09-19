import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TimeRangePicker from "../components/TimeRange";

function BookingPopUp() {
  const handleClose = () => setOpen(false);
  return (
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
            X
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
          <TimeRangePicker />
        </div>
        <div className="mt-4 py-5 right-0">
          <button
            className="w-full bg-gradient-to-r from-primaryOrange2 to-primaryOrange3 hover:from-primaryOrange1 hover:to-primaryOrange2 text-white py-2 rounded-md font-semibold hover:shadow-md transition duration-300 ease-in-out"
            onClick={() => {
              handleClose();
              navigate("/booking/yourPet");
            }}
          >
            Continue
          </button>
        </div>
      </Box>
    </Modal>
  );
}
export default BookingPopUp;
