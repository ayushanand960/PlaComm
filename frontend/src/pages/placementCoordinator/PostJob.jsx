import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../../api/axiosInstance";

export default function PostJob() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    company_name: "",
    job_title: "",
    job_description: "",
    positions: "",
    number_of_candidates: "",
    eligibility_criteria: "",
    location: "",
    package: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🧠 Validation (optional but recommended)
    if (!formData.company_name || !formData.job_description || !formData.positions) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    try {
      // ✅ No job_id sent — backend auto-generates it now
      const payload = {
        company_name: formData.company_name,
        job_title: formData.job_title,
        job_description: formData.job_description,
        positions: formData.positions,
        number_of_candidates: parseInt(formData.number_of_candidates) || 0,
        eligibility_criteria: formData.eligibility_criteria,
        location: formData.location,
        package: formData.package,
        deadline: formData.deadline,
      };

      await axiosInstance.post("/placements/job-postings/", payload);
      alert("✅ Job posted successfully!");

      // reset form
      setFormData({
        company_name: "",
        job_title: "",
        job_description: "",
        positions: "",
        number_of_candidates: "",
        eligibility_criteria: "",
        location: "",
        package: "",
        deadline: "",
      });
    } catch (error) {
      console.error("❌ Error while posting job:", error);
      if (error.response) {
        alert(`❌ Failed: ${error.response.data.detail || "Bad Request"}`);
      } else {
        alert("❌ Failed to post job. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Post a New Job
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Company Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Company Name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
              />
            </Grid>

            {/* Job Title */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
              />
            </Grid>

            {/* Job Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Job Description"
                name="job_description"
                value={formData.job_description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>

            {/* Positions */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Positions (comma separated)"
                name="positions"
                value={formData.positions}
                onChange={handleChange}
              />
            </Grid>

            {/* Number of Candidates */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Number of Candidates"
                name="number_of_candidates"
                value={formData.number_of_candidates}
                onChange={handleChange}
              />
            </Grid>

            {/* Eligibility Criteria */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Eligibility Criteria"
                name="eligibility_criteria"
                value={formData.eligibility_criteria}
                onChange={handleChange}
              />
            </Grid>

            {/* Location */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>

            {/* Package */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Package"
                name="package"
                value={formData.package}
                onChange={handleChange}
              />
            </Grid>

            {/* Deadline */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Submit Job"
            )}
          </Button>

        </form>
      </Paper>
    </Container>
  );
}











