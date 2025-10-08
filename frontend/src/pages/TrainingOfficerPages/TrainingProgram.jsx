// import React from "react";
// import { Box, Typography } from "@mui/material";
// import Program from "../../TrainingOfficerComponents/TrainingProgram/Program";

// const TrainingProgram = () => {
//   return (
//     <Box sx={{ p: 3 ,pt:3 , fontWeight: "bold", mb: 6, textAlign: "center"}}>
//       <Typography variant="h4" fontWeight="bold" mb={3} >
//         Training Programs
//       </Typography>

//       <Box
//         sx={{
//         display: "flex",
//         flexWrap: "wrap",
//         gap: 5, // 🔥 increased gap between cards
//         justifyContent: "center",
//         bgcolor: "#f5f5f5", // greyish background like dashboard
//         py: 5,
//   }}
//       >
//         <Program
//           title="Group Discussion"
//           basePath="/trainingprogram/gd"
//           description="Evaluate communication and teamwork skills"
//           type="gd"
//         />

//         <Program
//           title="Aptitude Test"
//           basePath="/trainingprogram/aptitude"
//           description="Assess logical reasoning and problem-solving"
//           type="aptitude"
//         />

//         <Program
//           title="Technical Assessment"
//           basePath="/trainingprogram/technical"
//           description="Evaluate technical skills and knowledge"
//           type="technical"
//         />

//         <Program
//           title="Mock Interview"
//           basePath="/trainingprogram/mock"
//           description="Assess candidate skills through practice interviews."
//           type="mock"
//         />

//         <Program
//           title="Personal Interview"
//           basePath="/trainingprogram/pi"
//           description="One-on-one assessment with personalized feedback."
//           type="pi"
//         />
//       </Box>
//     </Box>
//   );
// };

// export default TrainingProgram;

// src/pages/TrainingProgram.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import Program from "../../components/trainingOfficer/TrainingProgram/Program";

const TrainingProgram = () => {
  return (
    <Box sx={{ p: 3, pt: 3, fontWeight: "bold", mb: 6, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Training Programs
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          justifyContent: "center",
          bgcolor: "#f5f5f5",
          py: 5,
        }}
      >
        <Program
          title="Group Discussion"
          description="Evaluate communication and teamwork skills"
          type="gd"
        />
        <Program
          title="Aptitude Test"
          description="Assess logical reasoning and problem-solving"
          type="apt" // ✅ not "aptitude"
        />
        <Program
          title="Technical Assessment"
          description="Evaluate technical skills and knowledge"
          type="tech" // ✅ not "technical"
        />
        <Program
          title="Mock Interview"
          description="Assess candidate skills through practice interviews."
          type="mock"
        />
        <Program
          title="Personal Interview"
          description="One-on-one assessment with personalized feedback."
          type="pi"
        />
      </Box>
    </Box>
  );
};

export default TrainingProgram;
