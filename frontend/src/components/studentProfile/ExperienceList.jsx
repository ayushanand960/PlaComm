import React, { useEffect, useState } from "react";
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Grid, Card, CardContent, CardActions, Typography
} from "@mui/material";
import axiosInstance from "../../api/axiosInstance";
export default function ExperienceList(){
  const [list, setList] = useState([]); const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ company: "", role: "", start_date: "", end_date: "", description: "" });

  const fetch = async ()=>{ try{ const res = await axiosInstance.get("/students/experiences/"); setList(res.data);}catch(e){console.error(e);} };
  useEffect(()=>{fetch();},[]);

  const handleOpen = (item=null)=>{ setEditing(item); setForm(item?{...item}:{company:"",role:"",start_date:"",end_date:"",description:""}); setOpen(true); }
  const handleClose = ()=>{ setOpen(false); setEditing(null); }
  const handleSubmit = async ()=>{
    try{
      if(editing) await axiosInstance.put(`/students/experiences/${editing.id}/`, form);
      else await axiosInstance.post("/students/experiences/", form);
      fetch(); handleClose();
    }catch(e){console.error(e); alert("Failed");}
  }
  const handleDelete = async id => { if(!window.confirm("Delete this?")) return; await axiosInstance.delete(`/students/experiences/${id}/`); fetch(); }

  return (
    <Box>
      <Button variant="contained" onClick={()=>handleOpen()}>Add Experience</Button>
      <Grid container spacing={2} sx={{ mt:2 }}>
        {list.map(i=>(
          <Grid key={i.id} item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">{i.role} @ {i.company}</Typography>
                <Typography>{i.start_date} — {i.end_date}</Typography>
                <Typography>{i.description}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={()=>handleOpen(i)}>Edit</Button>
                <Button color="error" onClick={()=>handleDelete(i.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editing? "Edit Experience":"Add Experience"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt:0 }}>
            <Grid item xs={12}><TextField fullWidth label="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Role" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} /></Grid>
            <Grid item xs={6}><TextField fullWidth type="date" label="Start" InputLabelProps={{ shrink:true }} value={form.start_date} onChange={e=>setForm({...form,start_date:e.target.value})} /></Grid>
            <Grid item xs={6}><TextField fullWidth type="date" label="End" InputLabelProps={{ shrink:true }} value={form.end_date} onChange={e=>setForm({...form,end_date:e.target.value})} /></Grid>
            <Grid item xs={12}><TextField fullWidth multiline rows={3} label="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{editing? "Save":"Create"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
