import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext();
import jwtDecode from "jwt-decode";

function AuthProvider(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const register = async (data) => {
    await axios.post("http://localhost:4000/petOwnerUser/register", data);
    navigate("/login");
  };

  const login = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:4000/petOwnerUser/login",
        data
      );
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      // You can display an error message to the user here.
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
    navigate("/login");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));
  console.log(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
