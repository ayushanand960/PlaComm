// src/pages/TrainingOfficerDashboard.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, Alert, Box } from "@mui/material";
import axiosInstance from "../api/axiosInstance";

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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Training Officer Dashboard
      </Typography>

      <Typography variant="h6">
        Welcome, {officerData?.first_name} {officerData?.last_name}
      </Typography>
      <Typography><strong>Unique ID:</strong> {officerData?.unique_id}</Typography>
      <Typography><strong>Email:</strong> {officerData?.email}</Typography>
      <Typography><strong>Department:</strong> {officerData?.department}</Typography>
      <Typography><strong>Designation:</strong> {officerData?.designation}</Typography>
      <Typography><strong>Phone:</strong> {officerData?.phone}</Typography>
      <hr />
      <Typography>This dashboard is specifically for Training Officers.</Typography>
    </Container>
  );
};

export default TrainingOfficerDashboard;
