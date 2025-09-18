// src/layouts/StudentLayout.jsx
import React from "react";
import { Container, Grid, Box } from "@mui/material";
import StudentInfo from "../components/StudentInfo";
import DashboardCards from "../components/DashboardCards";
import LatestOpportunities from "../components/Opportunities";
import RecentApplications from "../components/Application Status";

const StudentLayout = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Student Info - full width */}
        <Grid item xs={12}>
          <StudentInfo />
        </Grid>

        {/* Dashboard Cards - full width row */}
        <Grid item xs={12}>
          <DashboardCards />
        </Grid>

        {/* Latest Opportunities (2/3) + Recent Applications (1/3) */}
        <Grid item xs={12} md={8}>
          <LatestOpportunities />
        </Grid>
        <Grid item xs={12} md={4}>
          <RecentApplications />
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentLayout;
