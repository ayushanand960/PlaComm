// src/components/DriveCard.jsx
import React from "react";
import { Card, CardContent, Typography, Button, LinearProgress, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DriveCard = ({ drive }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6">{drive.companyName}</Typography>
          <Chip label={drive.status} color={
            drive.status === "Upcoming" ? "info" : drive.status === "Ongoing" ? "success" : "default"
          } size="small"/>
        </Box>
        <Typography color="text.secondary">{drive.position}</Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
          <Typography variant="body2">📅 {drive.date} at {drive.time}</Typography>
          <Typography variant="body2">📍 {drive.location}</Typography>
          <Typography variant="body2">💰 {drive.salary}</Typography>
          <Typography variant="body2">👤 Coordinator: {drive.coordinator}</Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">Registrations</Typography>
          <LinearProgress 
            variant="determinate" 
            value={(drive.registrations / drive.totalSeats) * 100} 
            sx={{ height: 10, borderRadius: 5, mb: 0.5 }}
          />
          <Typography variant="caption">{drive.registrations}/{drive.totalSeats}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {drive.selectionRounds.map((round, index) => (
            <Chip key={index} label={round} size="small" />
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
          <Button variant="outlined" onClick={() => navigate(`/viewdetails/${drive.id}`)}>View Details</Button>
          <Button variant="outlined" onClick={() => navigate(`/editdrive/${drive.id}`)}>Edit Drive</Button>
          <Button variant="contained" onClick={() => navigate(`/manageapplications/${drive.id}`)}>Manage Applications</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DriveCard;
