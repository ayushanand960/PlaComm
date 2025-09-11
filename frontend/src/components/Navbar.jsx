// import { NavLink, useParams } from "react-router-dom";

// export default function Navbar() {
//   const { id } = useParams(); // for dynamic userId

//   const links = [
//     { to: `/dashboard/${id}/dashboard`, label: "Dashboard" },
//     { to: `/dashboard/${id}/job-management`, label: "Job Management" },
//     { to: `/dashboard/${id}/placement-drives`, label: "Placement Drives" },
//     { to: `/dashboard/${id}/applications`, label: "Applications" },
//     { to: `/dashboard/${id}/company-relations`, label: "Company Relations" },
//     { to: `/dashboard/${id}/reports`, label: "Reports" },
//     { to: `/dashboard/${id}/notifications`, label: "Notifications" },
//   ];

//   return (
//     <nav className="bg-white shadow-md px-4 py-3 flex flex-wrap gap-4">
//       {links.map((link) => (
//         <NavLink
//           key={link.to}
//           to={link.to}
//           className={({ isActive }) =>
//             `px-3 py-2 rounded-md text-sm font-medium ${
//               isActive ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-200"
//             }`
//           }
//         >
//           {link.label}
//         </NavLink>
//       ))}
//     </nav>
//   );
// }



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
    { to: `/dashboard/${id}`, label: "Dashboard",icon: <Dashboard /> },
    // { to: `/dashboard/${id}/job-management`, label: "Job Management", icon: <Work />  },
    { to: `/dashboard/${id}/placement-drives`, label: "Placement Drives", icon: <Event /> },
    { to: `/dashboard/${id}/applications`, label: "Applications", icon: <Assignment /> },
    { to: `/dashboard/${id}/company-relations`, label: "Company Relations", icon: <Business /> },
    { to: `/dashboard/${id}/reports`, label: "Reports", icon: <BarChart /> },
    { to: `/dashboard/${id}/notifications`, label: "Notifications", icon: <Notifications /> },
  ];

  return (
    <Box
      sx={{
        // bgcolor: "primary.main",
        // display: "flex",
        // overflowX: "auto",
        // px: 2,
        // py: 1,
        // boxShadow: 2,
        // "&::-webkit-scrollbar": { display: "none" }, // hide scrollbar
         bgcolor: "primary.main",
    display: "flex",
    justifyContent: { xs: "flex-start", sm: "center" }, // scroll on mobile, center on bigger screens
    // flexWrap: { xs: "nowrap", sm: "wrap" }, // no wrap on mobile, wrap on larger screens

    // overflowX: { xs: "auto", sm: "visible" }, // scroll only on small devices
    flexWrap: "nowrap",       // prevent wrapping
    overflowX: "auto",        // enable horizontal scroll
    whiteSpace: "nowrap",     // keep items in one line
    // px: { xs: 1, sm: 2, md: 4 },
    px: 0,
    py: 1,
    boxShadow: 2,
    width: "100%",
    maxWidth: "100vw",
    left: 0,
    right: 0,
    "&::-webkit-scrollbar": { display: "none" }, // hide scrollbar
      }}
    >
      {links.map((link) => (
        <Button
          key={link.to}
          // startIcon={link.icon}
          component={NavLink}
          to={link.to}
          sx={{
             display: "inline-flex",
        alignItems: "center",
        gap: 1, // spacing between icon and text
            color: "white",
            fontWeight: 500,
            textTransform: "none",
            // mx: {xs: 1, sm: 2},
            px: 2,  
            flexShrink: 0,
            "&.active": {
              borderBottom: "2px solid white",
            },
          }}
        >
          {link.icon}
          {link.label}
        </Button>
      ))}
    </Box>
  );
}
