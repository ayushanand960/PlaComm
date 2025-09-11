import React from "react";
import  { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
const AddJobPosting = () => {
//   const navigate = useNavigate();

//   const addJob = () => {
//     navigate("/dashboard/post-job");
//   };

//   const viewJobs = () => {
//     navigate("/dashboard/jobs");
//   };

  const navigate = useNavigate();
  const { id } = useParams(); // Only id
  const decodedId = decodeURIComponent(id);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold">
              Active Job Postings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Use the options below to create a new job listing or reach out to HR.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
            //   onClick={addJob}
              onClick={() => navigate(`/coordinator-dashboard/${id}/post-job`)}
              sx={{
                backgroundColor: "#4CAF50",
                "&:hover": { backgroundColor: "#43A047" },
                textTransform: "none",
              }}
            >
              Add New Job
            </Button>
            <Button
              variant="outlined"
            //   onClick={viewJobs}
            onClick={() => navigate(`/coordinator-dashboard/${id}/jobs`)}
              sx={{
                borderColor: "#4CAF50",
                color: "#4CAF50",
                "&:hover": {
                  backgroundColor: "#E8F5E9",
                  borderColor: "#43A047",
                  color: "#388E3C",
                },
                textTransform: "none",
              }}
            >
              View Jobs
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddJobPosting;
