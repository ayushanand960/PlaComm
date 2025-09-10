import React from "react";
import { Container, Typography, Tabs, Tab, Box } from "@mui/material";
import AcademicList from "../components/studentProfile/AcademicList";
import ExperienceList from "../components/studentProfile/ExperienceList";
import ProjectList from "../components/studentProfile/ProjectList";
import SkillList from "../components/studentProfile/SkillList";
import CertificationList from "../components/studentProfile/CertificationList";
import DocumentList from "../components/studentProfile/DocumentList";
import PersonalDetailList from "../components/studentProfile/PersonalDetailList";

export default function StudentProfile() {
  const [tab, setTab] = React.useState(0);
  const handleChange = (_, newVal) => setTab(newVal);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Complete Your Profile
      </Typography>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Personal Details" />
        <Tab label="Academics" />
        <Tab label="Experience" />
        <Tab label="Projects" />
        <Tab label="Skills" />
        <Tab label="Certifications" />
        <Tab label="Documents" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && <PersonalDetailList />}
        {tab === 1 && <AcademicList />}
        {tab === 2 && <ExperienceList />}
        {tab === 3 && <ProjectList />}
        {tab === 4 && <SkillList />}
        {tab === 5 && <CertificationList />}
        {tab === 6 && <DocumentList />}
      </Box>
    </Container>
  );
}
