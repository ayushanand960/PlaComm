// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   Divider,
//   Chip,
//   IconButton,
//   Stack,
//   Avatar,
// } from "@mui/material";
// import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
// import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

// const Applications = () => {
//   const [applications, setApplications] = useState([
//     {
//       id: 1,
//       studentName: "Alex John",
//       jobTitle: "Frontend Developer",
//       companyName: "TechCorp",
//       status: "Applied",
//       applicationDate: "2025-10-06",
//       isBookmarked: false,
//     },
//     {
//       id: 2,
//       studentName: "Sam Hill",
//       jobTitle: "Backend Developer",
//       companyName: "InnoSoft",
//       status: "Shortlisted",
//       applicationDate: "2025-09-25",
//       isBookmarked: true,
//     },
//     {
//       id: 3,
//       studentName: "Emily Davis",
//       jobTitle: "Data Scientist",
//       companyName: "DataWorks",
//       status: "Interview Scheduled",
//       applicationDate: "2025-09-20",
//       isBookmarked: false,
//     },
//   ]);

//   const toggleBookmark = (id) => {
//     setApplications((prev) =>
//       prev.map((app) =>
//         app.id === id ? { ...app, isBookmarked: !app.isBookmarked } : app
//       )
//     );
//   };

//   return (
//     <Box p={{ xs: 2, md: 3 }} bgcolor="#f5f5f5" minHeight="100vh">
//       <Typography variant="h4" gutterBottom fontWeight="bold">
//         Applications
//       </Typography>

//       {applications.length === 0 ? (
//         <Typography variant="body1" color="textSecondary">
//           No applications found.
//         </Typography>
//       ) : (
//         <Paper
//           sx={{
//             maxWidth: 950,
//             mx: "auto",
//             p: { xs: 1, md: 2 },
//             borderRadius: 2,
//           }}
//         >
//           <List>
//             {applications.map((app) => (
//               <React.Fragment key={app.id}>
//                 <ListItem
//                   sx={{
//                     bgcolor: app.status === "Applied" ? "#e3f2fd" : "#fff",
//                     borderRadius: 2,
//                     mb: 2,
//                     display: "flex",
//                     flexDirection: { xs: "column", sm: "row" },
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     px: 2,
//                     py: 2,
//                     boxShadow: 1,
//                     transition: "0.3s",
//                     "&:hover": {
//                       boxShadow: 4,
//                     },
//                   }}
//                 >
//                   <Stack
//                     direction={{ xs: "column", sm: "row" }}
//                     spacing={2}
//                     alignItems="center"
//                     sx={{ width: "100%" }}
//                   >
//                     <Avatar sx={{ bgcolor: "#1976d2" }}>
//                       {app.studentName[0]}
//                     </Avatar>
//                     <Box sx={{ flex: 1 }}>
//                       <Typography fontWeight="bold" variant="subtitle1">
//                         {app.studentName}
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         {app.jobTitle} at {app.companyName}
//                       </Typography>
//                       <Typography variant="caption" color="textSecondary">
//                         Applied on {app.applicationDate}
//                       </Typography>
//                     </Box>
//                   </Stack>

//                   <Box
//                     display="flex"
//                     alignItems="center"
//                     gap={1}
//                     mt={{ xs: 1, sm: 0 }}
//                   >
//                     <Chip
//                       label={app.status}
//                       size="small"
//                       color={
//                         app.status === "Applied"
//                           ? "info"
//                           : app.status === "Shortlisted"
//                           ? "success"
//                           : "warning"
//                       }
//                       sx={{ fontWeight: "bold" }}
//                     />
//                     <IconButton
//                       onClick={() => toggleBookmark(app.id)}
//                       color={app.isBookmarked ? "primary" : "default"}
//                     >
//                       {app.isBookmarked ? (
//                         <BookmarkAddedIcon />
//                       ) : (
//                         <BookmarkRemoveIcon />
//                       )}
//                     </IconButton>
//                   </Box>
//                 </ListItem>
//                 <Divider />
//               </React.Fragment>
//             ))}
//           </List>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default Applications;





