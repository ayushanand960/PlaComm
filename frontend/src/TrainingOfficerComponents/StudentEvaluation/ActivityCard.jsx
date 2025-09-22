// src/TrainingOfficerComponents/StudentEvaluation/ActivityCard.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ActivityCard = ({ activity, onUpload, isResultUploaded }) => {
  return (
    <Box
    sx={{
    border: "1px solid #ccc",
    padding: 2,
    mb: 1,
    borderRadius: 2,
    bgcolor: "#fbfbfbff",
    width: { xs: "100%", sm: 220, md: 250 }, // responsive width for grid
  }}
    >
      <Typography variant="subtitle1"><strong>{activity.topic}</strong></Typography>
      <Typography>Job: {activity.jobListing} | Session: {activity.session}</Typography>
      <Typography>Date: {activity.date} | Result Date: {activity.resultDate}</Typography>
      <Typography>Courses: {activity.courses.join(", ")}</Typography>
      <Typography>Max Marks: {activity.maxMarks} | Min Marks: {activity.minMarks}</Typography>

      {!isResultUploaded && (
        <Button
          variant="contained"
          size="small"
          sx={{
           mt: 1,
           backgroundColor: "goldenrod",
           "&:hover": {
           backgroundColor: "#2984d4ff", // slightly darker goldenrod for hover
           },
          }}
          onClick={() => onUpload(activity)}
        >
          Upload Result
        </Button>
      )}
    </Box>
  );
};

export default ActivityCard;
