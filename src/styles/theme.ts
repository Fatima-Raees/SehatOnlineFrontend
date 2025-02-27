import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Dark Mode enabled
    primary: { main: "#0A192F" }, // Dark Blue
    secondary: { main: "#FFFFFF" }, // White
    background: { default: "#0A192F", paper: "#112240" },
    text: { primary: "#FFFFFF", secondary: "#A8B2D1" },
  },
  typography: { fontFamily: "Arial, sans-serif" },
});

export default theme;
