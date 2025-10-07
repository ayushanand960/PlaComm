// src/TrainingOfficerComponents/TrainingProgram/CreateActivityForm
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Grid,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const CreateActivityForm = ({ activityType, editData, onUpdate }) => {
  const [formData, setFormData] = useState({
    jobListing: "",
    topic: "",
    session: "",
    date: "",
    resultDate: "",
    maxMarks: 50,
    minMarks: 20,
    nominee: "",
    remark: "",
    courses: [],
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Refs for date inputs
  const dateRef = useRef(null);
  const resultDateRef = useRef(null);

  // Generate sessions dynamically (5 years)
  const currentYear = new Date().getFullYear();
  const sessions = Array.from({ length: 5 }, (_, i) => `${currentYear + i}-${currentYear + i + 1}`);

  const jobListings = ["Software Engineer", "Data Analyst", "Backend Developer", "UI/UX Designer"];

  const courses = [
    "Computer Science", "Electronics", "Mechanical", "Civil", "IT", "AI & ML", "Data Science",
    "Cyber Security", "Networking", "Business Analytics", "Robotics", "Physics", "Chemistry",
    "Mathematics", "Biotechnology", "Economics", "Statistics", "Electrical", "Design", "Marketing",
  ];

  // Prefill form when editData changes
  useEffect(() => {
    if (editData) {
      setFormData({
        jobListing: editData.jobListing || "",
        topic: editData.topic || "",
        session: editData.session || "",
        date: editData.date || "",
        resultDate: editData.resultDate || "",
        maxMarks: editData.maxMarks || 50,
        minMarks: editData.minMarks || 20,
        nominee: editData.nominee || "",
        remark: editData.remark || "",
        courses: editData.courses || [],
      });
    }
  }, [editData]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (course) => {
    const updatedCourses = formData.courses.includes(course)
      ? formData.courses.filter((c) => c !== course)
      : [...formData.courses, course];
    setFormData({ ...formData, courses: updatedCourses });
  };

  const handleMarksChange = (field, delta) => {
    setFormData({
      ...formData,
      [field]: Math.max(0, formData[field] + delta),
    });
  };

  // ✅ Handle submit (create or edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      id: editData ? editData.id : Date.now(),
      type: activityType,   // "GD" for GD activities
      ...formData,
      createdAt: editData ? editData.createdAt : new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("activities")) || [];

    if (editData) {
      // Update existing activity
      const updated = existing.map((a) => (a.id === editData.id ? newActivity : a));
      localStorage.setItem("activities", JSON.stringify(updated));
      onUpdate && onUpdate(); // refresh parent list
    } else {
      // Add new activity
      existing.push(newActivity);
      localStorage.setItem("activities", JSON.stringify(existing));
    }

    // Reset form only if creating new
    if (!editData) {
      setFormData({
        jobListing: "",
        topic: "",
        session: "",
        date: "",
        resultDate: "",
        maxMarks: 50,
        minMarks: 20,
        nominee: "",
        remark: "",
        courses: [],
      });
    }

    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 1, p: 1, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
      <Typography variant="h6" gutterBottom>
        {editData 
          ? `Edit ${activityType} Activity` 
          : `Create ${activityType} Activity`}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField select label="Job Listing" name="jobListing" fullWidth margin="dense"
          value={formData.jobListing} onChange={handleChange}>
          {jobListings.map((job, i) => <MenuItem key={i} value={job}>{job}</MenuItem>)}
        </TextField>

        <TextField label="Topic" name="topic" fullWidth margin="normal" value={formData.topic} onChange={handleChange} />

        <TextField select label="Session" name="session" fullWidth margin="normal" value={formData.session} onChange={handleChange}>
          {sessions.map((s, i) => <MenuItem key={i} value={s}>{s}</MenuItem>)}
        </TextField>

        {/* Date with calendar icon */}
        <TextField
          type="date"
          label="Date"
          name="date"
          fullWidth
          margin="normal"
          inputRef={dateRef}
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => dateRef.current.showPicker()}>
                  <CalendarTodayIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Result Date with calendar icon */}
        <TextField
          type="date"
          label="Result Date"
          name="resultDate"
          fullWidth
          margin="normal"
          inputRef={resultDateRef}
          InputLabelProps={{ shrink: true }}
          value={formData.resultDate}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => resultDateRef.current.showPicker()}>
                  <CalendarTodayIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Max/Min Marks */}
        <Box display="flex" alignItems="center" mt={2}>
          <Typography sx={{ minWidth: 100 }}>Max Marks</Typography>
          <IconButton onClick={() => handleMarksChange("maxMarks", -5)}><RemoveIcon /></IconButton>
          <TextField type="number" value={formData.maxMarks} onChange={(e) => handleChange({ target: { name: "maxMarks", value: parseInt(e.target.value) } })} sx={{ width: 80, mx: 1 }} />
          <IconButton onClick={() => handleMarksChange("maxMarks", 5)}><AddIcon /></IconButton>
        </Box>

        <Box display="flex" alignItems="center" mt={2}>
          <Typography sx={{ minWidth: 100 }}>Min Marks</Typography>
          <IconButton onClick={() => handleMarksChange("minMarks", -5)}><RemoveIcon /></IconButton>
          <TextField type="number" value={formData.minMarks} onChange={(e) => handleChange({ target: { name: "minMarks", value: parseInt(e.target.value) } })} sx={{ width: 80, mx: 1 }} />
          <IconButton onClick={() => handleMarksChange("minMarks", 5)}><AddIcon /></IconButton>
        </Box>

        <TextField label="Nominee" name="nominee" fullWidth margin="normal" value={formData.nominee} onChange={handleChange} />
        <TextField label="Remark" name="remark" fullWidth margin="normal" multiline rows={2} value={formData.remark} onChange={handleChange} />

        <Typography variant="subtitle1" mt={2}>Select Courses</Typography>
        <Grid container spacing={1}>
          {courses.map((course, i) => (
            <Grid item xs={6} sm={4} key={i}>
              <FormControlLabel control={
                <Checkbox checked={formData.courses.includes(course)} onChange={() => handleCheckboxChange(course)} />
              } label={course} />
            </Grid>
          ))}
        </Grid>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          {editData ? "Update Activity" : "Create Activity"}
        </Button>
      </form>

      {/* Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="success" sx={{ width: "100%" }}>
          ✅ {editData ? "Activity updated!" : "Activity Created Successfully! Check In View Activity"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateActivityForm;
