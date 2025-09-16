// src/components/admin/StatCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const StatCard = ({ title, value, description, icon }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
          {icon}
        </Box>
        <Typography variant="h4" mt={2}>{value}</Typography>
        <Typography color="textSecondary">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
