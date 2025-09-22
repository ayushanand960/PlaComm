// src/pages/Register.jsx
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Register() {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Validation (same as before)
  const validateFields = () => {
    const newErrors = {};

    if (role === "student") {
      const rumRegex = /^RUM\d{7}$/;
      if (!rumRegex.test(formData.rum_number || "")) {
        newErrors.rum_number = "RUM must be like RUM2201146";
      }
    } else {
      const empRegex = /^[A-Z]{2}-[A-Z]{3}\/\d{7}$/;
      if (!empRegex.test(formData.employee_id || "")) {
        newErrors.employee_id = "Employee ID must be like RG-MND/E0011314";
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email || "")) {
      newErrors.email = "Enter a valid email address";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone || "")) {
      newErrors.phone = "Phone must be 10 digits starting with 6,7,8,9";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password || "")) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number & special char";
    }

    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      setLoading(true);
      const endpoint =
        role === "student"
          ? "/users/register/student/"
          : "/users/register/officer/";

      const payload = { ...formData };
      if (role === "student") payload.unique_id = formData.rum_number;
      else payload.unique_id = formData.employee_id;

      await axiosInstance.post(endpoint, payload, { withCredentials: false });

      alert("Registration successful!");
      setFormData({});
      setConfirmPassword("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      //   alert("Registration failed. Please check your details.");
      alert("Registration failed: " + JSON.stringify(err.response?.data));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/images/rm.jpg')", // ✅ add your bg image in public/images
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.7)", // ✅ translucent overlay
          backdropFilter: "blur(6px)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* ✅ Home Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton
            component={Link}
            to="/"
            sx={{
              background: "linear-gradient(45deg, #6C63FF, #FF6584)",
              color: "#fff",
              "&:hover": { opacity: 0.8 },
            }}
          >
            <HomeIcon />
          </IconButton>
        </Box>

        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #6C63FF, #FF6584)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          User Registration
        </Typography>

        {/* Tabs */}
        <Tabs
          value={role}
          onChange={(e, newValue) => setRole(newValue)}
          centered
          sx={{ mb: 3 }}
        >
          <Tab value="student" label="Student" />
          <Tab value="officer" label="Training Officer" />
        </Tabs>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {role === "student" ? (
              <>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="RUM Number"
                    name="rum_number"
                    value={formData.rum_number || ""}
                    onChange={handleChange}
                    error={!!errors.rum_number}
                    helperText={errors.rum_number || "Ex: RUM2201146"}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="first_name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="middle_name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Course"
                    name="course"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Branch"
                    name="branch"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Year"
                    name="year"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Gender"
                    name="gender"
                    onChange={handleChange}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Employee ID"
                    name="employee_id"
                    value={formData.employee_id || ""}
                    onChange={handleChange}
                    error={!!errors.employee_id}
                    helperText={errors.employee_id || "Ex: RG-MND/E0011314"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="first_name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="middle_name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Department"
                    name="department"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Designation"
                    name="designation"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>
              </>
            )}

            {/* Passwords */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                borderRadius: "25px",
                background: "linear-gradient(45deg, #6C63FF, #FF6584)",
                "&:hover": {
                  background: "linear-gradient(45deg, #5a54e8, #ff4569)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
