// src/Layouts/TrainingOfficerLayout.jsx
import React from "react";
import Navbar from "../TrainingOfficerComponents/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const TrainingOfficerLayout = () => {
  return (
    <Box>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default TrainingOfficerLayout;

