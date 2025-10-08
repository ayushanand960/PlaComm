// import React from "react";
// import { Container, Typography, Tabs, Tab, Box } from "@mui/material";
// import AcademicList from "../components/studentProfile/AcademicList";
// import ExperienceList from "../components/studentProfile/ExperienceList";
// import ProjectList from "../components/studentProfile/ProjectList";
// import SkillList from "../components/studentProfile/SkillList";
// import CertificationList from "../components/studentProfile/CertificationList";
// import DocumentList from "../components/studentProfile/DocumentList";
// import PersonalDetailList from "../components/studentProfile/PersonalDetailList";

// export default function StudentProfile() {
//   const [tab, setTab] = React.useState(0);
//   const handleChange = (_, newVal) => setTab(newVal);

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Complete Your Profile
//       </Typography>
//       <Tabs
//         value={tab}
//         onChange={handleChange}
//         variant="scrollable"
//         scrollButtons="auto"
//       >
//         <Tab label="Personal Details" />
//         <Tab label="Academics" />
//         <Tab label="Experience" />
//         <Tab label="Projects" />
//         <Tab label="Skills" />
//         <Tab label="Certifications" />
//         <Tab label="Documents" />
//       </Tabs>

//       <Box sx={{ mt: 3 }}>
//         {tab === 0 && <PersonalDetailList />}
//         {tab === 1 && <AcademicList />}
//         {tab === 2 && <ExperienceList />}
//         {tab === 3 && <ProjectList />}
//         {tab === 4 && <SkillList />}
//         {tab === 5 && <CertificationList />}
//         {tab === 6 && <DocumentList />}
//       </Box>
//     </Container>
//   );
// }

// src/pages/StudentProfile.jsx
import React from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
} from "@mui/material";
import AcademicList from "../../components/studentProfile/AcademicList";
import ExperienceList from "../../components/studentProfile/ExperienceList";
import ProjectList from "../../components/studentProfile/ProjectList";
import SkillList from "../../components/studentProfile/SkillList";
import CertificationList from "../../components/studentProfile/CertificationList";
import DocumentList from "../../components/studentProfile/DocumentList";
import PersonalDetailList from "../../components/studentProfile/PersonalDetailList";
import StudentNavbar from "../../components/student/StudentNavbar";

export default function StudentProfile() {
  const [tab, setTab] = React.useState(0);
  const handleChange = (_, newVal) => setTab(newVal);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      {/* Navbar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
        }}
      >
        <StudentNavbar />
      </Box>

      <Container sx={{ pt: 12, pb: 6 }}>
        {/* Title */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Complete Your Profile
        </Typography>
        {/* <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Add your personal, academic, and professional details to strengthen your
          placement profile.
        </Typography> */}

        {/* Tabs inside Paper for better UI */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            p: 2,
            backgroundColor: "#fff",
          }}
        >
          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                fontWeight: 600,
                textTransform: "none",
              },
            }}
          >
            <Tab label="Personal Details" />
            <Tab label="Academics" />
            <Tab label="Experience" />
            <Tab label="Projects" />
            <Tab label="Skills" />
            <Tab label="Certifications" />
            <Tab label="Documents" />
          </Tabs>

          {/* Content */}
          <Box sx={{ mt: 3 }}>
            {tab === 0 && <PersonalDetailList />}
            {tab === 1 && <AcademicList />}
            {tab === 2 && <ExperienceList />}
            {tab === 3 && <ProjectList />}
            {tab === 4 && <SkillList />}
            {tab === 5 && <CertificationList />}
            {tab === 6 && <DocumentList />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
