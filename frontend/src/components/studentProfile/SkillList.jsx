import React, {useEffect,useState} from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Card, CardContent, CardActions, MenuItem, Typography } from "@mui/material";
import axiosInstance from "../../api/axiosInstance";

const levels = ["Beginner","Intermediate","Advanced"];

export default function SkillList(){
  const [list,setList] = useState([]); const [open,setOpen] = useState(false); const [editing,setEditing] = useState(null);
  const [form,setForm] = useState({name:"",level:""});

  const fetch = async ()=>{ try{ const res = await axiosInstance.get("/students/skills/"); setList(res.data);}catch(e){console.error(e);} };
  useEffect(()=>{fetch();},[]);

  const handleOpen = (item=null)=>{ setEditing(item); setForm(item?{...item}:{name:"",level:""}); setOpen(true); }
  const handleClose = ()=>{ setOpen(false); setEditing(null); }
  const handleSubmit = async () => {
  try {
    if (editing) {
      await axiosInstance.patch(`/students/projects/${editing.id}/`, form);
    } else {
      await axiosInstance.post("/students/projects/", form);
    }
    fetch();
    handleClose();
  } catch (e) {
    console.error(e.response?.data || e.message);
    alert("Failed");
  }
};

  const handleDelete = async id => { if(!window.confirm("Delete?")) return; await axiosInstance.delete(`/students/skills/${id}/`); fetch(); }

  return (
    <Box>
      <Button variant="contained" onClick={()=>handleOpen()}>Add Skill</Button>
      <Grid container spacing={2} sx={{mt:2}}>
        {list.map(s=>(
          <Grid item xs={12} md={4} key={s.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{s.name}</Typography>
                <Typography>{s.level}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={()=>handleOpen(s)}>Edit</Button>
                <Button color="error" onClick={()=>handleDelete(s.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing? "Edit Skill":"Add Skill"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{mt:0}}>
            <Grid item xs={12}><TextField fullWidth label="Skill name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></Grid>
            <Grid item xs={12}><TextField select fullWidth label="Level" value={form.level} onChange={e=>setForm({...form,level:e.target.value})}>
              {levels.map(l=> <MenuItem key={l} value={l}>{l}</MenuItem>)}
            </TextField></Grid>
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
