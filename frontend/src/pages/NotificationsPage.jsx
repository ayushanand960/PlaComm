// src/pages/NotificationsPage.jsx
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import dayjs from "dayjs";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/placements/notifications/");
      setNotifications(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const markRead = async (id) => {
    await axiosInstance.patch(`/placements/notifications/${id}/mark-read/`);
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Notifications
      </Typography>

      <List>
        {notifications.length === 0 && <Typography>No notifications.</Typography>}
        {notifications.map((n) => (
          <ListItem
            key={n.id}
            sx={{
              borderBottom: "1px solid #ddd",
              background: n.is_read ? "#fff" : "#e3f2fd",
              borderRadius: 1,
              mb: 1
            }}
          >
            <ListItemText
              primary={<b>{n.title}</b>}
              secondary={`${n.message} — ${dayjs(n.created_at).format("DD MMM, HH:mm")}`}
            />
            {!n.is_read && (
              <Button variant="contained" size="small" onClick={() => markRead(n.id)}>
                Mark Read
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default NotificationsPage;
