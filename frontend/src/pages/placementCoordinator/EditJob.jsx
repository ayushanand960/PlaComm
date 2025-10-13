import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function EditJob() {
  const { job_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState({
    company_name: "",
    positions: "",
    job_description: "",
    package: "",
    number_of_candidates: "",
    deadline: "",
  });

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const fetchJobDetails = async () => {
    try {
      const res = await axiosInstance.get(`/placements/job-postings/${job_id}/`);
      setJobData(res.data);
    } catch (err) {
      console.error("❌ Failed to load job details", err);
      alert("Failed to load job details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/placements/job-postings/${job_id}/`, jobData);
      alert("✅ Job updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error("❌ Update failed", err);
      alert("Failed to update job. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Loading job details...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 4 }}>
      <Paper
        elevation={5}
        sx={{
          p: 5,
          borderRadius: 4,
          backgroundColor: "#fafafa",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          ✏️ Edit Job Posting
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Update company details, job description, and candidate requirements.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company Name"
              name="company_name"
              value={jobData.company_name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Positions"
              name="positions"
              value={jobData.positions}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Job Description"
              name="job_description"
              value={jobData.job_description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Package (CTC)"
              name="package"
              value={jobData.package}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Candidates"
              name="number_of_candidates"
              value={jobData.number_of_candidates}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Deadline"
              name="deadline"
              type="date"
              value={jobData.deadline}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Update Job
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
