import React from "react";
import { Paper, Typography, Box, Chip, Avatar } from "@mui/material";

const students = [
  { name: "Rahul Sharma", branch: "CS", score: "9.2/10", priority: 1, color: "#42a5f5" },
  { name: "Priya Patel", branch: "IT", score: "8.9/10", priority: 2, color: "#66bb6a" },
  { name: "Amit Kumar", branch: "ECE", score: "8.7/10", priority: 3, color: "#ffa726" },
];

const PriorityStudents = () => {
  return (
    <Box sx={{ mt: 3 }}>
      {/* Section Header */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
        Priority Students
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Top-ranked candidates
      </Typography>

      {/* Student Metric-style Cards */}
      {students.map((student, index) => (
        <Paper
          key={index}
          elevation={4}
          sx={{
            position: "relative",
            overflow: "hidden",
            p: 2.5,
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${student.color}20, #fff)`,
            transition: "all 0.4s ease",
            "&:hover": {
              transform: "translateY(-6px) scale(1.02)",
              boxShadow: `0 8px 20px ${student.color}80`,
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
          {/* Left: Priority Avatar */}
          <Avatar
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              fontWeight: "bold",
              fontSize: "1rem",
              bgcolor: student.color + "22",
              color: student.color,
            }}
          >
            #{student.priority}
          </Avatar>

          {/* Middle: Student Info */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: student.color }}>
              {student.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {student.branch} • Score: {student.score}
            </Typography>
          </Box>

          {/* Right: Chip */}
          <Chip
            label={`Priority ${student.priority}`}
            size="small"
            sx={{
              bgcolor: student.color + "22",
              color: student.color,
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          />
        </Paper>
      ))}
    </Box>
  );
};

export default PriorityStudents;
