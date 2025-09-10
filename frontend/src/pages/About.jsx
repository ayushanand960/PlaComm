import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
const colors = {
  primary: "#6C63FF",
  secondary: "#FF6584",
  background: "#F8F9FB",
  dark: "#2B2D42",
};

// ✅ Hero Section
const Hero = styled(Box)(() => ({
  minHeight: "60vh",
  background:
    "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/bg2.jpg') center/cover no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  textAlign: "center",
}));

// ✅ Section Wrapper
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(8, 2),
}));

// ✅ Footer
const Footer = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: "#fff",
  padding: theme.spacing(3),
  textAlign: "center",
}));

export default function AboutPage() {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      {/* Navbar */}
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Typography variant="h6" fontWeight="bold">
            Rama University Placement Portal
          </Typography> */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            {/* <Button
              color="inherit"
              component={Link}
              rgba(108,99,255,0.8), rgba(255,101,132,0.8)
              to="/student-recruiter-login"
            >
              Student/Recruiter Login
            </Button> */}
            <Button color="inherit" component={Link} to="/gallery">
              gallery
            </Button>
            {/* <Button
              color="inherit"
              component={Link}
              to="/admin-coordinator-login"
            >
             Admin/Coordinator Login
            </Button> */}
            {/* <Button color="inherit">Academics</Button>
            <Button color="inherit">Admissions</Button>
            <Button color="inherit">CDC</Button>
            <Button color="inherit">Research</Button>
            <Button color="inherit">Campus Life</Button> */}
            <Button
              variant="contained"
              sx={{
                background: colors.secondary,
                borderRadius: "25px",
                "&:hover": { background: "#ff4569" },
              }}
              component={Link}
              to="/student-recruiter-login"
            >
              Student/Recruiter Login
            </Button>
            <Button
              variant="contained"
              sx={{
                background: colors.secondary,
                borderRadius: "25px",
                "&:hover": { background: "#ff4569" },
              }}
              component={Link}
              to="/admin-coordinator-login"
            >
              Admin/Coordinator Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Hero>
        <Box>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              borderBottom: "4px solid #FFD700",
              display: "inline-block",
              paddingBottom: "8px",
            }}
          >
            About Us
          </Typography>
        </Box>
      </Hero>

      {/* About Content */}
      <Section>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Who We Are
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The Career Development Cell (CDC) at Rama University is committed to
            shaping the future of students by providing them with top-notch
            career opportunities. We collaborate with leading industries,
            organize career guidance sessions, and ensure students are prepared
            for interviews with mock tests and training.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Our Placement Portal is designed to streamline the recruitment
            process by connecting students, recruiters, and placement officers
            on one unified platform. Transparency, efficiency, and career growth
            are at the heart of what we do.
          </Typography>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section sx={{ backgroundColor: "#f9f9f9" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <WorkIcon color="primary" sx={{ fontSize: 60 }} />
                <Typography variant="h4" fontWeight="bold">
                  500+
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Recruiters
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <GroupsIcon color="primary" sx={{ fontSize: 60 }} />
                <Typography variant="h4" fontWeight="bold">
                  10,000+
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Students Placed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <SchoolIcon color="primary" sx={{ fontSize: 60 }} />
                <Typography variant="h4" fontWeight="bold">
                  200+
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Training Sessions
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Section>

      {/* Team Section */}
      <Section>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
            textAlign="center"
          >
            Meet Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
            {[
              {
                name: "Prof. Dr. Indrajeet Gupta",
                role: "Dean Academics",
                img: "/images/dean.png",
              },
              // {
              //   name: "Mr. Saurabh Samaddar",
              //   role: "Training Officer",
              //   img: "/images/saurabh.png",
              // },
              {
                name: "Ms. Kirti Shree Omer",
                role: "Placement Manager",
                img: "/images/kirti.png",
              },
              {
                name: "Ms. Shambhavi Dwivedi",
                role: " Training Officer",
                img: "/images/sm.jpg",
              },
            ].map((person, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card
                  elevation={4}
                  sx={{ borderRadius: "16px", textAlign: "center", p: 3 }}
                >
                  <Avatar
                    src={person.img}
                    alt={person.name}
                    sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {person.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {person.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Footer */}
      <Footer>
        <Typography variant="body2">
          © {new Date().getFullYear()} Rama University | Placement Portal
        </Typography>
      </Footer>
    </Box>
  );
}
