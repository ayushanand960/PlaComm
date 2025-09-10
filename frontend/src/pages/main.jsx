import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import HomePage from "./HomePage.jsx";

// 🎨 Custom Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#004e92", // deep blue
    },
    secondary: {
      main: "#ff6f61", // coral accent
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h2: { fontWeight: 700 },
    h4: { fontWeight: 600 },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomePage />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
