

// src/pages/StudentRecruiterLogin.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const StudentRecruiterLogin = () => {
  const [identifier, setIdentifier] = useState(""); // unique_id
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // student / officer / recruiter
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const sessionExpired = location.state?.sessionExpired || false;

  useEffect(() => {
    if (sessionExpired) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier || !password) {
      setError("All fields are required.");
      return;
    }

    // Payload: always use unique_id for all roles
    const payload = { unique_id: identifier, password, role };

    try {
      await axiosInstance.post("/users/login/", payload);

      const res = await axiosInstance.get("/users/profile/");
      const { unique_id, role: userRole } = res.data;

      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("hasLoggedInBefore", "true");

      if (role === userRole) {
        if (userRole === "student") navigate(`/student-dashboard/${unique_id}`);
        else if (userRole === "officer") navigate(`/officer-dashboard/${unique_id}`);
        else if (userRole === "recruiter") navigate(`/recruiter-dashboard/${unique_id}`);
      } else {
        setError("Access denied: You selected the wrong role.");
      }
    } catch (err) {
      if (err.response?.status === 401) setError("Invalid credentials");
      else setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh", py: 5 }}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Institute for Research, Development & Training (IRDT)
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Government of Uttar Pradesh
        </Typography>
        <Typography variant="subtitle2" fontStyle="italic" color="text.secondary">
          Shiksha Pragati - "Bridge of Education for Progress"
        </Typography>
      </Box>

      <Box display="flex" gap={4}>
        {/* Role Selection */}
        <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
          <Typography variant="h6" textAlign="center" mb={2}>
            Select Role
          </Typography>
          <Button
            fullWidth
            variant={role === "student" ? "contained" : "outlined"}
            sx={{ mb: 2 }}
            onClick={() => setRole("student")}
          >
            Student
          </Button>
          <Button
            fullWidth
            variant={role === "officer" ? "contained" : "outlined"}
            sx={{ mb: 2 }}
            onClick={() => setRole("officer")}
          >
            Training Officer
          </Button>
          <Button
            fullWidth
            variant={role === "recruiter" ? "contained" : "outlined"}
            onClick={() => setRole("recruiter")}
          >
            Recruiter
          </Button>
        </Paper>

        {/* Login Form */}
        <Paper elevation={3} sx={{ p: 4, flex: 2 }}>
          <Typography variant="h6" textAlign="center" mb={3}>
            {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : "Login"}
          </Typography>

          <form onSubmit={handleLogin}>
            {role && (
              <TextField
                fullWidth
                label="Unique ID"
                placeholder={
                  role === "student"
                    ? "RUM Number"
                    : role === "officer"
                      ? "Employee ID"
                      : "Username"
                }
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={!role}
                margin="normal"
                required
              />
            )}

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!role}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={!role}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default StudentRecruiterLogin;

