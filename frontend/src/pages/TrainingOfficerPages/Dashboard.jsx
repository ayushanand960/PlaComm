// import React from "react";
// import { Grid, Box, Container } from "@mui/material";
// import LoginBanner from "../../TrainingOfficerComponents/Dashboard/LoginBanner";
// import StatsCards from "../../TrainingOfficerComponents/Dashboard/StatsCards";
// import StudentAssessment from "../../TrainingOfficerComponents/Dashboard/StudentAssessment";
// import TopPerformingStudents from "../../TrainingOfficerComponents/Dashboard/TopPerformingStudent";

// const Dashboard = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const officerName = user?.first_name
//     ? `${user.first_name} ${user.last_name || ""}`
//     : "Training Officer";

//   // Example dynamic stats
//   const stats = {
//     studentsTrained: 120,
//     mockInterviews: 15,
//     averageScore: "8.5/10",
//     improvement: "+2 improvement",
//     priorityLists: 5,
//   };

//   const topStudents = [
//     { name: "Rahul Sharma", branch: "CS", score: "9.2/10" },
//     { name: "Priya Patel", branch: "IT", score: "8.9/10" },
//     { name: "Amit Kumar", branch: "ECE", score: "8.7/10" },
//   ];

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         width: "100%",
//         overflowX: "hidden",
//       }}
//     >
//       {/* LoginBanner full width */}
//       <Box sx={{ width: "100%", display: "flex" }}>
//         <LoginBanner officerName={officerName} />
//       </Box>

//       {/* StatsCards */}
//       <StatsCards stats={stats} />

//       {/* Dashboard content */}
//       <Container maxWidth="xl">
//         <Box sx={{ bgcolor: "#f2f2f2", p: 3, borderRadius: 2, mt: 2 }}>
//           <Grid container spacing={3} alignItems="stretch">
//             <Grid item xs={12} md={6} sx={{ display: "flex" }}>
//               <StudentAssessment />
//             </Grid>

//             <Grid item xs={12} md={6} sx={{ display: "flex", flexGrow: 1 }}>
//               <TopPerformingStudents students={topStudents} />
//             </Grid>
//           </Grid>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Dashboard;






import React from "react";
import { Grid, Box, Container, Card, CardContent, Button, Typography } from "@mui/material";
import LoginBanner from "../../components/trainingOfficer/Dashboard/LoginBanner";
import StatsCards from "../../components/trainingOfficer/Dashboard/StatsCards";
import StudentAssessment from "../../components/trainingOfficer/Dashboard/StudentAssessment";
import TopPerformingStudents from "../../components/trainingOfficer/Dashboard/TopPerformingStudent";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const officerName = user?.first_name
    ? `${user.first_name} ${user.last_name || ""}`
    : "Training Officer";

  // Example dynamic stats
  const stats = {
    studentsTrained: 120,
    mockInterviews: 15,
    averageScore: "8.5/10",
    improvement: "+2 improvement",
    priorityLists: 5,
  };

  const topStudents = [
    { name: "Rahul Sharma", branch: "CS", score: "9.2/10" },
    { name: "Priya Patel", branch: "IT", score: "8.9/10" },
    { name: "Amit Kumar", branch: "ECE", score: "8.7/10" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* LoginBanner full width */}
      <Box sx={{ width: "100%", display: "flex" }}>
        <LoginBanner officerName={officerName} />
      </Box>

      {/* Discussion Forum Card */}
<Box
  mb={4}
  sx={{
    mt: 6, // adds gap from banner above
    mx: { xs: 2, sm: 4, md: 6 }, // horizontal margin to avoid full width
  }}
>
  <Card
    sx={{
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: 8,
        transform: "translateY(-5px)",
      },
      height: 120,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 2,
      borderRadius: 2,
      background: "#f2f2f2", // light yellow to light blue
    }}
          onClick={() => navigate("/discussion-forum")} // Card click
        >
          <CardContent sx={{ flex: 1 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#333", mb: 0.5 }}
      >
        Discussion Forum
      </Typography>
      <Typography variant="body2" sx={{ color: "#555" }}>
        Explore categories, threads, and participate in discussions.
      </Typography>
    </CardContent>
    <Button
      variant="contained"
      sx={{
        bgcolor: "goldenrod",
        color: "#fff",
        "&:hover": { bgcolor: "#5d91f9ff" },
      }}
    >
      Go
    </Button>
  </Card>
</Box>

      {/* StatsCards */}
      <StatsCards stats={stats} />

      {/* Dashboard content */}
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#f2f2f2", p: 3, borderRadius: 2, mt: 2 }}>
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
              <StudentAssessment />
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: "flex", flexGrow: 1 }}>
              <TopPerformingStudents students={topStudents} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
