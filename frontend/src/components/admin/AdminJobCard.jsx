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
import { useNavigate } from "react-router-dom";

const AdminJobCard = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <Box sx={{ mt: 6 }}>
      {/* Page Title */}
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
        sx={{
          textAlign: "left",
          background: "linear-gradient(90deg, #0D47A1, #42A5F5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.8px",
        }}
      >
        Job Management
      </Typography>

      <Grid container spacing={3}>
        {jobPostings.length > 0 ? (
          jobPostings.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={job.id || index}>
              <Card
                onClick={() =>
                  navigate(`/admin/job/${encodeURIComponent(job.company_name)}/applicants`)
                }
                sx={{
                  borderRadius: "20px",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,248,255,0.8) 100%)",
                  backdropFilter: "blur(12px)",
                  boxShadow:
                    "0 4px 25px rgba(0,0,0,0.08), 0 2px 10px rgba(21,101,192,0.05)",
                  transition: "all 0.35s ease",
                  cursor: "pointer",
                  border: "1px solid rgba(21,101,192,0.1)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow:
                      "0 10px 35px rgba(21,101,192,0.25), 0 6px 15px rgba(0,0,0,0.08)",
                    background:
                      "linear-gradient(145deg, rgba(227,242,253,0.95), rgba(187,222,251,0.9))",
                  },
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  {/* Company Header */}
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
                          color: "#0D47A1",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.6px",
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
                        p: 0.8,
                        borderRadius: "12px",
                        background: "rgba(25, 118, 210, 0.1)",
                        color: "#1565C0",
                      }}
                    >
                      <WorkOutlineIcon fontSize="small" />
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 1.5, borderColor: "rgba(0,0,0,0.08)" }} />

                  {/* Job Title */}
                  <Tooltip title={job.job_title || "Untitled Job"}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: "#0C101A",
                        mb: 1.2,
                        fontSize: "1.05rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {job.job_title || "Untitled Job"}
                    </Typography>
                  </Tooltip>

                  {/* Job Info */}
                  <Box sx={{ color: "rgba(0,0,0,0.55)", mb: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                      <LocationOnIcon
                        fontSize="small"
                        sx={{ mr: 0.7, color: "#1565C0" }}
                      />
                      <Typography variant="body2">
                        {job.location || "Not specified"}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
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
                      job.status === "Closed" ? (
                        <CancelIcon />
                      ) : (
                        <CheckCircleIcon />
                      )
                    }
                    label={job.status || "Open"}
                    sx={{
                      mt: 0.5,
                      fontWeight: 600,
                      borderRadius: "8px",
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

                  <Divider sx={{ my: 2, borderColor: "rgba(0,0,0,0.08)" }} />

                  {/* Stats Section */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box>
                      <PeopleIcon
                        sx={{
                          color: "#1976d2",
                          fontSize: 22,
                          transition: "0.3s",
                          "&:hover": { transform: "scale(1.2)" },
                        }}
                      />
                      <Typography variant="caption" display="block">
                        {job.applicants || 0} Applicants
                      </Typography>
                    </Box>

                    <Box>
                      <VisibilityIcon
                        sx={{
                          color: "#42a5f5",
                          fontSize: 22,
                          transition: "0.3s",
                          "&:hover": { transform: "scale(1.2)" },
                        }}
                      />
                      <Typography variant="caption" display="block">
                        {job.views || 0} Views
                      </Typography>
                    </Box>

                    <Box>
                      <AssignmentIcon
                        sx={{
                          color: "#43a047",
                          fontSize: 22,
                          transition: "0.3s",
                          "&:hover": { transform: "scale(1.2)" },
                        }}
                      />
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
            sx={{
              mt: 3,
              textAlign: "center",
              width: "100%",
              fontStyle: "italic",
              opacity: 0.8,
            }}
          >
            No job postings found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default AdminJobCard;
