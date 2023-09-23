import React, { useState } from "react";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import { useAuth } from "./context/authentication";
import { createContext } from "react";
import jwtDecode from "jwt-decode";

export const FilterContext = React.createContext();

function App() {
  // const [filter, setFilter] = useState({});
  const [petType, setPetType] = useState("");
  const [experience, setExperience] = useState("");
  /*
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
  */
  const auth = useAuth();
  return (
    <FilterContext.Provider
      value={{ petType, setPetType, experience, setExperience }}
    >
      {auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </FilterContext.Provider>
  );
}

export default App;
