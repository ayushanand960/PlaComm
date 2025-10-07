import React from "react";
import { Grid, Box, Container } from "@mui/material";
import LoginBanner from "../../TrainingOfficerComponents/Dashboard/LoginBanner";
import StatsCards from "../../TrainingOfficerComponents/Dashboard/StatsCards";
import StudentAssessment from "../../TrainingOfficerComponents/Dashboard/StudentAssessment";
import TopPerformingStudents from "../../TrainingOfficerComponents/Dashboard/TopPerformingStudent";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const officerName = user?.first_name
    ? `${user.first_name} ${user.last_name || ""}`
    : "Training Officer";

  // Example dynamic stats
  const stats = {
    studentsTrained: 120,
    mockInterviews: 15,
    averageScore: "8.5/10",
    improvement: "+2 improvement",
    priorityLists: 5,
  };

  const topStudents = [
    { name: "Rahul Sharma", branch: "CS", score: "9.2/10" },
    { name: "Priya Patel", branch: "IT", score: "8.9/10" },
    { name: "Amit Kumar", branch: "ECE", score: "8.7/10" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowX: "hidden",
        bgcolor: "linear-gradient(135deg, #18C381, #1046a8, #DAA520)"
      }}
    >
      {/* LoginBanner full width */}
      <Box sx={{ width: "100%", display: "flex" }}>
        <LoginBanner officerName={officerName} />
      </Box>

      {/* StatsCards */}
      <StatsCards stats={stats} />

      {/* Dashboard content */}
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#fffbea", p: 3, borderRadius: 2, mt: 2 }}>
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
              <StudentAssessment />
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: "flex", flexGrow: 1 }}>
              <TopPerformingStudents students={topStudents} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
