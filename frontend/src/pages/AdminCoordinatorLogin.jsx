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
    Divider,
} from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  SupervisorAccount,
  AccountBalance,
  Badge,
  Lock,
  Person,
} from "@mui/icons-material";
import { motion } from "framer-motion";


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
                        navigate(`/admin/dashboard`);
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


//     return (
//         <Container maxWidth={false}  disableGutters sx={{ minHeight: "100vh", py: 5 }}>
//             <Box textAlign="center" mb={5}>
//                 <Typography variant="h4" fontWeight="bold" color="primary">
//                     PlaComm Placement Tracker Portal
//                 </Typography>
//                 <Typography variant="subtitle1" color="text.secondary">
//                     Rama University
//                 </Typography>
//                 <Typography variant="subtitle2" fontStyle="italic" color="text.secondary">
//                     Faculty of Engineering and Technology
//                 </Typography>
//             </Box>

//             <Box display="flex" gap={4} sx={{width: "100vw", px: 4}}>
//                 {/* Role Selection */}
//                 <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
//                     <Typography variant="h6" textAlign="center" mb={2}>
//                         Select Role
//                     </Typography>
//                     {["admin", "coordinator", "authority", "officer"].map((r) => (
//                         <Button
//                             key={r}
//                             fullWidth
//                             variant={role === r ? "contained" : "outlined"}
//                             sx={{ mb: 2 }}
//                             onClick={() => setRole(r)}
//                         >
//                             {r.charAt(0).toUpperCase() + r.slice(1)}
//                         </Button>
//                     ))}
//                 </Paper>

//                 {/* Login Form */}
//                 <Paper elevation={3} sx={{ p: 4, flex: 1, mr:10 }}>
//                     <Typography variant="h6" textAlign="center" mb={3}>
//                         {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : "Login"}
//                     </Typography>

//                     <form onSubmit={handleLogin}>
//                         {role && (
//                             <TextField
//                                 fullWidth
//                                 label="Unique ID"
//                                 placeholder={
//                                     role === "admin"
//                                         ? "Admin ID"
//                                         : role === "coordinator"
//                                             ? "Coordinator ID"
//                                             : role === "authority"
//                                                 ? "Authority ID"
//                                                 : "Employee ID"
//                                 }
//                                 value={identifier}
//                                 onChange={(e) => setIdentifier(e.target.value)}
//                                 disabled={!role}
//                                 margin="normal"
//                                 required
//                             />
//                         )}

//                         <TextField
//                             fullWidth
//                             label="Password"
//                             type={showPassword ? "text" : "password"}
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             disabled={!role}
//                             margin="normal"
//                             required
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton onClick={() => setShowPassword(!showPassword)}>
//                                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />

//                         {error && (
//                             <Alert severity="error" sx={{ mt: 2 }}>
//                                 {error}
//                             </Alert>
//                         )}

//                         <Button
//                             type="submit"
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             sx={{ mt: 3 }}
//                             disabled={!role}
//                         >
//                             Login
//                         </Button>
//                     </form>
//                 </Paper>
//             </Box>
//         </Container>
//     );
// };

// export default AdminCoordinatorLogin;





const roleIcons = {
    admin: <AdminPanelSettings sx={{ mr: 1 }} />,
    coordinator: <SupervisorAccount sx={{ mr: 1 }} />,
    authority: <AccountBalance sx={{ mr: 1 }} />,
    officer: <Badge sx={{ mr: 1 }} />,
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        px: 3,
      }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        animate={{
          background: [
            "linear-gradient(135deg, #6a11cb, #ff6a00)",
            "linear-gradient(135deg, #ff512f, #dd2476)",
            "linear-gradient(135deg, #24c6dc, #514a9d)",
            "linear-gradient(135deg, #6a11cb, #ff6a00)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

      {/* Floating Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ width: "90%", maxWidth: "1100px" }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Header */}
          <Box textAlign="center" mb={5} color="white">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <Typography variant="h3" fontWeight="bold">
                PlaComm Placement Tracker Portal
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Rama University • Faculty of Engineering & Technology
              </Typography>
            </motion.div>
          </Box>

          <Box display="flex" gap={4}>
            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              style={{ flex: 1 }}
            >
              <Paper
                elevation={8}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  backdropFilter: "blur(20px)",
                  background: "rgba(255, 255, 255, 0.15)",
                  color: "white",
                  boxShadow: "0px 8px 25px rgba(0,0,0,0.25)",
                }}
              >
                <Typography variant="h6" textAlign="center" mb={2}>
                  Select Role
                </Typography>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.3)", mb: 2 }} />
                {["admin", "coordinator", "authority", "officer"].map((r) => (
                  <motion.div
                    key={r}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      fullWidth
                      variant={role === r ? "contained" : "outlined"}
                      startIcon={roleIcons[r]}
                      sx={{
                        mb: 2,
                        borderRadius: "12px",
                        color: "white",
                        borderColor: "rgba(255,255,255,0.6)",
                        background:
                          role === r
                            ? "linear-gradient(135deg, #ff512f, #dd2476)"
                            : "rgba(255,255,255,0.1)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #ff512f, #dd2476)",
                          boxShadow: "0px 8px 25px rgba(255,255,255,0.4)",
                        },
                      }}
                      onClick={() => setRole(r)}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </Button>
                  </motion.div>
                ))}
              </Paper>
            </motion.div>

          {/* Login Form */}
<motion.div
  initial={{ opacity: 0, x: 60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  style={{ flex: 2 }}
>
  <Paper
    elevation={8}
    sx={{
      p: 4,
      borderRadius: "20px",
      backdropFilter: "blur(20px)",
      background: "rgba(255, 255, 255, 0.25)",
      boxShadow: "0px 8px 25px rgba(0,0,0,0.25)",
      minHeight: "320px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Typography
      variant="h5"
      textAlign="center"
      mb={3}
      fontWeight="bold"
      sx={{ color: "#222" }}
    >
      {role
        ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login`
        : "Please Select a Role"}
    </Typography>

    <form onSubmit={handleLogin} style={{ width: "100%" }}>
      <TextField
        fullWidth
        label="Unique ID"
        placeholder={role ? `${role.charAt(0).toUpperCase() + role.slice(1)} ID` : "Select Role First"}
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        margin="normal"
        disabled={!role}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ my: 2 }} />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        disabled={!role}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
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
        fullWidth
        sx={{
          mt: 3,
          borderRadius: "12px",
          py: 1.2,
          fontSize: "1rem",
          color: "white",
          background: "linear-gradient(135deg,  #ff512f 0%,  #dd2476 100%)",
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            background: "linear-gradient(135deg, #dd2476 0%, #ff512f 100%)",
          },
        }}
        disabled={!role}
      >
        Login
      </Button>
    </form>
  </Paper>
</motion.div>

          </Box>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default AdminCoordinatorLogin;