import React from "react";
import { Paper, Typography, Button, Chip, Box, Divider } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const job = {
  title: "Software Engineer",
  company: "TCS",
  location: "Mumbai",
  salary: "₹6-8 LPA",
  field: "Computer Science",
  applicants: 125,
  type: "Full-time",
  posted: "2 days ago",
  color: "#42a5f5", // Dynamic color like metrics
};

const JobPostingCard = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        position: "relative",
        overflow: "hidden",
        p: 3,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        background: `linear-gradient(135deg, ${job.color}20, #fff)`,
        transition: "all 0.4s ease",
        "&:hover": {
          transform: "translateY(-6px) scale(1.02)",
          boxShadow: `0 12px 25px ${job.color}80`,
        },
        "&:before": {
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
        "&:hover:before": {
          left: "120%",
        },
      }}
    >
      {/* Icon Box */}
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: job.color + "22",
          color: job.color,
          fontSize: 28,
        }}
      >
        <WorkIcon />
      </Box>

      {/* Job Info */}
      <Box>
        <Typography variant="h6" fontWeight="bold" sx={{ color: job.color }}>
          {job.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: "flex", alignItems: "center", gap: 0.5, opacity: 0.9 }}
        >
          <WorkIcon fontSize="small" /> {job.company}
        </Typography>
      </Box>

      {/* Location + Salary */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <LocationOnIcon fontSize="small" /> {job.location}
        </Typography>
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AttachMoneyIcon fontSize="small" /> {job.salary}
        </Typography>
      </Box>

      {/* Tags */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Chip label={job.field} size="small" sx={{ bgcolor: job.color + "33", color: job.color }} />
        <Chip
          label={`${job.applicants} Applicants`}
          size="small"
          sx={{ bgcolor: job.color + "22", color: job.color }}
        />
        <Chip
          label={job.type}
          size="small"
          sx={{ bgcolor: job.color + "22", color: job.color }}
        />
      </Box>

      <Divider sx={{ borderColor: job.color + "33" }} />

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            color: job.color,
            borderColor: job.color + "80",
            "&:hover": { borderColor: job.color, bgcolor: job.color + "10" },
          }}
        >
          View Applications
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            bgcolor: job.color,
            color: "white",
            "&:hover": { bgcolor: job.color + "cc" },
          }}
        >
          Priority Students
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1, opacity: 0.8 }}>
        <AccessTimeIcon fontSize="small" />
        <Typography variant="caption">{job.posted}</Typography>
      </Box>
    </Paper>
  );
};

export default JobPostingCard;
