import React, { useState } from "react";
import RegistrationForm from "./Registerpage";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import PetSitterList from "./PetSitterList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";
import PetSitterDetail from "./PetSitterDetail";
import UserManagement from "./UserManagement";
import { createContext } from "react";
import YourPet from "./YourPet";
import BookingHistory from "./BookingHistory";
import BookingInformation from "./BookingInformation";
import BookingPayment from "./BookingPayment";
import UploadComponent from "./testUploadFile";
import jwtDecode from "jwt-decode";
import BillBooking from "./BillBooking";
import dayjs from "dayjs";
import BookingYourPet from "./BookingYourPet";
import PetSitterProfile from "./PetSitterProfile";
import BookingList from "./BookingList";
import BookingListDetail from "./BookingListDetail";

export const ToggleContext = React.createContext();
const today = dayjs();
const tomorrow = dayjs().add(1, "day");
const AuthenticatedApp = () => {
  const token = localStorage.getItem("token");
  const userDataFromToken = jwtDecode(token);
  const currentDate = dayjs();
  const [toggleCreatePet, setToggleCreatePet] = useState(false);
  const [toggleDeletePet, setToggleDeletePet] = useState(false);
  const [OpenPetModal, setOpenPetModal] = useState(false);
  const [toggleViewPet, setToggleViewPet] = useState(false);
  const [toggleViewBooking, setToggleViewBooking] = useState(false);
  const [petID, setPetID] = useState("1");
  const [bookingID, setBookingID] = useState("");
  const [isAllPetChange, setIsAllPetChange] = useState(false);
  const [allpets, setAllpets] = useState([]);
  const [petOwnerID, setPetOwnerID] = useState(userDataFromToken.userId);
  const [petSitterID, setPetSitterID] = useState(userDataFromToken.petsitterId);
  const [messageAdditional, setMessageAdditional] = useState("");
  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [startTime, setStartTime] = useState("12:00 AM");
  const [endTime, setEndTime] = useState("12:30 AM");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [selectedPets, setSelectedPets] = useState([]);
  const [selectedPetsName, setSelectedPetsName] = useState([]);
  const [prices, setPrices] = useState(0);
  const [selectedPetsitterID, setSelectedPetsitterID] = useState("");
  const [selectedPetsitterName, setSelectedPetsitterName] = useState("");
  const [selectedPetsitterUser, setSelectedPetsitterUser] = useState("");
  const [petImage, setPageImage] = useState("");
  const [bookingListDetails, setBookingListDetails] = useState({});
  const [bookingList, setBookingList] = useState([]);
  const [index, setIndex] = useState("");
  return (
    <ThemeProvider theme={theme}>
      <ToggleContext.Provider
        value={{
          toggleCreatePet,
          setToggleCreatePet,
          toggleDeletePet,
          setToggleDeletePet,
          toggleViewPet,
          setToggleViewPet,
          toggleViewBooking,
          setToggleViewBooking,
          petID,
          setPetID,
          isAllPetChange,
          setIsAllPetChange,
          allpets,
          setAllpets,
          petOwnerID,
          setPetOwnerID,
          bookingID,
          setBookingID,
          messageAdditional,
          setMessageAdditional,
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
          prices,
          setPrices,
          selectedPets,
          setSelectedPets,
          selectedPetsitterID,
          setSelectedPetsitterID,
          selectedPetsitterName,
          setSelectedPetsitterName,
          selectedPetsitterUser,
          setSelectedPetsitterUser,
          selectedPetsName,
          setSelectedPetsName,
          petSitterID,
          setPetSitterID,
          petImage,
          setPageImage,
          bookingListDetails,
          setBookingListDetails,
          bookingList,
          setBookingList,
          index,
          setIndex,
          OpenPetModal,
          setOpenPetModal,
        }}
      >
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />

          {petSitterID ? (
            <>
              <Route path="*" element={<PetSitterProfile />} />
              <Route path="/petsitter">
                <Route
                  path="/petsitter/profile/:petsitterId"
                  element={<PetSitterProfile />}
                />
                <Route
                  path="/petsitter/bookinglist/:petsitterId"
                  element={<BookingList />}
                />
                <Route
                  path="/petsitter/bookinglistdetail/:petownerId/:bookingId"
                  element={<BookingListDetail />}
                />
              </Route>
            </>
          ) : (
            <>
              <Route path="*" element={<Homepage />} />
              <Route path="/petsitterlist" element={<PetSitterList />} />
              <Route path="/" element={<Homepage />} />

              <Route path="/booking/yourPet" element={<BookingYourPet />} />
              <Route
                path="/booking/information"
                element={<BookingInformation />}
              />
              <Route path="/booking/payment" element={<BookingPayment />} />
              <Route path="/booking/bill" element={<BillBooking />} />
              <Route
                path="/petsitterlist/view/:petsitter_id"
                element={<PetSitterDetail />}
              />
              <Route path="/test/:petsitter_id" element={<UploadComponent />} />

              <Route path="/user">
                <Route
                  path="/user/profile/:userId"
                  element={<UserManagement />}
                />
                <Route path="/user/yourpet/:userId" element={<YourPet />} />
                <Route
                  path="/user/history/:userId"
                  element={<BookingHistory />}
                />
              </Route>
            </>
          )}
        </Routes>
      </ToggleContext.Provider>
    </ThemeProvider>
  );
};

export default AuthenticatedApp;
