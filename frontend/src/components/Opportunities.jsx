import React from "react";
import { Paper, Box, Typography, Chip, Button, Stack } from "@mui/material";

const Opportunities = ({ opportunities }) => {
  return (
    <Box mb={3}>
      <Typography variant="h6" mb={2}>Latest Opportunities</Typography>
      {opportunities.map((job, i) => (
        <Paper key={i} sx={{ p: 2, mb: 2, borderRadius: 3}}>
          <Typography variant="subtitle1">{job.company}</Typography>
          <Typography variant="body2">{job.role} | {job.type}</Typography>
          <Typography variant="body2">Location: {job.location}</Typography>
          <Typography variant="body2">Deadline: {job.deadline}</Typography>
          <Typography variant="body2" fontWeight="bold">{job.salary}</Typography>
          <Stack direction="row" spacing={1} mt={1}>
            {job.skills.map((skill, i) => <Chip key={i} label={skill} />)}
          </Stack>
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained">Apply Now</Button>
            <Button variant="outlined">Upload Resume</Button>
            <Button variant="text" color="error">Not Interested</Button>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};

export default Opportunities;
