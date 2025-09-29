// src/TrainingOfficerComponents/TrainingProgram/ViewActivity.jsx
import React, { useState } from "react";
import HeaderBar from "./HeaderBar";
import ActivityList from "./ActivityList";
import CreateActivityForm from "./CreateActivityForm";
import { useLocation, useParams } from "react-router-dom";

const ViewActivity = ({ activityType, title }) => {
  const [editData, setEditData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const location = useLocation();
  const { id } = useParams();

  const handleEdit = (activity) => {
    setEditData(activity);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = () => {
    setEditData(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <HeaderBar
        title={`${title} Activities`}
        backPath={
          location.state?.backPath || `/officer-dashboard/${id}/trainingprogram`
        }
      />

      <h2>{title} Activities</h2>

      {/* List Activities */}
      <ActivityList
        key={refreshKey}
        activityType={activityType} // e.g., "GD"
        limit={5}
        onEdit={handleEdit}
      />

      {/* Edit Form */}
      {editData && (
        <div style={{ marginTop: "20px" }}>
          <CreateActivityForm
            activityType={activityType}
            editData={editData}
            onUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default ViewActivity;
