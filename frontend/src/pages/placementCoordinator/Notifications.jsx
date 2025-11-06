// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   IconButton,
//   Divider,
//   Chip,
//   Stack,
// } from "@mui/material";
// import DoneIcon from "@mui/icons-material/Done";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       type: "application",
//       description: "Student S101 applied for Frontend Developer at TechCorp",
//       is_read: false,
//       created_at: "2025-10-06 10:15",
//     },
//     {
//       id: 2,
//       type: "drive",
//       description: "Placement drive by InnoSoft scheduled on 12 Oct 2025",
//       is_read: false,
//       created_at: "2025-10-05 09:00",
//     },
//     {
//       id: 3,
//       type: "document",
//       description: "Student S102 uploaded resume",
//       is_read: true,
//       created_at: "2025-10-04 14:20",
//     },
//   ]);

//   const markAsRead = (id) => {
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
//     );
//   };

//   return (
//     <Box p={{ xs: 2, md: 3 }} bgcolor="#f5f5f5" minHeight="100vh">
//       <Typography variant="h4" gutterBottom fontWeight="bold">
//         Notifications
//       </Typography>

//       {notifications.length === 0 ? (
//         <Typography variant="body1" color="textSecondary">
//           No notifications found.
//         </Typography>
//       ) : (
//         <Paper
//           sx={{
//             maxWidth: 950,
//             mx: "auto",
//             p: { xs: 1, md: 2 },
//             borderRadius: 2,
//           }}
//         >
//           <List>
//             {notifications.map((notif) => (
//               <React.Fragment key={notif.id}>
//                 <ListItem
//                   sx={{
//                     bgcolor: notif.is_read ? "#fafafa" : "#e3f2fd",
//                     borderRadius: 2,
//                     mb: 2,
//                     display: "flex",
//                     flexDirection: { xs: "column", sm: "row" },
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     px: 2,
//                     py: 2,
//                     boxShadow: 1,
//                     transition: "0.3s",
//                     "&:hover": { boxShadow: 4 },
//                   }}
//                 >
//                   <Stack
//                     direction={{ xs: "column", sm: "row" }}
//                     spacing={2}
//                     alignItems="center"
//                     sx={{ width: "100%" }}
//                   >
//                     <Box sx={{ flex: 1 }}>
//                       <Typography
//                         fontWeight={notif.is_read ? "normal" : "bold"}
//                         variant="subtitle1"
//                       >
//                         {notif.description}
//                       </Typography>
//                       <Typography variant="caption" color="textSecondary">
//                         {notif.created_at}
//                       </Typography>
//                     </Box>
//                   </Stack>

//                   <Stack direction="row" spacing={1} mt={{ xs: 1, sm: 0 }} alignItems="center">
//                     {!notif.is_read && (
//                       <IconButton
//                         edge="end"
//                         color="primary"
//                         onClick={() => markAsRead(notif.id)}
//                         sx={{ p: 1 }}
//                       >
//                         <DoneIcon />
//                       </IconButton>
//                     )}
//                     <Chip
//                       label={notif.type}
//                       size="small"
//                       color={
//                         notif.type === "application"
//                           ? "success"
//                           : notif.type === "drive"
//                           ? "info"
//                           : "warning"
//                       }
//                       sx={{ fontWeight: "bold" }}
//                     />
//                   </Stack>
//                 </ListItem>
//                 <Divider />
//               </React.Fragment>
//             ))}
//           </List>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default Notifications;




// // src/pages/placementCoordinator/NotificationsPage.jsx
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Button,
//   TextField,
//   MenuItem,
//   CircularProgress,
//   Chip
// } from "@mui/material";
// import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SendIcon from "@mui/icons-material/Send";

// // Direct API URL — no process.env
// const API_BASE = "http://localhost:8000/api";

// function humanDate(iso) {
//   if (!iso) return "";
//   return new Date(iso).toLocaleString();
// }

// export default function NotificationsPage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     message: "",
//     audience: "all",
//     type: "info",
//     scheduled_for: ""
//   });

