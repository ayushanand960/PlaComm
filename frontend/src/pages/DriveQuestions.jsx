import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Add, ArrowBack, ExpandMore } from "@mui/icons-material";
import StudentNavbar from "../components/StudentNavbar";
import Footer from "../components/Footer";

const DriveQuestions = () => {
  const [companies, setCompanies] = useState([
    { name: "TCS", questions: [{ question: "What is normalization in DBMS?", type: "Technical", solution: "Normalization is the process of organizing data to reduce redundancy." }] },
    { name: "Infosys", questions: [{ question: "What is polymorphism?", type: "Programming", solution: "Polymorphism allows objects to be treated as instances of their parent class." }] },
  ]);

  const [viewCompany, setViewCompany] = useState(null);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newSolution, setNewSolution] = useState("");
  const [questionType, setQuestionType] = useState("");

  const handleAddCompany = () => {
    if (!newCompany.trim()) return;
    setCompanies([...companies, { name: newCompany, questions: [] }]);
    setNewCompany("");
    setShowCompanyForm(false);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.trim() || !questionType.trim()) return;
    const updated = companies.map((c) =>
      c.name === viewCompany.name
        ? { ...c, questions: [...c.questions, { question: newQuestion, type: questionType, solution: newSolution }] }
        : c
    );
    setCompanies(updated);
    setNewQuestion("");
    setNewSolution("");
    setQuestionType("");
    setShowQuestionForm(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1200 }}>
        <StudentNavbar />
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, mt: 20, mb: 2, px: 2, maxWidth: 800, mx: "auto" }}>
        {/* Company List View */}
        {!viewCompany && (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5" fontWeight="bold">Drive Companies</Typography>
              <IconButton color="primary" onClick={() => setShowCompanyForm(!showCompanyForm)}><Add /></IconButton>
            </Box>

            {showCompanyForm && (
              <Card sx={{ mb: 3, p: 2 }}>
                <Typography variant="h6">Add New Company</Typography>
                <TextField label="Company Name" fullWidth value={newCompany} onChange={(e) => setNewCompany(e.target.value)} sx={{ my: 2 }} />
                <Button variant="contained" onClick={handleAddCompany}>Add Company</Button>
              </Card>
            )}

            {companies.length === 0 && <Typography>No companies added yet.</Typography>}

            {companies.map((company, i) => (
              <Card key={i} sx={{ mb: 2, p: 2, cursor: "pointer", "&:hover": { backgroundColor: "action.hover" } }} onClick={() => setViewCompany(company)}>
                <Typography variant="h6">{company.name}</Typography>
              </Card>
            ))}
          </>
        )}

        {/* Company Question View */}
        {viewCompany && (
          <>
            <Box display="flex" alignItems="center" mb={2}>
              <IconButton color="primary" onClick={() => setViewCompany(null)}><ArrowBack /></IconButton>
              <Typography variant="h5" ml={1} fontWeight="bold">{viewCompany.name} — Questions</Typography>
            </Box>

            <Button variant="outlined" startIcon={<Add />} sx={{ mb: 2 }} onClick={() => setShowQuestionForm(!showQuestionForm)}>Add Question</Button>

            {showQuestionForm && (
              <Card sx={{ mb: 3, p: 2 }}>
                <Typography variant="subtitle1" mb={1}>Add New Question for {viewCompany.name}</Typography>
                <TextField label="Question" fullWidth required value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} sx={{ mb: 2 }} />
                <TextField select label="Question Type" fullWidth required value={questionType} onChange={(e) => setQuestionType(e.target.value)} sx={{ mb: 2 }}>
                  {["Technical", "Aptitude", "Reasoning", "Programming", "DSA"].map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                </TextField>
                <TextField label="Solution (optional)" fullWidth multiline rows={3} value={newSolution} onChange={(e) => setNewSolution(e.target.value)} sx={{ mb: 2 }} />
                <Button variant="contained" onClick={handleAddQuestion} disabled={!newQuestion.trim() || !questionType.trim()}>Add Question</Button>
              </Card>
            )}

            {viewCompany.questions.length === 0 ? (
              <Typography>No questions yet.</Typography>
            ) : (
              viewCompany.questions.map((q, i) => (
                <Accordion key={i} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>{i + 1}. {q.question} <Typography component="span" color="text.secondary" sx={{ ml: 1, fontSize: "0.9rem" }}>({q.type})</Typography></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {q.solution ? <Typography>{q.solution}</Typography> : <Typography color="text.secondary">No solution provided.</Typography>}
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ mt: "auto" }}><Footer /></Box>
    </Box>
  );
};

export default DriveQuestions;
