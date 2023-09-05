import React from "react";
import RegistrationForm from "./pages/Registerpage";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};
