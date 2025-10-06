// src/TrainingOfficerComponents/TrainingProgram/ActivityList.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const ActivityList = ({ activityType, limit, onEdit, onDelete }) => {
  const [activities, setActivities] = useState([]);

  const loadActivities = async () => {
    try {
      // Fetch from API and filter by type
      const res = await axiosInstance.get("/training/activities/", {
        params: { type: activityType?.toUpperCase() }, // backend expects uppercase type codes
      });

      let data = res.data;

      // optional limit
      if (limit) data = data.slice(0, limit);

      setActivities(data);
    } catch (err) {
      console.error("Error loading activities:", err);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [activityType, limit]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/training/activities/${id}/`);
      // Refresh list after delete
      loadActivities();
      if (onDelete) onDelete(id);
    } catch (err) {
      console.error("Error deleting activity:", err);
    }
  };

  return (
    <div>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div>
          {activities.map((a) => (
            <div
              key={a.id}
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                marginBottom: "8px",
                borderRadius: "6px",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              <strong>{a.topic}</strong> <br />
              Job: {a.job.company_name} - {a.job.job_title} | Session:{" "}
              {a.session} <br />
              Date: {a.date} | Result Date: {a.result_date} <br />
              Max Marks: {a.max_marks} | Min Marks: {a.min_marks} <br />
              Courses: {a.courses?.join(", ") || "-"} <br />
              Nominee: {a.nominee || "-"} | Remark: {a.remark || "-"} <br />
              {onEdit && (
                <button
                  onClick={() => onEdit(a)}
                  style={{ marginRight: "5px" }}
                >
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
