import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const StatCard = ({ title, value, description, icon }) => {
  return (
    <Card
      elevation={4} // MUI built-in shadow
      sx={{
        boxShadow: "0px 4px 12px rgba(0,0,0,0.2)", // custom soft shadow
        borderRadius: "12px",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0px 8px 20px rgba(0,0,0,0.3)", // hover pe thoda deep shadow
          transform: "translateY(-4px)", // thoda upar uthta effect
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
          {icon}
        </Box>
        <Typography variant="h4" mt={2} fontWeight="bold">
          {value}
        </Typography>
        <Typography color="textSecondary">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
