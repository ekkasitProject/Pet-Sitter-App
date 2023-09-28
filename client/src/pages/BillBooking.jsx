import HeaderAuth from "../components/HeaderAuth";
import greenCircle from "../assets/images/bill/greencircle.svg";
import dogFoot from "../assets/images/bill/Dogfoot.svg";
import blueStar from "../assets/images/bill/blueStar.svg";
import catYellow from "../assets/images/bill/catyellow.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToggleContext } from "./AuthenticatedApp";
import React, { useState, useContext, useEffect } from "react";
import {
  calculateDuration,
  formatDate,
  formatTime,
} from "../components/calculateDate";
import axios from "axios";

const BillBooking = () => {
  const navigate = useNavigate();
  const duration = (start, end) => {
    const startTime = new Date(`2023-09-15 ${start}`);
    const endTime = new Date(`2023-09-15 ${end}`);
    const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
    return durationInHours;
  };

  const {
    selectedPets,
    setSelectedPets,
    petOwnerID,
    setPetOwnerID,
    messageAdditional,
    setMessageAdditional,
    selectedPetsitterID,
    setSelectedPetsitterID,
    selectedPetsitterName,
    setSelectedPetsitterName,
    selectedPetsitterUser,
    setSelectedPetsitterUser,
    selectedDate,
    setSelectedDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    prices,
    setPrices,
    selectedTimes,
    setSelectedTimes,
    selectedPetsName,
    setSelectedPetsName,
  } = useContext(ToggleContext);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const [billData, setBillData] = useState({});
  console.log(billData);

  const fetchBooking = async () => {
    const res = await axios.get(
      `http://localhost:6543/booking/petowner/${petOwnerID}`
    );
    // console.log(res.data.bookings);
    const bookings = res.data.bookings;

    if (bookings.length > 0) {
      const lastBooking = bookings.reduce((acc, current) => {
        // เลือกตัวที่มี timestamp มากที่สุดเป็นตัวสุดท้าย
        return acc.timestamp > current.timestamp ? acc : current;
      });

      // เรียกใช้งาน fetchBookingId และส่ง lastBookingId ไปยังฟังก์ชัน
      fetchBookingId(lastBooking); // แทน lastBooking.id ด้วยค่าที่ต้องการส่งไป
    } else {
      console.log("ไม่มีการจอง");
    }
  };

  const fetchBookingId = async (lastBookingId) => {
    const resBookingId = await axios.get(
      `http://localhost:6543/booking/petowner/${petOwnerID}/${lastBookingId.booking_id}`
    );
    // console.log(resBookingId.data.booking);
    setBillData(resBookingId.data.booking);
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div className="w-full relative">
      <HeaderAuth />
      <div className="w-[50%] mx-auto">
        <div className="mx-auto w-[584px] mt-6 h-[560px] bg-white rounded-xl drop-shadow-lg overflow-hidden">
          <div className="flex flex-col justify-center items-center mx-auto px-4 py-8 bg-black text-white ">
            <h2 className="text-3xl font-medium  ">Thank you For Booking</h2>
            <p className="mt-2 text-[#AEB1C3] tracking-wide">
              We will send your booking information to Pet Sitter.
            </p>
          </div>
          <div className="px-8 mt-6">
            <p className="text-[#AEB1C3] tracking-wide">
              Transaction Date: {billData.transaction_date}
            </p>
            <p className="text-[#AEB1C3] tracking-wide">
              Transaction No. {billData.transaction_no}
            </p>
          </div>
          <div className="px-8 mt-6">
            <h3 className="text-[#7B7E8F] tracking-wide">Pet Sitter:</h3>
            <p className="tracking-wide text-[#3A3B46]">
              {selectedPetsitterName} By {selectedPetsitterUser}
            </p>
          </div>

          <div className="px-8 mt-6  flex items-center">
            <div className="">
              <h3 className="text-[#7B7E8F] tracking-wide">Date & Time:</h3>
              <p className="tracking-wide text-[#3A3B46]">
                {formatDate(selectedDate)} | {startTime} - {endTime}
              </p>
            </div>
            <div className="ml-12 mt-6">
              <h3 className="text-[#7B7E8F] tracking-wide">Duration:</h3>
              <p className="tracking-wide text-[#3A3B46]">
                {duration(startTime, endTime)} hours
              </p>
            </div>
          </div>

          <div className="px-8 mt-4">
            <h3 className="text-[#7B7E8F] tracking-wide">Pet:</h3>
            <p className="tracking-wide text-[#3A3B46]">
              {selectedPetsName.map((pet, index) => {
                return (
                  <span key={index}>
                    {pet}
                    {index < selectedPetsName.length - 1 && ", "}
                  </span>
                );
              })}
            </p>
            <hr className="mt-6" />
          </div>
          <div className="py-8  mt-2s  flex  justify-between">
            <p className="mx-8 ">Total</p>
            <p className="mx-8 ">{prices} THB</p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-6">
          <div className="mt-4 flex  px-8 pb-4">
            <button
              onClick={() => navigate(`/user/history/${petOwnerID}`)}
              className="px-6 py-3 mr-2 text-sm bg-[#FFF1EC]  text-[#FF7037]  rounded-full font-semibold"
            >
              Booking Detail
            </button>

            <Link to="/">
              <button className="px-6 py-3 bg-[#FF7037] text-sm text-white rounded-full font-semibold">
                Back To Home
              </button>
            </Link>
          </div>
        </div>
      </div>
      <img className="absolute top-[20%] left-4" src={greenCircle} alt="" />
      <img className="absolute top-[38%] left-[10%]" src={dogFoot} alt="" />
      <img className="absolute bottom-[40%] right-[5%]" src={blueStar} alt="" />
      <img className="absolute bottom-[5%] right-[5%]" src={catYellow} alt="" />
    </div>
  );
};

export default BillBooking;
