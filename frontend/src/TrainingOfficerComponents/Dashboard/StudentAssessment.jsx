import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const StudentAssessment = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // officer-dashboard/:id

  const handleNavigate = (path) => {
    navigate(`/officer-dashboard/${id}/${path}`);
  };

  return (
    <Paper
  elevation={3}
  sx={{
    p: 3,
    borderRadius: 3,
    bgcolor: "#fff",
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}
>

      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Student Assessment
      </Typography>
      <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
        Rate students and generate priority lists
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "black",
            "&:hover": { bgcolor: "goldenrod", color: "white" },
          }}
          onClick={() => handleNavigate("mockinterview")}
        >
          Conduct Mock Interviews
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "black",
            "&:hover": { bgcolor: "goldenrod", color: "white" },
          }}
          onClick={() => handleNavigate("trainingprogram")}
        >
          Conduct Group Discussions
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "black",
            "&:hover": { bgcolor: "goldenrod", color: "white" },
          }}
          onClick={() => handleNavigate("trainingprogram")}
        >
          Conduct Technical Assessment
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "black",
            "&:hover": { bgcolor: "goldenrod", color: "white" },
          }}
          onClick={() => handleNavigate("trainingprogram")}
        >
          Conduct Aptitude Test
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "black",
            "&:hover": { bgcolor: "goldenrod", color: "white" },
          }}
          onClick={() => handleNavigate("prioritylist")}
        >
          Generate Priority List
        </Button>
      </Box>
    </Paper>
  );
};

export default StudentAssessment;