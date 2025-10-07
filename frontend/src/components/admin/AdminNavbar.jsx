import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Home, Person, AssignmentInd, BarChart, Settings } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

// 👇 Import logo
import ramaLogo from "../../assets/logo.png";

const AdminNavbar = () => {
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* First Row - Header */}
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          backgroundColor: "#ffffff", // white
          color: "#0d47a1", // dark blue text
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo + Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={ramaLogo}
              alt="Rama University Logo"
              style={{
                height: "45px",
                marginRight: "10px",
              }}
            />
            <Typography variant="h6" component="div" sx={{ color: "#0d47a1", fontWeight: "bold" }}>
              {/* Rama University */}
            </Typography>
          </Box>

          {/* Right side text */}
          <Typography variant="body1" sx={{ color: "#0d47a1" }}>
            Logged in as Admin
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Second Row - Menu */}
      <AppBar
        position="fixed"
        sx={{
          top: "64px",
          backgroundColor: "#ffffff", // white background
          color: "#1976d2", // light blue text
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <NavLink to="/admin/dashboard" style={linkStyle}>
            {({ isActive }) => (
              <Button
                startIcon={<Home />}
                sx={{
                  color: isActive ? "#0d47a1" : "#1976d2",
                  backgroundColor: isActive ? "#e3f2fd" : "transparent",
                  "&:hover": { backgroundColor: "#bbdefb" },
                }}
              >
                Dashboard
              </Button>
            )}
          </NavLink>

          <NavLink to="/admin/user-management" style={linkStyle}>
            {({ isActive }) => (
              <Button
                startIcon={<Person />}
                sx={{
                  color: isActive ? "#0d47a1" : "#1976d2",
                  backgroundColor: isActive ? "#e3f2fd" : "transparent",
                  "&:hover": { backgroundColor: "#bbdefb" },
                }}
              >
                User Management
              </Button>
            )}
          </NavLink>

          <NavLink to="/admin/role-assignment" style={linkStyle}>
            {({ isActive }) => (
              <Button
                startIcon={<AssignmentInd />}
                sx={{
                  color: isActive ? "#0d47a1" : "#1976d2",
                  backgroundColor: isActive ? "#e3f2fd" : "transparent",
                  "&:hover": { backgroundColor: "#bbdefb" },
                }}
              >
                Role Assignment
              </Button>
            )}
          </NavLink>

          <NavLink to="/admin/reports-analytics" style={linkStyle}>
            {({ isActive }) => (
              <Button
                startIcon={<BarChart />}
                sx={{
                  color: isActive ? "#0d47a1" : "#1976d2",
                  backgroundColor: isActive ? "#e3f2fd" : "transparent",
                  "&:hover": { backgroundColor: "#bbdefb" },
                }}
              >
                Reports & Analytics
              </Button>
            )}
          </NavLink>

          <NavLink to="/admin/system-settings" style={linkStyle}>
            {({ isActive }) => (
              <Button
                startIcon={<Settings />}
                sx={{
                  color: isActive ? "#0d47a1" : "#1976d2",
                  backgroundColor: isActive ? "#e3f2fd" : "transparent",
                  "&:hover": { backgroundColor: "#bbdefb" },
                }}
              >
                System Settings
              </Button>
            )}
          </NavLink>
        </Toolbar>
      </AppBar>

      {/* Spacer to prevent content overlap */}
      <Toolbar /> {/* First AppBar Spacer */}
      <Toolbar /> {/* Second AppBar Spacer */}
    </Box>
  );
};

export default AdminNavbar;
