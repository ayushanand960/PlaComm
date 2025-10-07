import React from "react";
import { Box, Typography } from "@mui/material";
import Program from "../../TrainingOfficerComponents/TrainingProgram/Program";
import { motion } from "framer-motion";

const TrainingProgram = () => {
  return (
    <Box sx={{ p: 3 ,pt:3 , fontWeight: "bold", mb: 6, textAlign: "center"}}>
      <motion.div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
    justifyContent: "center",
    padding: "40px",
    borderRadius: "12px",
  }}
  animate={{
    background: [
      "linear-gradient(135deg, #1046a8, #6495ED, #8D77D1)",
      "linear-gradient(135deg, #DAA520, #FF8C42, #F87769)",
      "linear-gradient(135deg, #18C381, #1046a8, #DAA520)",
      "linear-gradient(135deg, #1046a8, #6495ED, #8D77D1)"
    ],
  }}
  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
>
      <Typography variant="h4" fontWeight="bold" mb={3} color="white">
        Training Programs
      </Typography>

      <Box
        sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 5, // 🔥 increased gap between cards
        justifyContent: "center",
        // bgcolor: "#f5f5f5" greyish background like dashboard
        py: 5,
  }}
      >
        <Program
          title="Group Discussion"
          basePath="/trainingprogram/gd"
          description="Evaluate communication and teamwork skills"
          type="gd"
        />

        <Program
          title="Aptitude Test"
          basePath="/trainingprogram/aptitude"
          description="Assess logical reasoning and problem-solving"
          type="aptitude"
        />

        <Program
          title="Technical Assessment"
          basePath="/trainingprogram/technical"
          description="Evaluate technical skills and knowledge"
          type="technical"
        />

        <Program
          title="Mock Interview"
          basePath="/trainingprogram/mock"
          description="Assess candidate skills through practice interviews."
          type="mock"
        />

        <Program
          title="Personal Interview"
          basePath="/trainingprogram/pi"
          description="One-on-one assessment with personalized feedback."
          type="pi"
        />
       
      </Box>
      </motion.div>
    </Box>
  );
};

export default TrainingProgram;
