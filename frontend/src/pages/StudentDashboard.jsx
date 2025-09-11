// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  
  const uniqueId = user?.unique_id;
  

  const [studentData, setStudentData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch student profile
  // useEffect(() => {
  //   const fetchStudentData = async () => {
  //     if (!uniqueId) {
  //       setError("User not logged in");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const res = await axiosInstance.get(
  //         `/users/users/${encodeURIComponent(uniqueId)}/`
  //       );
  //       setStudentData(res.data);
  //     } catch (err) {
  //       console.error(err.response?.data || err.message);
  //       setError("Failed to fetch student data.");
  //     }
  //   };

  //   fetchStudentData();
  // }, [uniqueId]);

  useEffect(() => {
  const fetchStudentData = async () => {
    if (!uniqueId) return;
    try {
      // const res = await axiosInstance.get(`/users/users/${encodeURIComponent(uniqueId)}/`);
      const res = await axiosInstance.get(`/users/users/student/${uniqueId}/`);
      setStudentData(res.data);

      // Update localStorage so other components also get fresh data
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to fetch student data.");
    } finally {
      setLoading(false);
    }
  };

  fetchStudentData();

  // Optional: refetch when tab/window gains focus
  const handleFocus = () => fetchStudentData();
  window.addEventListener("focus", handleFocus);

  return () => window.removeEventListener("focus", handleFocus);
}, [uniqueId]);


  // Fetch all job postings
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/placements/job-postings/");
        setJobs(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch job postings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle apply/not interested
  const handleApplication = async (jobId, status) => {
    try {
      await axiosInstance.post("/placements/job-applications/", {
        job: jobId,
        status: status,
      });
      alert(`✅ You have marked this job as ${status}`);
      // Refresh jobs after apply
      const res = await axiosInstance.get("/placements/job-postings/");
      setJobs(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to update application status.");
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container sx={{ mt: 4 }}>
      {/* Student Info */}
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>

      <Typography variant="h6">
        Welcome, {studentData?.first_name} {studentData?.last_name}
      </Typography>
      <Typography>
        <strong>RUM Number:</strong> {studentData?.unique_id}
      </Typography>
      <Typography>
        <strong>Course:</strong> {studentData?.course}
      </Typography>
      <Typography>
        <strong>Branch:</strong> {studentData?.branch}
      </Typography>
      <Typography>
        <strong>Year:</strong> {studentData?.year}
      </Typography>
      <Typography>
        <strong>Email:</strong> {studentData?.email}
      </Typography>
      <Typography>
        <strong>Phone:</strong> {studentData?.phone}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, mb: 2 }}
        onClick={() => navigate(`/student-profile/${id}`)}
      >
        Edit / Complete Profile
      </Button>

      <hr />

      {/* Job Listings */}
      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Available Jobs
      </Typography>

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6">{job.company_name}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {job.job_title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {job.job_description}
                </Typography>
                <Typography variant="body2">
                  <strong>Positions:</strong> {job.positions}
                </Typography>
                <Typography variant="body2">
                  <strong>Location:</strong> {job.location}
                </Typography>
                <Typography variant="body2">
                  <strong>Package:</strong> {job.package}
                </Typography>
                <Typography variant="body2">
                  <strong>Deadline:</strong> {job.deadline}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleApplication(job.id, "applied")}
                >
                  Apply
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleApplication(job.id, "not_interested")}
                >
                  Not Interested
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudentDashboard;
