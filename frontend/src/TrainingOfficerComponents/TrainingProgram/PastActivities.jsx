// src/TrainingOfficerComponents/TrainingProgram/PastActivities.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import HeaderBar from "./HeaderBar";
import { useLocation, useParams } from "react-router-dom";

const PastActivities = ({ activityType, title }) => {
  const [activities, setActivities] = useState([]);

  const location = useLocation();
  const { id } = useParams();

  const loadActivities = async () => {
    try {
      const res = await axiosInstance.get("/training/activities/", {
        params: { type: activityType },
      });

      const today = new Date();
      const past = res.data.filter((a) => new Date(a.result_date) < today);
      setActivities(past);
    } catch (err) {
      console.error("Error fetching past activities:", err);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [activityType]);

  return (
    <div style={{ padding: "20px" }}>
      <HeaderBar
        title={`${title} Activities`}
        backPath={
          location.state?.backPath || `/officer-dashboard/${id}/trainingprogram`
        }
      />

      {activities.length === 0 ? (
        <p>No past activities found.</p>
      ) : (
        <div>
          {activities.map((a) => (
            <div
              key={a.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
              }}
            >
              <strong>{a.topic}</strong> <br />
              Job: {a.job.company_name} - {a.job.job_title} <br />
              Session: {a.session} <br />
              Date: {a.date} | Result: {a.result_date} <br />
              Marks: {a.max_marks}/{a.min_marks} <br />
              Courses: {a.courses?.join(", ") || "-"} <br />
              Nominee: {a.nominee || "-"} | Remark: {a.remark || "-"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastActivities;
