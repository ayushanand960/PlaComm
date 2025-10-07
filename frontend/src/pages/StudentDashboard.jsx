// // src/pages/StudentDashboard.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   CircularProgress,
//   Typography,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";
// import StudentNavbar from "../components/StudentNavbar";
// import Footer from "../components/Footer";
// import StudentInfo from "../components/StudentInfo";
// import DashboardCards from "../components/DashboardCards";
// import RecentApplications from "../components/ApplicationStatus";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

// dayjs.extend(relativeTime);

// const StudentDashboard = () => {
//   const [student, setStudent] = useState(null);
//   const [trainingScore, setTrainingScore] = useState("N/A");
//   const [opportunities, setOpportunities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const uniqueId = user?.unique_id;

//     if (!uniqueId) {
//       setError("No student ID found. Please login again.");
//       setLoading(false);
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         // Fetch student info
//         const studentRes = await axiosInstance.get(`/users/student/data/${uniqueId}/`);
//         setStudent(studentRes.data);

//         // Fetch training score
//         try {
//           const trainingRes = await axiosInstance.get(`/trainings/student/${uniqueId}/`);
//           setTrainingScore(trainingRes.data.training_score || "N/A");
//         } catch (err) {
//           console.warn("Training API failed:", err.response?.data || err.message);
//         }

//         // Fetch job postings
//         const jobsRes = await axiosInstance.get(`/placements/job-postings/`);
//         const jobs = Array.isArray(jobsRes.data) ? jobsRes.data : jobsRes.data.results || [];
//         setOpportunities(jobs);
//       } catch (err) {
//         console.error(err.response?.data || err.message);
//         setError("Failed to fetch dashboard data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Apply / Not Interested logic
//   const handleApplication = async (jobId, status) => {
//     let confirmMessage = "";
//     if (status === "applied") {
//       confirmMessage = "Are you sure you want to apply for this job?";
//     } else if (status === "not_interested") {
//       confirmMessage = "Are you sure you want to mark this job as Not Interested?";
//     }

//     if (!window.confirm(confirmMessage)) return;

//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const uniqueId = user?.unique_id;
//       if (!uniqueId) throw new Error("User not logged in");

//       await axiosInstance.post(`/placements/job-postings/${jobId}/apply/`, { status });

//       setOpportunities((prev) =>
//         prev.map((job) => {
//           if (job.job_id !== jobId) return job;

//           if (status === "applied") {
//             return {
//               ...job,
//               application_status: "applied",
//             };
//           } else if (status === "not_interested") {
//             return {
//               ...job,
//               application_status: "not_interested",
//             };
//           }
//           return job;
//         })
//       );
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert("Failed to update application status.");
//     }
//   };

//   // Stats
//   const stats = {
//     applications: student?.applications_count || 0,
//     interviews: student?.interviews_count || 0,
//     atsScore: student?.ats_score || 0,
//     trainingScore: trainingScore,
//     network: student?.network_count || 0,
//     courses: student?.courses_count || 0,
//   };

//   if (loading)
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
//         <CircularProgress />
//       </Box>
//     );

//   if (error)
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#fffbfbff", color: "#0e0d0dff", py: 4, width: "100%", pt: 12 }}>
//       {/* Navbar */}
//       <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1200 }}>
//         <StudentNavbar onEditProfile={() => navigate(`/student-profile/${student?.unique_id}`)} />
//       </Box>

//       <Container maxWidth="lg" sx={{ mt: 8 }}>
//         {/* Student Info */}
//         <Box mb={4}>
//           <StudentInfo student={student} onEditProfile={() => navigate(`/student-profile/${student?.unique_id}`)} />
//         </Box>

//         {/* Stats */}
//         <Box mb={6}>
//           <DashboardCards stats={stats} cardSx={{ minHeight: 140 }} />
//         </Box>

//         {/* Job Opportunities */}
//         <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
//           Available Jobs
//         </Typography>
//         <Grid container spacing={3}>
//           {opportunities.map((job) => {
//             const isExpired = job.deadline && dayjs().isAfter(dayjs(job.deadline));
//             const postedAgo = dayjs(job.created_at).fromNow();

//             return (
//               <Grid item xs={12} sm={6} md={4} key={job.job_id}>
//                 <Card sx={{ minHeight: 250, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: 3, boxShadow: 4, opacity: isExpired ? 0.6 : 1 }}>
//                   <CardContent>
//                     <Typography variant="h6">{job.job_title}</Typography>
//                     <Typography variant="body2" color="text.secondary">{job.company_name} • {job.location}</Typography>
//                     <Typography variant="body2" sx={{ mt: 1 }}>{job.job_description}</Typography>
//                     <Typography variant="caption" color={isExpired ? "error.main" : "text.secondary"}>
//                       {isExpired ? "Expired" : `Posted ${postedAgo}`}
//                     </Typography>
//                   </CardContent>
//                   {!isExpired && (
//                     <CardActions>
//                       <Button
//                         size="small"
//                         variant="contained"
//                         disabled={job.application_status === "applied" || job.application_status === "not_interested"}
//                         onClick={() => handleApplication(job.job_id, "applied")}
//                         sx={{
//                           backgroundColor: job.application_status === "applied" ? "green" : undefined,
//                           color: job.application_status === "applied" ? "white" : undefined,
//                           "&.Mui-disabled": {
//                             backgroundColor: job.application_status === "applied" ? "green" : undefined,
//                             color: job.application_status === "applied" ? "white" : undefined,
//                           },
//                         }}
//                       >
//                         {job.application_status === "applied" ? "Applied" : "Apply"}
//                       </Button>
//                       <Button
//                         size="small"
//                         variant={job.application_status === "not_interested" ? "contained" : "outlined"}
//                         disabled={job.application_status === "applied" || job.application_status === "not_interested"}
//                         onClick={() => handleApplication(job.job_id, "not_interested")}
//                         sx={{
//                           backgroundColor: job.application_status === "not_interested" ? "grey" : undefined,
//                           "&.Mui-disabled": {
//                             backgroundColor: job.application_status === "not_interested" ? "grey" : undefined,
//                           },
//                         }}
//                       >
//                         Not Interested
//                       </Button>
//                     </CardActions>
//                   )}
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </Container>

