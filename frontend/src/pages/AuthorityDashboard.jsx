// src/pages/AuthorityDashboard.jsx
import React from "react";

const AuthorityDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Authority Dashboard</h1>
      <p>Welcome, {user?.first_name} {user?.last_name}</p>
      <p><strong>Authority ID:</strong> {user?.unique_id}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>
      <hr />
      <p>This dashboard is specifically for University Authorities.</p>
    </div>
  );
};

export default AuthorityDashboard;
