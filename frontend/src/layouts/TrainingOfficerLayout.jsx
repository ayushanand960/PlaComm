// src/Layouts/TrainingOfficerLayout.jsx
import React from "react";
import Navbar from "../components/trainingOfficer/Navbar";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

const TrainingOfficerLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" }}>
      
      {/* Navbar at top */}
      <Navbar />

      {/* Spacer for AppBar */}
      <Toolbar />

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", width: "100%" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default TrainingOfficerLayout;
