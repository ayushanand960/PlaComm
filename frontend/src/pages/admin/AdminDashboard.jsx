// import React, { useState } from "react";
// import { Grid, Box, Typography, Card, CardContent, TextField, Button, Stack } from "@mui/material";
// import { Person, Work, TrendingUp, Group } from "@mui/icons-material";
// import AdminNavbar from "../../components/admin/AdminNavbar";
// import StatCard from "../../components/admin/StatCard";
// import AdminJobCard from "../../components/admin/AdminJobCard";
// const AdminDashboard = () => {
//   const [allStaffActivities, setAllStaffActivities] = useState([
//     { id: 1, staffName: "John Doe", action: "updated student records", timestamp: "2025-09-15 10:30" },
//     { id: 2, staffName: "Jane Smith", action: "added new job postings", timestamp: "2025-09-15 09:45" },
//     { id: 3, staffName: "Michael Johnson", action: "reviewed applications", timestamp: "2025-09-14 16:20" },
//   ]);

//   const [roles, setRoles] = useState([
//     "Admin",
//     "Placement Coordinator",
//     "Student",
//     "Recruiter"
//   ]);

//   const [newActivityStaff, setNewActivityStaff] = useState("");
//   const [newActivityAction, setNewActivityAction] = useState("");
//   const [newRole, setNewRole] = useState("");

//   const addNewActivity = () => {
//     if (newActivityStaff.trim() && newActivityAction.trim()) {
//       const newActivity = {
//         id: allStaffActivities.length + 1,
//         staffName: newActivityStaff,
//         action: newActivityAction,
//         timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ')
//       };
//       setAllStaffActivities([newActivity, ...allStaffActivities]);
//       setNewActivityStaff("");
//       setNewActivityAction("");
//     }
//   };

//   const addNewRole = () => {
//     if (newRole.trim()) {
//       setRoles([newRole, ...roles]);
//       setNewRole("");
//     }
//   };

//   const recentActivities = allStaffActivities.slice(0, 3);

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         width: "100%",
//         backgroundColor: "hsla(184, 64%, 74%, 0.89)", // Dashboard background
//         p: 3,
//         boxSizing: "border-box",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <AdminNavbar />

//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: "100%",
//           padding: "40px",
//           boxSizing: "border-box",
//           flexGrow: 1,
//         }}
//       >
//         <Typography variant="h3" fontWeight="bold" color="primary" mb={4}>
//           Dashboard
//         </Typography>

//         {/* Stat Boxes with light blue & light pink combination */}
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6} lg={3}>
//             <StatCard 
//               title="Total Students"
//               value="1,234"
//               description="+12% from last month"
//               icon={<Person fontSize="large" />}
//               bgColor="#e1f5fe" // light blue
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={3}>
//             <StatCard 
//               title="Active Jobs"
//               value="89"
//               description="+5 this week"
//               icon={<Work fontSize="large" />}
//               bgColor="
//               hsla(0, 0%, 98%, 1.00)" // light pink
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={3}>
//             <StatCard 
//               title="Placements"
//               value="456"
//               description="+23% from last year"
//               icon={<TrendingUp fontSize="large" />}
//               bgColor="#faf9f9ff" // light blue
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={3}>
//             <StatCard 
//               title="Staff Members"
//               value="45"
//               description="3 departments"
//               icon={<Group fontSize="large" />}
//               bgColor="#efecf0ff" // light pink
//             />
//           </Grid>
//         </Grid>

//         <Box mt={5}>
//           {/* Recent Staff Activity Card */}
//           <Card
//             sx={{
//               width: "100%",
//               p: 3,
//               boxSizing: "border-box",
//               boxShadow: "0px 4px 12px rgba(0, 0, 0, 0)",
//               borderRadius: "12px",
//               backgroundColor: "hsla(0, 4%, 95%, 1.00)",
//             }}
//           >
//             <CardContent>
//               <Typography variant="h5" fontWeight="bold">Recent Staff Activity</Typography>
//               <Typography color="textSecondary" mb={2}>
//                 Latest actions by placement staff.
//               </Typography>

//               <Stack direction="row" spacing={2} mb={3}>
//                 <TextField label="Staff Name" value={newActivityStaff} onChange={(e) => setNewActivityStaff(e.target.value)} fullWidth />
//                 <TextField label="Action" value={newActivityAction} onChange={(e) => setNewActivityAction(e.target.value)} fullWidth />
//                 <Button variant="contained" onClick={addNewActivity}>
//                   Add Activity
//                 </Button>
//               </Stack>

//               <ul style={{ paddingLeft: "20px" }}>
//                 {recentActivities.map((activity) => (
//                   <li key={activity.id}>
//                     <strong>{activity.staffName}</strong> {activity.action} - <em>{activity.timestamp}</em>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>

//           {/* Role Management Card */}
//           <Card
//             sx={{
//               width: "100%",
//               p: 3,
//               boxSizing: "border-box",
//               mt: 3,
//               boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
//               borderRadius: "12px",
//               backgroundColor: "#fffcfcff",
//             }}
//           >
//             <CardContent>
//               <Typography variant="h5" fontWeight="bold">Role Management</Typography>
//               <Typography color="textSecondary" mb={2}>
//                 Assign and manage user roles.
//               </Typography>

