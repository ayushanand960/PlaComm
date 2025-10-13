import React from "react";
import { Grid, Paper, Typography, Box, keyframes } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import StarIcon from "@mui/icons-material/Star";
import ListAltIcon from "@mui/icons-material/ListAlt";

// 🔸 Icon pulse animation
const pulseIcon = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); filter: drop-shadow(0 0 12px gold); }
  100% { transform: scale(1); }
`;

// 🔸 Soft glowing ring for the card
const cardGlow = keyframes`
  0% { box-shadow: 0 0 8px rgba(255, 215, 0, 0.4), 0 0 16px rgba(255, 165, 0, 0.2); }
  50% { box-shadow: 0 0 18px rgba(255, 215, 0, 0.8), 0 0 36px rgba(255, 165, 0, 0.5); }
  100% { box-shadow: 0 0 8px rgba(255, 215, 0, 0.4), 0 0 16px rgba(255, 165, 0, 0.2); }
`;

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
                p: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 2.5,
                bgcolor: "white",
                borderRadius: 3,
                minHeight: 110,
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.35s ease",
                "&:hover": {
                  transform: "translateY(-10px) scale(1.03)",
                  animation: `${cardGlow} 2.5s ease-in-out infinite`,
                  background:
                    "linear-gradient(145deg, #fffaf0 0%, #fffdf7 100%)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: 3,
                  padding: "2px",
                  background:
                    "linear-gradient(60deg, #fbcf68ff, #fae570ff, #fbca6eff)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  opacity: 0,
                  transition: "opacity 0.4s ease",
                  zIndex: 0,
                },
                "&:hover::before": {
                  opacity: 1,
                },
                "& .icon, & .text-box": {
                  position: "relative",
                  zIndex: 1,
                },
                "&:hover .icon": {
                  animation: `${pulseIcon} 1.2s ease-in-out infinite`,
                  color: "#ffcd58ff",
                },
                "&:hover .text-box": {
                  transform: "translateX(6px)",
                  opacity: 1,
                  transition: "all 0.4s ease",
                },
              }}
            >
              <Box
                className="icon"
                sx={{
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </Box>
              <Box
                className="text-box"
                sx={{ transition: "all 0.3s ease", opacity: 0.95 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#555", fontWeight: "bold" }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "black", fontWeight: "bold", mt: 0.5 }}
                >
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