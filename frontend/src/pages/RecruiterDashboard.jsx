// import React from "react";
// import { Container, Box, Button, Typography } from "@mui/material";
// import Navbar from "../components/Recruits/RecruiterNavbar";
// import DashboardMetrics from "../components/Recruits/DashboardMetrics";
// import JobPostingCard from "../components/Recruits/JobPostingCard";
// import PriorityStudents from "../components/Recruits/PriorityStudents";

// const RecruiterDashboard = () => {
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         background: "linear-gradient(270deg, #42a5f5, #66bb6a, #ab47bc, #ffa726)",
//         backgroundSize: "800% 800%",
//         animation: "gradientBG 15s ease infinite",
//         position: "relative",
//         overflow: "hidden",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: "-50%",
//           width: "50%",
//           height: "100%",
//           background:
//             "linear-gradient(120deg, rgba(255,255,255,0.2) 0%, transparent 80%)",
//           transform: "skewX(-20deg)",
//           animation: "shine 6s infinite",
//         },
//         "@keyframes gradientBG": {
//           "0%": { backgroundPosition: "0% 50%" },
//           "50%": { backgroundPosition: "100% 50%" },
//           "100%": { backgroundPosition: "0% 50%" },
//         },
//         "@keyframes shine": {
//           "0%": { left: "-50%" },
//           "100%": { left: "120%" },
//         },
//       }}
//     >
//       <Navbar />
//       <Container
//         maxWidth="lg"
//         sx={{
//           mt: 4,
//           flexGrow: 1,
//           bgcolor: "rgba(255,255,255,0.85)",
//           borderRadius: 3,
//           p: 3,
//           boxShadow: 3,
//           backdropFilter: "blur(8px)",
//         }}
//       >
//         <DashboardMetrics />

//         {/* Job Posting Section */}
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h6">Your Job Postings</Typography>
//           <Typography variant="body2" color="text.secondary">
//             Manage recruitment process
//           </Typography>
//           <Box sx={{ mt: 2, mb: 2 }}>
//             <Button variant="contained" sx={{ mr: 2 }}>
//               Post New Job
//             </Button>
//             <Button variant="outlined">View Analytics</Button>
//           </Box>
//           <JobPostingCard />
//         </Box>

//         {/* Priority Students */}
//         <PriorityStudents />
//       </Container>
//     </Box>
//   );
// };

// export default RecruiterDashboard;




import React from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import Navbar from "../components/Recruits/RecruiterNavbar";
import DashboardMetrics from "../components/Recruits/DashboardMetrics";
import JobPostingCard from "../components/Recruits/JobPostingCard";
import PriorityStudents from "../components/Recruits/PriorityStudents";

const RecruiterDashboard = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(270deg, #42a5f5, #66bb6a, #ab47bc, #ffa726)",
        backgroundSize: "800% 800%",
        animation: "gradientBG 15s ease infinite",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-50%",
          width: "50%",
          height: "100%",
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.2) 0%, transparent 80%)",
          transform: "skewX(-20deg)",
          animation: "shine 6s infinite",
        },
        "@keyframes gradientBG": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "@keyframes shine": {
          "0%": { left: "-50%" },
          "100%": { left: "120%" },
        },
      }}
    >
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          flexGrow: 1,
          bgcolor: "rgba(255,255,255,0.85)",
          borderRadius: 3,
          p: 3,
          boxShadow: 3,
          backdropFilter: "blur(8px)",
        }}
      >
        <DashboardMetrics />

        {/* Job Posting Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Your Job Postings</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage recruitment process
          </Typography>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button variant="contained" sx={{ mr: 2 }}>
              Post New Job
            </Button>
            <Button variant="outlined">View Analytics</Button>
          </Box>
          <JobPostingCard />
        </Box>

        {/* Priority Students */}
        <PriorityStudents />
      </Container>
    </Box>
  );
};

export default RecruiterDashboard;
