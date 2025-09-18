import { Box, Button } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import {
  Dashboard,
  Work,
  Event,
  Assignment,
  Business,
  BarChart,
  Notifications,
} from "@mui/icons-material";

export default function Navbar() {
  const { id } = useParams();

  const links = [
    { to: `/coordinator-dashboard/${id}`, label: "Dashboard", icon: <Dashboard /> },
    // { to:coordinator- `/dashboard/${id}/job-management`, label: "Job Management", icon: <Work />  },
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
        justifyContent: { xs: "flex-start", sm: "center" },
        flexWrap: "nowrap", // prevent wrapping 
        overflowX: "auto", // enable horizontal scroll 
        whiteSpace: "nowrap", // keep items in one line //
        px: 0,
        py: 1,
        boxShadow: 2, 
        width: "100%", 
        maxWidth: "100vw", 
        left: 0, 
        right: 0, 
        "&::-webkit-scrollbar": { 
          display: "none" 
        }, // hide scrollbar 

         // Hover styling
    "&:hover": {

      backgroundColor: "rgba(255, 255, 255, 0.1)", // light overlay
      color: "#90caf9", // 👈 text hover color (light blue)
      borderRadius: "8px", // optional rounded hover
    },


      }} > {links.map((link) => (
        <Button key={link.to} // startIcon={link.icon} 
          component={NavLink}
          to={link.to}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1, // spacing between icon and text 
            color: "white",
            fontWeight: 500,
            textTransform: "none", // mx: {xs: 1, sm: 2}, 
            px: 2, flexShrink: 0, "&.active": { borderBottom: "2px solid white", },
          }} > {link.icon} {link.label} </Button>))}
    </Box>




 


  );
}
