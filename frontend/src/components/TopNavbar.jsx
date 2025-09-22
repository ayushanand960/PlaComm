// src/components/TopNavbar.jsx
// import { AppBar, Toolbar, IconButton, Typography, Avatar, Box } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useParams } from "react-router-dom";

// export default function TopNavbar() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   return (
//     <AppBar position="static" color="primary" elevation={2}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: Back button + Heading */}
        {/* <Box display="flex" alignItems="center">
          <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Coordinator
          </Typography>
        </Box> */}

        {/* Right side: Profile Avatar */}
//         <IconButton onClick={() => navigate(`/dashboard/${id}/profile`)}>
//           <Avatar
//             alt="Coordinator"
//             src="/assets/profile.jpg" // replace with real coordinator image
//             sx={{ width: 40, height: 40 }}
//           />
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//   );
// }

// src/components/CoordinatorTopbar.jsx
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";

export default function CoordinatorTopbar() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <AppBar position="static" color="primary" elevation={2} sx={{ width: "100vw",left: 0, right: 0 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", 
      px: { xs: 1, sm: 2, md: 4 } }}>
        {/* Left: Back Button + Heading */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" sx={{ ml: 1, fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" } }}>
            Coordinator
          </Typography>
        </Box>

        {/* Right: Profile Avatar */}
        <IconButton onClick={() => navigate(`/dashboard/${id}/profile`)}>
          <Avatar sx={{ bgcolor: "white", color: "primary.main", width: { xs: 30, sm: 35, md: 40 }, 
          height: { xs: 30, sm: 35, md: 40 }  }}>
            C
          </Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
