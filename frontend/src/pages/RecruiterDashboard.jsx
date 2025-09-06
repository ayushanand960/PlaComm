// src/pages/RecruiterDashboard.jsx
import React from "react";

const RecruiterDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Recruiter Dashboard</h1>
      <p>Welcome, {user?.company_name || `${user?.first_name} ${user?.last_name}`}</p>
      <p><strong>Recruiter ID:</strong> {user?.unique_id}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>
      <hr />
      <p>This dashboard is specifically for Recruiters to post and manage jobs.</p>
    </div>
  );
};

export default RecruiterDashboard;
