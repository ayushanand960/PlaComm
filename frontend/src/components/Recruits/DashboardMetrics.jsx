import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const metrics = [
  { title: "Active Postings", value: 8, sub: "3 companies", icon: <BusinessIcon />, color: "#42a5f5" },
  { title: "Applications", value: 234, sub: "This week", icon: <DescriptionIcon />, color: "#66bb6a" },
  { title: "Priority Students", value: 45, sub: "Available", icon: <StarIcon />, color: "#ffa726" },
  { title: "Interviews", value: 28, sub: "Scheduled", icon: <CalendarTodayIcon />, color: "#ab47bc" },
];

const DashboardMetrics = () => {
  return (
    <Grid container spacing={2} sx={{ my: 2 }}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            elevation={4}
            sx={{
              position: "relative",
              overflow: "hidden",
              p: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${metric.color}20, #fff)`,
              transition: "all 0.4s ease",
              "&:hover": {
                transform: "translateY(-6px) scale(1.02)",
                boxShadow: `0 8px 20px ${metric.color}80`,
              },
              "&:hover::before": {
                left: "120%",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-60%",
                width: "50%",
                height: "100%",
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
                transform: "skewX(-25deg)",
                transition: "0.7s",
              },
            }}
          >
            {/* Icon Box */}
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: metric.color + "22",
                color: metric.color,
                fontSize: 32,
              }}
            >
              {metric.icon}
            </Box>

            {/* Text Section */}
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ color: metric.color }}>
                {metric.value}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {metric.title}
              </Typography>
              <Typography variant="caption" color="text.disabled">
                {metric.sub}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardMetrics;
