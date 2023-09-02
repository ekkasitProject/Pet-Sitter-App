import React from "react";
import Header from "../components/Header";
import PetCareSlogan from "../components/PetCareSlogan";
import PetPriority from "../components/PetPriority";
import PetSitterBanner from "../components/PetSitterBanner";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <div>
      <Header />
      <PetCareSlogan />
      <PetPriority />
      <PetSitterBanner />
      <Footer />
    </div>
  );
};

export default Homepage;
