import React from "react";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
} from "@mui/material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const TopPerformingStudents = ({ students = [] }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "#fff",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Top Performing Students
      </Typography>
      <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
        Current priority rankings
      </Typography>

      <List>
        {students.map((student, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <Chip
                label={`Rank #${index + 1}`}
                sx={{
                  background: "linear-gradient(90deg, #5A4FCF, #ffcf56ff)",
                  color: "black",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(90deg, #ffcf56ff, #5A4FCF)", color: "white" // ✅ same hover blue as navbar
                  },
                }}
              />
            }
          >
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SchoolRoundedIcon sx={{ fontSize: 20, color: "goldenrod" }} />
                  <Typography sx={{ fontWeight: "600" }}>
                    {student.name}
                  </Typography>
                </Box>
              }
              secondary={`${student.branch} – Overall Score: ${student.score}`}
            />
          </ListItem>
        ))}

        {students.length === 0 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              No students to show.
            </Typography>
          </Box>
        )}
      </List>
    </Paper>
  );
};

export default TopPerformingStudents;
