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
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";

export default function Register() {
  const [role, setRole] = useState("student"); // "student" or "officer"
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Regex validators
  const validateFields = () => {
    const newErrors = {};

    // Student RUM check
    if (role === "student") {
      const rumRegex = /^RUM\d{7}$/;
      if (!rumRegex.test(formData.rum_number || "")) {
        newErrors.rum_number = "RUM must be like RUM2201146 (7 digits after RUM)";
      }
    } else {
      const empRegex = /^[A-Z]{2}-[A-Z]{3}\E\d{7}$/;
      if (!empRegex.test(formData.employee_id || "")) {
        newErrors.employee_id = "Employee ID must be like RG-MNDE0011314";
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email || "")) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone || formData.phone || "")) {
      if (role === "student") newErrors.phone = "Phone must be 10 digits starting with 6,7,8,9";
      else newErrors.phone = "Phone must be 10 digits starting with 6,7,8,9";
    }

    // Password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password || "")) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number & special char";
    }

    // Confirm password match
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

      // Map unique_id for backend
      const payload = { ...formData };
      if (role === "student") payload.unique_id = formData.rum_number;
      else payload.unique_id = formData.employee_id;

      await axiosInstance.post(endpoint, payload, {withCredentials: false,});

      alert("Registration successful!");
      setFormData({});
      setConfirmPassword("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              User Registration
            </Typography>

            {/* Role Switch */}
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
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="RUM Number"
                        name="rum_number"
                        value={formData.rum_number || ""}
                        onChange={handleChange}
                        error={!!errors.rum_number}
                        helperText={errors.rum_number || "Example: RUM2201146"}
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Course"
                        name="course"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Branch"
                        name="branch"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Year"
                        name="year"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Employee ID"
                        name="employee_id"
                        value={formData.employee_id || ""}
                        onChange={handleChange}
                        error={!!errors.employee_id}
                        helperText={errors.employee_id || "Example: RG-MND/E0011314"}
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
                        value={formData.department || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Designation"
                        name="designation"
                        value={formData.designation || ""}
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
                        value={formData.phone || formData.phone || ""}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                      />
                    </Grid>
                  </>
                )}

                {/* Password Section */}
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
                  color="primary"
                  disabled={loading}
                  sx={{ px: 5, py: 1.5, fontSize: "1rem" }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
