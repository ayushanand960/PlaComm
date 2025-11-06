

// import React, { useEffect, useState } from "react";
// import {Box, Container, Typography, Grid, Card, CardContent, Button, CircularProgress, Alert } from "@mui/material";
// import { Work, AddCircle } from "@mui/icons-material";
// import { useNavigate, useParams } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";


// import StatCard from "../../components/PlacementCoordinator/StatCard";
// import JobCard from "../../components/PlacementCoordinator/JobCard";
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import WorkIcon from '@mui/icons-material/Work';
// // import ActiveJobPosting from "../../components/ActiveJobPosting"


// export default function CoordinatorDashboard() {
//     const stats = [
//     { title: "Active Jobs", value: 89, subText: "+5 this week", icon: <WorkIcon /> },
//     { title: "Applications", value: 2145, subText: "+45 today", icon: <AttachMoneyIcon /> },
//     { title: "Interviews Scheduled", value: 156, subText: "This week", icon: <CalendarTodayIcon /> },
//     { title: "Success Rate", value: "78%", subText: "+5% this semester", icon: <CheckCircleIcon /> },
//   ];


//   const jobs = [
//     {
//       title: "Software Engineer",
//       company: "TCS",
//       location: "Mumbai",
//       salary: "6-8 LPA",
//       skills: ["Computer Science"],
//       type: "Full-time",
//       applicants: 125,
//     },
//     // More jobs can come dynamically
//   ];    


//    const navigate = useNavigate();
//   const { id } = useParams(); // Only id
//   const decodedId = decodeURIComponent(id);

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   if (loading) return <Container sx={{ mt: 6, textAlign: "center" }}><CircularProgress /></Container>;
//   if (error) return <Container sx={{ mt: 6 }}><Alert severity="error">{error}</Alert></Container>;

// return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       {/* Top Stats */}
//       <Grid container spacing={2}>
//         {stats.map((stat, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <StatCard {...stat} />
//           </Grid>
//         ))}
//       </Grid>



// <Box sx={{ mt: 5 }}>
//   <Typography
//     variant="h5"
//     sx={{
//       fontWeight: 700,
//       mb: 2,
//       color: "#1976d2", // blue heading
//       borderBottom: "2px solid #1976d2",
//       display: "inline-block",
//       pb: 0.5,
//     }}
//   >
//     Your Job Postings
//   </Typography>
//   </Box>

//       <Grid container spacing={2}>
//         {jobs.map((job, index) => (
//           <Grid item xs={12} key={index}>
//             <JobCard job={job} />
//           </Grid>
//         ))}
//       </Grid>




//               {/* Discussion Forum Card */}
//               <Box mb={4}>
//                 <Card
//                   sx={{
//                     cursor: "pointer",
//                     transition: "0.3s",
//                     "&:hover": { boxShadow: 6 },
//                     height: 120,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     padding: 2,
//                     backgroundColor: "#e3f2fd"
//                   }}
//                   onClick={() => navigate("/discussion-forum")}
//                 >
//                   <CardContent>
//                     <Typography variant="h6">Discussion Forum</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Explore categories, threads, and participate in discussions.
//                     </Typography>
//                   </CardContent>
//                   <Button variant="contained" onClick={() => navigate("/discussion-forum")}>
//                     Go
//                   </Button>
//                 </Card>
//               </Box>

//       {/* Student Applications */}
//       <Box mt={4}>
//         <Typography variant="h6">Student Applications</Typography>
//         <Card sx={{ mt: 1 }}>
//           <CardContent>
//             <Box display="flex" justifyContent="space-between" mb={1}>
//               <Typography>Pending Review</Typography>
//               <Typography>234</Typography>
//             </Box>
//             <Box display="flex" justifyContent="space-between" mb={1}>
//               <Typography>Under Interview</Typography>
//               <Typography>89</Typography>
//             </Box>
//             <Box display="flex" justifyContent="space-between">
//               <Typography>Selected</Typography>
//               <Typography>45</Typography>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </Container>
//   );
// }
















//Job cards repeating problem

// // src/pages/coordinator/CoordinatorDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

import StatCard from "../../components/PlacementCoordinator/StatCard";
import JobCard from "../../components/PlacementCoordinator/JobCard";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkIcon from '@mui/icons-material/Work';

export default function CoordinatorDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);

  const [userData, setUserData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch coordinator profile
        const resProfile = await axiosInstance.get(`/users/users/${decodedId}/`);
        setUserData(resProfile.data);

        const username = resProfile.data.username;

        // Fetch all jobs by this coordinator
        const resJobs = await axiosInstance.get("/placements/job-postings/");
        // const myJobs = (Array.isArray(resJobs.data) ? resJobs.data : []).filter(
        //   job => job.coordinator === username
        // );
        // setJobs(myJobs);

        const myJobs = (Array.isArray(resJobs.data) ? resJobs.data : [])
          .filter(job => job.coordinator === username)
          .filter((job, index, self) =>
            index === self.findIndex(j => j.job_id === job.job_id)
          );

        setJobs(myJobs);


        // Fetch applications for all jobs
        const allApplications = await Promise.all(
          myJobs.map(async (job) => {
            try {
              const resApps = await axiosInstance.get(`/placements/job-postings/${job.job_id}/apply/`);
              return resApps.data.map(app => ({
                ...app,
                jobTitle: job.job_title,
                company: job.company_name,
                location: job.location
              }));
            } catch {
              return [];
            }
          })
        );

        setApplications(allApplications.flat());
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch coordinator data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decodedId]);

  if (loading) return <Container sx={{ mt: 6, textAlign: "center" }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ mt: 6 }}><Alert severity="error">{error}</Alert></Container>;

  // Stats dynamic
  const stats = [
    { title: "Active Jobs", value: jobs.length, subText: "", icon: <WorkIcon /> },
    { title: "Applications", value: applications.length, subText: "", icon: <AttachMoneyIcon /> },
    { title: "Interviews Scheduled", value: 0, subText: "", icon: <CalendarTodayIcon /> }, // update later if you have interview API
    { title: "Success Rate", value: "—", subText: "", icon: <CheckCircleIcon /> } // update later if you have success rate
  ];

  // Student Applications summary
  const pending = applications.filter(app => app.status === "pending").length;
  const underInterview = applications.filter(app => app.status === "under_interview").length;
  const selected = applications.filter(app => app.status === "selected").length;

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
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {jobs.map(job => (
          <Grid item xs={12} key={job.job_id}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>

      {/* Discussion Forum Card */}
      <Box mb={4} mt={4}>
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
          <Button variant="contained" onClick={(e) => {
              e.stopPropagation(); // ✅ prevents double navigation
              navigate("/discussion-forum");
            }}>
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
              <Typography>{pending}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Under Interview</Typography>
              <Typography>{underInterview}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Selected</Typography>
              <Typography>{selected}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}









