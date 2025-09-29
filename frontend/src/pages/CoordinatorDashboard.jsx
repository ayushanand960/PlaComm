

import React, { useEffect, useState } from "react";
import {Box, Container, Typography, Grid, Card, CardContent, Button, CircularProgress, Alert } from "@mui/material";
import { Work, AddCircle } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";


import StatCard from "../components/StatCard";
import JobCard from "../components/JobCard";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkIcon from '@mui/icons-material/Work';
import ActiveJobPosting from "../components/ActiveJobPosting"


export default function CoordinatorDashboard() {


    const stats = [
    { title: "Active Jobs", value: 89, subText: "+5 this week", icon: <WorkIcon /> },
    { title: "Applications", value: 2145, subText: "+45 today", icon: <AttachMoneyIcon /> },
    { title: "Interviews Scheduled", value: 156, subText: "This week", icon: <CalendarTodayIcon /> },
    { title: "Success Rate", value: "78%", subText: "+5% this semester", icon: <CheckCircleIcon /> },
  ];

  const jobs = [
    {
      title: "Software Engineer",
      company: "TCS",
      location: "Mumbai",
      salary: "6-8 LPA",
      skills: ["Computer Science"],
      type: "Full-time",
      applicants: 125,
    },
    // More jobs can come dynamically
  ];    



   const navigate = useNavigate();
  const { id } = useParams(); // Only id
  const decodedId = decodeURIComponent(id);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/users/users/${decodedId}/`); 
        setUserData(res.data);
      } catch (err) {
        setError("Failed to fetch coordinator details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <Container sx={{ mt: 6, textAlign: "center" }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ mt: 6 }}><Alert severity="error">{error}</Alert></Container>;

return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Top Stats */}
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Active Job Postings */}
      {/* <Box mt={4} mb={2} display="flex" justifyContent="space-between" alignItems="center"> 
      
         <ActiveJobPosting />
      </Box> */}

      <Grid container spacing={2}>
        {jobs.map((job, index) => (
          <Grid item xs={12} key={index}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>



      
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
                    backgroundColor: "#e3f2fd"
                  }}
                  onClick={() => navigate("/discussion-forum")}
                >
                  <CardContent>
                    <Typography variant="h6">Discussion Forum</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Explore categories, threads, and participate in discussions.
                    </Typography>
                  </CardContent>
                  <Button variant="contained" onClick={() => navigate("/discussion-forum")}>
                    Go
                  </Button>
                </Card>
              </Box>

      {/* Student Applications */}
      <Box mt={4}>
        <Typography variant="h6">Student Applications</Typography>
        <Card sx={{ mt: 1 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Pending Review</Typography>
              <Typography>234</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Under Interview</Typography>
              <Typography>89</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Selected</Typography>
              <Typography>45</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}


  // const navigate = useNavigate();
  // const { id } = useParams(); // Only id
  // const decodedId = decodeURIComponent(id);

  // const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await axiosInstance.get(`/users/users/${decodedId}/`); 
  //       setUserData(res.data);
  //     } catch (err) {
  //       setError("Failed to fetch coordinator details.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProfile();
  // }, [id]);

  // if (loading) return <Container sx={{ mt: 6, textAlign: "center" }}><CircularProgress /></Container>;
  // if (error) return <Container sx={{ mt: 6 }}><Alert severity="error">{error}</Alert></Container>;

  // return (
  //   // <CoordinatorLayout>
  //   <Container maxWidth="md" sx={{ mt: 6 }}>
      
  //     <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
  //       {/* <CoordinatorLayout /> */}
  //       Placement Coordinator Dashboard
  //     </Typography>

  //     <Typography variant="h6" gutterBottom fontWeight="bold" textAlign="center">
  //       Welcome {userData?.first_name} {userData?.last_name} ({id})
  //     </Typography>

  //     <Grid container spacing={4} sx={{ mt: 2 }}>
  //       <Grid item xs={12} md={6}>
  //         <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
  //           <CardContent sx={{ textAlign: "center" }}>
  //             <AddCircle sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
  //             <Typography variant="h6" gutterBottom>Post New Job</Typography>
  //             <Typography variant="body2" color="text.secondary" mb={2}>
  //               Create and publish a new on-campus hiring post.
  //             </Typography>
  //             <Button
  //               variant="contained"
  //               color="primary"
  //               onClick={() => navigate(`/coordinator-dashboard/${id}/post-job`)}
  //             >
  //               Post Job
  //             </Button>
  //           </CardContent>
  //         </Card>
  //       </Grid>

  //       <Grid item xs={12} md={6}>
  //         <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
  //           <CardContent sx={{ textAlign: "center" }}>
  //             <Work sx={{ fontSize: 60, color: "secondary.main", mb: 2 }} />
  //             <Typography variant="h6" gutterBottom>Manage Job Postings</Typography>
  //             <Typography variant="body2" color="text.secondary" mb={2}>
  //               View, edit, or delete your previously posted jobs.
  //             </Typography>
  //             <Button
  //               variant="contained"
  //               color="secondary"
  //               onClick={() => navigate(`/coordinator-dashboard/${id}/jobs`)}
  //             >
  //               View Jobs
  //             </Button>
  //           </CardContent>
  //         </Card>
  //       </Grid>
  //     </Grid>
  //   </Container>
    // </CoordinatorLayout>
//   );
// }















// import React, { useEffect, useState } from "react";
// import { Box, Container, Typography, Grid, Card, CardContent, Button, CircularProgress, Alert } from "@mui/material";
// import { Work, AddCircle } from "@mui/icons-material";
// import { useNavigate, useParams } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";

// import StatCard from "../components/StatCard";
// import JobCard from "../components/JobCard";
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import WorkIcon from '@mui/icons-material/Work';

// export default function CoordinatorDashboard() {
//   const navigate = useNavigate();
//   const { id } = useParams(); 
//   const decodedId = decodeURIComponent(id);

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // **Dynamic Data**
//   const [stats, setStats] = useState([]);
//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState({ pending: 0, interview: 0, selected: 0 });

//   // Fetch coordinator profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axiosInstance.get(`/users/users/${decodedId}/`);
//         setUserData(res.data);
//       } catch (err) {
//         setError("Failed to fetch coordinator details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [id]);

//   // Fetch dynamic stats, jobs, and applications
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Fetch jobs
//         const jobsRes = await axiosInstance.get("/jobs/"); 
//         setJobs(jobsRes.data);

//         // Compute stats dynamically
//         const activeJobs = jobsRes.data.length;
//         const totalApplications = jobsRes.data.reduce((sum, job) => sum + (job.applicants || 0), 0);
//         const interviewsScheduled = jobsRes.data.reduce((sum, job) => sum + (job.interviews || 0), 0);
//         const successRate = activeJobs > 0 ? Math.round((jobsRes.data.filter(job => job.filled).length / activeJobs) * 100) + "%" : "0%";

//         setStats([
//           { title: "Active Jobs", value: activeJobs, subText: `+${Math.floor(activeJobs * 0.05)} this week`, icon: <WorkIcon /> },
//           { title: "Applications", value: totalApplications, subText: `+${Math.floor(totalApplications * 0.02)} today`, icon: <AttachMoneyIcon /> },
//           { title: "Interviews Scheduled", value: interviewsScheduled, subText: "This week", icon: <CalendarTodayIcon /> },
//           { title: "Success Rate", value: successRate, subText: "+5% this semester", icon: <CheckCircleIcon /> },
//         ]);

//         // Fetch applications stats
//         const appsRes = await axiosInstance.get("/applications/"); 
//         const pending = appsRes.data.filter(a => a.status === "pending").length;
//         const interview = appsRes.data.filter(a => a.status === "interview").length;
//         const selected = appsRes.data.filter(a => a.status === "selected").length;

//         setApplications({ pending, interview, selected });
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   if (loading) return <Container sx={{ mt: 6, textAlign: "center" }}><CircularProgress /></Container>;
//   if (error) return <Container sx={{ mt: 6 }}><Alert severity="error">{error}</Alert></Container>;

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       {/* Top Stats */}
//       <Grid container spacing={2}>
//         {stats.map((stat, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <StatCard {...stat} />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Active Job Postings */}
//       <Box mt={4} mb={2} display="flex" justifyContent="space-between" alignItems="center">
//         <Typography variant="h6">Active Job Postings</Typography>
//         <Box>
//           <Button variant="contained" sx={{ mr: 1 }}>Manage Jobs</Button>
//           <Button variant="outlined">View Jobs</Button>
//         </Box>
//       </Box>

//       <Grid container spacing={2}>
//         {jobs.map((job, index) => (
//           <Grid item xs={12} key={index}>
//             <JobCard job={job} />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Student Applications */}
//       <Box mt={4}>
//         <Typography variant="h6">Student Applications</Typography>
//         <Card sx={{ mt: 1 }}>
//           <CardContent>
//             <Box display="flex" justifyContent="space-between" mb={1}>
//               <Typography>Pending Review</Typography>
//               <Typography>{applications.pending}</Typography>
//             </Box>
//             <Box display="flex" justifyContent="space-between" mb={1}>
//               <Typography>Under Interview</Typography>
//               <Typography>{applications.interview}</Typography>
//             </Box>
//             <Box display="flex" justifyContent="space-between">
//               <Typography>Selected</Typography>
//               <Typography>{applications.selected}</Typography>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </Container>
//   );
// }
