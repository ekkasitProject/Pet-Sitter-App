import React from "react";
import RegistrationForm from "./Registerpage";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import PetSitterList from "./PetSitterList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";
import PetSitterDetail from "./PetSitterDetail";
import BookingInformation from "./BookingInformation";
import BookingPayment from "./BookingPayment";

const AuthenticatedApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/petsitterlist" element={<PetSitterList />} />
        <Route
          path="/petsitterlist/view/:petsister_id"
          element={<PetSitterDetail />}
        />
        <Route path="/booking/information" element={<BookingInformation />} />
        <Route path="/booking/payment" element={<BookingPayment />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AuthenticatedApp;
