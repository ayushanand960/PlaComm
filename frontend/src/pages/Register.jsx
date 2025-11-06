// // src/pages/Register.jsx
// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   Tab,
//   Tabs,
//   TextField,
//   Typography,
//   CircularProgress,
//   IconButton,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { Home as HomeIcon } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";
// import { faculties } from "../data/faculties";
// import { courses } from "../data/courses";
// import { designations } from "../data/designation.js";

// // import { MenuItem } from "@mui/material";

// export default function Register() {
//   const [role, setRole] = useState("student");
//   const [formData, setFormData] = useState({});
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [selectedFaculty, setSelectedFaculty] = useState("");
// const [availableCourses, setAvailableCourses] = useState([]);



//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//  const handleFacultyChange = (e) => {
//   const faculty = e.target.value;
//   setSelectedFaculty(faculty);

//   const foundCourses = courses[faculty] || [];

//   setAvailableCourses(foundCourses);

//   // 🧩 Reset course and year whenever faculty changes
//   setFormData((prev) => ({
//     ...prev,
//     faculty,
//     course: "",
//     year: "",
//   }));
// };




//   const validateFields = () => {
//     const newErrors = {};
//     if (role === "student") {
//       const rumRegex = /^RUM\d{7}$/;
//       if (!rumRegex.test(formData.rum_number || "")) {
//         newErrors.rum_number = "RUM must be like RUM2201146";
//       }
//     } else {
//       const empRegex = /^[A-Z]{2}-[A-Z]{3,4}\d{7}$/;
//       if (!empRegex.test(formData.employee_id || "")) {
//         newErrors.employee_id = "Employee ID must be like RG-MNDE0011314";
//       }
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email || "")) {
//       newErrors.email = "Enter a valid email address";
//     }
//     const phoneRegex = /^[6-9]\d{9}$/;
//     if (!phoneRegex.test(formData.phone || "")) {
//       newErrors.phone = "Phone must be 10 digits starting with 6,7,8,9";
//     }
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!passwordRegex.test(formData.password || "")) {
//       newErrors.password =
//         "Password must be at least 8 characters, include uppercase, lowercase, number & special char";
//     }
//     if (formData.password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateFields()) return;
//     try {
//       setLoading(true);
//       const endpoint =
//         role === "student"
//           ? "/users/register/student/"
//           : "/users/register/officer/";

//       // const payload = { ...formData };
//       // if (role === "student") payload.unique_id = formData.rum_number;
//       // else payload.unique_id = formData.employee_id;

//       let payload = {};

// if (role === "student") {
//   payload = {
//     rum_number: formData.rum_number, 
//     unique_id: formData.rum_number,
//     first_name: formData.first_name,
//     middle_name: formData.middle_name || "",
//     last_name: formData.last_name,
//     email: formData.email,
//     phone: formData.phone,
//     faculty: selectedFaculty,       // 👈 new field
//     course: formData.course,        // 👈 new field
//     year: formData.year,
//     gender: formData.gender,
//     password: formData.password,
//   };
// } else {
//   payload = {
//   employee_id:formData.employee_id,
//   unique_id: formData.employee_id,
//   first_name: formData.first_name,
//   middle_name: formData.middle_name || "",
//   last_name: formData.last_name,
//   faculty: formData.faculty,        // ✅ new
//   designation: formData.designation, // ✅ dropdown
//   email: formData.email,
//   phone: formData.phone,
//   password: formData.password,
// };

// }

//       await axiosInstance.post(endpoint, payload, { withCredentials: false });

//       alert("Registration successful!");
//       setFormData({});
//       setConfirmPassword("");
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert("Registration failed: " + JSON.stringify(err.response?.data));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         width: "100vw",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundImage: "url('/images/rm.jpg')",
//         backgroundSize: "contain", // ✅ less magnified
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         position: "relative",
//         overflow: "hidden",
//         p: 3,
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           inset: 0,
//           background:
//             "linear-gradient(-45deg, #4facfe, #00f2fe, #43e97b, #38f9d7)",
//           backgroundSize: "400% 400%",
//           animation: "gradientBG 15s ease infinite",
//           opacity: 0.65, // ✅ let image be visible
//           zIndex: 0,
//         },
//         "@keyframes gradientBG": {
//           "0%": { backgroundPosition: "0% 50%" },
//           "50%": { backgroundPosition: "100% 50%" },
//           "100%": { backgroundPosition: "0% 50%" },
//         },
//       }}
//     >
//       <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
//         <Paper
//           elevation={6}
//           sx={{
//             p: 4,
//             borderRadius: "16px",
//             backdropFilter: "blur(12px)",
//             background: "rgba(255, 255, 255, 0.9)",
//           }}
//         >
//           {/* Home Button */}
//           <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//             <IconButton
//               component={Link}
//               to="/"
//               sx={{
//                 background: "linear-gradient(45deg, #4facfe, #00f2fe)",
//                 color: "#fff",
//                 "&:hover": { opacity: 0.85 },
//               }}
//             >
//               <HomeIcon />
//             </IconButton>
//           </Box>

//           <Typography
//             variant="h4"
//             align="center"
//             gutterBottom
//             sx={{
//               fontWeight: "bold",
//               background: "linear-gradient(45deg, #4facfe, #43e97b)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             User Registration
//           </Typography>

//           {/* Tabs */}
//           <Tabs
//             value={role}
//             onChange={(e, newValue) => setRole(newValue)}
//             centered
//             sx={{ mb: 3 }}
//           >
//             <Tab value="student" label="Student" />
//             <Tab value="officer" label="Training Officer" />
//           </Tabs>

//           {/* Form */}
//           <Box component="form" onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               {role === "student" ? (
//                 <>
//                   <Grid item xs={12} sm={4}>
//                     <TextField
//                       required
//                       fullWidth
//                       label="RUM Number"
//                       name="rum_number"
//                       value={formData.rum_number || ""}
//                       onChange={handleChange}
//                       error={!!errors.rum_number}
//                       helperText={errors.rum_number || "Ex: RUM2201146"}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={4}>
//                     <TextField
//                       required
//                       fullWidth
//                       label="First Name"
//                       name="first_name"
//                       onChange={handleChange}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={4}>
//                     <TextField
//                       fullWidth
//                       label="Middle Name"
//                       name="middle_name"
//                       onChange={handleChange}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={4}>
//                     <TextField
//                       required
//                       fullWidth
//                       label="Last Name"
//                       name="last_name"
//                       onChange={handleChange}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={4}>
//                     <TextField
//                       required
//                       fullWidth
//                       label="Email"
//                       type="email"
//                       name="email"
//                       value={formData.email || ""}
//                       onChange={handleChange}
//                       error={!!errors.email}
//                       helperText={errors.email}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={4}>
//                     <TextField
//                       required
//                       fullWidth
//                       label="Phone"
//                       name="phone"
//                       value={formData.phone || ""}
//                       onChange={handleChange}
//                       error={!!errors.phone}
//                       helperText={errors.phone}
//                     />
//                   </Grid>
// {/* Faculty Dropdown */}
// <Grid item xs={12} sm={4}>
//   <FormControl fullWidth required sx={{ minWidth: 120 }}>
//     <InputLabel>Faculty</InputLabel>
//     <Select
//       label="Faculty"
//       name="faculty"
//       value={selectedFaculty || ""}
//       onChange={handleFacultyChange}  // ✅ FIXED — now triggers faculty change
//       sx={{
//         height: "56px",
//         borderRadius: "4px",
//       }}
//     >
//       {faculties.map((fac, i) => (
//         <MenuItem key={i} value={fac}>
//           {fac}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// </Grid>

// {/* Course Dropdown */}
// <Grid item xs={12} sm={6}>
//   <FormControl fullWidth required sx={{ minWidth: 120 }} disabled={availableCourses.length === 0}>
//     <InputLabel>Course</InputLabel>
//     <Select
//       label="Course"
//       name="course"
//       value={formData.course || ""}
//       onChange={handleChange}
//       sx={{
//         height: "56px",
//         borderRadius: "4px",
//       }}
//     >
//       {availableCourses.map((course, i) => (
//         <MenuItem key={i} value={course}>
//           {course}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// </Grid>


//              <Grid item xs={12} sm={4}>
//   <FormControl fullWidth required sx={{ minWidth: 120 }}>
//     <InputLabel>Year</InputLabel>
//     <Select
//       label="Year"
//       name="year"
//       value={formData.year || ""}
//       onChange={handleChange}
//       sx={{
//         height: "56px", // ✅ Consistent height
//         borderRadius: "4px",
//       }}
//     >
//       <MenuItem value="">
//         <em>Select Year</em>
//       </MenuItem>
//       <MenuItem value="I Year">I Year</MenuItem>
//       <MenuItem value="II Year">II Year</MenuItem>
//       <MenuItem value="III Year">III Year</MenuItem>
//       <MenuItem value="IV Year">IV Year</MenuItem>
//       <MenuItem value="V Year">V Year</MenuItem>
//     </Select>
//   </FormControl>
// </Grid>


//                   <Grid item xs={12} sm={4}>
//                     <FormControl fullWidth required sx={{ minWidth: 120 }}>
//                       <InputLabel>Gender</InputLabel>
//                       <Select
//                         label="Gender"
//                         name="gender"
//                         value={formData.gender || ""}
//                         onChange={handleChange}
//                         sx={{
//                           height: "56px", // ✅ Same height as TextField
//                           borderRadius: "4px",
//                         }}
//                       >
//                         <MenuItem value="Male">Male</MenuItem>
//                         <MenuItem value="Female">Female</MenuItem>
//                         <MenuItem value="Other">Other</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                 </>
//               ) : (
//                 <>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       required
//                       fullWidth
//                       label="Employee ID"
//                       name="employee_id"
//                       value={formData.employee_id || ""}
//                       onChange={handleChange}
//                       error={!!errors.employee_id}
//                       helperText={errors.employee_id || "Ex: RG-MNDE0011314"}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       required
//                       fullWidth
//                       label="First Name"
//                       name="first_name"
//                       value={formData.first_name || ""}
//                       onChange={handleChange}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="Middle Name"
//                       name="middle_name"
//                       value={formData.middle_name || ""}
//                       onChange={handleChange}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       required
//                       fullWidth
//                       label="Last Name"
//                       name="last_name"
//                       value={formData.last_name || ""}
//                       onChange={handleChange}
//                     />
//                   </Grid>

//                   {/* Faculty Dropdown */}
// <Grid item xs={12} sm={6}>
//   <FormControl fullWidth required sx={{ minWidth: 120 }}>
//     <InputLabel>Faculty</InputLabel>
//     <Select
//       label="Faculty"
//       name="faculty"
//       value={formData.faculty || ""}
//       onChange={handleChange}
//       sx={{
//         height: "56px",
//         borderRadius: "4px",
//       }}
//     >
//       {faculties.map((fac, i) => (
//         <MenuItem key={i} value={fac}>
//           {fac}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// </Grid>

// {/* Designation Dropdown */}
// <Grid item xs={12} sm={6}>
//   <FormControl fullWidth required sx={{ minWidth: 140 }}>
//     <InputLabel>Designation</InputLabel>
//     <Select
//       label="Designation"
//       name="designation"
//       value={formData.designation || ""}
//       onChange={handleChange}
//       sx={{
//         height: "56px",
//         borderRadius: "4px",
//       }}
//     >
//       {designations.map((des, i) => (
//         <MenuItem key={i} value={des}>
//           {des}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// </Grid>




//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       required
//                       fullWidth
//                       label="Email"
//                       type="email"
//                       name="email"
//                       value={formData.email || ""}
//                       onChange={handleChange}
//                       error={!!errors.email}
//                       helperText={errors.email}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       required
//                       fullWidth
//                       label="Phone"
//                       name="phone"
//                       value={formData.phone || ""}
//                       onChange={handleChange}
//                       error={!!errors.phone}
//                       helperText={errors.phone}
//                     />
//                   </Grid>
//                 </>
//               )}

//               {/* Passwords */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Password"
//                   type="password"
//                   name="password"
//                   onChange={handleChange}
//                   error={!!errors.password}
//                   helperText={errors.password}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Confirm Password"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   error={!!errors.confirmPassword}
//                   helperText={errors.confirmPassword}
//                 />
//               </Grid>
//             </Grid>

//             <Box sx={{ mt: 4, textAlign: "center" }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 disabled={loading}
//                 sx={{
//                   px: 5,
//                   py: 1.5,
//                   fontSize: "1rem",
//                   borderRadius: "25px",
//                   background: "linear-gradient(45deg, #4facfe, #43e97b)",
//                   color: "#fff",
//                   "&:hover": {
//                     background: "linear-gradient(45deg, #3a8dde, #36c46f)",
//                   },
//                 }}
//               >
//                 {loading ? (
//                   <CircularProgress size={24} color="inherit" />
//                 ) : (
//                   "Register"
//                 )}
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }
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
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import { faculties } from "../data/faculties";
import { courses } from "../data/courses";
import { designations } from "../data/designation.js";

