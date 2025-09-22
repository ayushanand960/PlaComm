import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ActivityCard from "../../TrainingOfficerComponents/StudentEvaluation/ActivityCard";
import UploadResultDialog from "../../TrainingOfficerComponents/StudentEvaluation/UploadResultDialog";
import { Button } from "@mui/material";

const activityTypes = ["GD", "Technical", "Aptitude", "Mock", "PI"];

export default function StudentEvaluation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Group activities by type (newest → oldest)
  const activitiesByType = useMemo(() => {
    const stored = JSON.parse(localStorage.getItem("activities")) || [];
    const grouped = {};
    activityTypes.forEach((t) => (grouped[t] = []));
    stored.forEach((a) => {
      if (!a.deleted && !a.resultUploaded) {
        if (!grouped[a.type]) grouped[a.type] = [];
        grouped[a.type].push(a);
      }
    });
    Object.keys(grouped).forEach((t) =>
      grouped[t].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
    return grouped;
  }, [refreshKey]);

  const handleUploadClick = (activity) => {
    setSelectedActivity(activity);
    setOpenDialog(true);
  };

  const handleSubmitResult = (activity, students) => {
    const stored = JSON.parse(localStorage.getItem("activities")) || [];
    const updated = stored.map((a) =>
      a.id === activity.id ? { ...a, resultUploaded: true, students } : a
    );
    localStorage.setItem("activities", JSON.stringify(updated));

    // Push to priority list
    const priority = JSON.parse(localStorage.getItem("priorityList")) || {};
    if (!priority[activity.type]) priority[activity.type] = [];
    priority[activity.type].push({ ...activity, students });
    localStorage.setItem("priorityList", JSON.stringify(priority));

    setRefreshKey((k) => k + 1);
    setOpenDialog(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Student Evaluation</h2>

      {activityTypes.map((type) => {
        const activities = activitiesByType[type] || [];
        const newest = activities.slice(0, 5);

        return (
          <div key={type} style={{ marginBottom: 30 }}>
            <h3>{type} Activities</h3>

            {newest.length === 0 ? (
              <p>No pending {type} activities.</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px", // space between cards
                }}
              >
                {newest.map((a) => (
                  <ActivityCard
                    key={a.id}
                    activity={a}
                    onUpload={() => handleUploadClick(a)}
                    sx={{ width: { xs: "100%", sm: 220, md: 250 } }} // optional card width
                  />
                ))}
              </div>
            )}

            {activities.length > 5 && (
              <Button
                variant="text"
                sx={{ mt: 1 }}
                onClick={() =>
                  navigate(
                    `/officer-dashboard/${id}/studentevaluation/${type.toLowerCase()}`
                  )
                }
              >
                View All
              </Button>
            )}
          </div>
        );
      })}

      <UploadResultDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        activity={selectedActivity}
        onSubmit={handleSubmitResult}
      />
    </div>
  );
}
