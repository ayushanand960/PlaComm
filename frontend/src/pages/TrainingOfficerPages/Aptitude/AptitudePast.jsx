import React, { useState } from "react";
import HeaderBar from "../../../TrainingOfficerComponents/TrainingProgram/HeaderBar";
import ActivityList from "../../../TrainingOfficerComponents/TrainingProgram/ActivityList";

const AptitudePast = () => {
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
      <HeaderBar title="Aptitude Past Activities" backPath="/officer-dashboard/:id/trainingprogram" />

      <h2>Past Aptitude Activities</h2>

      {/* Show all Aptitude activities, no edit, no limit */}
      <ActivityList
        key={refreshKey}
        activityType="Aptitude"
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AptitudePast;
