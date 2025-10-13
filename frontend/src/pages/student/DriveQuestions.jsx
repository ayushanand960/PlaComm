import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
  Chip,
  Grid,
} from "@mui/material";
import { Add, ExpandMore, Delete } from "@mui/icons-material";
import StudentNavbar from "../../components/student/StudentNavbar";
import Footer from "../../components/student/Footer";
import axiosInstance from "../../api/axiosInstance";

const DriveQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [driveName, setDriveName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [solution, setSolution] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // 🆕 Filter states
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/user/");
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/drive/questions/");
      setQuestions(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch questions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchQuestions();
  }, []);

  // Delete question
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await axiosInstance.delete(`/drive/questions/${id}/`);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      setSuccess("Question deleted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to delete question.");
    }
  };

  // Upload question
  const handleUpload = async () => {
    if (!driveName.trim() || !questionText.trim() || !questionType.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post("/drive/questions/", {
        company: null,
        drive_name: driveName.trim(),
        question: questionText.trim(),
        type: questionType,
        solution: solution.trim(),
        company_name: driveName.trim(),
      });

      setDriveName("");
      setQuestionText("");
      setSolution("");
      setQuestionType("");
      setShowForm(false);
      setSuccess("Question uploaded successfully!");
      fetchQuestions();
    } catch (err) {
      console.error(err);
      setError("Failed to upload question.");
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Compute filtered questions
  const filteredQuestions = questions.filter((q) => {
    const matchesCompany =
      selectedCompany === "" ||
      q.company_name?.toLowerCase() === selectedCompany.toLowerCase();
    const matchesType =
      selectedType === "" ||
      q.type?.toLowerCase() === selectedType.toLowerCase();
    return matchesCompany && matchesType;
  });

  // 🧩 Unique company list for filter
  const uniqueCompanies = [
    ...new Set(questions.map((q) => q.company_name).filter(Boolean)),
  ];

  const questionTypes = [
    "Technical",
    "HR",
    "Aptitude",
    "Reasoning",
    "Programming",
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1200 }}>
        <StudentNavbar />
      </Box>

      <Box sx={{ flex: 1, mt: 20, mb: 4, px: 2, maxWidth: 900, mx: "auto" }}>
        {loading && (
          <Box textAlign="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Placement Drive Questions
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Cancel" : "Upload Question"}
          </Button>
        </Box>

        {/* 🧠 Filter Section */}
        <Card sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="subtitle1" mb={2} fontWeight="bold">
            Filter Questions
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              select
              label="Select Company / Drive"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All Companies</MenuItem>
              {uniqueCompanies.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Select Question Type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All Types</MenuItem>
              {questionTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setSelectedCompany("");
                setSelectedType("");
              }}
            >
              Reset Filters
            </Button>
          </Box>
        </Card>

        {/* Upload Form */}
        {showForm && (
          <Card sx={{ mb: 4, p: 3, boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="subtitle1" mb={2}>
              Share your drive experience question
            </Typography>

            <TextField
              label="Drive / Company Name"
              fullWidth
              value={driveName}
              onChange={(e) => setDriveName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Question"
              fullWidth
              required
              multiline
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              select
              label="Question Type"
              fullWidth
              required
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              sx={{ mb: 2 }}
            >
              {questionTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Solution (optional)"
              fullWidth
              multiline
              rows={3}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" onClick={handleUpload}>
              Submit Question
            </Button>
          </Card>
        )}

        {/* Display Questions */}
        {filteredQuestions.length === 0 ? (
          <Typography>No questions found for the selected filters.</Typography>
        ) : (
          filteredQuestions.map((q, i) => (
            <Accordion key={q.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography fontWeight="bold" sx={{ fontSize: "1rem" }}>
                  {i + 1}. {q.question}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Box>
                  <Grid container spacing={2} alignItems="center" mb={2}>
                    <Grid item>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {q.uploaded_by_name
                          ? q.uploaded_by_name[0].toUpperCase()
                          : "U"}
                      </Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography fontWeight="bold">
                        {q.uploaded_by_name || "Unknown Student"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Uploaded on:{" "}
                        {q.updated_at
                          ? new Date(q.updated_at).toLocaleDateString()
                          : "N/A"}
                      </Typography>
                    </Grid>

                    {q.can_delete && (
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Delete />}
                          onClick={() => handleDelete(q.id)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    )}
                  </Grid>

                  <Divider sx={{ mb: 2 }} />
                  <Typography mb={1}>
                    <strong>Company / Drive:</strong>{" "}
                    {q.company_name || q.company || "N/A"}
                  </Typography>
                  <Chip
                    label={q.type}
                    color="secondary"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Typography fontWeight="bold" mb={1}>
                    Solution:
                  </Typography>
                  {q.solution ? (
                    <Typography sx={{ whiteSpace: "pre-line" }}>
                      {q.solution}
                    </Typography>
                  ) : (
                    <Typography color="text.secondary">
                      No solution provided.
                    </Typography>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>

      <Box sx={{ mt: "auto" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default DriveQuestions;
