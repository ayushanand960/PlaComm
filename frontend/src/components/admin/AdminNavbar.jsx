// import React from "react";
// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
// import { Home, Person, AssignmentInd, BarChart, Settings } from "@mui/icons-material";
// import { NavLink } from "react-router-dom";

// // 👇 Import logo
// import ramaLogo from "../../assets/logo.png";

// const AdminNavbar = () => {
//   const linkStyle = ({ isActive }) => ({
//     textDecoration: "none",
//     display: "flex",
//     alignItems: "center",
//     marginRight: "10px",
//   });

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       {/* First Row - Header */}
//       <AppBar
//         position="fixed"
//         sx={{
//           top: 0,
//           backgroundColor: "#ffffff", // white
//           color: "#0d47a1", // dark blue text
//           boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           {/* Logo + Title */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <img
//               src={ramaLogo}
//               alt="Rama University Logo"
//               style={{
//                 height: "45px",
//                 marginRight: "10px",
//               }}
//             />
//             <Typography variant="h6" component="div" sx={{ color: "#0d47a1", fontWeight: "bold" }}>
//               {/* Rama University */}
//             </Typography>
//           </Box>

//           {/* Right side text */}
//           <Typography variant="body1" sx={{ color: "#0d47a1" }}>
//             Logged in as Admin
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Second Row - Menu */}
//       <AppBar
//         position="fixed"
//         sx={{
//           top: "64px",
//           backgroundColor: "#ffffff", // white background
//           color: "#1976d2", // light blue text
//           boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Toolbar>
//           <NavLink to="/admin/dashboard" style={linkStyle}>
//             {({ isActive }) => (
//               <Button
//                 startIcon={<Home />}
//                 sx={{
//                   color: isActive ? "#0d47a1" : "#1976d2",
//                   backgroundColor: isActive ? "#e3f2fd" : "transparent",
//                   "&:hover": { backgroundColor: "#bbdefb" },
//                 }}
//               >
//                 Dashboard
//               </Button>
//             )}
//           </NavLink>

//          <NavLink to="/admin/job-analysis" style={linkStyle}>

//             {({ isActive }) => (
//               <Button
//                 startIcon={<Person />}
//                 sx={{
//                   color: isActive ? "#0d47a1" : "#1976d2",
//                   backgroundColor: isActive ? "#e3f2fd" : "transparent",
//                   "&:hover": { backgroundColor: "#bbdefb" },
//                 }}
//               >
//                 Job Analysis

//               </Button>
//             )}
//           </NavLink>

//           <NavLink to="/admin/role-assignment" style={linkStyle}>
//             {({ isActive }) => (
//               <Button
//                 startIcon={<AssignmentInd />}
//                 sx={{
//                   color: isActive ? "#0d47a1" : "#1976d2",
//                   backgroundColor: isActive ? "#e3f2fd" : "transparent",
//                   "&:hover": { backgroundColor: "#bbdefb" },
//                 }}
//               >
//                 Role Assignment
//               </Button>
//             )}
//           </NavLink>

//           <NavLink to="/admin/reports-analytics" style={linkStyle}>
//             {({ isActive }) => (
//               <Button
//                 startIcon={<BarChart />}
//                 sx={{
//                   color: isActive ? "#0d47a1" : "#1976d2",
//                   backgroundColor: isActive ? "#e3f2fd" : "transparent",
//                   "&:hover": { backgroundColor: "#bbdefb" },
//                 }}
//               >
//                 Reports & Analytics
//               </Button>
//             )}
//           </NavLink>

//           <NavLink to="/admin/system-settings" style={linkStyle}>
//             {({ isActive }) => (
//               <Button
//                 startIcon={<Settings />}
//                 sx={{
//                   color: isActive ? "#0d47a1" : "#1976d2",
//                   backgroundColor: isActive ? "#e3f2fd" : "transparent",
//                   "&:hover": { backgroundColor: "#bbdefb" },
//                 }}
//               >
//                 System Settings
//               </Button>
//             )}
//           </NavLink>
//         </Toolbar>
//       </AppBar>

//       {/* Spacer to prevent content overlap */}
//       <Toolbar /> {/* First AppBar Spacer */}
//       <Toolbar /> {/* Second AppBar Spacer */}
//     </Box>
//   );
// };

// export default AdminNavbar;


import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Home, Person, AssignmentInd, BarChart, Settings } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import ramaLogo from "../../assets/logo.png";

const AdminNavbar = () => {
  const linkStyle = {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* 🔷 Top Header */}
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          background:
            "linear-gradient(135deg, rgba(21,101,192,0.9) 0%, rgba(66,165,245,0.85) 100%)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
          {/* Left: Logo & Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                backgroundColor: "rgba(255,255,255,0.2)",
                p: 0.8,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={ramaLogo}
                alt="Rama University Logo"
                style={{ height: "35px", borderRadius: "6px" }}
              />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                letterSpacing: "0.3px",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Rama University Placement Portal
            </Typography>
          </Box>

          {/* Right: Logged In Text */}
          <Typography
            variant="body1"
            sx={{
              background: "rgba(255,255,255,0.15)",
              px: 2,
              py: 0.6,
              borderRadius: "10px",
              fontWeight: 500,
              boxShadow: "inset 0 0 5px rgba(255,255,255,0.3)",
            }}
          >
            Logged in as <strong>Admin</strong>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ⚪ Second Navbar */}
      <AppBar
        position="fixed"
        sx={{
          top: "64px",
          background:
            "rgba(255,255,255,0.65)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          borderBottom: "1px solid rgba(25,118,210,0.2)",
          color: "#1976d2",
          zIndex: 1000,
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
          {[
            { to: "/admin/dashboard", icon: <Home />, label: "Dashboard" },
            { to: "/admin/job-analysis", icon: <Person />, label: "Job Analysis" },
            { to: "/admin/role-assignment", icon: <AssignmentInd />, label: "Role Assignment" },
            { to: "/admin/reports-analytics", icon: <BarChart />, label: "Reports & Analytics" },
            { to: "/admin/system-settings", icon: <Settings />, label: "System Settings" },
          ].map((item, index) => (
            <NavLink key={index} to={item.to} style={linkStyle}>
              {({ isActive }) => (
                <Button
                  startIcon={item.icon}
                  sx={{
                    color: isActive ? "#0d47a1" : "#1565c0",
                    background: isActive
                      ? "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)"
                      : "transparent",
                    borderRadius: "10px",
                    px: 2.5,
                    py: 1,
                    textTransform: "none",
                    fontWeight: 600,
                    mx: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, rgba(227,242,253,0.9), rgba(187,222,251,0.9))",
                      transform: "translateY(-2px)",
                      boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              )}
            </NavLink>
          ))}
        </Toolbar>
      </AppBar>

      {/* Spacers to push content below navbars */}
      <Toolbar />
      <Toolbar />
    </Box>
  );
};

export default AdminNavbar;
