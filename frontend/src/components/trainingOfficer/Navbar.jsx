// src/TrainingOfficerComponents/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const navItems = [
  { name: "Dashboard", path: "dashboard" },
  { name: "Training Program", path: "trainingprogram" },
  { name: "Priority List", path: "prioritylist" },
  { name: "Student Evaluation", path: "studentevaluation" },
  // { name: "Job Analysis", path: "trainingreport" },
 { name: "Job Analysis", path: "/admin/job-analysis" },

  
  // { name: "Mock Interview", path: "mockinterview" },
];


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false); // profile drawer
  const [profile, setProfile] = useState({ unique_id: "", email: "", role: "" });
  const location = useLocation();
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {



    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // clear saved user (if you’re storing login info)
      localStorage.removeItem("user");
      // Clear storage if needed: localStorage.clear(); sessionStorage.clear();
      navigate("/"); // redirect to home
    }
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => {
          const isActive = location.pathname.toLowerCase().includes(item.path.toLowerCase());
          return (
            <ListItemButton
              key={item.name}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 1,
                bgcolor: isActive ? "goldenrod" : "transparent",
                color: isActive ? "white" : "black",
                transition: "all 0.4s ease",
                "&:hover": {
                  bgcolor: isActive ? "#6495ED" : "#e0e0e0",
                  color: isActive ? "white" : "black",
                },
                mb: 0.5,
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          );
        })}

        {/* Logout Button */}
        <ListItemButton
          sx={{
            borderRadius: 1,
            color: "black",
            "&:hover": { color: "grey" },
            mt: 1,
          }}
        >
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  // Fetch TrainingOfficer profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/users/profile/`);
        console.log("TrainingOfficer profile API response:", res.data);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching TrainingOfficer profile:", err);
      }
    };
    fetchProfile();
  }, []);


  return (
    <>
      <AppBar position="fixed" sx={{ background: "linear-gradient(90deg, #e8b342ff, #706dffff)", color: "black", width: "100%" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Logo + Heading */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Rama University Logo"
              style={{ height: "40px", marginRight: "10px" }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
              {/* Heading Rama University */}
            </Typography>
          </Box>

          {/* Right: Nav Items + Logout + Avatar */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
            {navItems.map((item) => {
              const isActive = location.pathname.toLowerCase().includes(item.path.toLowerCase());
              return (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: 1,
                    color: isActive ? "white" : "black",
                    bgcolor: isActive ? "goldenrod" : "transparent",
                    mx: 1,
                    transition: "all 0.4s ease",
                    "&:hover": {
                      bgcolor: isActive ? "#6495ED" : "#e0e0e0",
                      color: isActive ? "white" : "black",
                    },
                  }}
                >
                  {item.name}
                </Button>
              );
            })}

            {/* Logout on right */}
            <Button
              onClick={handleLogout}
              sx={{
                borderRadius: 1,
                color: "black",
                ml: 2,
                "&:hover": { color: "grey" },
              }}
            >
              Logout
            </Button>
            {/* Profile Avatar */}
            <IconButton onClick={() => setOpen(true)} sx={{ ml: 1 }}>
              <Avatar
                sx={{
                  bgcolor: "#f2f2f2",
                  color: "Goldenrod",
                  width: { xs: 30, sm: 35, md: 40 },
                  height: { xs: 30, sm: 35, md: 40 },
                }}
              >
                {profile.email ? profile.email[0].toUpperCase() : "C"}
              </Avatar>
            </IconButton>
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "navy" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>

      {/* Drawer (Right Side) */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { background: "linear-gradient(90deg, #ffdb8dff, #b3b2fdff)" } }}>
        <Box sx={{ width: 300, p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: "Goldenrod" }}>
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
};

export default Navbar;
