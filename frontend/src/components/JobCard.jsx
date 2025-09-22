// // src/components/JobCard.jsx
// import React from "react";
// import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import WorkIcon from '@mui/icons-material/Work';

// export default function JobCard({ job }) {
//   return (
//     <Card sx={{ marginY: 1 }}>
//       <CardContent>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6">{job.title}</Typography>
//           <Chip label={job.type} size="small" />
//         </Box>
//         <Box display="flex" alignItems="center" mt={1} mb={1}>
//           <WorkIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
//           <Typography variant="body2" color="textSecondary">{job.company}</Typography>
//         </Box>
//         <Box display="flex" alignItems="center" mb={1}>
//           <LocationOnIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
//           <Typography variant="body2" color="textSecondary">{job.location}</Typography>
//         </Box>
//         <Typography variant="body2" color="textSecondary">₹{job.salary}</Typography>
//         <Box mt={1} mb={1}>
//           {job.skills.map(skill => <Chip key={skill} label={skill} size="small" sx={{ mr: 0.5 }} />)}
//         </Box>
//         <Box display="flex" justifyContent="flex-end" gap={1}>
//           <Button variant="outlined" size="small">View Details</Button>
//           <Button variant="contained" size="small">Apply Now</Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }



// src/components/JobCard.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box, Chip, Grid } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import axiosInstance from "../api/axiosInstance";

export default function JobCard() {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs on load
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axiosInstance.get("/placements/job-postings/");
      setJobs(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch jobs", err);
    }
  };

  return (
    <Grid container spacing={2}>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card sx={{ marginY: 1 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{job.job_title}</Typography>
                  <Chip label={job.job_type || "Full Time"} size="small" />
                </Box>
                <Box display="flex" alignItems="center" mt={1} mb={1}>
                  <WorkIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                  <Typography variant="body2" color="textSecondary">{job.company_name}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationOnIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                  <Typography variant="body2" color="textSecondary">{job.location}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  ₹{job.package}
                </Typography>
                <Box mt={1} mb={1}>
                  {(job.skills || []).map((skill) => (
                    <Chip key={skill} label={skill} size="small" sx={{ mr: 0.5 }} />
                  ))}
                </Box>
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Button variant="outlined" size="small">View Details</Button>
                  <Button variant="contained" size="small">Apply Now</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary" sx={{ m: 2 }}>
          No jobs posted yet.
        </Typography>
      )}
    </Grid>
  );
}



