// src/pages/TrainingOfficerDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
  Avatar,
  Paper,
} from "@mui/material";
import { Email, Phone, Work, Business, Badge } from "@mui/icons-material";
import axiosInstance from "../api/axiosInstance";

const TrainingOfficerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const uniqueId = user?.unique_id;

  const [officerData, setOfficerData] = useState(null);
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Officer Data
  useEffect(() => {
    const fetchOfficerData = async () => {
      if (!uniqueId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `/users/users/${encodeURIComponent(uniqueId)}/`
        );
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

  // Fetch Job Postings
  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const res = await axiosInstance.get("/placements/job-postings/");
        setJobPostings(res.data);
      } catch (err) {
        console.error("Failed to fetch job postings:", err);
      }
    };

    fetchJobPostings();
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress size={60} thickness={5} />
      </Box>
    );

  if (error)
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container sx={{ mt: 6 }}>
      {/* Header Section */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #673ab7, #512da8)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "white",
            color: "#673ab7",
            width: 80,
            height: 80,
            mx: "auto",
            mb: 2,
            fontSize: 30,
          }}
        >
          {officerData?.first_name?.charAt(0)}
        </Avatar>
        <Typography variant="h4" fontWeight="bold">
          Welcome, {officerData?.first_name} {officerData?.last_name}
        </Typography>
        <Typography variant="h6">Training Officer Dashboard</Typography>
      </Paper>

      {/* Officer Details Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                Officer Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>
                <Badge sx={{ mr: 1 }} /> <strong>Unique ID:</strong>{" "}
                {officerData?.unique_id}
              </Typography>
              <Typography>
                <Work sx={{ mr: 1 }} /> <strong>Designation:</strong>{" "}
                {officerData?.designation}
              </Typography>
              <Typography>
                <Business sx={{ mr: 1 }} /> <strong>Department:</strong>{" "}
                {officerData?.department}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                Contact Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>
                <Email sx={{ mr: 1 }} /> <strong>Email:</strong>{" "}
                {officerData?.email}
              </Typography>
              <Typography>
                <Phone sx={{ mr: 1 }} /> <strong>Phone:</strong>{" "}
                {officerData?.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Job Postings Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Latest Job Postings
        </Typography>
        {jobPostings.length === 0 ? (
          <Alert severity="info">No job postings available.</Alert>
        ) : (
          <Grid container spacing={3}>
            {jobPostings.map((job) => (
              <Grid item xs={12} md={6} key={job.id}>
                <Card elevation={3} sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "primary.main", fontWeight: "bold" }}
                    >
                      {job.company_name} - {job.job_title}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Location:</strong> {job.location || "Not specified"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Package:</strong> {job.package || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Deadline:</strong> {job.deadline}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {job.job_description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Footer Note */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body1" color="text.secondary">
          This dashboard is specifically designed for <b>Training Officers</b>.
        </Typography>
      </Box>
    </Container>
  );
};

export default TrainingOfficerDashboard;
