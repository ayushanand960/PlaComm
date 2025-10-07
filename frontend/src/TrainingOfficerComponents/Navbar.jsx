// src/TrainingOfficerComponents/Navbar.jsx
import React, { useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "dashboard" },
  { name: "Training Program", path: "trainingprogram" },
  { name: "Priority List", path: "prioritylist" },
  { name: "Student Evaluation", path: "studentevaluation" },
  { name: "Training Report", path: "trainingreport" },
  { name: "Mock Interview", path: "mockinterview" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <>
      <AppBar position="fixed" sx={{ background: "linear-gradient(90deg, #5A4FCF, #ffcf56ff)", color: "black" ,width: "100%" }}>
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

          {/* Desktop Links */}
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
    </>
  );
};

export default Navbar;