//       <Footer />
//     </Box>
//   );
// };

// export default StudentDashboard;

// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import StudentNavbar from "../components/StudentNavbar";
import Footer from "../components/Footer";
import StudentInfo from "../components/StudentInfo";
import DashboardCards from "../components/DashboardCards";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [trainingScore, setTrainingScore] = useState("N/A");
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const uniqueId = user?.unique_id;

    if (!uniqueId) {
      setError("No student ID found. Please login again.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch student info
        const studentRes = await axiosInstance.get(
          `/users/student/data/${uniqueId}/`
        );
        setStudent(studentRes.data);

        // Fetch training score
        try {
          const trainingRes = await axiosInstance.get(
            `/trainings/student/${uniqueId}/`
          );
          setTrainingScore(trainingRes.data.training_score || "N/A");
        } catch (err) {
          console.warn(
            "Training API failed:",
            err.response?.data || err.message
          );
        }

        // Fetch job postings
        const jobsRes = await axiosInstance.get(`/placements/job-postings/`);
        const jobs = Array.isArray(jobsRes.data)
          ? jobsRes.data
          : jobsRes.data.results || [];
        setOpportunities(jobs);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApplication = async (jobId, status) => {
    let confirmMessage =
      status === "applied"
        ? "Are you sure you want to apply for this job?"
        : "Are you sure you want to mark this job as Not Interested?";
    if (!window.confirm(confirmMessage)) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const uniqueId = user?.unique_id;
      if (!uniqueId) throw new Error("User not logged in");

      await axiosInstance.post(`/placements/job-postings/${jobId}/apply/`, {
        status,
      });

      setOpportunities((prev) =>
        prev.map((job) =>
          job.job_id === jobId ? { ...job, application_status: status } : job
        )
      );
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to update application status.");
    }
  };

  const stats = {
    applications: student?.applications_count || 0,
    interviews: student?.interviews_count || 0,
    atsScore: student?.ats_score || 0,
    trainingScore: trainingScore,
    network: student?.network_count || 0,
    courses: student?.courses_count || 0,
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fdfafa",
        color: "#0e0d0d",
        py: 4,
        width: "100%",
        pt: 12,
      }}
    >
      {/* Navbar */}
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1200 }}>
        <StudentNavbar
          onEditProfile={() =>
            navigate(`/student-profile/${student?.unique_id}`)
          }
        />
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        {/* Student Info */}
        <Box mb={4}>
          <StudentInfo
            student={student}
            onEditProfile={() =>
              navigate(`/student-profile/${student?.unique_id}`)
            }
          />
        </Box>

        {/* Stats */}
        <Box mb={6}>
          <DashboardCards stats={stats} cardSx={{ minHeight: 140 }} />
        </Box>

        {/* Discussion Forum Card */}
        <Box mb={4}>
          <Card
            sx={{
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { boxShadow: 6 },
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              backgroundColor: "#e3f2fd",
            }}
            onClick={() => navigate("/discussion-forum")}
          >
            <CardContent>
              <Typography variant="h6">Discussion Forum</Typography>
              <Typography variant="body2" color="text.secondary">
                Explore categories, threads, and participate in discussions.
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              onClick={() => navigate("/discussion-forum")}
            >
              Go
            </Button>
          </Card>
        </Box>

        {/* Job Opportunities */}
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Available Jobs
        </Typography>
        <Grid container spacing={3}>
          {opportunities.map((job) => {
            const isExpired =
              job.deadline && dayjs().isAfter(dayjs(job.deadline));
            const postedAgo = dayjs(job.created_at).fromNow();

            return (
              <Grid item xs={12} sm={6} md={4} key={job.job_id}>
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
                    <Typography
                      variant="caption"
                      color={isExpired ? "error.main" : "text.secondary"}
                    >
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
                        onClick={() => handleApplication(job.job_id, "applied")}
                        sx={{
                          backgroundColor:
                            job.application_status === "applied"
                              ? "green"
                              : undefined,
                          color:
                            job.application_status === "applied"
                              ? "white"
                              : undefined,
                          "&.Mui-disabled": {
                            backgroundColor:
                              job.application_status === "applied"
                                ? "green"
                                : undefined,
                            color:
                              job.application_status === "applied"
                                ? "white"
                                : undefined,
                          },
                        }}
                      >
                        {job.application_status === "applied"
                          ? "Applied"
                          : "Apply"}
                      </Button>
                      <Button
                        size="small"
                        variant={
                          job.application_status === "not_interested"
                            ? "contained"
                            : "outlined"
                        }
                        disabled={
                          job.application_status === "applied" ||
                          job.application_status === "not_interested"
                        }
                        onClick={() =>
                          handleApplication(job.job_id, "not_interested")
                        }
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

      <Footer />
    </Box>
  );
};

export default StudentDashboard;