// import React, { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";

// const Applications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchApplications = async () => {
//     try {
//       // Step 1: Get all job postings
//       const jobsRes = await axiosInstance.get("/placements/job-postings/");
//       const jobs = jobsRes.data;

//       const allApplications = [];

//       // Step 2: For each job, get its applications
//       for (let job of jobs) {
//         try {
//           const appsRes = await axiosInstance.get(
//             `/placements/job-postings/${job.id}/apply/`
//           );
//           const apps = appsRes.data;

//           apps.forEach((app) => {
//             allApplications.push({
//               student_id: app.student, // backend only provides ID
//               job_id: job.id,
//               job_title: job.title, // from job posting
//               company_name: job.company_name, // from job posting
//               status: app.status,
//             });
//           });

//           // Debug: Check in console
//           console.log(`Applications for job ${job.id}:`, apps);
//         } catch (err) {
//           console.error(`Failed to fetch applications for job ${job.id}`, err);
//         }
//       }

//       setApplications(allApplications);
//       setLoading(false);
//     } catch (err) {
//       console.error("Failed to fetch job postings", err);
//       setError("Failed to load applications.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   if (loading)
//     return <p className="text-center text-gray-600">Loading applications...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Student Applications</h2>
//       {applications.length === 0 ? (
//         <p className="text-gray-500">No applications found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300 shadow-md">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 border">Student ID</th>
//                 <th className="py-2 px-4 border">Job ID</th>
//                 <th className="py-2 px-4 border">Job Title</th>
//                 <th className="py-2 px-4 border">Company</th>
//                 <th className="py-2 px-4 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((app, index) => (
//                 <tr key={index}>
//                   <td className="py-2 px-4 border">{app.student_id}</td>
//                   <td className="py-2 px-4 border">{app.job_id}</td>
//                   <td className="py-2 px-4 border">{app.job_title}</td>
//                   <td className="py-2 px-4 border">{app.company_name}</td>
//                   <td className="py-2 px-4 border font-medium text-blue-600">
//                     {app.status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Applications;






// src/pages/Applications.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      const jobsRes = await axiosInstance.get("/placements/job-postings/");
      const jobs = jobsRes.data;

      const allApplications = [];

      for (let job of jobs) {
        try {
          const appsRes = await axiosInstance.get(
            `/placements/job-postings/${job.id}/apply/`
          );
          const apps = appsRes.data;

          apps.forEach((app) => {
            allApplications.push({
              student_id: app.student,
              student_name: app.student_name || "N/A",
              job_id: job.id,
              job_title: job.title,
              company_name: job.company_name,
              status: app.status,
              updated_at: app.updated_at || new Date().toISOString(),
            });
          });
        } catch (err) {
          console.error(`Failed to fetch applications for job ${job.id}`, err);
        }
      }

      setApplications(allApplications);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch job postings", err);
      setError("Failed to load applications.");
      setLoading(false);
    }
  };

  useEffect(() => {
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
    <Box sx={{ minHeight: "100vh", pt: 4, backgroundColor: "#f5f5f5" }}>
      <Container>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Student Applications
        </Typography>

        {applications.length === 0 ? (
          <Typography>No applications found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {applications.map((app) => (
              <Grid item xs={12} sm={6} md={4} key={`${app.student_id}-${app.job_id}`}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: "#1976d2" }}>
                        {app.student_name ? app.student_name[0] : "S"}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {app.student_name} ({app.student_id})
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {app.job_title} at {app.company_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Updated {dayjs(app.updated_at).format("DD MMM YYYY")}
                        </Typography>
                      </Box>
                    </Stack>

                    <Box sx={{ mt: 2 }}>
                      <Chip
                        label={app.status}
                        color={
                          app.status === "applied"
                            ? "info"
                            : app.status === "shortlisted"
                            ? "success"
                            : "error"
                        }
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>
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

export default Applications;
