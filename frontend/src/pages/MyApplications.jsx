// src/pages/MyApplications.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import dayjs from "dayjs";
import StudentNavbar from "../components/StudentNavbar";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const student = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axiosInstance.get("/placements/my-applications/"); 
        // ^ adjust endpoint if you already have a `my-applications` one
        setApplications(res.data || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch your applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container sx={{ mt: 6 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  return (
    <Box sx={{ minHeight: "100vh", pt: 10, backgroundColor: "#fefefe" }}>
      {/* Navbar */}
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1200 }}>
        <StudentNavbar
          onEditProfile={() => navigate(`/student-profile/${student?.unique_id}`)}
        />
      </Box>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Applications
        </Typography>

        {applications.length === 0 ? (
          <Typography>No applications yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {applications.map((app) => (
              <Grid item xs={12} sm={6} md={4} key={app.id}>
                <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                  <CardContent>
                    {/* Job Title */}
                    <Typography variant="h6">{app.job?.job_title}</Typography>

                    {/* Company + Location */}
                    <Typography variant="body2" color="text.secondary">
                      {app.job?.company_name} • {app.job?.location}
                    </Typography>

                    {/* Job Description */}
                    <Typography
                      variant="body2"
                      sx={{ mt: 1 }}
                      color="text.secondary"
                    >
                      {app.job?.job_description}
                    </Typography>

                    {/* Status */}
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Status:</strong>{" "}
                      <span
                        style={{
                          color:
                            app.status === "applied"
                              ? "orange"
                              : app.status === "not_interested"
                              ? "red"
                              : "gray",
                          fontWeight: "bold",
                        }}
                      >
                        {app.status}
                      </span>
                    </Typography>

                    {/* Updated At */}
                    <Typography variant="caption" color="text.secondary">
                      Updated {dayjs(app.updated_at).format("DD MMM YYYY")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

        )}
      </Container>
    </Box>
  );
};

export default MyApplications;
