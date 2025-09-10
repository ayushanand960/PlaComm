import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import axiosInstance from "../../api/axiosInstance";

export default function PersonalDetailList() {
  const [details, setDetails] = useState(null); // fetched details
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({}); // form state for editing

  // Fetch personal details from backend
  const fetchDetails = async () => {
    try {
      const res = await axiosInstance.get("/users/personal-details/");
      setDetails(res.data);
      setForm(res.data); // pre-fill form with existing details
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      await axiosInstance.put("/users/personal-details/", form);
      fetchDetails(); // update details after saving
      handleClose();
      alert("Personal details updated successfully!");
    } catch (e) {
      console.error(e);
      alert("Update failed");
    }
  };

  if (!details) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Edit Personal Details
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit Personal Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            {[
              "first_name",
              "middle_name",
              "last_name",
              "email",
              "phone",
              "course",
              "branch",
              "year",
              "gender",
            ].map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  label={field.replace("_", " ").toUpperCase()}
                  fullWidth
                  value={form[field] || ""}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