export default function Register() {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [availableCourses, setAvailableCourses] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFacultyChange = (e) => {
    const faculty = e.target.value;
    setSelectedFaculty(faculty);
    const foundCourses = courses[faculty] || [];
    setAvailableCourses(foundCourses);

    setFormData((prev) => ({
      ...prev,
      faculty,
      course: "",
      year: "",
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (role === "student") {
      const rumRegex = /^RUM\d{7}$/;
      if (!rumRegex.test(formData.rum_number || "")) {
        newErrors.rum_number = "RUM must be like RUM2201146";
      }
    } else {
      const empRegex = /^[A-Z]{2}-[A-Z]{3,4}\d{7}$/;
      if (!empRegex.test(formData.employee_id || "")) {
        newErrors.employee_id = "Employee ID must be like RG-MNDE0011314";
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email || "")) newErrors.email = "Enter a valid email address";

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone || "")) newErrors.phone = "Phone must be 10 digits starting with 6,7,8,9";

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
      const endpoint = role === "student" ? "/users/register/student/" : "/users/register/officer/";

      let payload = {};
      if (role === "student") {
        payload = {
          rum_number: formData.rum_number,
          unique_id: formData.rum_number,
          first_name: formData.first_name,
          middle_name: formData.middle_name || "",
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          faculty: selectedFaculty,
          course: formData.course,
          year: formData.year,
          gender: formData.gender,
          password: formData.password,
        };
      } else {
        payload = {
          employee_id: formData.employee_id,
          unique_id: formData.employee_id,
          first_name: formData.first_name,
          middle_name: formData.middle_name || "",
          last_name: formData.last_name,
          faculty: formData.faculty,
          designation: formData.designation,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        };
      }

      await axiosInstance.post(endpoint, payload, { withCredentials: false });
      alert("Registration successful!");
      setFormData({});
      setConfirmPassword("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration failed: " + JSON.stringify(err.response?.data));
    } finally {
      setLoading(false);
    }
  };

  const dropdownStyle = {
    minWidth: 120,
    "& .MuiInputBase-root": {
      minHeight: 56,
      paddingLeft: 1,
      paddingRight: 1,
    },
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      padding: "16px 14px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "12px",
      borderColor: "rgba(255,255,255,0.6)",
    },
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", px: 3 }}
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
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
      />

      {/* Frosted Glass Card */}
      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ width: "90%", maxWidth: "1200px" }}>
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: "20px",
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.25)",
            boxShadow: "0px 8px 25px rgba(0,0,0,0.25)",
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Typography variant="h3" fontWeight="bold" color="#222">
              User Registration
            </Typography>
            <Typography variant="subtitle1" color="#555">
              Rama University • Faculty of Engineering & Technology
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs value={role} onChange={(e, newValue) => setRole(newValue)} centered sx={{ mb: 3 }}>
            <Tab value="student" label="Student" />
            <Tab value="officer" label="Training Officer" />
          </Tabs>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Student Form */}
              {role === "student" ? (
                <>
                  <Grid item xs={12} sm={4}>
                    <TextField required fullWidth label="RUM Number" name="rum_number" value={formData.rum_number || ""} onChange={handleChange} error={!!errors.rum_number} helperText={errors.rum_number || "Ex: RUM2201146"} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField required fullWidth label="First Name" name="first_name" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Middle Name" name="middle_name" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField required fullWidth label="Last Name" name="last_name" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField required fullWidth label="Email" type="email" name="email" value={formData.email || ""} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField required fullWidth label="Phone" name="phone" value={formData.phone || ""} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} />
                  </Grid>

                  {/* Faculty Dropdown */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required sx={dropdownStyle}>
                      <InputLabel>Faculty</InputLabel>
                      <Select value={selectedFaculty || ""} onChange={handleFacultyChange}>
                        {faculties.map((fac, i) => (
                          <MenuItem key={i} value={fac}>
                            {fac}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Course Dropdown */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required sx={dropdownStyle} disabled={availableCourses.length === 0}>
                      <InputLabel>Course</InputLabel>
                      <Select name="course" value={formData.course || ""} onChange={handleChange}>
                        {availableCourses.map((course, i) => (
                          <MenuItem key={i} value={course}>
                            {course}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Year */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required sx={dropdownStyle}>
                      <InputLabel>Year</InputLabel>
                      <Select name="year" value={formData.year || ""} onChange={handleChange}>
                        <MenuItem value="">
                          <em>Select Year</em>
                        </MenuItem>
                        <MenuItem value="I Year">I Year</MenuItem>
                        <MenuItem value="II Year">II Year</MenuItem>
                        <MenuItem value="III Year">III Year</MenuItem>
                        <MenuItem value="IV Year">IV Year</MenuItem>
                        <MenuItem value="V Year">V Year</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Gender */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required sx={dropdownStyle}>
                      <InputLabel>Gender</InputLabel>
                      <Select name="gender" value={formData.gender || ""} onChange={handleChange}>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              ) : (
                <>
                  {/* Officer Form */}
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="Employee ID" name="employee_id" value={formData.employee_id || ""} onChange={handleChange} error={!!errors.employee_id} helperText={errors.employee_id || "Ex: RG-MNDE0011314"} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="First Name" name="first_name" value={formData.first_name || ""} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Middle Name" name="middle_name" value={formData.middle_name || ""} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="Last Name" name="last_name" value={formData.last_name || ""} onChange={handleChange} />
                  </Grid>

                  {/* Faculty */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required sx={dropdownStyle}>
                      <InputLabel>Faculty</InputLabel>
                      <Select name="faculty" value={formData.faculty || ""} onChange={handleChange}>
                        {faculties.map((fac, i) => (
                          <MenuItem key={i} value={fac}>
                            {fac}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Designation */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required sx={dropdownStyle}>
                      <InputLabel>Designation</InputLabel>
                      <Select name="designation" value={formData.designation || ""} onChange={handleChange}>
                        {designations.map((des, i) => (
                          <MenuItem key={i} value={des}>
                            {des}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="Email" type="email" name="email" value={formData.email || ""} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="Phone" name="phone" value={formData.phone || ""} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} />
                  </Grid>
                </>
              )}

              {/* Password Fields */}
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth label="Password" type="password" name="password" onChange={handleChange} error={!!errors.password} helperText={errors.password} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={!!errors.confirmPassword} helperText={errors.confirmPassword} />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  borderRadius: "12px",
                  px: 6,
                  py: 1.5,
                  fontSize: "1rem",
                  color: "white",
                  background: "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    background: "linear-gradient(135deg, #dd2476 0%, #ff512f 100%)",
                  },
                  transition: "0.3s",
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
}

