import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  IconButton,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "application",
      description: "Student S101 applied for Frontend Developer at TechCorp",
      is_read: false,
      created_at: "2025-10-06 10:15",
    },
    {
      id: 2,
      type: "drive",
      description: "Placement drive by InnoSoft scheduled on 12 Oct 2025",
      is_read: false,
      created_at: "2025-10-05 09:00",
    },
    {
      id: 3,
      type: "document",
      description: "Student S102 uploaded resume",
      is_read: true,
      created_at: "2025-10-04 14:20",
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  return (
    <Box p={{ xs: 2, md: 3 }} bgcolor="#f5f5f5" minHeight="100vh">
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Notifications
      </Typography>

      {notifications.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No notifications found.
        </Typography>
      ) : (
        <Paper
          sx={{
            maxWidth: 950,
            mx: "auto",
            p: { xs: 1, md: 2 },
            borderRadius: 2,
          }}
        >
          <List>
            {notifications.map((notif) => (
              <React.Fragment key={notif.id}>
                <ListItem
                  sx={{
                    bgcolor: notif.is_read ? "#fafafa" : "#e3f2fd",
                    borderRadius: 2,
                    mb: 2,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    py: 2,
                    boxShadow: 1,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 4 },
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        fontWeight={notif.is_read ? "normal" : "bold"}
                        variant="subtitle1"
                      >
                        {notif.description}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {notif.created_at}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1} mt={{ xs: 1, sm: 0 }} alignItems="center">
                    {!notif.is_read && (
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={() => markAsRead(notif.id)}
                        sx={{ p: 1 }}
                      >
                        <DoneIcon />
                      </IconButton>
                    )}
                    <Chip
                      label={notif.type}
                      size="small"
                      color={
                        notif.type === "application"
                          ? "success"
                          : notif.type === "drive"
                          ? "info"
                          : "warning"
                      }
                      sx={{ fontWeight: "bold" }}
                    />
                  </Stack>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default Notifications;
