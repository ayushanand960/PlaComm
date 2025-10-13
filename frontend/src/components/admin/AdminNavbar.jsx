


// import React from "react";
// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
// import { Home, Person, AssignmentInd, BarChart, Settings } from "@mui/icons-material";
// import { NavLink } from "react-router-dom";
// import ramaLogo from "../../assets/logo.png";

// const AdminNavbar = () => {
//   const linkStyle = {
//     textDecoration: "none",
//     display: "flex",
//     alignItems: "center",
//     marginRight: "10px",
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       {/* 🔷 Top Header */}
//       <AppBar
//         position="fixed"
//         sx={{
//           top: 0,
//           background:
//             "linear-gradient(135deg, rgba(21,101,192,0.9) 0%, rgba(66,165,245,0.85) 100%)",
//           backdropFilter: "blur(10px)",
//           WebkitBackdropFilter: "blur(10px)",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
//           borderBottom: "1px solid rgba(255,255,255,0.2)",
//           color: "#fff",
//           transition: "all 0.3s ease",
//         }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
//           {/* Left: Logo & Title */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Box
//               sx={{
//                 backgroundColor: "rgba(255,255,255,0.2)",
//                 p: 0.8,
//                 borderRadius: "10px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src={ramaLogo}
//                 alt="Rama University Logo"
//                 style={{ height: "35px", borderRadius: "6px" }}
//               />
//             </Box>

//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "bold",
//                 letterSpacing: "0.3px",
//                 fontFamily: "'Poppins', sans-serif",
//               }}
//             >
//               Rama University Placement Portal
//             </Typography>
//           </Box>

//           {/* Right: Logged In Text */}
//           <Typography
//             variant="body1"
//             sx={{
//               background: "rgba(255,255,255,0.15)",
//               px: 2,
//               py: 0.6,
//               borderRadius: "10px",
//               fontWeight: 500,
//               boxShadow: "inset 0 0 5px rgba(255,255,255,0.3)",
//             }}
//           >
//             Logged in as <strong>Admin</strong>
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* ⚪ Second Navbar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           top: "64px",
//           background:
//             "rgba(255,255,255,0.65)",
//           backdropFilter: "blur(12px)",
//           WebkitBackdropFilter: "blur(12px)",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
//           borderBottom: "1px solid rgba(25,118,210,0.2)",
//           color: "#1976d2",
//           zIndex: 1000,
//         }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             flexWrap: "wrap",
//             gap: 0.5,
//             py: 1,
//           }}
//         >
//           {[
//             { to: "/admin/dashboard", icon: <Home />, label: "Dashboard" },
//             { to: "/admin/job-analysis", icon: <Person />, label: "Job Analysis" },
//             { to: "/admin/role-assignment", icon: <AssignmentInd />, label: "Role Assignment" },
//             { to: "/admin/reports-analytics", icon: <BarChart />, label: "Reports & Analytics" },
//             { to: "/admin/system-settings", icon: <Settings />, label: "System Settings" },
//           ].map((item, index) => (
//             <NavLink key={index} to={item.to} style={linkStyle}>
//               {({ isActive }) => (
//                 <Button
//                   startIcon={item.icon}
//                   sx={{
//                     color: isActive ? "#0d47a1" : "#1565c0",
//                     background: isActive
//                       ? "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)"
//                       : "transparent",
//                     borderRadius: "10px",
//                     px: 2.5,
//                     py: 1,
//                     textTransform: "none",
//                     fontWeight: 600,
//                     mx: 1,
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       background:
//                         "linear-gradient(135deg, rgba(227,242,253,0.9), rgba(187,222,251,0.9))",
//                       transform: "translateY(-2px)",
//                       boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                 >
//                   {item.label}
//                 </Button>
//               )}
//             </NavLink>
//           ))}
//         </Toolbar>
//       </AppBar>

//       {/* Spacers to push content below navbars */}
//       <Toolbar />
//       <Toolbar />
//     </Box>
//   );
// };

// export default AdminNavbar;

// import React from "react";
// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
// import { Home, Person, AssignmentInd, BarChart, Settings, ArrowBack, Logout } from "@mui/icons-material";
// import { NavLink, useNavigate } from "react-router-dom";
// import ramaLogo from "../../assets/logo.png";

