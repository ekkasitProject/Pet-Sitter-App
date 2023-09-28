import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import SideBarPetsitter from "../components/SideBarPetsitter";
import HeaderPetsitter from "../components/HeaderPetsitter";
import { SearchIcon } from "../components/Icons";
import fetchUserData from "../hooks/fetchUserData";
import {
  calculateDuration,
  formatDate,
  formatTime,
} from "../components/calculateDate";
import axios from "axios";

function BookingList() {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { bookingList, setBookingList, getBookingList, isError, isLoading } =
    fetchUserData();

  const {
    petOwnerID,
    setPetOwnerID,
    bookingID,
    setBookingID,
    petSitterID,
    setPetSitterID,
    index,
    setIndex,
  } = useContext(ToggleContext);

  useEffect(() => {
    getBookingList();
    // console.log(petsitterProfile);
  }, []);

  const duration = (start, end) => {
    const startTime = new Date(`2023-09-15 ${start}`);
    const endTime = new Date(`2023-09-15 ${end}`);
    const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
    return durationInHours;
  };

  const filteredSearchData = bookingList.filter(
    (searchItem) =>
      searchItem.petowner.username
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      searchItem.status_booking.toLowerCase().includes(status.toLowerCase())
  );
  const isBookingTimeNotConfirm = async (bookingID, bookingStatus) => {
    if (bookingStatus === "Waiting for confirm") {
      try {
        const token = localStorage.getItem("token");
        const data = {
          bookingId: bookingID,
        };
        await axios.put(
          `http://localhost:6543/booking/petsitter/${petSitterID}/cancel`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
      console.log("petsitter not confirm during booking time");
      return null;
    } else {
      return null;
    }
  };

  const isBookingTimePassed = async (bookingID, bookingStatus) => {
    if (bookingStatus === "In service") {
      try {
        const token = localStorage.getItem("token");
        const data = {
          bookingId: bookingID,
        };
        await axios.put(
          `http://localhost:6543/booking/petsitter/${petSitterID}/end-service`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    return null;
  };

  const isDuringBookingTime = async (bookingID, bookingStatus) => {
    if (bookingStatus === "Waiting for service") {
      try {
        const token = localStorage.getItem("token");
        const data = {
          bookingId: bookingID,
        };
        await axios.put(
          `http://localhost:6543/booking/petsitter/${petSitterID}/in-service`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  };

  bookingList.map(async (booking, index) => {
    const currentTime = new Date().toISOString();
    if (currentTime > booking.endTime) {
      await isBookingTimePassed(booking.booking_id, booking.status_booking);
    }
    if (currentTime > booking.startTime) {
      if (currentTime >= booking.startTime && currentTime <= booking.endTime) {
        await isDuringBookingTime(booking.booking_id, booking.status_booking);
      } else {
        await isBookingTimeNotConfirm(
          booking.booking_id,
          booking.status_booking
        );
      }
    }
  });

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
                    <option value="">All status</option>
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
              {filteredSearchData.map((booking, index) => {
                return (
                  <div
                    key={booking.booking_id}
                    onClick={() => {
                      setPetOwnerID(booking.petowner.petowner_id);
                      setBookingID(booking.booking_id);
                      setIndex(index);
                      navigate(
                        `/petsitter/bookinglistdetail/${booking.petowner.petowner_id}/${booking.booking_id}`
                      );
                    }}
                    className="cursor-pointer bg-white px-5 w-full h-[70px] flex flex-row items-center justify-between"
                  >
                    <div className="w-3/12">{booking.petowner.username}</div>
                    <div className="w-1/12">{booking.petdetails.length}</div>
                    <div className="w-1/12">
                      {calculateDuration(booking.startTime, booking.endTime)}{" "}
                    </div>
                    <div className="w-3/12">
                      {formatDate(booking.startTime)}{" "}
                      {formatTime(booking.startTime)} -{" "}
                      {formatTime(booking.endTime)}
                    </div>
                    <div className="w-3/12">
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingList;
