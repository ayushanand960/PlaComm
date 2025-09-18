///Todays code
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Box,
//   Drawer,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axiosInstance from "../api/axiosInstance";

// export default function CoordinatorTopbar() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   // Drawer state
//   const [open, setOpen] = useState(false);

//   // Profile state
//   const [profile, setProfile] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     department: "",
//     designation: "",
//     phone: "",
//     user: {
//       unique_id: "",
//       role: "",
//     },
//   });

//   // Fetch coordinator profile
//  useEffect(() => {
//     if (!id) return;

//     const fetchProfile = async () => {
//       try {
//         const res = await axiosInstance.get(`/users/profile/`);
//         console.log("Coordinator profile API response:", res.data);
//         setProfile(res.data);
//       } catch (err) {
//         console.error("Error fetching coordinator profile:", err);
//       }
//     };

//     fetchProfile();
//   }, [id]);

//   return (
//     <>
//       <AppBar
//         position="static"
//         color="primary"
//         elevation={2}
//         sx={{ width: "100vw", left: 0, right: 0 }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             px: { xs: 1, sm: 2, md: 4 },
//           }}
//         >
//           {/* Left: Back Button + Heading */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton color="inherit" onClick={() => navigate("/")}>
//               <ArrowBackIcon />
//             </IconButton>
//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               sx={{
//                 ml: 1,
//                 fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
//               }}
//             >
//               Coordinator
//             </Typography>
//           </Box>

//           {/* Right: Profile Avatar */}
//           <IconButton onClick={() => setOpen(true)}>
//             <Avatar
//               sx={{
//                 bgcolor: "white",
//                 color: "primary.main",
//                 width: { xs: 30, sm: 35, md: 40 },
//                 height: { xs: 30, sm: 35, md: 40 },
//               }}
//             >
//               {profile.first_name ? profile.first_name[0] : "C"}
//             </Avatar>
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* Drawer (Right Side) */}
//       <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ width: 300, p: 3 }}>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar
//               sx={{ width: 80, height: 80, mb: 2, bgcolor: "primary.main" }}
//             >
//               {profile.first_name ? profile.first_name[0] : "C"}
//             </Avatar>
//             <Typography variant="h6">
//               {profile.first_name || ""} {profile.last_name || ""}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {profile.email || ""}
//             </Typography>
//           </Box>

//           <Box sx={{ mt: 4 }}>
//             <Typography variant="body1">
//               Employee ID: {profile.user?.unique_id}
//             </Typography>
//             <Typography variant="body1">
//               Role: {profile.user?.role || "N/A"}
//             </Typography>
//             <Typography variant="body1">
//               Department: {profile.department}
//             </Typography>
//             <Typography variant="body1">
//               Designation: {profile.designation}
//             </Typography>
//             <Typography variant="body1">Phone: {profile.phone}</Typography>
//           </Box>
//         </Box>
//       </Drawer>
//     </>
//   );
// }





import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Drawer,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function CoordinatorTopbar() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  // Updated profile state to match actual API response
  const [profile, setProfile] = useState({
    unique_id: "",
    email: "",
    role: "",
  });

  // Fetch coordinator profile
  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/users/profile/`);
        console.log("Coordinator profile API response:", res.data);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching coordinator profile:", err);
      }
    };

    fetchProfile();
  }, [id]);

  return (
    <>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 1, sm: 2, md: 4 },
          }}
        >
          {/* Left: Back Button + Heading */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={() => navigate("/")}>
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                ml: 1,
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
              }}
            >
              Coordinator
            </Typography>
          </Box>

          {/* Right: Profile Avatar */}
          <IconButton onClick={() => setOpen(true)}>
            <Avatar
              sx={{
                bgcolor: "white",
                color: "primary.main",
                width: { xs: 30, sm: 35, md: 40 },
                height: { xs: 30, sm: 35, md: 40 },
              }}
            >
              {profile.email ? profile.email[0].toUpperCase() : "C"}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer (Right Side) */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: "primary.main" }}>
              {profile.email ? profile.email[0].toUpperCase() : "C"}
            </Avatar>
            <Typography variant="h6">{profile.email}</Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.role}
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body1">Employee ID: {profile.unique_id}</Typography>
            <Typography variant="body1">Role: {profile.role || "N/A"}</Typography>
            <Typography variant="body1">Email: {profile.email}</Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
