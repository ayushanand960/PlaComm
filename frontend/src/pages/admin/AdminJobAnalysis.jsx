// // src/pages/admin/AdminJobAnalysis.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Grid,
//   Box,
//   Typography,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   useTheme,
//   useMediaQuery,
//   Breadcrumbs,
//   Link,
//   Fade,
//   Button,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import AdminJobCard from "../../components/admin/AdminJobCard";

// const navItems = [
//   { text: "Dashboard", href: "/admin/dashboard" },
//   { text: "Roles Assignment", href: "/admin/role-assignment" },
//   { text: "Reports-Analytics", href: "/admin/reports-analytics" },
//   { text: "Settings", href: "/admin/settings" },
// ];

// const AdminJobAnalysis = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [fadeIn, setFadeIn] = useState(false);

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);

//   useEffect(() => {
//     const timer = setTimeout(() => setFadeIn(true), 200);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
//       {/* Navbar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           background: "rgba(21, 101, 192, 0.85)", // semi-transparent
//           backdropFilter: "blur(10px)", // glass effect
//           boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//           transition: "all 0.3s ease",
//         }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           {/* Left - Logo / Brand */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Box
//               sx={{
//                 width: 36,
//                 height: 36,
//                 borderRadius: "50%",
//                 background:
//                   "linear-gradient(135deg, #42a5f5, #1565C0)",
//               }}
//             />
//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               sx={{ color: "#fff", cursor: "pointer" }}
//             >
//               Admin Dashboard [Placement Portal]
//             </Typography>
//           </Box>

//           {/* Right - Navigation / Drawer */}
//           {isMobile ? (
//             <IconButton
//               edge="end"
//               color="inherit"
//               aria-label="menu"
//               onClick={toggleDrawer}
//             >
//               <MenuIcon />
//             </IconButton>
//           ) : (
//             <Box sx={{ display: "flex", gap: 3 }}>
//               {navItems.map((item, index) => (
//                 <Button
//                   key={index}
//                   href={item.href}
//                   sx={{
//                     color: "#fff",
//                     textTransform: "none",
//                     fontWeight: 500,
//                     "&:hover": {
//                       color: "#42a5f5",
//                       background: "rgba(255,255,255,0.1)",
//                       borderRadius: "8px",
//                     },
//                   }}
//                 >
//                   {item.text}
//                 </Button>
//               ))}
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* Drawer for Mobile */}
//       <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
//         <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
//           <List>
//             {navItems.map((item, index) => (
//               <ListItem button key={index} component="a" href={item.href}>
//                 <ListItemText primary={item.text} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       {/* Page Content */}
//       <Box sx={{ padding: 3, paddingTop: "120px" }}>
//         {/* Page heading */}
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           sx={{
//             mb: 1,
//             background: "linear-gradient(90deg, #1565C0, #42A5F5)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           Job Analysis
//         </Typography>

//         {/* Breadcrumb */}
//         <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
//           <Link underline="hover" color="inherit" href="/admin/dashboard">
//             Dashboard
//           </Link>
//           <Typography color="text.primary">Job Analysis</Typography>
//         </Breadcrumbs>

//         {/* Subtitle / description */}
//         <Typography variant="body1" sx={{ mb: 4, color: "rgba(0,0,0,0.7)" }}>
//           Review and analyze all job postings with key statistics and status.
//         </Typography>

//         {/* Job Cards Grid with fade-in animation */}
//         <Fade in={fadeIn} timeout={600}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <AdminJobCard />
//             </Grid>
//           </Grid>
//         </Fade>
//       </Box>
//     </Box>
//   );
// };

// export default AdminJobAnalysis;





import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Breadcrumbs, Link, Fade } from "@mui/material";
import AdminJobCard from "../../components/admin/AdminJobCard";

// ✅ Import Navbars
import AdminNavbar from "../../components/admin/AdminNavbar"
import CoordinatorNavbar from "../../components/PlacementCoordinator/Navbar";
import Navbar from "../../components/trainingOfficer/Navbar";
import CoordinatorTopbar from "../../components/PlacementCoordinator/TopNavbar"

const AdminJobAnalysis = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 200);
    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user?.role); // fallback for safety
    return () => clearTimeout(timer);
  }, []);

  // ✅ Role-based navbar selection
  const renderNavbar = () => {
    switch (role) {
      case "admin":
        return <AdminNavbar />;
      case "placement_coordinator":
         return (
          <>
            <CoordinatorTopbar />
            <CoordinatorNavbar />
          </>
        );

      case "officer":
        return <Navbar />;
      // default:
      //   return <AdminNavbar />;
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      {renderNavbar()}

      <Box sx={{ padding: 3, paddingTop: "120px" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            mb: 1,
            background: "linear-gradient(90deg, #1565C0, #42A5F5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Job Analysis
        </Typography>

        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="/admin/dashboard">
            Dashboard
          </Link>
          <Typography color="text.primary">Job Analysis</Typography>
        </Breadcrumbs>

        <Typography variant="body1" sx={{ mb: 4, color: "rgba(0,0,0,0.7)" }}>
          Review and analyze all job postings with key statistics and status.
        </Typography>

        <Fade in={fadeIn} timeout={600}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AdminJobCard />
            </Grid>
          </Grid>
        </Fade>
      </Box>
    </Box>
  );
};

export default AdminJobAnalysis;
