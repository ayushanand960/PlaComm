// src/pages/TrainingOfficerDashboard.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, Alert, Box } from "@mui/material";
import axiosInstance from "../api/axiosInstance";

//importing TrainingOfficerRoutes.jsx from TrainingOfficerPages
import TrainingOfficerRoutes from "../routes/TrainingOfficerRoutes";

const TrainingOfficerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const uniqueId = user?.unique_id;

  const [officerData, setOfficerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOfficerData = async () => {
      if (!uniqueId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axiosInstance.get(`/users/users/${encodeURIComponent(uniqueId)}/`);
        setOfficerData(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch officer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOfficerData();
  }, [uniqueId]);

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Container sx={{ mt: 6 }}>
      <Alert severity="error">{error}</Alert>
    </Container>
  );

  return (
    <TrainingOfficerRoutes />
  );
};

export default TrainingOfficerDashboard;
