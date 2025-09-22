//src/TrainingOfficerComponents/TrainingProgram/ActivityList
import React, { useEffect, useState } from "react";

const ActivityList = ({ activityType, limit, onEdit, onDelete }) => {
  const [activities, setActivities] = useState([]);

  const loadActivities = () => {
  const stored = JSON.parse(localStorage.getItem("activities")) || [];
  
  let filtered = stored
    // Exclude deleted activities
    .filter(a => !a.deleted)
    // Only the type if activityType is given
    .filter(a => (activityType ? a.type === activityType : true))
    // Optional: only show resultUploaded (for priority list)
    // .filter(a => a.resultUploaded) // uncomment if needed
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  if (limit) filtered = filtered.slice(0, limit);
  setActivities(filtered);
};


  useEffect(() => { loadActivities(); }, [activityType, limit]);

  // Internal delete if parent doesn't provide one
  const handleDelete = (id) => {
  if (onDelete) {
    onDelete(id); // call parent handler
  } else {
    const stored = JSON.parse(localStorage.getItem("activities")) || [];
    const updated = stored.map(a => 
      a.id === id ? { ...a, deleted: true } : a // mark as deleted instead of removing
    );
    localStorage.setItem("activities", JSON.stringify(updated));
    loadActivities();
  }
};

  return (
    <div>
      {activities.length === 0 ? <p>No activities found.</p> : (
        <div>
          {activities.map(a => (
            <div key={a.id} style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px", borderRadius: "6px", fontSize: "14px", lineHeight: "1.4" }}>
              <strong>{a.topic}</strong> <br/>
              Job: {a.jobListing} | Session: {a.session} <br/>
              Date: {a.date} | Result Date: {a.resultDate} <br/>
              Max Marks: {a.maxMarks} | Min Marks: {a.minMarks} <br/>
              Courses: {a.courses.join(", ") || "-"} <br/>
              Nominee: {a.nominee || "-"} | Remark: {a.remark || "-"} <br/>
              {onEdit && (
  <button onClick={() => onEdit(a)} style={{ marginRight: "5px" }}>
    Edit
  </button>
)}

              <button onClick={() => handleDelete(a.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityList;
