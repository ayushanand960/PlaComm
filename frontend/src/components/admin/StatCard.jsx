// import React from "react";
// import { Card, CardContent, Typography, Box } from "@mui/material";

// const StatCard = ({ title, value, description, icon }) => {
//   return (
//     <Card
//       elevation={4} // MUI built-in shadow
//       sx={{
//         boxShadow: "0px 4px 12px rgba(0,0,0,0.2)", // custom soft shadow
//         borderRadius: "12px",
//         transition: "0.3s",
//         "&:hover": {
//           boxShadow: "0px 8px 20px rgba(0,0,0,0.3)", // hover pe thoda deep shadow
//           transform: "translateY(-4px)", // thoda upar uthta effect
//         },
//       }}
//     >
//       <CardContent>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="subtitle1" fontWeight="bold">
//             {title}
//           </Typography>
//           {icon}
//         </Box>
//         <Typography variant="h4" mt={2} fontWeight="bold">
//           {value}
//         </Typography>
//         <Typography color="textSecondary">{description}</Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default StatCard;

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const StatCard = ({ title, value, description, icon, bgColor }) => {
  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        background: bgColor
          ? `linear-gradient(135deg, ${bgColor}20, #ffffff)`
          : "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        transition: "all 0.4s ease",
        boxShadow:
          "0 4px 20px rgba(13,71,161,0.08), 0 2px 8px rgba(0,0,0,0.05)",
        "&:hover": {
          transform: "translateY(-6px) scale(1.02)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          "&::before": {
            left: "120%",
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-60%",
          width: "50%",
          height: "100%",
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
          transform: "skewX(-25deg)",
          transition: "0.7s",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Top Row */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              color: "#0d47a1",
              letterSpacing: "0.3px",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "12px",
              background: bgColor
                ? bgColor + "22"
                : "rgba(13,71,161,0.1)",
              color: bgColor ? bgColor : "#0d47a1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              transition: "all 0.3s ease",
              "&:hover": {
                background: bgColor
                  ? bgColor + "33"
                  : "rgba(13,71,161,0.2)",
                transform: "scale(1.1)",
              },
            }}
          >
            {icon}
          </Box>
        </Box>

        {/* Main Value */}
        <Typography
          variant="h4"
          mt={2}
          fontWeight="700"
          sx={{
            color: bgColor ? bgColor : "#0d47a1",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {value}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: "rgba(0,0,0,0.6)",
            mt: 0.5,
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
