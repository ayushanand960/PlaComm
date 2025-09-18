// // src/pages/JobOpportunities.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import StudentNavbar from "../components/StudentNavbar";
// import Footer from "../components/Footer";
// import axiosInstance from "../api/axiosInstance"; // ✅ use your axios instance
// import dayjs from "dayjs";

// const JobOpportunities = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axiosInstance.get("/jobs/"); // ✅ Django backend endpoint
//         setJobs(res.data);
//       } catch (err) {
//         console.error("Error fetching jobs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   const handleApply = async (jobId) => {
//     try {
//       await axiosInstance.post(`/jobs/${jobId}/apply/`);
//       alert("Application submitted!");
//     } catch (err) {
//       console.error("Error applying:", err);
//     }
//   };

//   const handleUploadResume = async (jobId) => {
//     // Here you can implement file upload modal / input
//     console.log("Upload Resume clicked for job:", jobId);
//   };

//   const handleNotInterested = async (jobId) => {
//     try {
//       await axiosInstance.post(`/jobs/${jobId}/not-interested/`);
//       setJobs((prev) => prev.filter((job) => job.id !== jobId));
//     } catch (err) {
//       console.error("Error marking not interested:", err);
//     }
//   };

//   const calculatePostedAgo = (date) => {
//     if (!date) return "Unknown";
//     return dayjs().diff(dayjs(date), "day") + " days ago";
//   };

//   return (
//     <Box sx={{ backgroundColor: "#121212", minHeight: "100vh", color: "#fff" }}>
//       <StudentNavbar />
//       <Container sx={{ py: 5 }}>
//         <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
//           Job Opportunities
//         </Typography>

//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//             <CircularProgress color="secondary" />
//           </Box>
//         ) : jobs.length === 0 ? (
//           <Typography>No job opportunities available at the moment.</Typography>
//         ) : (
//           <Grid container spacing={3}>
//             {jobs.map((job) => {
//               const isExpired = job.expiry_date
//                 ? dayjs().isAfter(dayjs(job.expiry_date))
//                 : false;
//               return (
//                 <Grid item xs={12} md={6} lg={4} key={job.id}>
//                   <Card
//                     sx={{
//                       borderRadius: 3,
//                       boxShadow: 3,
//                       backgroundColor: "#1e1e1e",
//                     }}
//                   >
//                     <CardContent>
//                       <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                         {job.title}
//                       </Typography>
//                       <Typography variant="subtitle1">{job.company}</Typography>
//                       <Typography variant="body2">{job.location}</Typography>
//                       <Typography variant="body2" sx={{ mt: 1 }}>
//                         Posted: {calculatePostedAgo(job.posted_date)}
//                       </Typography>
//                       {isExpired && (
//                         <Typography
//                           variant="body2"
//                           color="error"
//                           sx={{ mt: 1 }}
//                         >
//                           Expired
//                         </Typography>
//                       )}
//                     </CardContent>
//                     <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => handleApply(job.id)}
//                         disabled={isExpired}
//                       >
//                         Apply
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         color="secondary"
//                         onClick={() => handleUploadResume(job.id)}
//                         disabled={isExpired}
//                       >
//                         Upload Resume
//                       </Button>
//                       <Button
//                         variant="text"
//                         color="error"
//                         onClick={() => handleNotInterested(job.id)}
//                       >
//                         Not Interested
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         )}
//       </Container>
//       <Footer />
//     </Box>
//   );
// };

// export default JobOpportunities;


// src/pages/JobsPage.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";

dayjs.extend(relativeTime);

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/placements/job-postings/");
        setJobs(Array.isArray(res.data) ? res.data : res.data.results || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch job postings.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApplication = async (jobId, status) => {
    let confirmMessage =
      status === "applied"
        ? "Are you sure you want to apply for this job?"
        : "Are you sure you want to mark this job as Not Interested?";
    if (!window.confirm(confirmMessage)) return;

    try {
      const uniqueId = student?.unique_id;
      if (!uniqueId) throw new Error("User not logged in");

      await axiosInstance.post(`/placements/job-postings/${jobId}/apply/`, { status });

      setJobs((prev) =>
        prev.map((job) => (job.id === jobId ? { ...job, application_status: status } : job))
      );
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to update application status.");
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
          Job Opportunities
        </Typography>

        <Grid container spacing={3}>
          {jobs.map((job) => {
            const isExpired = job.deadline && dayjs().isAfter(dayjs(job.deadline));
            const postedAgo = dayjs(job.created_at).fromNow();

            return (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card
                  sx={{
                    minHeight: 250,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    boxShadow: 4,
                    opacity: isExpired ? 0.6 : 1,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{job.job_title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.company_name} • {job.location}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {job.job_description}
                    </Typography>
                    <Typography variant="caption" color={isExpired ? "error.main" : "text.secondary"}>
                      {isExpired ? "Expired" : `Posted ${postedAgo}`}
                    </Typography>
                  </CardContent>

                  {!isExpired && (
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        disabled={
                          job.application_status === "applied" ||
                          job.application_status === "not_interested"
                        }
                        onClick={() => handleApplication(job.id, "applied")}
                        sx={{
                          backgroundColor:
                            job.application_status === "applied" ? "green" : undefined,
                          color: job.application_status === "applied" ? "white" : undefined,
                          "&.Mui-disabled": {
                            backgroundColor:
                              job.application_status === "applied" ? "green" : undefined,
                            color: job.application_status === "applied" ? "white" : undefined,
                          },
                        }}
                      >
                        {job.application_status === "applied" ? "Applied" : "Apply"}
                      </Button>

                      <Button
                        size="small"
                        variant={job.application_status === "not_interested" ? "contained" : "outlined"}
                        disabled={
                          job.application_status === "applied" ||
                          job.application_status === "not_interested"
                        }
                        onClick={() => handleApplication(job.id, "not_interested")}
                        sx={{
                          backgroundColor:
                            job.application_status === "not_interested" ? "grey" : undefined,
                          "&.Mui-disabled": {
                            backgroundColor:
                              job.application_status === "not_interested" ? "grey" : undefined,
                          },
                        }}
                      >
                        Not Interested
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default JobsPage;
