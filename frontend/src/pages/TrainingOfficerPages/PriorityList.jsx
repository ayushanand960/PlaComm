// src/pages/TrainingOfficerPages/PriorityList.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PriorityActivityCard from "../../components/trainingOfficer/PriorityList/PriorityActivityCard";
import ViewResultDialog from "../../components/trainingOfficer/PriorityList/ViewResultDialog";
import { Button } from "@mui/material";

const activityTypes = ["GD", "Technical", "Aptitude", "Mock", "PI"];

export default function PriorityList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Use state instead of useMemo for dynamic updates
  const [priorityByType, setPriorityByType] = useState(() => {
    const storedPriority = JSON.parse(localStorage.getItem("priorityList")) || {};
    const grouped = {};
    activityTypes.forEach((t) => {
      grouped[t] = (storedPriority[t] || [])
        .filter((a) => !a.deleted)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    });
    return grouped;
  });

  const handleViewResult = (activity) => {
    setSelectedActivity(activity);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  // ✅ Toggle lock/unlock
  const handleToggleLock = (activityId, type) => {
    setPriorityByType((prev) => {
      const updatedType = (prev[type] || []).map((a) =>
        a.id === activityId ? { ...a, locked: !a.locked } : a
      );
      const updated = { ...prev, [type]: updatedType };

      // update localStorage too
      const storedPriority = JSON.parse(localStorage.getItem("priorityList")) || {};
      storedPriority[type] = updatedType;
      localStorage.setItem("priorityList", JSON.stringify(storedPriority));

      return updated;
    });

    // also update selectedActivity if it's open in dialog
    setSelectedActivity((prev) =>
      prev && prev.id === activityId ? { ...prev, locked: !prev.locked } : prev
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Priority List</h2>

      {activityTypes.map((type) => {
        const activities = priorityByType[type] || [];
        const newest = activities.slice(0, 5);

        return (
          <div key={type} style={{ marginBottom: 30 }}>
            <h3>{type} Activities</h3>

            {newest.length === 0 ? (
              <p>No {type} results yet.</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px", // spacing between cards
                }}
              >
                {newest.map((a) => (
                  <PriorityActivityCard
                    key={a.id}
                    activity={a}
                    onViewResult={() => handleViewResult(a)}
                    onToggleLock={() => handleToggleLock(a.id, type)} // pass toggle handler
                  />
                ))}
              </div>
            )}

            {activities.length > 5 && (
              <Button
                variant="text"
                sx={{ mt: 1 }}
                onClick={() =>
                  navigate(`/officer-dashboard/${id}/prioritylist/${type.toLowerCase()}`)
                }
              >
                View All
              </Button>
            )}
          </div>
        );
      })}

      {/* Centered dialog for showing results */}
      <ViewResultDialog
        open={openDialog}
        onClose={handleCloseDialog}
        activity={selectedActivity}
        onLock={(id) =>
          selectedActivity
            ? handleToggleLock(id, selectedActivity.type)
            : null
        }
      />
    </div>
  );
}
