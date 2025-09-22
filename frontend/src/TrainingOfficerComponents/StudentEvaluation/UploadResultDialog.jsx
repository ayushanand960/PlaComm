import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";

const dummyStudents = [
  { id: 1, name: "Ravi Kumar", marks: 9 },
  { id: 2, name: "Sneha Gupta", marks: 7 },
  { id: 3, name: "Aman Verma", marks: 5 },
  { id: 4, name: "Priya Sharma", marks: 3 },
];

export default function UploadResultDialog({
  open,
  onClose,
  activity,
  onSubmit,
}) {
  const [students, setStudents] = useState([]);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    // Sort dummy students descending by marks
    const sorted = [...dummyStudents].sort((a, b) => b.marks - a.marks);
    setStudents(sorted);
    setVerified(true);
  };

  const handleSubmit = () => {
    onSubmit(activity, students);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Upload Result</DialogTitle>
      <DialogContent dividers>
        {/* Activity Info */}
        <Typography variant="subtitle1" gutterBottom>
          <strong>Topic:</strong> {activity?.topic}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Job:</strong> {activity?.jobListing}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Session:</strong> {activity?.session}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Date:</strong> {activity?.date}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Courses:</strong> {activity?.courses?.join(", ")}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Total Courses:</strong> {activity?.courses?.length}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Max Marks:</strong> {activity?.maxMarks}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Min Marks:</strong> {activity?.minMarks}
        </Typography>

        {/* File Upload (dummy now, Excel parsing later) */}
        <Box mt={2} mb={2}>
          <Button variant="outlined" component="label">
            Upload Excel File
            <input type="file" hidden />
          </Button>
        </Box>

        {/* Verify Button */}
        <Button variant="contained" onClick={handleVerify}>
          Verify
        </Button>

        {/* Students List After Verify */}
        {verified && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Student Results (Descending Order)
            </Typography>
            {students.map((s) => (
              <Box
                key={s.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
                borderBottom="1px solid #ddd"
              >
                <Typography>
                  {s.name} — {s.marks} Marks
                </Typography>
                {s.marks >= activity.minMarks ? (
                  <Chip label="Eligible" color="primary" />
                ) : (
                  <Chip label="Non Eligible" color="success" />
                )}
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={!verified}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
