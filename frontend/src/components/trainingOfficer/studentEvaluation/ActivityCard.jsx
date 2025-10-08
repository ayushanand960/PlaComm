// // src/TrainingOfficerComponents/StudentEvaluation/ActivityCard.jsx
// import React from "react";
// import { Box, Typography, Button } from "@mui/material";

// const ActivityCard = ({ activity, onUpload, isResultUploaded }) => {
//   return (
//     <Box
//     sx={{
//     border: "1px solid #ccc",
//     padding: 2,
//     mb: 1,
//     borderRadius: 2,
//     bgcolor: "#fbfbfbff",
//     width: { xs: "100%", sm: 220, md: 250 }, // responsive width for grid
//   }}
//     >
//       <Typography variant="subtitle1"><strong>{activity.topic}</strong></Typography>
//       <Typography>Job: {activity.jobListing} | Session: {activity.session}</Typography>
//       <Typography>Date: {activity.date} | Result Date: {activity.resultDate}</Typography>
//       <Typography>Courses: {activity.courses.join(", ")}</Typography>
//       <Typography>Max Marks: {activity.maxMarks} | Min Marks: {activity.minMarks}</Typography>

//       {!isResultUploaded && (
//         <Button
//           variant="contained"
//           size="small"
//           sx={{
//            mt: 1,
//            backgroundColor: "goldenrod",
//            "&:hover": {
//            backgroundColor: "#2984d4ff", // slightly darker goldenrod for hover
//            },
//           }}
//           onClick={() => onUpload(activity)}
//         >
//           Upload Result
//         </Button>
//       )}
//     </Box>
//   );
// };

// export default ActivityCard;
// src/TrainingOfficerComponents/StudentEvaluation/ActivityCard.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

/**
 * Displays one Activity box exactly as before,
 * but pulls clean props from backend results (Activity API)
 *
 * activity object should now follow the real API:
 * {
 *   id: 12,
 *   topic: "Logical Reasoning Set 1",
 *   job: { company_name: "Infosys", job_title: "Software Engineer" },
 *   session: "2024-2025",
 *   date: "2024-10-05",
 *   result_date: "2024-10-10",
 *   max_marks: 50,
 *   min_marks: 20,
 *   courses: ["Computer Science", "IT"],
 * }
 */

const ActivityCard = ({ activity, onUpload, isResultUploaded }) => {
  // Defensive safe‑access to nested job object
  const company = activity?.job?.company_name || "Unknown Company";
  const jobTitle = activity?.job?.job_title || "N/A";

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: 2,
        mb: 1,
        borderRadius: 2,
        bgcolor: "#fbfbfbff",
        width: { xs: "100%", sm: 220, md: 250 },
      }}
    >
      <Typography variant="subtitle1">
        <strong>{activity.topic}</strong>
      </Typography>

      {/* Job and session info */}
      <Typography>
        Job: {company} — {jobTitle}
      </Typography>
      <Typography>Session: {activity.session}</Typography>

      {/* Dates */}
      <Typography>
        Date: {activity.date} | Result Date: {activity.result_date}
      </Typography>

      {/* Courses list */}
      <Typography>Courses: {activity.courses?.join(", ") || "-"}</Typography>

      {/* Marks */}
      <Typography>
        Max Marks: {activity.max_marks} | Min Marks: {activity.min_marks}
      </Typography>

      {/* Upload button only if result not yet uploaded */}
      {!isResultUploaded && (
        <Button
          variant="contained"
          size="small"
          sx={{
            mt: 1,
            backgroundColor: "goldenrod",
            "&:hover": { backgroundColor: "#2984d4ff" },
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
