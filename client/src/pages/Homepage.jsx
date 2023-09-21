import React from "react";
import Header from "../components/Header";
import HeaderAuth from "../components/HeaderAuth";
import PetCareSlogan from "../components/PetCareSlogan.jsx";
import PetPriority from "../components/PetPriority";
import PetSitterBanner from "../components/PetSitterBanner";
import Footer from "../components/Footer";
import { useAuth } from "../context/authentication";

const Homepage = () => {
  const auth = useAuth();

  return (
    <div>
      {auth.isAuthenticated ? <HeaderAuth /> : <Header />}
      <PetCareSlogan />
      <PetPriority />
      <PetSitterBanner />
      <Footer />
    </div>
  );
};

export default Homepage;
