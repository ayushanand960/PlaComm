// // src/pages/StudentRecruiterLogin.jsx
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";
// import {
//   Container,
//   Box,
//   Typography,
//   Button,
//   TextField,
//   IconButton,
//   InputAdornment,
//   Paper,
//   Alert,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// const StudentRecruiterLogin = () => {
//   const [identifier, setIdentifier] = useState(""); // unique_id
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState(""); // student / officer / recruiter
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const sessionExpired = location.state?.sessionExpired || false;

//   useEffect(() => {
//     if (sessionExpired) {
//       navigate(location.pathname, { replace: true, state: {} });
//     }
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!identifier || !password) {
//       setError("All fields are required.");
//       return;
//     }

//     // Payload: always use unique_id for all roles
//     const payload = { unique_id: identifier, password, role };

//     try {
//       await axiosInstance.post("/users/login/", payload);

//       const res = await axiosInstance.get("/users/profile/");
//       const { unique_id, role: userRole } = res.data;

//       localStorage.setItem("user", JSON.stringify(res.data));
//       localStorage.setItem("hasLoggedInBefore", "true");

//       if (role === userRole) {
//         if (userRole === "student") navigate(`/student-dashboard/${unique_id}`);
//         // else if (userRole === "officer") navigate(`/officer-dashboard/${unique_id}`);
//         else if (userRole === "recruiter") navigate(`/recruiter-dashboard/${unique_id}`);
//       } else {
//         setError("Access denied: You selected the wrong role.");
//       }
//     } catch (err) {
//       if (err.response?.status === 401) setError("Invalid credentials");
//       else setError("Something went wrong. Please try again later.");
//     }
//   };

//   return (
//     <Container maxWidth={false} disableGutters sx={{ minHeight: "100vh", width:"100vw", px:3, py: 5 }}>
//       <Box textAlign="center" mb={5}>
//         <Typography variant="h4" fontWeight="bold" color="primary">
//           PlaComm Placement Tracker Portal
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           Rama University
//         </Typography>
//         <Typography variant="subtitle2" fontStyle="italic" color="text.secondary">
//           Faculty of Engineering and Technology
//         </Typography>
//       </Box>

//       <Box display="flex" gap={4} sx={{width: "100%"}}>
//         {/* Role Selection */}
//         <Paper elevation={3} sx={{ p: 3, flex: 1, minwidth: "300px" }}>
//           <Typography variant="h6" textAlign="center" mb={2}>
//             Select Role
//           </Typography>
//           <Button
//             fullWidth
//             variant={role === "student" ? "contained" : "outlined"}
//             sx={{ mb: 2 }}
//             onClick={() => setRole("student")}
//           >
//             Student
//           </Button>
//           {/* <Button
//             fullWidth
//             variant={role === "officer" ? "contained" : "outlined"}
//             sx={{ mb: 2 }}
//             onClick={() => setRole("officer")}
//           >
//             Training Officer
//           </Button> */}
//           <Button
//             fullWidth
//             variant={role === "recruiter" ? "contained" : "outlined"}
//             onClick={() => setRole("recruiter")}
//           >
//             Recruiter
//           </Button>
//         </Paper>

//         {/* Login Form */}
//         <Paper elevation={3} sx={{ p: 4, flex: 2, width: "100%" }}>
//           <Typography variant="h6" textAlign="center" mb={3}>
//             {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : "Login"}
//           </Typography>

//           <form onSubmit={handleLogin}>
//             {role && (
//               <TextField
//                 fullWidth
//                 label="Unique ID"
//                 placeholder={
//                   role === "student"
//                     ? "RUM Number"
//                     : role === "officer"
//                       ? "Employee ID"
//                       : "Username"
//                 }
//                 value={identifier}
//                 onChange={(e) => setIdentifier(e.target.value)}
//                 disabled={!role}
//                 margin="normal"
//                 required
//               />
//             )}

//             <TextField
//               fullWidth
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               disabled={!role}
//               margin="normal"
//               required
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => setShowPassword(!showPassword)}>
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {error && (
//               <Alert severity="error" sx={{ mt: 2 }}>
//                 {error}
//               </Alert>
//             )}

//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{ mt: 3 }}
//               disabled={!role}
//             >
//               Login
//             </Button>
//           </form>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default StudentRecruiterLogin;

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
import { motion } from "framer-motion";

const StudentRecruiterLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
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

    const payload = { unique_id: identifier, password, role };

    try {
      await axiosInstance.post("/users/login/", payload);
      const res = await axiosInstance.get("/users/profile/");
      const { unique_id, role: userRole } = res.data;

      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("hasLoggedInBefore", "true");

      if (role === userRole) {
        if (userRole === "student") navigate(`/student-dashboard/${unique_id}`);
        else if (userRole === "recruiter")
          navigate(`/recruiter-dashboard/${unique_id}`);
      } else {
        setError("Access denied: You selected the wrong role.");
      }
    } catch (err) {
      if (err.response?.status === 400) setError("Invalid credentials");
      else setError("Something went wrong. Please try again later.");
    }
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
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
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
        style={{ width: "90%", maxWidth: "1000px" }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Box textAlign="center" mb={5} color="white">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <Typography variant="h3" fontWeight="bold">
                PlaComm Placement Tracker
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
                elevation={6}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  backdropFilter: "blur(15px)",
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                }}
              >
                <Typography variant="h6" textAlign="center" mb={2}>
                  Select Role
                </Typography>

                {/* Student Button */}
                <motion.div
                  whileHover={{ rotateY: 15, scale: 1.05 }}
                  whileTap={{ scale: 0.95, rotateY: -15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Button
                    fullWidth
                    variant={role === "student" ? "contained" : "outlined"}
                    sx={{
                      mb: 2,
                      borderRadius: "12px",
                      color: "white",
                      borderColor: "rgba(255,255,255,0.6)",
                      background:
                        role === "student"
                          ? "linear-gradient(135deg, #ff512f, #dd2476)"
                          : "rgba(255,255,255,0.1)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #ff512f, #dd2476)",
                        boxShadow: "0px 8px 25px rgba(255, 81, 47, 0.6)",
                      },
                    }}
                    onClick={() => setRole("student")}
                  >
                    Student
                  </Button>
                </motion.div>

                {/* Recruiter Button */}
                <motion.div
                  whileHover={{ rotateY: -15, scale: 1.05 }}
                  whileTap={{ scale: 0.95, rotateY: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Button
                    fullWidth
                    variant={role === "recruiter" ? "contained" : "outlined"}
                    sx={{
                      borderRadius: "12px",
                      color: "white",
                      borderColor: "rgba(255,255,255,0.6)",
                      background:
                        role === "recruiter"
                          ? "linear-gradient(135deg, #24c6dc, #514a9d)"
                          : "rgba(255,255,255,0.1)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #24c6dc, #514a9d)",
                        boxShadow: "0px 8px 25px rgba(36, 198, 220, 0.6)",
                      },
                    }}
                    onClick={() => setRole("recruiter")}
                  >
                    Recruiter
                  </Button>
                </motion.div>
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
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: "20px",
                  backdropFilter: "blur(15px)",
                  background: "rgba(255, 255, 255, 0.25)",
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
                    : "Login"}
                </Typography>

                <form onSubmit={handleLogin}>
                  {role && (
                    <TextField
                      fullWidth
                      label="Unique ID"
                      placeholder={
                        role === "student" ? "RUM Number" : "Username"
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
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
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
                      background:
                        "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        background:
                          "linear-gradient(135deg, #dd2476 0%, #ff512f 100%)",
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

export default StudentRecruiterLogin;
