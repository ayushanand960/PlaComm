// src/pages/admin/AdminStudentDetails.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
  Divider,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Link,
  Chip,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";

const AdminStudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudent = async () => {
    try {
      const response = await axiosInstance.get(`students/students/${id}/`);
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (!student)
    return (
      <Typography textAlign="center" mt={5} color="textSecondary">
        Student details not found.
      </Typography>
    );

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          color: "#1565C0",
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": {
            background: "#E3F2FD",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
          },
        }}
      >
        Back
      </Button>

      {/* Student Card */}
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
          p: 3,
          transition: "0.3s",
          "&:hover": { boxShadow: "0 10px 36px rgba(0,0,0,0.15)" },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#1565C0",
              width: 64,
              height: 64,
              fontSize: 30,
            }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ letterSpacing: "0.3px" }}
            >
              {student.first_name} {student.middle_name} {student.last_name}
            </Typography>
            <Typography color="textSecondary">{student.email}</Typography>
            <Chip
              label={student.gender}
              size="small"
              color="primary"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Basic Info */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography>
              <strong>RUM Number:</strong> {student.rum_number}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {student.phone}
            </Typography>
            <Typography>
              <strong>Course:</strong> {student.course}
            </Typography>
            <Typography>
              <strong>Branch:</strong> {student.branch}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography>
              <strong>Year:</strong> {student.year}
            </Typography>
            <Typography>
              <strong>Institute:</strong> {student.institute_name || "N/A"}
            </Typography>
            <Typography>
              <strong>Enrollment Status:</strong>{" "}
              <Chip
                label={student.enrollment_status || "Active"}
                size="small"
                color="success"
              />
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Dynamic Sections Helper */}
        {[
          { title: "Academics", data: student.academics, render: (acad) => `${acad.degree} - ${acad.branch} (${acad.institute}) | Year: ${acad.year_of_passing}, CGPA: ${acad.cgpa}` },
          { title: "Experiences", data: student.experiences, render: (exp) => `${exp.role} at ${exp.company} | ${exp.start_date} - ${exp.end_date || "Present"} | ${exp.description}` },
          { title: "Projects", data: student.projects, render: (proj) => `${proj.title} | Tech: ${proj.tech_stack} | ${proj.description} ${proj.repo_link ? `| Repo: ${proj.repo_link}` : ""}` },
          { title: "Skills", data: student.skills, render: (skill) => `${skill.name} - Level: ${skill.level}` },
          { title: "Certifications", data: student.certifications, render: (cert) => `${cert.name} by ${cert.provider} | Date: ${cert.date} | File: ${cert.file ? <Link href={cert.file} target="_blank">View</Link> : "N/A"}` },
          { title: "Documents", data: student.documents, render: (doc) => `${doc.title} | Uploaded: ${doc.uploaded_at} | File: ${doc.file ? <Link href={doc.file} target="_blank">View</Link> : "N/A"}` },
          { title: "Job Applications", data: student.applications, render: (app) => `${app.job.title} at ${app.job.company} | Applied At: ${app.applied_at} | Status: ${app.status}` },
        ].map(
          (section, idx) =>
            section.data?.length > 0 && (
              <Box key={idx} sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  {section.title}
                </Typography>
                <List dense>
                  {section.data.map((item, i) => (
                    <ListItem
                      key={i}
                      sx={{
                        bgcolor: i % 2 === 0 ? "#F9FAFB" : "#fff",
                        borderRadius: "10px",
                        mb: 0.5,
                        "&:hover": { bgcolor: "#E3F2FD", transition: "0.3s" },
                      }}
                    >
                      <ListItemText primary={section.render(item)} />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
              </Box>
            )
        )}
      </Card>
    </Box>
  );
};

export default AdminStudentDetails;
