// src/pages/TrainingOfficerPages/Dashboard.jsx
import React from "react";
import { Box } from "@mui/material";
import LoginBanner from "../../TrainingOfficerComponents/Dashboard/LoginBanner";

const Dashboard = () => {
  // Get logged in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const officerName = user?.first_name
    ? `${user.first_name} ${user.last_name || ""}`
    : "Training Officer";

  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <LoginBanner officerName={officerName} />
      </Box>
    </Box>
  );
};

export default Dashboard;

