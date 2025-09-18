import React from "react";
import { Paper, Box, Typography, Button, Chip } from "@mui/material";

const ApplicationStatus = ({ applications }) => {
  return (
    <Box>
      <Typography variant="h6" mb={2}>Recent Applications</Typography>
      {applications.map((app, i) => (
        <Paper key={i} sx={{ p: 6, mb: 2, borderRadius: 3, maxWidth: 600 }} elevation={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle1">{app.company}</Typography>
              <Typography variant="body2">{app.role}</Typography>
              <Typography variant="caption">Applied: {app.date}</Typography>
            </Box>
            <Box>
              <Chip label={app.status} color={
                app.status === "Interview Scheduled" ? "success" :
                app.status === "Under Review" ? "warning" :
                "primary"
              } sx={{ mr: 2 }}/>
              <Button variant="outlined">View</Button>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default ApplicationStatus;
