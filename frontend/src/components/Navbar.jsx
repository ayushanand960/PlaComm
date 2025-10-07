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
    { to: `/coordinator-dashboard/${id}`, label: "Dashboard", icon: <Dashboard /> },
    { to: `/coordinator-dashboard/${id}/placement-drives`, label: "Placement Drives", icon: <Event /> },
    { to: `/coordinator-dashboard/${id}/applications`, label: "Applications", icon: <Assignment /> },
    { to: `/coordinator-dashboard/${id}/company-relations`, label: "Company Relations", icon: <Business /> },
    { to: `/coordinator-dashboard/${id}/reports`, label: "Reports", icon: <BarChart /> },
    { to: `/coordinator-dashboard/${id}/notifications`, label: "Notifications", icon: <Notifications /> },
  ];

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "flex-start", sm: "flex-start" },
        flexWrap: "nowrap",
        overflowX: "auto",
        whiteSpace: "nowrap",
        px: 1,
        py: 1,
        boxShadow: 2,
        width: "100%",
        maxWidth: "100vw",
        left: 0,
        right: 0,
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
          component={NavLink}
          to={link.to}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            color: "white",
            fontWeight: 500,
            textTransform: "none",
            px: 2,
            flexShrink: 0,
            "&.active": { borderBottom: "2px solid white" },
          }}
        >
          {link.icon} {link.label}
        </Button>
      ))}
    </Box>
  );
}
