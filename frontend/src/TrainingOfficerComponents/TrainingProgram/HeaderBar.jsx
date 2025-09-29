// // src/components/HeaderBar.jsx
// import React from "react";
// import { Box, IconButton, Typography } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate } from "react-router-dom";

// const HeaderBar = ({ title}) => {
//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         bgcolor: "goldenrod",
//         color: "white",
//         px: 2,
//         py: 1.5,
//         width: "100%",
//         position: "fixed",     // 👈 keeps it fixed at top
//         top: 0,
//         left: 0,
//         zIndex: 1200,           // 👈 keeps it above other elements
//       }}
//     >
//       {/* Back button */}
//       <IconButton
//         onClick={() => navigate(-1)}
//         sx={{
//           color: "white",
//           mr: 2,
//         }}
//       >
//         <ArrowBackIcon />
//       </IconButton>

//       {/* Page Title */}
//       <Typography variant="h6" fontWeight="bold">
//         {title}
//       </Typography>
//     </Box>
//   );
// };

// export default HeaderBar;

// src/components/HeaderBar.jsx
import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const HeaderBar = ({ title, backPath }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath); // explicit path
    } else {
      navigate(-1); // fallback: one step back
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "goldenrod",
        color: "white",
        px: 2,
        py: 1.5,
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1200,
      }}
    >
      {/* Back button */}
      <IconButton
        onClick={handleBack}
        sx={{
          color: "white",
          mr: 2,
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Page Title */}
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
};

export default HeaderBar;
