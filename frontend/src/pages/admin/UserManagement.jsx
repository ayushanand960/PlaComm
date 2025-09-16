// Example: UserManagement.jsx
import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";

const UserManagement = () => {
  return (
  <div>
      <AdminNavbar />

      <div style={{ padding: "20px" }}>
        <h1>User Management</h1>
        <p>User Management form or table goes here.</p>
      </div>
    </div>
  );
};

export default UserManagement;
