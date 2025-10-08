// src/TrainingOfficerComponents/Dashboard/LoginBanner.jsx
import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const LoginBanner = ({ officerName }) => {
  return (
    <Box
      sx={{
           width: "100%",       // full width
    maxWidth: "100%",
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    py: 4,
    borderRadius: 2,
    background: "linear-gradient(135deg, Goldenrod, #1046a8ff)",
    color: "white",
    textAlign: "center",
    boxSizing: "border-box", // important

      }}
    >
      <Avatar
        sx={{
          bgcolor: "white",
          color: "goldenrod",
          width: 80,
          height: 80,
          mx: "auto",
          mb: 2,
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        {officerName.charAt(0)}
      </Avatar>

      <Typography variant="h4" fontWeight="bold">
        Welcome, {officerName}
      </Typography>
      <Typography variant="h6" sx={{ mt: 1 }}>
        Training Officer Dashboard
      </Typography>
    </Box>
  );
};

export default LoginBanner;
