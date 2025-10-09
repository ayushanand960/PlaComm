// import React, { useEffect, useState } from "react";
// import { Card, CardContent, Typography, Grid, Button, CircularProgress, Box } from "@mui/material";
// import axiosInstance from "../../api/axiosInstance";

// const AdminJobCard = () => {
//   const [jobPostings, setJobPostings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchJobPostings = async () => {
//     try {
//       const response = await axiosInstance.get("placements/job-postings/");
//       setJobPostings(response.data);
//     } catch (error) {
//       console.error("Error fetching job postings:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobPostings();
//   }, []);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ mt: 5 }}>
//       <Typography variant="h5" fontWeight="bold" mb={2}>
//         Job Management
//       </Typography>

//       <Grid container spacing={3}>
//         {jobPostings.length > 0 ? (
//           jobPostings.map((job) => (
//             <Grid item xs={12} md={6} lg={4} key={job.id}>
//               <Card
//                 sx={{
//                   borderRadius: "12px",
//                   boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
//                   transition: "0.3s",
//                   "&:hover": { boxShadow: "0px 6px 16px rgba(0,0,0,0.15)" },
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold">
//                     {job.title || "Untitled Job"}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" mt={1}>
//                     {job.company_name || "Unknown Company"}
//                   </Typography>
//                   <Typography variant="body2" mt={1}>
//                     <strong>Location:</strong> {job.location || "Not specified"}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Posted On:</strong>{" "}
//                     {new Date(job.posted_date).toLocaleDateString() || "N/A"}
//                   </Typography>
//                   <Typography variant="body2" mt={1}>
//                     <strong>Status:</strong> {job.status || "Open"}
//                   </Typography>

//                   {/* <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
//                     <Button variant="contained" color="primary" size="small">
//                       Edit
//                     </Button>
//                     <Button variant="outlined" color="error" size="small">
//                       Delete
//                     </Button> */}
//                   {/* </Box> */}
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="body1" color="textSecondary">
//             No job postings found.
//           </Typography>
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default AdminJobCard;
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Chip,
  Divider,
  Tooltip,
} from "@mui/material";
import axiosInstance from "../../api/axiosInstance";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PeopleIcon from "@mui/icons-material/People";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIcon from "@mui/icons-material/Assignment";

const AdminJobCard = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobPostings = async () => {
    try {
      const response = await axiosInstance.get("placements/job-postings/");
      setJobPostings(response.data);
    } catch (error) {
      console.error("Error fetching job postings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress thickness={4} size={48} />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
        sx={{
          textAlign: "left",
          background: "linear-gradient(90deg, #1565C0, #42A5F5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Job Management
      </Typography>

      <Grid container spacing={3}>
        {jobPostings.length > 0 ? (
          jobPostings.map((job, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={job.id || index}>
              <Card
                sx={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  p: 2,
                  background:
                    "rgba(255, 255, 255, 0.15)", // Glassmorphism base
                  backdropFilter: "blur(10px)",
                  boxShadow:
                    "0 4px 30px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(33, 150, 243, 0.05)",
                  transition: "all 0.35s ease-in-out",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow:
                      "0 12px 40px rgba(33, 150, 243, 0.35), 0 6px 20px rgba(0,0,0,0.1)",
                    background:
                      "linear-gradient(135deg, rgba(33,150,243,0.2), rgba(255,255,255,0.2))",
                  },
                }}
              >
                <CardContent>
                  {/* Header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Tooltip title={job.company_name || "Company"}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "#1565C0",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "80%",
                        }}
                      >
                        {job.company_name || "Company"}
                      </Typography>
                    </Tooltip>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: "12px",
                        background: "rgba(25, 118, 210, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#090a0cff",
                      }}
                    >
                      <WorkOutlineIcon fontSize="small" />
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 1.5, borderColor: "rgba(0,0,0,0.1)" }} />

                  {/* Job Title */}
                  <Tooltip title={job.title || "Untitled Job"}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: "#08090cff",
                        mb: 1.2,
                        fontSize: "1.1rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {job.title || "Untitled Job"}
                    </Typography>
                  </Tooltip>

                  {/* Details */}
                  <Box sx={{ color: "rgba(0, 0, 0, 0.45)", mb: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 0.5,
                        fontSize: "0.9rem",
                      }}
                    >
                      <LocationOnIcon
                        fontSize="small"
                        sx={{ mr: 0.7, color: "#1565C0" }}
                      />
                      <Typography variant="body2">
                        {job.location || "Not specified"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      <CalendarMonthIcon
                        fontSize="small"
                        sx={{ mr: 0.7, color: "#1565C0" }}
                      />
                      <Typography variant="body2">
                        {job.posted_date
                          ? new Date(job.posted_date).toLocaleDateString()
                          : "N/A"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Status Chip */}
                  <Chip
                    icon={
                      job.status === "Closed" ? <CancelIcon /> : <CheckCircleIcon />
                    }
                    label={job.status || "Open"}
                    sx={{
                      mt: 1,
                      fontWeight: 600,
                      borderRadius: "10px",
                      px: 1.5,
                      backgroundColor:
                        job.status === "Closed"
                          ? "rgba(244, 67, 54, 0.1)"
                          : "rgba(33,150,243,0.1)",
                      color: job.status === "Closed" ? "#d32f2f" : "#1565C0",
                      "& .MuiChip-icon": {
                        color: job.status === "Closed" ? "#d32f2f" : "#1565C0",
                      },
                    }}
                  />

                  {/* Bottom Stats Row */}
                  <Divider sx={{ my: 1.5, borderColor: "rgba(0,0,0,0.1)" }} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "center",
                    }}
                  >
                    <Box>
                      <PeopleIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                      <Typography variant="caption" display="block">
                        {job.applicants || 0} Applicants
                      </Typography>
                    </Box>
                    <Box>
                      <VisibilityIcon sx={{ color: "#42a5f5", fontSize: 20 }} />
                      <Typography variant="caption" display="block">
                        {job.views || 0} Views
                      </Typography>
                    </Box>
                    <Box>
                      <AssignmentIcon sx={{ color: "#43a047", fontSize: 20 }} />
                      <Typography variant="caption" display="block">
                        {job.open_positions || 0} Positions
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ mt: 3, textAlign: "center", width: "100%" }}
          >
            No job postings found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default AdminJobCard;
