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
import axios from "axios";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs on load
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/placements/job-postings/", {
        withCredentials: true,
      });
      setJobs(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch jobs", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:8000/placements/job-postings/${id}/`, {
        withCredentials: true,
      });
      alert("✅ Job deleted!");
      fetchJobs(); // refresh list
    } catch (err) {
      console.error("❌ Failed to delete job", err);
    }
  };

  const handleEdit = (id) => {
    // You can navigate to a separate EditJob page OR inline edit
    alert(`Edit functionality for job ID ${id} coming soon 🚀`);
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
                <TableRow key={job.id}>
                  <TableCell>{job.company_name}</TableCell>
                  {/* <TableCell>{job.job_title}</TableCell> */}
                  <TableCell>{job.positions}</TableCell>
                  <TableCell>{job.job_description}</TableCell>
                  <TableCell>{job.package}</TableCell>
                  <TableCell>{job.number_of_candidates}</TableCell>
                  <TableCell>{job.deadline}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(job.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(job.id)}>
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
