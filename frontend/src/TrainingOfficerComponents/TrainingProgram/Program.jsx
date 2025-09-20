import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import { useNavigate , useParams } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"; // GD
import BarChartIcon from "@mui/icons-material/BarChart"; // Aptitude
import SettingsIcon from "@mui/icons-material/Settings"; // Technical
import PersonIcon from "@mui/icons-material/Person"; //Mock Interview
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"; // Personal Interview

const Program = ({ title, basePath, description, type }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ gets the officer ID from the URL


  const createButtonStyle = {
    backgroundColor: "goldenrod",
    color: "white",
    fontWeight: "bold",
    "&:hover": { backgroundColor: "#1565c0" },
  };

  const otherButtonStyle = {
    backgroundColor: "#f5f5f5",
    color: "#333",
    "&:hover": { backgroundColor: "#1565c0", color: "white" },
  };

  const getIcon = () => {
    switch (type) {
      case "gd":
        return (
          <ChatBubbleOutlineIcon
            fontSize="large"
            sx={{ mr: 1, color: "goldenrod" }}
          />
        );
      case "aptitude":
        return (
          <BarChartIcon fontSize="large" sx={{ mr: 1, color: "goldenrod" }} />
        );
      case "technical":
        return (
          <SettingsIcon fontSize="large" sx={{ mr: 1, color: "goldenrod" }} />
        );
      case "mock":
        return (
          <PersonIcon fontSize="large" sx={{ mr: 1, color: "goldenrod" }} />
        );
      case "pi":
        return (
          <EmojiEventsIcon fontSize="large" sx={{ mr: 1, color: "goldenrod" }} />
        );
      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        flex: "1 1 320px", // narrower width
        minWidth: "280px",
        maxWidth: "300px", // restrict width
        minHeight: "350px", // more height
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header with Icon */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {getIcon()}
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      {/* Description */}
      <Typography
        variant="body1"
      sx={{
        my: 2,
        fontSize: "1.1rem",   // ⬅️ increase size (try 1.2rem if you want even larger)
        fontWeight: 500,      // ⬅️ make it bolder/darker
        color: "#333",        // ⬅️ darker grey (almost black)
        lineHeight: 1.6,
  }}
      >
        {description}
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Button
          variant="contained"
          sx={createButtonStyle}
          onClick={() =>
    navigate(`/officer-dashboard/${id}/trainingprogram/${type}/create`)
  }
        >
          Create
        </Button>
        <Button
          variant="contained"
          sx={otherButtonStyle}
          onClick={() => navigate(`/officer-dashboard/${id}/trainingprogram/${type}/view`)}
        >
          View Activity 
        </Button>
        <Button
          variant="contained"
          sx={otherButtonStyle}
          onClick={() => navigate(`/officer-dashboard/${id}/trainingprogram/${type}/past`)}
        >
          Past Activities
        </Button>
      </Box>
    </Paper>
  );
};

export default Program;
