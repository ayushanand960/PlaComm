// // src/components/Navbar.jsx
// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   IconButton,
//   Divider,
//   Button,
// } from "@mui/material";
// import { NavLink } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonIcon from "@mui/icons-material/Person";
// import WorkIcon from "@mui/icons-material/Work";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import DescriptionIcon from "@mui/icons-material/Description";
// import ForumIcon from "@mui/icons-material/Forum";
// import HelpIcon from "@mui/icons-material/Help";
// import BarChartIcon from "@mui/icons-material/BarChart";

// const navItems = [
//   { label: "Dashboard", icon: <DashboardIcon />, path: "/student-dashboard/:id" },
//   { label: "Profile Management", icon: <PersonIcon />, path: "/profile" },
//   { label: "Job Opportunities", icon: <WorkIcon />, path: "/jobs" },
//   { label: "My Applications", icon: <AssignmentIcon />, path: "/applications" },
//   { label: "Resume & ATS", icon: <DescriptionIcon />, path: "/resume" },
//   { label: "Discussion Forum", icon: <ForumIcon />, path: "/forum" },
//   { label: "Drive Questions", icon: <HelpIcon />, path: "/questions" },
//   { label: "Drive Reports", icon: <BarChartIcon />, path: "/reports" },
// ];

// const StudentNavbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <AppBar
//       position="sticky"
//       elevation={0}
//       sx={{
//         background: isScrolled ? "rgba(255,255,255,0.9)" : "#fff",
//         backdropFilter: isScrolled ? "blur(8px)" : "none",
//         color: "#000",
//         borderBottom: "1px solid #e0e0e0",
//       }}
//     >
//       {/* Top Bar */}
//       <Toolbar
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           py: 1,
//         }}
//       >
//         {/* Left side */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <IconButton component={NavLink} to="/" size="small">
//             <ArrowBackIcon />
//           </IconButton>

//           {/* Logo */}
//           <Box
//             component="img"
//             src="/images/rm.jpg"
//             alt="Rama University"
//             sx={{ height: 40, width: "auto" }}
//           />

//           <Box>
//             <Typography variant="h6" fontWeight="bold">
//               Rama University
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Placement Portal
//             </Typography>
//           </Box>
//         </Box>

//         {/* Right side */}
//         <Typography variant="body2" color="text.secondary">
//           Logged in as <b>Student</b>
//         </Typography>
//       </Toolbar>

//       <Divider />

//       {/* Bottom Navigation Bar - scrollable on mobile */}
//       <Toolbar
//         sx={{
//           display: "flex",
//           gap: 1,
//           overflowX: "auto",
//           whiteSpace: "nowrap",
//           px: 1,
//           "&::-webkit-scrollbar": {
//             height: 6,
//           },
//           "&::-webkit-scrollbar-thumb": {
//             backgroundColor: "#888",
//             borderRadius: 3,
//           },
//           "&::-webkit-scrollbar-track": {
//             backgroundColor: "transparent",
//           },
//         }}
//       >
//         {navItems.map((item) => (
//           <Button
//             key={item.label}
//             component={NavLink}
//             to={item.path}
//             startIcon={item.icon}
//             sx={{
//               textTransform: "none",
//               borderRadius: 1,
//               flexShrink: 0, // prevents shrinking
//               "&.active": {
//                 fontWeight: "bold",
//                 color: "#fff",
//                 backgroundColor: "#1976d2",
//               },
//               "&:hover": {
//                 backgroundColor: "#1565c0",
//                 color: "#fff",
//               },
//             }}
//           >
//             {item.label}
//           </Button>
//         ))}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default StudentNavbar;



// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DescriptionIcon from "@mui/icons-material/Description";
import ForumIcon from "@mui/icons-material/Forum";
import HelpIcon from "@mui/icons-material/Help";
import BarChartIcon from "@mui/icons-material/BarChart";

// const navItems = [
//   { label: "Dashboard", icon: <DashboardIcon />, path: "/student-dashboard/:id" },
//   { label: "Profile Management", icon: <PersonIcon />, path: "/profile/:id" },
//   { label: "Job Opportunities", icon: <WorkIcon />, path: "/jobs" },
//   { label: "My Applications", icon: <AssignmentIcon />, path: "/applications" },
//   { label: "Resume & ATS", icon: <DescriptionIcon />, path: "/resume" },
//   { label: "Discussion Forum", icon: <ForumIcon />, path: "/forum" },
//   { label: "Drive Questions", icon: <HelpIcon />, path: "/questions" },
//   { label: "Drive Reports", icon: <BarChartIcon />, path: "/reports" },
// ];

const StudentNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
   const user = JSON.parse(localStorage.getItem("user"));
  const studentId = user?.unique_id || "1"; // fallback to "1" if not found

  const navItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: `/student-dashboard/${studentId}` },
    { label: "Profile Management", icon: <PersonIcon />, path: `/student-profile/${studentId}` },
    { label: "Job Opportunities", icon: <WorkIcon />, path: "/jobs" },
    { label: "My Applications", icon: <AssignmentIcon />, path: "/my-applications" },

    { label: "Resume & ATS", icon: <DescriptionIcon />, path: "/resume" },
    { label: "Discussion Forum", icon: <ForumIcon />, path: "/forum" },
    { label: "Drive Questions", icon: <HelpIcon />, path: "/questions" },
    { label: "Drive Reports", icon: <BarChartIcon />, path: "/reports" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: isScrolled ? "rgba(255,255,255,0.9)" : "#fff",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        color: "#000",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      {/* Top Bar */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        {/* Left side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton component={NavLink} to="/" size="small">
            <ArrowBackIcon />
          </IconButton>

          <Box
            component="img"
            src="/images/rm.jpg"
            alt="Rama University"
            sx={{ height: 40, width: "auto" }}
          />

          <Box>
            <Typography variant="h6" fontWeight="bold">
              Rama University
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Placement Portal
            </Typography>
          </Box>
        </Box>

        {/* Right side */}
        <Typography variant="body2" color="text.secondary">
          Logged in as <b>Student</b>
        </Typography>
      </Toolbar>

      <Divider />

      {/* Bottom Navigation Bar */}
      <Toolbar
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          whiteSpace: "nowrap",
          px: 1,
          "&::-webkit-scrollbar": { height: 6 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
        }}
      >
        {navItems.map((item) => (
          <Button
            key={item.label}
            component={NavLink}
            to={item.path}
            startIcon={item.icon}
            sx={{
              textTransform: "none",
              borderRadius: 1,
              flexShrink: 0,
              "&.active": {
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#1976d2",
              },
              "&:hover": {
                backgroundColor: "#1565c0",
                color: "#fff",
              },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default StudentNavbar;
