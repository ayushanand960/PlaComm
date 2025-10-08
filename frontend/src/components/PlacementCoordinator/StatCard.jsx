// src/components/StatCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatCard({ title, value, subText, icon }) {
  return (
    <Card sx={{ flex: 1, minWidth: 200, margin: 1 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
          <Typography variant="h5" fontWeight="bold">{value}</Typography>
          {subText && <Typography variant="caption" color="textSecondary">{subText}</Typography>}
        </Box>
        <Box>{icon}</Box>
      </CardContent>
    </Card>
  );
}
