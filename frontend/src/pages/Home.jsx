// src/pages/HomePage.jsx
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
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// 🎨 Updated Color Palette (teal + purple + pink)
const colors = {
  primary: "#5A4FCF", // deep purple
  secondary: "#FF6B6B", // coral pink
  accent1: "#20C997", // teal green
  accent2: "#F8E9A1", // light yellow
  accent3: "#E9C7FF", // lavender
  background: "#FDFDFE",
  dark: "#2B2D42",
};

// ✅ Hero Section
const Hero = styled(Box)(() => ({
  minHeight: "100vh",
  width: "100vw",
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: "#fff",
  textAlign: "center",
  backgroundImage: "url('/images/lb1.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(4px)",
    zIndex: 0,
  },
  "& > *": { position: "relative", zIndex: 1 },
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
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
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
      sx={{
        width: "100vw",
        minHeight: "100vh",
        background: colors.background,
        overflowX: "hidden",
      }}
    >
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src="/images/rm3.png"
              alt="Rama University Logo"
              sx={{ height: 60 }}
            />
          </Box>
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
            <Button color="inherit" component={Link} to="/gallery">
              Gallery
            </Button>
            <Button
              variant="contained"
              sx={{ background: colors.secondary, borderRadius: "25px" }}
              component={Link}
              to="/student-recruiter-login"
            >
              Student/Recruiter Login
            </Button>
            <Button
              variant="contained"
              sx={{ background: colors.secondary, borderRadius: "25px" }}
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Your <span style={{ color: colors.secondary }}>Career</span>, Our{" "}
            <span style={{ color: colors.accent1 }}>Mission</span>
          </Typography>
          <Typography
            variant="h6"
            sx={{ maxWidth: "700px", mb: 4, color: "rgba(255,255,255,0.9)" }}
          >
            Connecting students with top recruiters, empowering tomorrow’s
            leaders with opportunities today.
          </Typography>
        </motion.div>
      </Hero>

      {/* Placement Stats */}
      <Section
        sx={{ background: `linear-gradient(135deg, ${colors.accent3}, #fff)` }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            color={colors.primary}
          >
            Placement Highlights
          </Typography>
          <Grid container spacing={4} textAlign="center">
            {[
              { number: "95%", label: "Placement Rate" },
              { number: "500+", label: "Recruiters Connected" },
              { number: "1000+", label: "Internships Offered" },
              { number: "20 LPA", label: "Highest Package" },
            ].map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                >
                  <Typography
                    variant="h3"
                    sx={{ color: colors.primary, fontWeight: "bold" }}
                  >
                    {item.number}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {item.label}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Career Guidance */}
      <Section
        sx={{ background: `linear-gradient(135deg, ${colors.accent1}, #fff)` }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            color={colors.dark}
          >
            Career Guidance & Mentorship
          </Typography>
          <Grid container spacing={4} mt={2}>
            {[
              {
                title: "Resume Building",
                desc: "Craft resumes that recruiters love.",
              },
              {
                title: "Mock Interviews",
                desc: "Practice interviews with experts.",
              },
              {
                title: "Aptitude Training",
                desc: "Sharpen your problem-solving skills.",
              },
            ].map((item, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                >
                  <FeatureCard>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color={colors.primary}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {item.desc}
                    </Typography>
                  </FeatureCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Meet Our Mentors */}
      <Section
        sx={{ background: `linear-gradient(135deg, ${colors.accent2}, #fff)` }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            color={colors.primary}
          >
            Meet Our Mentors
          </Typography>
          <Grid container spacing={4} mt={2}>
            {[
              {
                name: "Prof. Dr.  Indrajeet Gupta",
                role: "Dean Academics",
                img: "dean.png",
              },
              {
                name: "Ms. Kirti Shree Omer",
                role: "HR Manager",
                img: "kirti.png",
              },
              {
                name: "Ms. Shambhavi Dwivedi ",
                role: "Soft Skills Coach",
                img: "sm.jpg",
              },
            ].map((mentor, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                >
                  <FeatureCard>
                    <Box
                      component="img"
                      src={`/images/${mentor.img}`}
                      alt={mentor.name}
                      sx={{ height: 100, borderRadius: "50%", mb: 2 }}
                    />
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color={colors.primary}
                    >
                      {mentor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {mentor.role}
                    </Typography>
                  </FeatureCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Recruiters Carousel */}
      <Section
        sx={{
          background: `linear-gradient(135deg, #fff, ${colors.accent3})`,
          minHeight: "70vh", // ⬆️ Recruiter section taller
          display: "flex",
          alignItems: "center",
        }}
      >
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

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            slidesPerView={1} // ✅ Only ONE logo visible at a time
            speed={1200}
            style={{ padding: "50px 0" }}
          >
            {["rc1.png", "rc2.png", "rc3.png", "rc4.png", "rc5.png"].map(
              (logo, i) => (
                <SwiperSlide key={i}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "50vh", // ⬆️ Block taller
                      background: "rgba(255,255,255,0.6)",
                      borderRadius: "20px",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                    }}
                  >
                    <img
                      src={`/images/${logo}`}
                      alt={logo}
                      style={{
                        height: "100%", // ⬆️ Fills block height
                        maxHeight: "300px",
                        width: "auto",
                        objectFit: "contain",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </Box>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </Container>
      </Section>

      {/* Alumni Success Stories */}
      <Section
        sx={{
          background: `linear-gradient(135deg, ${colors.accent1}, ${colors.accent3})`,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            color="#fff"
          >
            Inspiring Alumni
          </Typography>
          <Grid container spacing={4} mt={2}>
            {[
              {
                name: "Riya Singh",
                company: "Google",
                feedback: "Dreams turned into reality with Rama University.",
              },
              {
                name: "Arjun Mehta",
                company: "Microsoft",
                feedback: "Guidance and mock interviews helped me excel.",
              },
              {
                name: "Sneha Patel",
                company: "Amazon",
                feedback: "Skill training gave me a competitive edge.",
              },
            ].map((alumni, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                >
                  <FeatureCard sx={{ background: "#fff" }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color={colors.primary}
                      >
                        {alumni.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontStyle: "italic", mb: 1 }}
                      >
                        {alumni.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        "{alumni.feedback}"
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section
        sx={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Ready to Kickstart Your Career?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Join Rama University’s Placement Portal and connect with your
              dream job.
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: "#fff",
                color: colors.primary,
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                fontWeight: "bold",
              }}
              component={Link}
              to="/register"
            >
              Register Now
            </Button>
          </motion.div>
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
