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

export const ToggleContext = React.createContext();

const AuthenticatedApp = () => {
  const [toggleCreatePet, setToggleCreatePet] = useState(false);
  const [toggleDeletePet, setToggleDeletePet] = useState(false);
  const [toggleViewPet, setToggleViewPet] = useState(false);
  const [toggleViewBooking, setToggleViewBooking] = useState(false);
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
        }}
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/petsitterlist" element={<PetSitterList />} />
          <Route
            path="/petsitterlist/view/:petsister_id"
            element={<PetSitterDetail />}
          />
          <Route path="/user">
            <Route path="/user/profile/:userId" element={<UserManagement />} />
            <Route path="/user/yourpet/:userId" element={<YourPet />} />
            <Route path="/user/history/:userId" element={<BookingHistory />} />
          </Route>
        </Routes>
      </ToggleContext.Provider>
    </ThemeProvider>
  );
};

export default AuthenticatedApp;
