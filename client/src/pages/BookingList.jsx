import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import SideBarPetsitter from "../components/SideBarPetsitter";
import HeaderPetsitter from "../components/HeaderPetsitter";
import { SearchIcon } from "../components/Icons";

function BookingList() {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="w-screen min-h-screen flex flex-row justify-center font-satoshi">
        <SideBarPetsitter />
        <div className=" w-5/6 h-auto flex flex-col items-center ">
          <HeaderPetsitter />
          <div className="min-h-[90%] w-full px-14 flex flex-col pt-4 pb-14 bg-[#F6F6F9]">
            <div className="h-[100px] w-full flex justify-between items-center ">
              <div className="text-headLine3">Booking List</div>

              <div className="flex flex-row gap-2 items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border-primaryGray5 border-2 rounded-lg w-[250px] h-[45px] text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3 "
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <div className="fill-primaryGray4 text-primaryGray4 absolute top-3 right-3">
                    <SearchIcon />
                  </div>
                </div>
                <div className="  flex items-center">
                  <select
                    id="status"
                    name="status"
                    className="w-[250px] h-[45px] text-primaryGray4  border-primaryGray5 border-2 rounded-lg py-2 px-3  focus:border-primaryOrange2 focus:outline-none"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option disabled value="">
                      All status
                    </option>
                    <option value="Success">Success</option>
                    <option value="Waiting for service">
                      Waiting for service
                    </option>
                    <option value="Canceled">Canceled</option>
                    <option value="In service">In service</option>
                    <option value="Waiting for confirm">
                      Waiting for confirm
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="h-auto w-full flex flex-col gap-1 mt-1">
              <div className="bg-black rounded-t-2xl px-5 text-white w-full h-[50px] flex flex-row items-center justify-between">
                <div className="w-3/12">Pet Owner Name</div>
                <div className="w-1/12">Pet(s)</div>
                <div className="w-1/12">Duration</div>
                <div className="w-3/12">Booked Date</div>
                <div className="w-3/12">Status</div>
              </div>
              {/*map divนี้ */}
              <div
                onClick={() => {
                  navigate("/petsitter/bookinglistdetail/:petsitterId");
                }}
                className="cursor-pointer bg-white px-5 w-full h-[70px] flex flex-row items-center justify-between"
              >
                <div className="w-3/12">Pet Owner Name</div>
                <div className="w-1/12">2</div>
                <div className="w-1/12">3.5 hours</div>
                <div className="w-3/12">25 Sep 7.30 AM - 10.00 AM</div>
                <div className="w-3/12">
                  {" "}
                  Waiting for service
                  {/*
              <span
                        className={
                          booking.status_booking == "Success"
                            ? "text-secondaryGreen1"
                            : booking.status_booking == "In service"
                            ? "text-secondaryBlue1"
                            : booking.status_booking == "Waiting for confirm"
                            ? "text-secondaryPink1"
                            : booking.status_booking == "Waiting for service"
                            ? "text-amber-500"
                            : booking.status_booking == "Canceled"
                            ? "text-red-500"
                            : null
                        }
                      >
                        ● {booking.status_booking}
                      </span>
              */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingList;