// const AdminNavbar = () => {
//   const navigate = useNavigate();

//   const linkStyle = {
//     textDecoration: "none",
//     display: "flex",
//     alignItems: "center",
//     marginRight: "10px",
//   };
// const handleLogout = async () => {
// // const confirmLogout = window.confirm("Are you sure you want to logout?");
//   // if (!confirmLogout) return;
  
//   try {
//     await axiosInstance.post("/users/logout/"); // Correct backend URL
//     localStorage.removeItem("user");
//     navigate("/");
//   } catch (error) {
//     console.error("Logout failed:", error);
//     // fallback to local logout
//     localStorage.removeItem("user");
//     navigate("/");
//   }
// };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       {/* 🔷 Top Header */}
//       <AppBar
//         position="fixed"
//         sx={{
//           top: 0,
//           background:
//             "linear-gradient(135deg, rgba(21,101,192,0.9) 0%, rgba(66,165,245,0.85) 100%)",
//           backdropFilter: "blur(10px)",
//           WebkitBackdropFilter: "blur(10px)",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
//           borderBottom: "1px solid rgba(255,255,255,0.2)",
//           color: "#fff",
//           transition: "all 0.3s ease",
//         }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
//           {/* Left: Logo & Title */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Box
//               sx={{
//                 backgroundColor: "rgba(255,255,255,0.2)",
//                 p: 0.8,
//                 borderRadius: "10px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src={ramaLogo}
//                 alt="Rama University Logo"
//                 style={{ height: "35px", borderRadius: "6px" }}
//               />
//             </Box>

//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "bold",
//                 letterSpacing: "0.3px",
//                 fontFamily: "'Poppins', sans-serif",
//               }}
//             >
//               Rama University Placement Portal
//             </Typography>
//           </Box>

//           {/* Right: Back + Logout + Logged In Text */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Button
//               startIcon={<ArrowBack />}
//               onClick={() => navigate(-1)}
//               sx={{
//                 color: "#fff",
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 background: "rgba(255,255,255,0.2)",
//                 "&:hover": { background: "rgba(255,255,255,0.3)" },
//               }}
//             >
//               Back
//             </Button>

//             <Button
//               startIcon={<Logout />}
//               onClick={handleLogout}
//               sx={{
//                 color: "#fff",
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 background: "rgba(255,255,255,0.2)",
//                 "&:hover": { background: "rgba(255,255,255,0.3)" },
//               }}
//             >
//               Logout
//             </Button>

//             <Typography
//               variant="body1"
//               sx={{
//                 background: "rgba(255,255,255,0.15)",
//                 px: 2,
//                 py: 0.6,
//                 borderRadius: "10px",
//                 fontWeight: 500,
//                 boxShadow: "inset 0 0 5px rgba(255,255,255,0.3)",
//               }}
//             >
//               Logged in as <strong>Admin</strong>
//             </Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* ⚪ Second Navbar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           top: "64px",
//           background: "rgba(255,255,255,0.65)",
//           backdropFilter: "blur(12px)",
//           WebkitBackdropFilter: "blur(12px)",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
//           borderBottom: "1px solid rgba(25,118,210,0.2)",
//           color: "#1976d2",
//           zIndex: 1000,
//         }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             flexWrap: "wrap",
//             gap: 0.5,
//             py: 1,
//           }}
//         >
//           {[
//             { to: "/admin/dashboard", label: "Dashboard", icon: <Home /> },
//             { to: "/admin/job-analysis", label: "Job Analysis", icon: <Person /> },
//             { to: "/admin/role-assignment", label: "Role Assignment", icon: <AssignmentInd /> },
//             { to: "/admin/reports-analytics", label: "Reports & Analytics", icon: <BarChart /> },
//             { to: "/admin/system-settings", label: "System Settings", icon: <Settings /> },
//           ].map((item, index) => (
//             <NavLink key={index} to={item.to} style={linkStyle}>
//               {({ isActive }) => (
//                 <Button
//                   startIcon={item.icon}
//                   sx={{
//                     color: isActive ? "#0d47a1" : "#1565c0",
//                     background: isActive
//                       ? "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)"
//                       : "transparent",
//                     borderRadius: "10px",
//                     px: 2.5,
//                     py: 1,
//                     textTransform: "none",
//                     fontWeight: 600,
//                     mx: 1,
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       background:
//                         "linear-gradient(135deg, rgba(227,242,253,0.9), rgba(187,222,251,0.9))",
//                       transform: "translateY(-2px)",
//                       boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                 >
//                   {item.label}
//                 </Button>
//               )}
//             </NavLink>
//           ))}
//         </Toolbar>
//       </AppBar>

