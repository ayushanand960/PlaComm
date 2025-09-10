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
} from "@mui/material";
import { styled } from "@mui/material/styles";

// 🎨 New Color Palette
const colors = {
  primary: "#6C63FF",
  secondary: "#FF6584",
  background: "#F8F9FB",
  dark: "#2B2D42",
};

// ✅ Hero Section
const Hero = styled(Box)(() => ({
  minHeight: "100vh",
  background:
    "linear-gradient(rgba(108,99,255,0.8), rgba(255,101,132,0.8)), url('/images/lb1.png') center/cover no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: "#fff",
  textAlign: "center",
  padding: "2rem",
}));

// ✅ Section Wrapper
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(10, 2),
}));

// ✅ Feature Card
const FeatureCard = styled(Card)(() => ({
  borderRadius: "16px",
  transition: "all 0.3s",
  textAlign: "center",
  padding: "20px",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
}));

// ✅ Footer
const Footer = styled(Box)(() => ({
  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
  color: "#fff",
  padding: "3rem 1rem",
  textAlign: "center",
}));

export default function HomePage() {
  return (
    <Box
      sx={{ width: "100%", overflowX: "hidden", background: colors.background }}
    >
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src="/images/rm3.png"
              alt="Rama University Logo"
              sx={{ height: 60 }}
            />
          </Box>

          {/* Navigation */}
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
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Your <span style={{ color: colors.secondary }}>Career</span>, Our{" "}
          <span style={{ color: "#FFD700" }}>Mission</span>
        </Typography>
        <Typography
          variant="h6"
          sx={{ maxWidth: "700px", mb: 4, color: "rgba(255,255,255,0.9)" }}
        >
          Connecting students with top recruiters, empowering tomorrow’s leaders
          with opportunities today.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: "25px",
              background: colors.secondary,
              "&:hover": { background: "#ff4569" },
            }}
          >
            Student Portal
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderRadius: "25px",
              color: "#fff",
              borderColor: "#fff",
              "&:hover": { background: "rgba(255,255,255,0.1)" },
            }}
          >
            Recruiters
          </Button> */}
        </Box>
      </Hero>

      {/* Highlights / Counters */}
      <Section sx={{ backgroundColor: "#fff" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            {[
              { number: "500+", label: "Recruiters Connected" },
              { number: "1000+", label: "Internships Offered" },
              { number: "50+", label: "Career Workshops" },
              { number: "200+", label: "Skill Programs" },
            ].map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Typography
                  variant="h3"
                  sx={{ color: colors.primary, fontWeight: "bold" }}
                >
                  {item.number}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {item.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Placement Process */}
      <Section>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            color={colors.primary}
          >
            Our Placement Process
          </Typography>
          <Grid container spacing={4} mt={2} textAlign="center">
            {[
              "Registration",
              "Skill Training",
              "Mock Interviews",
              "Recruiter Drives",
              "Career Success",
            ].map((step, i) => (
              <Grid item xs={12} sm={6} md={2.4} key={i}>
                <FeatureCard>
                  <Typography
                    variant="h6"
                    color={colors.secondary}
                    fontWeight="bold"
                  >
                    {step}
                  </Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Success Stories */}
      <Section sx={{ backgroundColor: "#fff" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            color={colors.primary}
          >
            Student Success Stories
          </Typography>
          <Grid container spacing={4} mt={2}>
            {[
              {
                name: "Aman Sharma",
                company: "Infosys",
                feedback: "Placed at Infosys through Rama University!",
              },
              {
                name: "Priya Verma",
                company: "TCS",
                feedback:
                  "Resume builder & mock interviews were game changers.",
              },
              {
                name: "Rahul Singh",
                company: "Wipro",
                feedback:
                  "Supportive placement cell helped me secure internship.",
              },
            ].map((student, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <FeatureCard>
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color={colors.primary}
                    >
                      {student.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontStyle: "italic", mb: 1 }}
                    >
                      {student.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      "{student.feedback}"
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Recruiters */}
      <Section>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            color={colors.primary}
          >
            Our Recruiters
          </Typography>
          <Grid container spacing={2} mt={2}>
            {["wipro.png", "tcs.jpg", "ibm.png", "flipkart.png"].map(
              (logo, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <FeatureCard>
                    <Box
                      component="img"
                      src={`/images/${logo}`}
                      alt={logo}
                      sx={{ height: 70 }}
                    />
                  </FeatureCard>
                </Grid>
              )
            )}
          </Grid>
        </Container>
      </Section>

      {/* News & Announcements */}
      <Section sx={{ backgroundColor: "#f9f9f9" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            color={colors.primary}
          >
            Latest Announcements
          </Typography>
          <Grid container spacing={4} mt={2}>
            {[
              "Infosys Drive scheduled for September 15th, 2025.",
              "Workshop on Resume Building on September 20th.",
              "New partnership with TCS iON for skill development.",
            ].map((news, i) => (
              <Grid item xs={12} md={4} key={i}>
                <FeatureCard>
                  <Typography variant="body1" color="text.secondary">
                    {news}
                  </Typography>
                </FeatureCard>
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
