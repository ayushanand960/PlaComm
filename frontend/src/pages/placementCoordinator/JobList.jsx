// src/pages/JobList.jsx   
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import { useNavigate, useParams } from "react-router-dom"; 


// import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

export default function JobList() {
  const [jobs, setJobs] = useState([]);


  const navigate = useNavigate();
  const { id } = useParams(); // coordinator ID

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

  // const handleDelete = async (job_id) => {
  //   if (!window.confirm("Are you sure you want to delete this job?")) return;
  //   try {
  //     await axiosInstance.delete(`/placements/job-postings/${job_id}/`);
  //     alert("✅ Job deleted!");
  //     fetchJobs(); // refresh list
  //   } catch (err) {
  //     console.error("❌ Failed to delete job", err);
  //   }
  // };


  const handleDelete = async (job_id) => {
  if (!window.confirm("Are you sure you want to delete this job?")) return;

  try {
    // Attempt deletion without requiring a token
    await axiosInstance.delete(`/placements/job-postings/${job_id}/`);

    // Show success alert
    alert("✅ Job deleted successfully!");

    // Refresh the job list
    fetchJobs();
  } catch (err) {
    console.error("❌ Failed to delete job", err);

    // Show backend error message if available
    if (err.response) {
      alert(
        `Failed to delete job: ${err.response.status} ${
          err.response.data.detail || ""
        }`
      );
    } else {
      alert("Failed to delete job. Please try again.");
    }
  }
};


  // ✅ Navigate to edit job page
  const handleEdit = (job_id) => {
    navigate(`/coordinator-dashboard/${id}/placements/job-postings/edit/${job_id}`);
  };




  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Manage Job Postings
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              {/* <TableCell>Job Title</TableCell> */}
              <TableCell>Positions</TableCell>
              <TableCell>Job Description</TableCell>
              <TableCell>Package</TableCell>
              <TableCell>Candidates</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <TableRow key={job.job_id}>
                  <TableCell>{job.company_name}</TableCell>
                  {/* <TableCell>{job.job_title}</TableCell> */}
                  <TableCell>{job.positions}</TableCell>
                  <TableCell>{job.job_description}</TableCell>
                  <TableCell>{job.package}</TableCell>
                  <TableCell>{job.number_of_candidates}</TableCell>
                  <TableCell>{job.deadline}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(job.job_id)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(job.job_id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No jobs posted yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}








