import React, { useState } from "react";
import HeaderBar from "../../../TrainingOfficerComponents/TrainingProgram/HeaderBar";
import ActivityList from "../../../TrainingOfficerComponents/TrainingProgram/ActivityList";

const GDPast = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Delete activity
  const handleDelete = (id) => {
    const stored = JSON.parse(localStorage.getItem("activities")) || [];
    const updated = stored.filter(a => a.id !== id);
    localStorage.setItem("activities", JSON.stringify(updated));

    setRefreshKey(prev => prev + 1); // refresh list
  };

  return (
    <div style={{ padding: "20px" }}>
      <HeaderBar title="GD Past Activities" backPath="/officer-dashboard/:id/trainingprogram" />

      <h2>Past GD Activities</h2>

      {/* Show all GD activities, no edit, no limit */}
      <ActivityList
        key={refreshKey}
        activityType="GD"
        onDelete={handleDelete}
      />
    </div>
  );
};

export default GDPast;
