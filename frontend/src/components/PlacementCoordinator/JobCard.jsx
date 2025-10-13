

// // src/components/JobCard.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Box,
//   Chip,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions
// } from "@mui/material";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import WorkIcon from '@mui/icons-material/Work';
// import axiosInstance from "../../api/axiosInstance";

// export default function JobCard() {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null); // For modal

//   // Fetch jobs on load
//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await axiosInstance.get("/placements/job-postings/");
//       setJobs(res.data);
//     } catch (err) {
//       console.error("❌ Failed to fetch jobs", err);
//     }
//   };

//   const handleViewDetails = (job) => {
//     setSelectedJob(job); // Set the clicked job for modal
//   };

//   const handleCloseModal = () => {
//     setSelectedJob(null);
//   };

//   return (
//     <>
//       <Grid container spacing={2}>
//         {jobs.length > 0 ? (
//           jobs.map((job) => (
//             <Grid item xs={12} sm={6} md={4} key={job.id}>
//               <Card sx={{ marginY: 1 }}>
//                 <CardContent>
//                   <Box display="flex" justifyContent="space-between" alignItems="center">
//                     <Typography variant="h6">{job.job_title}</Typography>
//                     <Chip label={job.job_type || "Full Time"} size="small" />
//                   </Box>
//                   <Box display="flex" alignItems="center" mt={1} mb={1}>
//                     <WorkIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
//                     <Typography variant="body2" color="textSecondary">{job.company_name}</Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" mb={1}>
//                     <LocationOnIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
//                     <Typography variant="body2" color="textSecondary">{job.location}</Typography>
//                   </Box>
//                   <Typography variant="body2" color="textSecondary">
//                     ₹{job.package}
//                   </Typography>
//                   <Box mt={1} mb={1}>
//                     {(job.skills || []).map((skill) => (
//                       <Chip key={skill} label={skill} size="small" sx={{ mr: 0.5 }} />
//                     ))}
//                   </Box>
//                   <Box display="flex" justifyContent="center" gap={1}>
//                     <Button variant="outlined" size="small" onClick={() => handleViewDetails(job)}>
//                       View Details
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="body1" color="textSecondary" sx={{ m: 2 }}>
//             No jobs posted yet.
//           </Typography>
//         )}
//       </Grid>


// {/* Modal for Job Details */}
// <Dialog open={!!selectedJob} onClose={handleCloseModal} maxWidth="sm" fullWidth>
//   <DialogContent sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 3 }}>
    
//     {/* Job Title */}
//     <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2,  color: '#1976d2',}}>
//       {selectedJob?.job_title}
//     </Typography>
    
//     {/* Company Name */}
//     <Typography variant="subtitle1" gutterBottom sx={{ mb: 1, fontWeight: 'medium' }}>
//       Company: {selectedJob?.company_name}
//     </Typography>

//     {/* Location & Package */}
//     <Box display="flex" justifyContent="space-between" mb={2}>
//       <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: '#d32f2f' }}>
//         <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
//         {selectedJob?.location}
//       </Typography>
//       <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//         ₹{selectedJob?.package}
//       </Typography>
//     </Box>

//     {/* Description */}
//     <Box mb={2}>
//       <Typography variant="subtitle2" mb={0.5} sx={{ fontWeight: 'bold', color: '#1976d2'}}>
//         Job Description:
//       </Typography>
//       <Typography variant="body2">
//         {selectedJob?.job_description || "No description provided."}
//       </Typography>
//     </Box>

//     {/* Positions */}
//     {selectedJob?.positions && (
//       <Box mb={2}>
//         <Typography variant="subtitle2" mb={0.5} sx={{ fontWeight: 'bold', color: '#1976d2'}}>
//           Positions:
//         </Typography>
//         <Typography variant="body2">
//           {(selectedJob?.positions || "").split(",").map(p => p.trim()).join(", ")}
//         </Typography>
//       </Box>
//     )}

//     {/* Skills */}
//     <Box mb={2}>
//       {/* <Typography variant="subtitle2" mb={0.5} sx={{ fontWeight: 'medium' }}>
//         Skills Required:
//       </Typography> */}
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//         {(selectedJob?.skills || []).map(skill => (
//           <Chip 
//             key={skill} 
//             label={skill} 
//             size="small" 
//             sx={{ backgroundColor: '#f3e5f5', color: '#6a1b9a' }}
//           />
//         ))}
//       </Box>
//     </Box>

//     {/* Eligibility & Deadline */}
//     <Box mb={2} display="flex" justifyContent="space-between">
//       <Typography variant="body2">
//         <strong>Eligibility:</strong> {selectedJob?.eligibility_criteria || "N/A"}
//       </Typography>
//       <Typography variant="body2">
//         <strong>Deadline:</strong> {selectedJob?.deadline || "N/A"}
//       </Typography>
//     </Box>

//     {/* Actions */}
//     <Box display="flex" justifyContent="flex-end" mt={3}>
//       <Button onClick={handleCloseModal} variant="outlined" sx={{ mr: 1 }}>
//         Close
//       </Button>
//     </Box>

//   </DialogContent>
// </Dialog>


//     </>
//   );
// }






// src/components/JobCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Dialog,
  DialogContent
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';

export default function JobCard({ job }) {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleViewDetails = () => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <Card sx={{ marginY: 1 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{job.job_title}</Typography>
            <Chip label={job.job_type || "Full Time"} size="small" />
          </Box>

          <Box display="flex" alignItems="center" mt={1} mb={1}>
            <WorkIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2" color="textSecondary">{job.company_name}</Typography>
          </Box>

          <Box display="flex" alignItems="center" mb={1}>
            <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2" color="textSecondary">{job.location}</Typography>
          </Box>

          <Typography variant="body2" color="textSecondary">₹{job.package}</Typography>

          <Box mt={1} mb={1}>
            {(job.skills || []).map((skill) => (
              <Chip key={skill} label={skill} size="small" sx={{ mr: 0.5 }} />
            ))}
          </Box>

          <Box display="flex" justifyContent="center" gap={1}>
            <Button variant="outlined" size="small" onClick={handleViewDetails}>
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={!!selectedJob} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}>
            {job.job_title}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Company: {job.company_name}
          </Typography>

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: '#d32f2f' }}>
              <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
              {job.location}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>₹{job.package}</Typography>
          </Box>

          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Job Description:
          </Typography>
          <Typography variant="body2" mb={2}>{job.job_description || "No description provided."}</Typography>

          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {(job.skills || []).map(skill => (
              <Chip key={skill} label={skill} size="small" sx={{ backgroundColor: '#f3e5f5', color: '#6a1b9a' }} />
            ))}
          </Box>

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Typography variant="body2"><strong>Eligibility:</strong> {job.eligibility_criteria || "N/A"}</Typography>
            <Typography variant="body2"><strong>Deadline:</strong> {job.deadline || "N/A"}</Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button onClick={handleCloseModal} variant="outlined">Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