//   const token = localStorage.getItem("token"); // adjust if needed

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   async function fetchNotifications() {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get(`${API_BASE}/notifications/`, {
//         headers: token ? { Authorization: `Bearer ${token}` } : {}
//       });
//       const data = res.data.results ? res.data.results : res.data;
//       setNotifications(data);
//     } catch (err) {
//       console.error("Failed to fetch notifications", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function markRead(id, currentlyRead) {
//     try {
//       await axiosInstance.patch(`${API_BASE}/notifications/${id}/`, { is_read: !currentlyRead }, {
//         headers: token ? { Authorization: `Bearer ${token}` } : {}
//       });
//       setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: !currentlyRead } : n));
//     } catch (err) {
//       console.error("Mark read error", err);
//     }
//   }

//   async function handleDelete(id) {
//     if (!window.confirm("Delete this notification?")) return;
//     try {
//       await axiosInstance.delete(`${API_BASE}/notifications/${id}/`, {
//         headers: token ? { Authorization: `Bearer ${token}` } : {}
//       });
//       setNotifications(prev => prev.filter(n => n.id !== id));
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   }

//   async function handleCreate(e) {
//   e.preventDefault();
//   try {
//     await axiosInstance.post("/placements/send-notification/", {
//       title: form.title,
//       message: form.message,
//       audience: form.audience
//     });

//     alert("✅ Notification sent successfully!");
//     setForm({ title: "", message: "", audience: "all" });
//     fetchNotifications();
//   } catch (err) {
//     console.error("Create failed", err);
//     alert("Failed to send notification.");
//   }
// }


//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Typography variant="h5" gutterBottom>Notifications</Typography>

//       <Box component="form" onSubmit={handleCreate} sx={{ mb: 3, display: "grid", gap: 1 }}>
//         <TextField
//           label="Title"
//           value={form.title}
//           onChange={e => setForm(s => ({ ...s, title: e.target.value }))}
//           required
//         />
//         <TextField
//           label="Message"
//           multiline
//           minRows={2}
//           value={form.message}
//           onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
//           required
//         />
//         <Box sx={{ display: "flex", gap: 1 }}>
//           <TextField
//             select
//             label="Audience"
//             value={form.audience}
//             onChange={e => setForm(s => ({ ...s, audience: e.target.value }))}
//             sx={{ minWidth: 160 }}
//           >
//             <MenuItem value="all">All Students</MenuItem>
//             <MenuItem value="cs">CS Branch</MenuItem>
//             <MenuItem value="ece">ECE Branch</MenuItem>
//             <MenuItem value="coordinator">Coordinators Only</MenuItem>
//           </TextField>
//           <TextField
//             select
//             label="Type"
//             value={form.type}
//             onChange={e => setForm(s => ({ ...s, type: e.target.value }))}
//             sx={{ minWidth: 140 }}
//           >
//             <MenuItem value="info">Info</MenuItem>
//             <MenuItem value="alert">Alert</MenuItem>
//             <MenuItem value="reminder">Reminder</MenuItem>
//           </TextField>
//           <TextField
//             label="Schedule (optional)"
//             type="datetime-local"
//             value={form.scheduled_for}
//             onChange={e => setForm(s => ({ ...s, scheduled_for: e.target.value }))}
//             InputLabelProps={{ shrink: true }}
//           />
//           <Button type="submit" variant="contained" endIcon={<SendIcon />}>Send</Button>
//         </Box>
//       </Box>

//       <Box sx={{ mb: 2 }}>
//         <Button onClick={fetchNotifications} variant="outlined" sx={{ mr: 1 }}>Refresh</Button>
//         <Button onClick={() => setNotifications(n => n.filter(x => !x.is_read))} variant="text">Show Unread</Button>
//       </Box>

//       {loading ? <CircularProgress /> : (
//         <List>
//           {notifications.map(n => (
//             <ListItem key={n.id} sx={{ bgcolor: n.is_read ? "grey.100" : "background.paper", mb: 1, borderRadius: 1 }}>
//               <ListItemText
//                 primary={
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Typography variant="subtitle1">{n.title}</Typography>
//                     <Chip label={n.type} size="small" />
//                     {n.scheduled_for && <Typography variant="caption">• {humanDate(n.scheduled_for)}</Typography>}
//                   </Box>
//                 }
//                 secondary={<>
//                   <Typography variant="body2">{n.message}</Typography>
//                   <Typography variant="caption">To: {n.audience} • {humanDate(n.created_at)}</Typography>
//                 </>}
//               />
//               <IconButton onClick={() => markRead(n.id, n.is_read)} title={n.is_read ? "Mark unread" : "Mark read"}>
//                 <MarkEmailReadIcon />
//               </IconButton>
//               <IconButton onClick={() => handleDelete(n.id)} title="Delete">
//                 <DeleteIcon />
//               </IconButton>
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </Container>
//   );
// }







// src/pages/placementCoordinator/NotificationsPage.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Chip
} from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import SendIcon from "@mui/icons-material/Send";

function humanDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString();
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: "all",
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/placements/notifications/");
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  }

  async function markRead(id) {
    try {
      await axiosInstance.patch(`/placements/notifications/${id}/mark-read/`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error("Mark read error", err);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await axiosInstance.post("/placements/send-notification/", {
        title: form.title,
        message: form.message,
        audience: form.audience,
      });

      alert("✅ Notification sent to users & emailed!");
      setForm({ title: "", message: "", audience: "all" });
      fetchNotifications();
    } catch (err) {
      console.error("Create failed", err);
      alert("❌ Failed to send notification.");
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Send Notification
      </Typography>

      {/* Send Notification Form */}
      <Box component="form" onSubmit={handleCreate} sx={{ mb: 3, display: "grid", gap: 2 }}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
          required
        />
        <TextField
          label="Message"
          multiline
          minRows={3}
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          required
        />

        <TextField
          select
          label="Send To"
          value={form.audience}
          onChange={(e) => setForm((s) => ({ ...s, audience: e.target.value }))}
          sx={{ maxWidth: 250 }}
        >
          <MenuItem value="all">All Users</MenuItem>
          <MenuItem value="coordinator">Coordinators Only</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send Notification
        </Button>
      </Box>

      <Typography variant="h6" sx={{ mb: 1 }}>
        Your Sent Notifications
      </Typography>

      {/* Notification List */}
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {notifications.map((n) => (
            <ListItem
              key={n.id}
              sx={{
                bgcolor: n.is_read ? "grey.100" : "#e3f2fd",
                mb: 1,
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="subtitle1">{n.title}</Typography>
                    <Chip label={n.is_read ? "Read" : "New"} size="small" />
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2">{n.message}</Typography>
                    <Typography variant="caption">
                      Sent on: {humanDate(n.created_at)}
                    </Typography>
                  </>
                }
              />

              {!n.is_read && (
                <IconButton onClick={() => markRead(n.id)} title="Mark Read">
                  <MarkEmailReadIcon />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}