//       {/* Spacers */}
//       <Toolbar />
//       <Toolbar />
//       <Toolbar />
//     </Box>
//   );
// };

// export default AdminNavbar;





import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Divider,
  useMediaQuery,
} from "@mui/material";
import {
  Home,
  Person,
  AssignmentInd,
  BarChart,
  Settings,
  ArrowBack,
  Logout,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import ramaLogo from "../../assets/logo.png";
import axiosInstance from "../../api/axiosInstance";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/users/logout/");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <Home /> },
    { to: "/admin/job-analysis", label: "Job Analysis", icon: <Person /> },
    { to: "/admin/role-assignment", label: "Role Assignment", icon: <AssignmentInd /> },
    { to: "/admin/reports-analytics", label: "Reports & Analytics", icon: <BarChart /> },
    { to: "/admin/system-settings", label: "System Settings", icon: <Settings /> },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* 🔷 Top Header */}
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          background:
            "linear-gradient(135deg, rgba(13,71,161,0.95) 0%, rgba(21,101,192,0.9) 100%)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 4px 25px rgba(0,0,0,0.25)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          zIndex: 1200,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, sm: 4 },
          }}
        >
          {/* Left Section: Logo + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                backgroundColor: "rgba(255,255,255,0.15)",
                p: 0.8,
                borderRadius: "12px",
                boxShadow: "inset 0 0 8px rgba(255,255,255,0.25)",
              }}
            >
              <img
                src={ramaLogo}
                alt="Rama University Logo"
                style={{ height: "38px", borderRadius: "8px" }}
              />
            </Box>

            {!isMobile && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Rama University Placement Portal
              </Typography>
            )}
          </Box>

          {/* Right Section: Buttons + Role */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              sx={{
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "10px",
                px: 2,
                "&:hover": {
                  background: "rgba(255,255,255,0.25)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Back
            </Button>

            <Button
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "10px",
                px: 2,
                "&:hover": {
                  background: "rgba(255,255,255,0.25)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Logout
            </Button>

            {!isMobile && (
              <Typography
                variant="body1"
                sx={{
                  background: "rgba(255,255,255,0.15)",
                  px: 2.2,
                  py: 0.6,
                  borderRadius: "12px",
                  fontWeight: 500,
                  boxShadow: "inset 0 0 5px rgba(255,255,255,0.3)",
                }}
              >
                Logged in as <strong>Admin</strong>
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ⚪ Second Navbar */}
      <AppBar
        position="fixed"
        sx={{
          top: "64px",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
          borderBottom: "1px solid rgba(25,118,210,0.2)",
          color: "#1976d2",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 0.5,
            py: 1,
          }}
        >
          {navItems.map((item, index) => (
            <NavLink key={index} to={item.to} style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Button
                  startIcon={item.icon}
                  sx={{
                    color: isActive ? "#0d47a1" : "#1565c0",
                    background: isActive
                      ? "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)"
                      : "transparent",
                    borderRadius: "12px",
                    px: 2.5,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 600,
                    mx: 0.8,
                    letterSpacing: "0.4px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, rgba(227,242,253,0.9), rgba(187,222,251,0.9))",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    },
                    "& .MuiSvgIcon-root": {
                      transition: "transform 0.3s ease, color 0.3s ease",
                      color: isActive ? "#0d47a1" : "#1976d2",
                    },
                    "&:hover .MuiSvgIcon-root": {
                      transform: "scale(1.2)",
                      color: "#0d47a1",
                    },
                  }}
                >
                  {item.label}
                </Button>
              )}
            </NavLink>
          ))}
        </Toolbar>
        <Divider sx={{ opacity: 0.3 }} />
      </AppBar>

      {/* Spacing for content below navbar */}
      <Toolbar />
      <Toolbar />
      <Toolbar />
    </Box>
  );
};

export default AdminNavbar;
