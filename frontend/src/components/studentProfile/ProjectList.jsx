import React, {useEffect,useState} from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Card, CardContent, CardActions, Typography } from "@mui/material";
import axiosInstance from "../../api/axiosInstance";

export default function ProjectList(){
  const [list,setList] = useState([]); const [open,setOpen] = useState(false); const [editing,setEditing] = useState(null);
  const [form,setForm] = useState({title:"",description:"",tech_stack:"",repo_link:""});

  const fetch = async ()=>{ try{const res = await axiosInstance.get("/students/projects/"); setList(res.data);}catch(e){console.error(e);} };
  useEffect(()=>{fetch();},[]);

  const handleOpen = (item=null)=>{ setEditing(item); setForm(item?{...item}:{title:"",description:"",tech_stack:"",repo_link:""}); setOpen(true); }
  const handleClose = ()=>{ setOpen(false); setEditing(null); }
  const handleSubmit = async ()=>{ try{ if(editing) await axiosInstance.put(`/students/projects/${editing.id}/`, form); else await axiosInstance.post("/students/projects/", form); fetch(); handleClose(); }catch(e){console.error(e); alert("Failed");} }
  const handleDelete = async id => { if(!window.confirm("Delete this project?")) return; await axiosInstance.delete(`/students/projects/${id}/`); fetch(); }

  return (
    <Box>
      <Button variant="contained" onClick={()=>handleOpen()}>Add Project</Button>
      <Grid container spacing={2} sx={{mt:2}}>
        {list.map(p=>(
          <Grid item xs={12} md={6} key={p.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography>{p.tech_stack}</Typography>
                <Typography>{p.description}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={()=>handleOpen(p)}>Edit</Button>
                <Button color="error" onClick={()=>handleDelete(p.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editing? "Edit Project":"Add Project"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField fullWidth label="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Tech Stack" value={form.tech_stack} onChange={e=>setForm({...form,tech_stack:e.target.value})} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Repo Link" value={form.repo_link} onChange={e=>setForm({...form,repo_link:e.target.value})} /></Grid>
            <Grid item xs={12}><TextField fullWidth multiline rows={4} label="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{editing?"Save":"Create"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
