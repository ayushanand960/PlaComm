import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"; // GD
import BarChartIcon from "@mui/icons-material/BarChart"; // Aptitude
import SettingsIcon from "@mui/icons-material/Settings"; // Technical
import PersonIcon from "@mui/icons-material/Person"; // Mock Interview
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"; // Personal Interview

const Program = ({ title, description, type }) => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  // 🔑 Map lowercase route keys → backend activity codes
  const typeMap = {
    gd: "GD",
    apt: "APT",
    tech: "TECH",
    mock: "MOCK",
    pi: "PI",
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
      case "apt":
        return (
          <BarChartIcon fontSize="large" sx={{ mr: 1, color: "goldenrod" }} />
        );
      case "tech":
        return (
          <SettingsIcon fontSize="large" sx={{ mr: 1, color: "goldenrod" }} />
        );

      case "mock":
        return (
          <PersonIcon fontSize="large" sx={{ mr: 1, color: "goldenrod" }} />
        );
      case "pi":
        return (
          <EmojiEventsIcon
            fontSize="large"
            sx={{ mr: 1, color: "goldenrod" }}
          />
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
        flex: "1 1 320px",
        minWidth: "280px",
        maxWidth: "300px",
        minHeight: "350px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {getIcon()}
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{
          my: 2,
          fontSize: "1.1rem",
          fontWeight: 500,
          color: "#333",
          lineHeight: 1.6,
        }}
      >
        {description}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Button
          variant="contained"
          sx={createButtonStyle}
          onClick={() =>
            navigate(
              `/officer-dashboard/${id}/trainingprogram/${type}/create`,
              {
                state: {
                  backPath: `/officer-dashboard/${id}/trainingprogram`,
                  activityType: typeMap[type], // ✅ pass correct backend type
                },
              }
            )
          }
        >
          Create
        </Button>

        <Button
          variant="contained"
          sx={otherButtonStyle}
          onClick={() =>
            navigate(`/officer-dashboard/${id}/trainingprogram/${type}/view`, {
              state: {
                backPath: `/officer-dashboard/${id}/trainingprogram`,
                activityType: typeMap[type],
              },
            })
          }
        >
          View Activity
        </Button>

        <Button
          variant="contained"
          sx={otherButtonStyle}
          onClick={() =>
            navigate(`/officer-dashboard/${id}/trainingprogram/${type}/past`, {
              state: {
                backPath: `/officer-dashboard/${id}/trainingprogram`,
                activityType: typeMap[type],
              },
            })
          }
        >
          Past Activities
        </Button>
      </Box>
    </Paper>
  );
};

export default Program;
