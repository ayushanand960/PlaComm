// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, Alert, Box } from "@mui/material";
import axiosInstance from "../api/axiosInstance";

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const uniqueId = user?.unique_id;

  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!uniqueId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axiosInstance.get(`/users/users/${encodeURIComponent(uniqueId)}/`);
        setStudentData(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
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
        Student Dashboard
      </Typography>

      <Typography variant="h6">
        Welcome, {studentData?.first_name} {studentData?.last_name}
      </Typography>
      <Typography><strong>RUM Number:</strong> {studentData?.unique_id}</Typography>
      <Typography><strong>Course:</strong> {studentData?.course}</Typography>
      <Typography><strong>Branch:</strong> {studentData?.branch}</Typography>
      <Typography><strong>Year:</strong> {studentData?.year}</Typography>
      <Typography><strong>Email:</strong> {studentData?.email}</Typography>
      <Typography><strong>Phone:</strong> {studentData?.phone}</Typography>
      <hr />
      <Typography>This dashboard is specifically for Students.</Typography>
    </Container>
  );
};

export default StudentDashboard;
