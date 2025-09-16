import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Home, Person, AssignmentInd, BarChart, Settings } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#0c7a96" : "#333333",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* First Row - Fixed */}
      <AppBar position="fixed" sx={{ top: 0, backgroundColor: "#ffffff", color: "#333333", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ color: "#333333" }}>
            Rama University
          </Typography>
          <Typography variant="body1" sx={{ color: "#333333" }}>
            Logged in as Admin
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Second Row - Fixed */}
      <AppBar position="fixed" sx={{ top: '64px', backgroundColor: "#f8f8f8", color: "#333333", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <Toolbar>
          <NavLink to="/admin/dashboard" style={linkStyle}>
            <Button startIcon={<Home />} color="inherit">
              Dashboard
            </Button>
          </NavLink>

          <NavLink to="/admin/user-management" style={linkStyle}>
            <Button startIcon={<Person />} color="inherit">
              User Management
            </Button>
          </NavLink>

          <NavLink to="/admin/role-assignment" style={linkStyle}>
            <Button startIcon={<AssignmentInd />} color="inherit">
              Role Assignment
            </Button>
          </NavLink>

          <NavLink to="/admin/reports-analytics" style={linkStyle}>
            <Button startIcon={<BarChart />} color="inherit">
              Reports & Analytics
            </Button>
          </NavLink>

          <NavLink to="/admin/system-settings" style={linkStyle}>
            <Button startIcon={<Settings />} color="inherit">
              System Settings
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>

      {/* Spacer to prevent content from being hidden */}
      <Toolbar /> {/* First AppBar Spacer */}
      <Toolbar /> {/* Second AppBar Spacer */}
    </Box>
  );
};

export default AdminNavbar;
