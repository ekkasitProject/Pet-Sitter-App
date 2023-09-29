import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import jwtInterceptor from "./utils/jwtInterceptors.js";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authentication.jsx";

jwtInterceptor();
//export default jwtInterceptor;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
