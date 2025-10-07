import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import StarIcon from "@mui/icons-material/Star";
import ListAltIcon from "@mui/icons-material/ListAlt";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Students Trained",
      value: stats.studentsTrained || "0",
      subtitle: "This semester",
      icon: <SchoolIcon sx={{ fontSize: 40, color: "goldenrod" }} />,
    },
    {
      title: "Mock Interviews",
      value: stats.mockInterviews || "0",
      subtitle: "This week",
      icon: <EventIcon sx={{ fontSize: 40, color: "goldenrod" }} />,
    },
    {
      title: "Average Score",
      value: stats.averageScore || "0/10",
      subtitle: stats.improvement || "+0 improvement",
      icon: <StarIcon sx={{ fontSize: 40, color: "goldenrod" }} />,
    },
    {
      title: "Priority Lists",
      value: stats.priorityLists || "0",
      subtitle: "Generated",
      icon: <ListAltIcon sx={{ fontSize: 40, color: "goldenrod" }} />,
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f2f2f2", p: 3, borderRadius: 2, mt: 3 }}>
      <Grid container spacing={4} justifyContent="center">
  {cards.map((card, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Paper
  elevation={3}
  sx={{
    p: 2.5,               // reduced padding
    display: "flex",
    alignItems: "center",
    gap: 2.5,             // reduced gap between icon and text
    bgcolor: "white",
    borderRadius: 3,
    minHeight: 100,        // reduced height
    transition: "transform 0.3s",
    "&:hover": { transform: "translateY(-9px)" },
  }}
>
  {card.icon}
  <Box>
    <Typography variant="subtitle1" sx={{ color: "#555", fontWeight: "bold" }}>
      {card.title}
    </Typography>
    <Typography variant="h5" sx={{ color: "black", fontWeight: "bold", mt: 0.5 }}>
      {card.value}
    </Typography>
    <Typography variant="body2" sx={{ color: "gray", mt: 0.25 }}>
      {card.subtitle}
    </Typography>
  </Box>
</Paper>
    </Grid>
  ))}
</Grid>
    </Box>
  );
};

export default StatsCards;
