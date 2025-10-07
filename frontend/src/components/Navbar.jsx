import { Box, Button } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import {
  Dashboard,
  Event,
  Assignment,
  Business,
  BarChart,
  Notifications,
} from "@mui/icons-material";

// 👇 logo import
import ramaLogo from "../assets/logo.png";

export default function Navbar() {
  const { id } = useParams();

  const links = [
<<<<<<< HEAD
    {
      to: `/coordinator-dashboard/${id}`,
      label: "Dashboard",
      icon: <Dashboard />,
    },
    // { to:coordinator- `/dashboard/${id}/job-management`, label: "Job Management", icon: <Work />  },
    {
      to: `/coordinator-dashboard/${id}/placement-drives`,
      label: "Placement Drives",
      icon: <Event />,
    },
    {
      to: `/coordinator-dashboard/${id}/applications`,
      label: "Applications",
      icon: <Assignment />,
    },
    {
      to: `/coordinator-dashboard/${id}/company-relations`,
      label: "Company Relations",
      icon: <Business />,
    },
    {
      to: `/coordinator-dashboard/${id}/reports`,
      label: "Reports",
      icon: <BarChart />,
    },
    {
      to: `/coordinator-dashboard/${id}/notifications`,
      label: "Notifications",
      icon: <Notifications />,
    },
=======
    { to: `/coordinator-dashboard/${id}`, label: "Dashboard", icon: <Dashboard /> },
    { to: `/coordinator-dashboard/${id}/placement-drives`, label: "Placement Drives", icon: <Event /> },
    { to: `/coordinator-dashboard/${id}/applications`, label: "Applications", icon: <Assignment /> },
    { to: `/coordinator-dashboard/${id}/company-relations`, label: "Company Relations", icon: <Business /> },
    { to: `/coordinator-dashboard/${id}/reports`, label: "Reports", icon: <BarChart /> },
    { to: `/coordinator-dashboard/${id}/notifications`, label: "Notifications", icon: <Notifications /> },
>>>>>>> origin/aarohi
  ];

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        display: "flex",
<<<<<<< HEAD
        justifyContent: { xs: "flex-start", sm: "center" },
        flexWrap: "nowrap", // prevent wrapping
        overflowX: "auto", // enable horizontal scroll
        whiteSpace: "nowrap", // keep items in one line //
        px: 0,
=======
        alignItems: "center",
        justifyContent: { xs: "flex-start", sm: "flex-start" },
        flexWrap: "nowrap",
        overflowX: "auto",
        whiteSpace: "nowrap",
        px: 1,
>>>>>>> origin/aarohi
        py: 1,
        boxShadow: 2,
        width: "100%",
        maxWidth: "100vw",
        left: 0,
        right: 0,
<<<<<<< HEAD
        "&::-webkit-scrollbar": {
          display: "none",
        }, // hide scrollbar

        // Hover styling
        "&:hover": {
          backgroundColor: "#1976d2", // light overlay
          color: "#141405ff", // 👈 text hover color (light blue)
          borderRadius: "8px", // optional rounded hover
        },
      }}
    >
      {" "}
      {links.map((link) => (
        <Button
          key={link.to} // startIcon={link.icon}
=======
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {/* --- Logo --- */}
      <img
  src={ramaLogo}
  alt="Rama University Logo"
  style={{
    height: "60px",
    marginRight: "20px",
    background: "white",   // 👈 ye add karo test ke liye
    borderRadius: "6px",
    padding: "4px"
  }}
/>


      {/* --- Navbar Links --- */}
      {links.map((link) => (
        <Button
          key={link.to}
>>>>>>> origin/aarohi
          component={NavLink}
          to={link.to}
          sx={{
            display: "inline-flex",
            alignItems: "center",
<<<<<<< HEAD
            gap: 1, // spacing between icon and text
            color: "white",
            fontWeight: 500,
            textTransform: "none", // mx: {xs: 1, sm: 2},
=======
            gap: 1,
            color: "white",
            fontWeight: 500,
            textTransform: "none",
>>>>>>> origin/aarohi
            px: 2,
            flexShrink: 0,
            "&.active": { borderBottom: "2px solid white" },
          }}
        >
<<<<<<< HEAD
          {" "}
          {link.icon} {link.label}{" "}
=======
          {link.icon} {link.label}
>>>>>>> origin/aarohi
        </Button>
      ))}
    </Box>
  );
}
