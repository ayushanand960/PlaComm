import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

const DashboardCards = ({ stats }) => {
  const items = [
    { title: "Applications", value: stats.applications },
    { title: "Interviews", value: stats.interviews },
    { title: "ATS Score", value: `${stats.atsScore}%` },
    { title: "Training Score", value: stats.trainingScore },
    { title: "Network", value: stats.network },
    { title: "Courses", value: stats.courses },
  ];

  return (
    <Grid container spacing={2} mb={3}>
      {items.map((item, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Paper sx={{ p: 6, textAlign: "center", borderRadius: 3, maxWidth: 100, margin: "0 auto" }} elevation={3}>
            <Typography variant="h6">{item.value}</Typography>
            <Typography variant="body2">{item.title}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;