//               <Stack direction="row" spacing={2} mb={3}>
//                 <TextField label="New Role Name" value={newRole} onChange={(e) => setNewRole(e.target.value)} fullWidth />
//                 <Button variant="contained" onClick={addNewRole}>
//                   Add Role
//                 </Button>
//               </Stack>

//               <ul style={{ paddingLeft: "20px" }}>
//                 {roles.map((role, index) => (
//                   <li key={index}>{role}</li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
          
//           {/* ✅ Job Management Section */}
//           <Box mt={5}>
//             <AdminJobCard />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;



import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import { Person, Work, TrendingUp, Group } from "@mui/icons-material";
import AdminNavbar from "../../components/admin/AdminNavbar";
import StatCard from "../../components/admin/StatCard";
import AdminJobCard from "../../components/admin/AdminJobCard";

const AdminDashboard = () => {
  const [allStaffActivities, setAllStaffActivities] = useState([
    { id: 1, staffName: "John Doe", action: "updated student records", timestamp: "2025-09-15 10:30" },
    { id: 2, staffName: "Jane Smith", action: "added new job postings", timestamp: "2025-09-15 09:45" },
    { id: 3, staffName: "Michael Johnson", action: "reviewed applications", timestamp: "2025-09-14 16:20" },
  ]);

  const [roles, setRoles] = useState(["Admin", "Placement Coordinator", "Student", "Recruiter"]);
  const [newActivityStaff, setNewActivityStaff] = useState("");
  const [newActivityAction, setNewActivityAction] = useState("");
  const [newRole, setNewRole] = useState("");

  const addNewActivity = () => {
    if (newActivityStaff.trim() && newActivityAction.trim()) {
      const newActivity = {
        id: allStaffActivities.length + 1,
        staffName: newActivityStaff,
        action: newActivityAction,
        timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      };
      setAllStaffActivities([newActivity, ...allStaffActivities]);
      setNewActivityStaff("");
      setNewActivityAction("");
    }
  };

  const addNewRole = () => {
    if (newRole.trim()) {
      setRoles([newRole, ...roles]);
      setNewRole("");
    }
  };

  const recentActivities = allStaffActivities.slice(0, 3);

 
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AdminNavbar />

      <Box
        sx={{
          width: "100%",
          maxWidth: "1300px",
          margin: "auto",
          mt: 10,
          mb: 5,
          p: { xs: 2, sm: 4 },
        }}
      >
        {/* Dashboard Heading */}
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          gutterBottom
          sx={{
            textAlign: { xs: "center", md: "left" },
            mb: 3,
            letterSpacing: "0.5px",
            textShadow: "0px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Admin Dashboard
        </Typography>

        {/* ===== Stats Section ===== */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Students"
              value="1,234"
              description="+12% from last month"
              icon={<Person fontSize="large" />}
              bgColor="#42a5f5"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Jobs"
              value="89"
              description="+5 this week"
              icon={<Work fontSize="large" />}
              bgColor="#ffa726"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Placements"
              value="456"
              description="+23% from last year"
              icon={<TrendingUp fontSize="large" />}
              bgColor="#66bb6a"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Staff Members"
              value="45"
              description="3 departments"
              icon={<Group fontSize="large" />}
              bgColor="#ab47bc"
            />
          </Grid>
        </Grid>

        {/* ===== Recent Activity Section ===== */}
        <Paper
          elevation={4}
          sx={{
            mt: 6,
            borderRadius: "16px",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,244,255,0.9))",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            transition: "0.3s ease",
            "&:hover": {
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
              Recent Staff Activity
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Latest actions by placement staff.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
              <TextField
                label="Staff Name"
                value={newActivityStaff}
                onChange={(e) => setNewActivityStaff(e.target.value)}
                fullWidth
              />
              <TextField
                label="Action"
                value={newActivityAction}
                onChange={(e) => setNewActivityAction(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                sx={{
                  px: 3,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 600,
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
                onClick={addNewActivity}
              >
                Add Activity
              </Button>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {recentActivities.map((activity) => (
              <Box
                key={activity.id}
                sx={{
                  mb: 1.5,
                  p: 1.2,
                  borderRadius: "10px",
                  "&:hover": {
                    background: "rgba(25,118,210,0.05)",
                    transition: "0.3s",
                  },
                }}
              >
                <Typography variant="body1">
                  <strong>{activity.staffName}</strong> {activity.action}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {activity.timestamp}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* ===== Role Management Section ===== */}
        <Paper
          elevation={4}
          sx={{
            mt: 5,
            borderRadius: "16px",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,245,255,0.9))",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            transition: "0.3s",
            "&:hover": {
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
              Role Management
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Assign and manage user roles.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
              <TextField
                label="New Role Name"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                sx={{
                  px: 3,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 600,
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
                onClick={addNewRole}
              >
                Add Role
              </Button>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {roles.map((role, index) => (
              <Typography
                key={index}
                sx={{
                  mb: 1,
                  p: 0.5,
                  borderRadius: "6px",
                  "&:hover": { background: "rgba(25,118,210,0.05)" },
                }}
              >
                • {role}
              </Typography>
            ))}
          </Box>
        </Paper>

        {/* ===== Job Management Section ===== */}
        <Box mt={6}>
          <AdminJobCard />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;