import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import SideBarPetsitter from "../components/SideBarPetsitter";
import HeaderPetsitter from "../components/HeaderPetsitter";
import { BackIcon, EyeIcon } from "../components/Icons";
import profile_user from "../assets/icons/profile.svg";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import closeIcon from "../assets/icons/iconClose.svg";
import fetchUserData from "../hooks/fetchUserData";
import BookingListModal from "../components/BookingListModal";
import {
  formatDate,
  formatTime,
  calculateDuration,
} from "../components/calculateDate";
import {
  ChipsOrange,
  ChipsPink,
  ChipsGreen,
  ChipsBlue,
} from "../components/Chips.jsx";

function BookingListDetail() {
  const {
    petID,
    setPetID,
    petOwnerID,
    setPetOwnerID,
    bookingID,
    setBookingID,
    petSitterID,
    setPetSitterID,
    bookingListDetails,
    setBookingListDetails,
    bookingList,
    setBookingList,
    index,
    OpenPetModal,
    setOpenPetModal,
    setIndex,
  } = useContext(ToggleContext);
  const {
    getBookingList,
    isError,
    isLoading,
    confirmBooking,
    rejectBooking,
    inServiceBooking,
    successBooking,
    petsitterProfile,
    setPetsitterProfile,
    getPetsitterProfile,
  } = fetchUserData();
  const [allpets, setAllpets] = useState([]);
  const [booking, setBooking] = useState({});
  const [toggleViewPet, setToggleViewPet] = useState(false);
  //const [petID, setPetID] = useState("");
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [viewProfileModalOpen, setViewProfileModalOpen] = useState(false);
  /// const [OpenPetModal, setOpenPetModal] = useState(false);
  // reject popup
  const handleOpenRejectModal = () => setRejectModalOpen(true);
  const handleCloseRejectModal = () => setRejectModalOpen(false);
  // open user profile
  const handleOpenViewProfileModal = () => setViewProfileModalOpen(true);
  const handleCloseViewProfileModal = () => setViewProfileModalOpen(false);
  // open pet profile

  const handleClosePetModal = () => setOpenPetModal(false);
  const handleOpenPetModal = (ownerId, petId) => {
    setPetID(petId);
    setPetOwnerID(ownerId);
    setOpenPetModal(true);
    //  console.log(bookingID);
    //console.log(petId);
    // console.log(ownerId);
  };

  const navigate = useNavigate();

  const handleToggleViewPet = (id) => {
    setPetID(id);
    setToggleViewPet(true);
    // console.log(petID);
  };
  /*
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      petDetailIds: selectedPets,
      petSitterId: selectedPetsitterID,
      datetime: newStartDate,
      startTime: newStartDate,
      endTime: newEndDate,
      additionalMessage: messageAdditional,
      totalPrice: prices,
    };
    submitBooking(data);
    console.log(data);
    navigate(`/booking/bill`);
  };*/

  const handleConfirmReject = () => {
    rejectBooking();
  };

  const handleConfirmBooking = () => {
    confirmBooking();
  };

  const handleInServiceBooking = () => {
    inServiceBooking();
  };

  const handleSucceedBooking = () => {
    successBooking();
  };

  const getBookingDetail = (bookingList, bookingID) => {
    const newArray = bookingList.filter((booking) => {
      return booking.booking_id == bookingID;
    });
    console.log(newArray[0]);
    setBooking(newArray[0]);
  };

  useEffect(() => {
    // getPetsitterProfile();
    getBookingList();
    //getBookingDetail(bookingList, bookingID);
  }, []);

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

  return (
    <>
      <div className="w-screen min-h-screen flex flex-row justify-center font-satoshi">
        <SideBarPetsitter />
        <div className=" w-5/6 h-auto flex flex-col items-center ">
          <HeaderPetsitter />
          <div className="min-h-[90%] w-full px-14 flex flex-col pt-4 pb-14 bg-[#F6F6F9]">
            <div className="h-[100px] w-full flex justify-between items-center ">
              <div className="text-primaryGray3 flex flex-row items-center gap-3">
                <button
                  onClick={() => {
                    navigate(`/petsitter/bookinglist/${petSitterID}`);
                  }}
                >
                  <BackIcon />
                </button>
                <div className="text-headLine3 text-black">
                  {/*petsitterProfile.username*/}
                </div>
                <div className="">
                  <span
                    className={
                      bookingList[index].status_booking == "Success"
                        ? "text-secondaryGreen1"
                        : bookingList[index].status_booking == "In service"
                        ? "text-secondaryBlue1"
                        : bookingList[index].status_booking ==
                          "Waiting for confirm"
                        ? "text-secondaryPink1"
                        : bookingList[index].status_booking ==
                          "Waiting for service"
                        ? "text-amber-500"
                        : bookingList[index].status_booking == "Canceled"
                        ? "text-red-500"
                        : null
                    }
                  >
                    ● {bookingList[index].status_booking}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                {bookingList[index].status_booking == "Success" ? (
                  <button className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray5 disabled:text-primaryGray3">
                    Success
                  </button>
                ) : bookingList[index].status_booking == "In service" ? (
                  <button
                    className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray5 disabled:text-primaryGray3"
                    onClick={handleSucceedBooking}
                  >
                    Success
                  </button>
                ) : bookingList[index].status_booking ==
                  "Waiting for confirm" ? (
                  <>
                    <div>
                      <button
                        onClick={handleOpenRejectModal}
                        className="w-[150px] h-[50px] py-2  bg-primaryOrange6 rounded-full active:text-primaryOrange1 text-primaryOrange2 hover:text-primaryOrange3 disabled:bg-primaryGray6 disabled:text-primaryGray5"
                      >
                        Reject Booking
                      </button>
                      <button
                        className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray5 disabled:text-primaryGray3"
                        onClick={handleConfirmBooking}
                      >
                        Confirm Booking
                      </button>
                      <Modal
                        open={rejectModalOpen}
                        onClose={handleCloseRejectModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box className="absolute top-1/2 left-1/2  w-[400px] ">
                          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black bg-opacity-30">
                            <div className="bg-white  rounded-xl shadow-lg">
                              <h2 className="text-xl font-semibold px-8 py-4">
                                Reject Confirmation
                              </h2>
                              <hr />
                              <p className="px-8 py-4 text-[#7B7E8F]">
                                Are you sure to reject this pet sitter?
                              </p>
                              <div className="mt-4 flex justify-between px-8 pb-4">
                                <button
                                  className="px-4 py-2 mr-2 bg-[#FFF1EC] text-sm text-[#FF7037]  rounded-full font-semibold"
                                  onClick={handleCloseRejectModal}
                                >
                                  Cancel
                                </button>
                                <Link to="/booking/bill">
                                  <button
                                    onClick={handleConfirmReject}
                                    className="px-4 py-2 bg-[#FF7037] text-sm text-white rounded-full font-semibold"
                                  >
                                    Yes i'm sure
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Box>
                      </Modal>
                    </div>
                  </>
                ) : bookingList[index].status_booking ==
                  "Waiting for service" ? (
                  <button
                    className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3"
                    onClick={handleInServiceBooking}
                  >
                    In Service
                  </button>
                ) : bookingList[index].status_booking ==
                  "Canceled" ? null : null}
              </div>
            </div>
            <div className="h-auto w-full px-20 pt-12 pb-10 bg-white flex flex-col gap-8 mt-1 shadow-custom4 rounded-lg">
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Pet Owner Name
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="">{bookingList[index].petowner.username}</div>
                  <div>
                    <button
                      onClick={handleOpenViewProfileModal}
                      onClose={handleCloseViewProfileModal}
                      className="text-primaryOrange2 flex flex-row"
                    >
                      <EyeIcon />
                      ViewProfile
                    </button>
                    <Modal
                      className="flex items-center justify-center"
                      open={viewProfileModalOpen}
                      onClose={handleCloseViewProfileModal}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className="flex items-center justify-center w-[800px] h-[552px] bg-white rounded-2xl">
                        <div className="w-full h-full py-5">
                          <div className="flex items-center py-3 px-5">
                            <h1 className="text-2xl font-semibold px-5">
                              {bookingList[index].petowner.username}
                            </h1>
                            <img
                              alt=""
                              src={closeIcon}
                              className="ml-auto px-10"
                              onClick={handleCloseViewProfileModal}
                            />
                          </div>
                          <hr className="border-t-2 h-4 w-full ml-auto" />
                          <div className="flex items-center space-x-12 p-5">
                            <div>
                              <img
                                src={bookingList[index].petowner.image_profile}
                                alt="Profile"
                                className="w-[240px] h-[240px] rounded-full"
                              />
                              <div className="flex items-center justify-center mt-4">
                                <h1 className="text-xl font-semibold">
                                  User Profile
                                </h1>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 bg-primaryGray7 w-[440px] h-[394px] p-8 rounded-2xl">
                              <div className="mb-2 ">
                                <h1 className="text-lg font-semibold text-primaryGray4">
                                  Pet Owner Name
                                </h1>
                                <a>{bookingList[index].petowner.username}</a>
                              </div>
                              <div className="mb-2">
                                <h1 className="text-lg font-semibold text-primaryGray4">
                                  Email
                                </h1>
                                <a>{bookingList[index].petowner.email}</a>
                              </div>
                              <div className="mb-2">
                                <h1 className="text-lg font-semibold text-primaryGray4">
                                  Phone
                                </h1>
                                <a>{bookingList[index].petowner.phone}</a>
                              </div>
                              <div className="mb-2">
                                <h1 className="text-lg font-semibold text-primaryGray4">
                                  ID Number
                                </h1>
                                <a>
                                  {bookingList[index].petowner.id_card_number}
                                </a>
                              </div>
                              <div className="mb-2">
                                <h1 className="text-lg font-semibold text-primaryGray4">
                                  Date of Birth
                                </h1>
                                <a>
                                  {formatDate(
                                    bookingList[index].petowner.date_of_birth
                                  )}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </Modal>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Pet(s)
                </div>
                <div className="">{bookingList[index].petdetails.length}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Pet Detail
                </div>
                {OpenPetModal ? <BookingListModal /> : null}
                <div className="grid grid-cols-5 gap-20">
                  {bookingList[index].petdetails.map((pet) => {
                    return (
                      <>
                        <div
                          key={index}
                          // onClick={() => handleToggleViewPet("id")}
                          onClick={() =>
                            handleOpenPetModal(
                              bookingList[index].petowner.petowner_id,
                              pet.pet_id
                            )
                          }
                          className="pet-card cursor-pointer border-2 border-primaryGray5 w-[200px] h-[230px] rounded-3xl flex flex-col justify-evenly items-center hover:border-primaryOrange4"
                        >
                          <img
                            src={pet.image_profile}
                            className="rounded-full w-[80px] h-[80px] mt-4"
                            alt="pet sitter profile picture"
                          />
                          <h1 className="text-headLine3">{pet.petname}</h1>
                          {handleChip(pet.pettype)}
                          {/* popuptoggle ตอนที่กดpetcard ที่map มา */}
                        </div>
                      </>
                    );
                  })}

                  {/* {allpets.map((pet) => {
                return (
                  <div
                    key={pet.pet_id}
                    onClick={() => handleToggleViewPet(pet.pet_id)}
                    className="pet-card cursor-pointer mb-5 border-2 border-primaryGray5 w-[200px] h-[230px] rounded-3xl flex flex-col justify-evenly items-center hover:border-primaryOrange4"
                  >
                    <img
                      src={pet.image_profile}
                      className="rounded-full w-[80px] h-[80px] mt-4"
                      alt="pet sitter profile picture"
                    />
                    <h1 className="text-headLine3">{pet.petname}</h1>
                    {handleChip(pet.pettype)}
                  </div>
                );
              })} */}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Duration
                </div>
                <div className="">
                  {calculateDuration(
                    bookingList[index].startTime,
                    bookingList[index].endTime
                  )}{" "}
                  hours
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Booking Date
                </div>
                <div className="">
                  {formatDate(bookingList[index].startTime)} |{" "}
                  {formatTime(bookingList[index].startTime)} -{" "}
                  {formatTime(bookingList[index].endTime)}{" "}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Transaction No
                </div>
                <div className=""> {bookingList[index].transaction_no}</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                  Additional Message
                </div>
                <div className="">{bookingList[index].additional_message}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingListDetail;
