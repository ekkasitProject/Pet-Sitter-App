import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Satoshi-Regular",
  },
  palette: {
    primary: {
      main: "#FF7037",
      light: "#E44A0C",
      dark: "#FF986F",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFF1EC",
      light: "#FF986F",
      dark: "#FFD5C2",
      contrastText: "#FF7037",
    },
  },
});

export default theme;
