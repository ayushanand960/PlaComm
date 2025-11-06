// src/components/NotificationBell.jsx
import React, { useEffect, useState } from "react";
import { IconButton, Badge, Menu, MenuItem, Typography, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const NotificationBell = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/placements/notifications/");
      setNotifications(res.data || []);
    } catch (err) {
      console.error("Error loading notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000); // auto-refresh every 15s
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleMarkRead = async (id) => {
    try {
      await axiosInstance.patch(`/placements/notifications/${id}/mark-read/`);
      fetchNotifications();
    } catch (err) {
      console.error("Error marking notification read:", err);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {notifications.length === 0 ? (
          <MenuItem>No notifications</MenuItem>
        ) : (
          notifications.slice(0, 5).map((n) => (
            <MenuItem key={n.id} onClick={() => { handleMarkRead(n.id); navigate("/notifications"); }}>
              <Box>
                <Typography fontWeight={!n.is_read ? "bold" : "normal"}>
                  {n.title}
                </Typography>
                <Typography variant="caption">{n.message}</Typography>
              </Box>
            </MenuItem>
          ))
        )}
        <MenuItem onClick={() => navigate("/notifications")} sx={{ textAlign: "center", color: "primary.main" }}>
          View All Notifications
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationBell;
