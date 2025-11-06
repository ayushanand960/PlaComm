import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import StudentNavbar from "../components/student/StudentNavbar";
import AdminNavbar from "../components/admin/AdminNavbar";
import CoordinatorNavbar from "../components/PlacementCoordinator/Navbar";
import Topbar from "../components/PlacementCoordinator/TopNavbar";
import OfficerNavbar from "../components/trainingOfficer/Navbar";
import Footer from "../components/student/Footer";

export default function ThreadList() {
  const { categoryId } = useParams();
  const [threads, setThreads] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/users/profile/");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user", err);
    }
  };

  fetchUser();
}, []);

  const renderNavbar = () => {
    if (!user) return null;

    const role = user.role?.toLowerCase();

    if (role === "admin") return <AdminNavbar />;
    if (role === "placement_coordinator")
  return (
    <>
      <Topbar />   {/* top header */}
      <CoordinatorNavbar /> {/* bottom navigation */}
    </>
  );

    if (role === "officer") return <OfficerNavbar />;
    return <StudentNavbar />; // default
  };

  // Utility to format "time ago"
  const getTimeAgo = (dateString) => {
    if (!dateString) return "just now";
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
    for (let [unit, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await axiosInstance.get(
          `/forum/categories/${categoryId}/threads/`
        );
        setThreads(res.data);
      } catch (err) {
        console.error("Failed to load threads:", err);
      }
    };
    fetchThreads();
  }, [categoryId]);

  const handleCreateThread = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    try {
      const res = await axiosInstance.post(
        `/forum/categories/${categoryId}/threads/`,
        { title: newTitle, content: newContent }
      );
      setThreads([res.data, ...threads]);
      setNewTitle("");
      setNewContent("");
    } catch (err) {
      alert("Failed to create thread");
      console.error(err);
    }
  };

  return (
    <>
      {renderNavbar()}
      <Box
              sx={{
                pt: "90px",  // ✅ pushes entire page below navbar
                minHeight: "100vh",
                background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)",
                px: { xs: 2, sm: 6 }
              }}
            >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            background: "linear-gradient(145deg, #ffffff, #f1f1f1)",
          }}
        >
          {/* Threads Section */}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Threads
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {threads.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              No threads yet. Be the first to start one!
            </Typography>
          ) : (
            <Grid container spacing={3} sx={{ mb: 6 }}>
              {threads.map((thread) => (
                <Grid item xs={12} md={6} key={thread.id}>
                  <Card
                    elevation={2}
                    sx={{
                      borderRadius: 3,
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 5,
                      },
                    }}
                  >
                    <CardActionArea component={Link} to={`/threads/${thread.id}`}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="primary"
                          gutterBottom
                        >
                          {thread.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {thread.content}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions
                      sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Posted {getTimeAgo(thread.created_at)}
                      </Typography>
                      <Button
                        component={Link}
                        to={`/threads/${thread.id}`}
                        size="small"
                        color="primary"
                      >
                        View Discussion →
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Create New Thread Section */}
          <Paper
            elevation={1}
            sx={{
              p: 4,
              borderRadius: 3,
              mt: 2,
              backgroundColor: "#fdfdfd",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              Create Your Own Thread!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Have something to share or ask? Start a new discussion below.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 700,
                mx: "auto",
              }}
            >
              <TextField
                label="Thread Title"
                variant="outlined"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                fullWidth
              />
              <TextField
                label="Thread Content"
                variant="outlined"
                multiline
                rows={4}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  alignSelf: "center",
                  textTransform: "none",
                  px: 6,
                  py: 1.2,
                  fontWeight: "bold",
                }}
                onClick={handleCreateThread}
              >
                Create Thread
              </Button>
            </Box>
          </Paper>
        </Paper>
        <Footer/>
      </Box>
    </>
  );
}
