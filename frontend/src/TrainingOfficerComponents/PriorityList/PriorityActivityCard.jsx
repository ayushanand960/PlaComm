import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const PriorityActivityCard = ({ activity, onViewResult, onToggleLock }) => {
  return (
    <Card
      sx={{
        mb: 2,
        p: 2,
        width: { xs: "100%", sm: 220, md: 250 },
        bgcolor: "#fbfbfbff",
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
          {activity.type} • {new Date(activity.createdAt).toLocaleString()}
          <span onClick={onToggleLock} style={{ cursor: "pointer" }}>
            {activity.locked ? (
              <LockIcon sx={{ ml: 1, fontSize: 20, color: "goldenrod" }} />
            ) : (
              <LockOpenIcon sx={{ ml: 1, fontSize: 20, color: "grey" }} />
            )}
          </span>
        </Typography>

        {/* details */}
        <Typography variant="body2" sx={{ mt: 1 }}>
          <b>Job:</b> {activity.jobListing || "-"} <br />
          <b>Topic:</b> {activity.topic || "-"} <br />
          <b>Session:</b> {activity.session || "-"} <br />
          <b>Min Marks:</b> {activity.minMarks || "-"} <br />
          <b>Max Marks:</b> {activity.maxMarks || "-"}
        </Typography>

        <Button
          variant="contained"
          size="small"
          sx={{
            mt: 1,
            backgroundColor: "goldenrod",
            "&:hover": { backgroundColor: "#2984d4ff" },
          }}
          onClick={onViewResult}
        >
          View Result
        </Button>
      </CardContent>
    </Card>
  );
};
export default PriorityActivityCard;
