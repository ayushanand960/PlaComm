// src/components/Recruits/RecruiterNavbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const RecruiterNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [active, setActive] = useState("Dashboard");

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const menuItems = [
    "Dashboard",
    "Job Postings",
    "Priority Students",
    "Interview Management",
    "Recruitment Analytics",
    "Placement Drives",
  ];

  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(15, 32, 39, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "#fff",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0px 6px 25px rgba(0,0,0,0.35)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          py: 1.2,
        }}
      >
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: 1.2,
                color: "#fff",
              }}
            >
              Scholar Careers
            </Typography>
            <Typography
              variant="caption"
              sx={{
                ml: 1,
                color: "rgba(255,255,255,0.7)",
                fontStyle: "italic",
              }}
            >
              Placement Portal
            </Typography>
          </Box>
        </motion.div>

        {/* Menu Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1.2,
              flexWrap: "wrap",
            }}
          >
            {menuItems.map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <Button
                  color="inherit"
                  onClick={() => setActive(item)}
                  sx={{
                    fontSize: "0.9rem",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 2.2,
                    py: 0.6,
                    borderRadius: "10px",
                    position: "relative",
                    background:
                      active === item ? "rgba(255,255,255,0.15)" : "transparent",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: active === item ? "60%" : "0%",
                      height: "2px",
                      backgroundColor: "#00e5ff",
                      borderRadius: "2px",
                      transition: "all 0.3s ease",
                    },
                    "&:hover": {
                      background: "rgba(255,255,255,0.12)",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                    },
                  }}
                >
                  {item}
                </Button>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* User Profile Dropdown */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              px: 1,
              borderRadius: "12px",
              "&:hover": {
                background: "rgba(255,255,255,0.15)",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
              },
            }}
          >
            <Avatar
              alt="Recruiter"
              src="https://i.pravatar.cc/40?img=13"
              sx={{
                width: 34,
                height: 34,
                mr: 1,
                border: "2px solid rgba(255,255,255,0.5)",
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Recruiter
            </Typography>
            <ArrowDropDownIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 5,
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 3,
                overflow: "hidden",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,240,0.95))",
                backdropFilter: "blur(10px)",
                boxShadow: "0px 10px 25px rgba(0,0,0,0.25)",
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <Divider />
            <MenuItem
              onClick={handleMenuClose}
              sx={{
                color: "error.main",
                fontWeight: "bold",
                "&:hover": {
                  background: "rgba(255,0,0,0.1)",
                },
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
};

export default RecruiterNavbar;
