import React from "react";
import Header from "../components/Header";
import PetCareSlogan from "../components/PetCareSlogan";
import PetPriority from "../components/PetPriority";
import PetSitterBanner from "../components/PetSitterBanner";

const Homepage = () => {
  return (
    <div>
      <Header />
      <PetCareSlogan />
      <PetPriority />
      <PetSitterBanner />
    </div>
  );
};

export default Homepage;
