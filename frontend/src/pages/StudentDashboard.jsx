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

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!uniqueId) return;
      try {
        // const res = await axiosInstance.get(`/users/users/${encodeURIComponent(uniqueId)}/`);
        const res = await axiosInstance.get(`/users/student/data/${uniqueId}/`);
        const userData = { ...res.data, role: "student" }; // add role
        setStudentData(userData); // use userData, not res.data
        localStorage.setItem("user", JSON.stringify(userData)); // store userData
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
  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const res = await axiosInstance.get("/placements/job-postings/");
  //       setJobs(res.data);
  //     } catch (err) {
  //       console.error(err.response?.data || err.message);
  //       setError("Failed to fetch job postings.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchJobs();
  // }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/placements/job-postings/");
        setJobs(res.data); // each job now has `application_status` from backend
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
    let confirmMessage = "";
    if (status === "applied") {
      confirmMessage = "Are you sure you want to apply for this job?";
    } else if (status === "not_interested") {
      confirmMessage =
        "Are you sure you want to mark this job as Not Interested?";
    }

    if (!window.confirm(confirmMessage)) return;

    try {
      const res = await axiosInstance.post(
        `/placements/job-postings/${jobId}/apply/`,
        { status }
      );

      // Update UI
      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          if (job.id !== jobId) return job;

          if (status === "applied") {
            return {
              ...job,
              application_status: "applied",
              disable_apply: true,
              disable_not_interested: true,
            };
          } else if (status === "not_interested") {
            return {
              ...job,
              application_status: "not_interested",
              disable_apply: true,
              disable_not_interested: false, // optional, keep text
            };
          }
          return job;
        })
      );
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to update application status.");
    }
  };

  // const handleApplication = async (jobId, status) => {
  //   let confirmMessage = "";
  //   if (status === "applied") {
  //     confirmMessage = "Are you sure you want to apply for this job?";
  //   } else if (status === "not_interested") {
  //     confirmMessage =
  //       "Are you sure you want to mark this job as Not Interested?";
  //   }

  //   if (!window.confirm(confirmMessage)) return;

  //   try {
  //     const res = await axiosInstance.post(
  //       `/placements/job-postings/${jobId}/apply/`,
  //       { status }
  //     );

  //     // Update UI
  //     setJobs((prevJobs) => {
  //       if (status === "not_interested") {
  //         // Remove this job from the list entirely
  //         return prevJobs.filter((job) => job.id !== jobId);
  //       }
  //       // Otherwise, just mark as applied
  //       return prevJobs.map((job) =>
  //         job.id === jobId ? { ...job, application_status: status } : job
  //       );
  //     });
  //   } catch (err) {
  //     console.error(err.response?.data || err.message);
  //     alert("❌ Failed to update application status.");
  //   }
  // };

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
        onClick={() => navigate(`/student-profile/${uniqueId}`)}
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
                  disabled={
                    job.application_status === "applied" ||
                    job.application_status === "not_interested"
                  }
                  onClick={() => handleApplication(job.id, "applied")}
                  sx={{
                    backgroundColor:
                      job.application_status === "applied"
                        ? "green"
                        : job.application_status === "not_interested"
                        ? "#ffffff" // white when Not Interested
                        : undefined,
                    color:
                      job.application_status === "not_interested"
                        ? "black"
                        : undefined,
                    "&.Mui-disabled": {
                      backgroundColor:
                        job.application_status === "applied"
                          ? "green"
                          : job.application_status === "not_interested"
                          ? "#ffffff"
                          : undefined,
                      color:
                        job.application_status === "not_interested"
                          ? "black"
                          : undefined,
                    },
                  }}
                >
                  {job.application_status === "applied" ? "Applied" : "Apply"}
                </Button>

                <Button
                  variant={
                    job.application_status === "not_interested"
                      ? "contained"
                      : "outlined"
                  }
                  disabled={
                    job.application_status === "applied" ||
                    job.application_status === "not_interested"
                  }
                  onClick={() => handleApplication(job.id, "not_interested")}
                  sx={{
                    backgroundColor:
                      job.application_status === "not_interested"
                        ? "grey"
                        : undefined,
                    "&.Mui-disabled": {
                      backgroundColor:
                        job.application_status === "not_interested"
                          ? "grey"
                          : undefined,
                    },
                  }}
                >
                  {job.application_status === "not_interested"
                    ? "Not Interested"
                    : "Not Interested"}
                </Button>

                {/* <Button
                  variant="contained"
                  disabled={
                    job.application_status === "applied" ||
                    job.application_status === "not_interested"
                  }
                  onClick={() => handleApplication(job.id, "applied")}
                  sx={{
                    backgroundColor:
                      job.application_status === "applied"
                        ? "green"
                        : job.application_status === "not_interested"
                        ? "#b0b0b0" // grey-ish to match Not Interested disabled
                        : undefined,
                    color:
                      job.application_status === "not_interested"
                        ? "white"
                        : undefined,
                    "&.Mui-disabled": {
                      backgroundColor:
                        job.application_status === "applied"
                          ? "green"
                          : job.application_status === "not_interested"
                          ? "#b0b0b0"
                          : undefined,
                      color:
                        job.application_status === "not_interested"
                          ? "white"
                          : undefined,
                    },
                  }}
                >
                  {job.application_status === "applied" ? "Applied" : "Apply"}
                </Button>

               
                <Button
                  variant={
                    job.application_status === "not_interested"
                      ? "contained"
                      : "outlined"
                  }
                  disabled={
                    job.application_status === "applied" ||
                    job.application_status === "not_interested"
                  }
                  onClick={() => handleApplication(job.id, "not_interested")}
                  sx={{
                    backgroundColor:
                      job.application_status === "not_interested"
                        ? "#757575" // grey
                        : job.application_status === "applied"
                        ? "#b0b0b0" // grey-ish to match Apply disabled
                        : undefined,
                    color:
                      job.application_status === "applied"
                        ? "white"
                        : undefined,
                    "&.Mui-disabled": {
                      backgroundColor:
                        job.application_status === "not_interested"
                          ? "#757575"
                          : job.application_status === "applied"
                          ? "#b0b0b0"
                          : undefined,
                      color:
                        job.application_status === "applied"
                          ? "white"
                          : undefined,
                    },
                  }}
                >
                  {job.application_status === "not_interested"
                    ? "Not Interested"
                    : "Not Interested"}
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudentDashboard;
