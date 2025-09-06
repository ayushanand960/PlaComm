// src/pages/AdminCoordinatorLogin.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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


const AdminCoordinatorLogin = () => {
    const [identifier, setIdentifier] = useState(""); // unique_id
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); // admin / coordinator / authority / officer
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

        // Map frontend role to backend role
        const roleMap = {
            admin: "admin",
            coordinator: "placement_coordinator",
            authority: "authority",
            officer: "officer",
        };

        const payload = { unique_id: identifier, password, role: roleMap[role] };

        try {
            await axiosInstance.post("/users/login/", payload);

            const res = await axiosInstance.get("/users/profile/");
            const { unique_id, role: userRole } = res.data;
            const encodedId = encodeURIComponent(unique_id);

            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("hasLoggedInBefore", "true");

            if (roleMap[role] === userRole) {
                switch (userRole) {
                    case "admin":
                        navigate(`/admin/manage-users`);
                        break;
                    case "placement_coordinator":
                        navigate(`/coordinator-dashboard/${encodedId}`);
                        break;
                    case "authority":
                        navigate(`/authority-dashboard/${encodedId}`);
                        break;
                    case "officer":
                        navigate(`/officer-dashboard/${encodedId}`);
                        break;
                    default:
                        setError("Role not recognized");
                }
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
                    PlaComm Placement Tracker Portal
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Rama University
                </Typography>
                <Typography variant="subtitle2" fontStyle="italic" color="text.secondary">
                    Faculty of Engineering and Technology
                </Typography>
            </Box>

            <Box display="flex" gap={4}>
                {/* Role Selection */}
                <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
                    <Typography variant="h6" textAlign="center" mb={2}>
                        Select Role
                    </Typography>
                    {["admin", "coordinator", "authority", "officer"].map((r) => (
                        <Button
                            key={r}
                            fullWidth
                            variant={role === r ? "contained" : "outlined"}
                            sx={{ mb: 2 }}
                            onClick={() => setRole(r)}
                        >
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                        </Button>
                    ))}
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
                                    role === "admin"
                                        ? "Admin ID"
                                        : role === "coordinator"
                                            ? "Coordinator ID"
                                            : role === "authority"
                                                ? "Authority ID"
                                                : "Employee ID"
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

export default AdminCoordinatorLogin;
