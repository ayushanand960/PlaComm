import React, { useEffect, useState } from "react";
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Grid, Card, CardContent, CardActions, Typography
} from "@mui/material";
import axiosInstance from "../../api/axiosInstance";

export default function AcademicList() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    degree: "", branch: "", institute: "", year_of_passing: "", cgpa: ""
  });

  const fetch = async () => {
    try {
      const res = await axiosInstance.get("/students/academics/");
      setList(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetch(); }, []);

  const handleOpen = (item = null) => {
    setEditing(item);
    setForm(item ? { ...item } : { degree: "", branch: "", institute: "", year_of_passing: "", cgpa: "" });
    setOpen(true);
  };

  const handleClose = () => { setOpen(false); setEditing(null); };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await axiosInstance.put(`/students/academics/${editing.id}/`, form);
      } else {
        await axiosInstance.post("/students/academics/", form);
      }
      fetch();
      handleClose();
    } catch (e) { console.error(e); alert("Failed"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    await axiosInstance.delete(`/students/academics/${id}/`);
    fetch();
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => handleOpen()}>Add Academic</Button>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {list.map(item => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.degree}</Typography>
                <Typography>{item.institute} — {item.branch}</Typography>
                <Typography>Year: {item.year_of_passing} | CGPA: {item.cgpa}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleOpen(item)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(item.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editing ? "Edit Academic" : "Add Academic"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField label="Degree" fullWidth value={form.degree} onChange={e => setForm({...form, degree: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Branch" fullWidth value={form.branch} onChange={e => setForm({...form, branch: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Institute" fullWidth value={form.institute} onChange={e => setForm({...form, institute: e.target.value})} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Year of passing" fullWidth value={form.year_of_passing} onChange={e => setForm({...form, year_of_passing: e.target.value})} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="CGPA" fullWidth value={form.cgpa} onChange={e => setForm({...form, cgpa: e.target.value})} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{editing ? "Save" : "Create"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
