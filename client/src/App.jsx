import React from "react";
import RegistrationForm from "./pages/Registerpage";

const App = () => {
  return (
    <div
      className="bg-primaryOrange4"
      style={{ fontFamily: "Satoshi-Regular" }}
    >
      <h1 className="text-6xl text-center">
        Pet Sitter, <br />
        Perfect <br />
        For Your Pet
      </h1>
      <RegistrationForm />
    </div>
  );
};

export default App;
