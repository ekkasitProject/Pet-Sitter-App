import React from "react";
import "./App.css";
import RegistrationForm from "./pages/Registerpage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import PetSitterDetail from "./pages/PetSitterDetail";
import PetSitterList from "./pages/PetSitterList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import { AuthProvider } from "./context/authentication";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/petsitterlist" element={<PetSitterList />} />
            <Route
              path="/petsitter/view/:petsister_id"
              element={<PetSitterDetail />}
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
