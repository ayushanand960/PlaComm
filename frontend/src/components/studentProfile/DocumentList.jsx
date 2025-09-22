import React, {useEffect,useState} from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Card, CardContent, CardActions, Typography, Link } from "@mui/material";
import axiosInstance from "../../api/axiosInstance";

export default function DocumentList(){
  const [list,setList] = useState([]); const [open,setOpen] = useState(false); const [editing,setEditing] = useState(null);
  const [form,setForm] = useState({title:"", file: null});

  const fetch = async ()=>{ try{ const res = await axiosInstance.get("/students/documents/"); setList(res.data);}catch(e){console.error(e);} };
  useEffect(()=>{fetch();},[]);

  const handleOpen = (item=null)=>{ setEditing(item); setForm(item?{...item, file:null}:{title:"", file:null}); setOpen(true); }
  const handleClose = ()=>{ setOpen(false); setEditing(null); }
  const handleSubmit = async () => {
  try {
    const data = new FormData();
    data.append("title", form.title);
    if (form.file) data.append("file", form.file);

    if (editing) {
      const res = await axiosInstance.patch(`/students/documents/${editing.id}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setList(list.map(d => (d.id === editing.id ? res.data : d)));
    } else {
      const res = await axiosInstance.post("/students/documents/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setList([...list, res.data]);
    }

    setForm({ title: "", file: null });
    handleClose();
  } catch (e) {
    console.error(e.response?.data || e.message);
    alert("Failed");
  }
};

  const handleDelete = async id => { if(!window.confirm("Delete?")) return; await axiosInstance.delete(`/students/documents/${id}/`); fetch(); }

  return (
    <Box>
      <Button variant="contained" onClick={()=>handleOpen()}>Upload Document</Button>
      <Grid container spacing={2} sx={{mt:2}}>
        {list.map(d=>(
          <Grid item xs={12} md={6} key={d.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{d.title || d.file}</Typography>
                <Typography>Uploaded: {new Date(d.uploaded_at).toLocaleString()}</Typography>
                {d.file && <Link href={d.file} target="_blank" rel="noreferrer">Open</Link>}
              </CardContent>
              <CardActions>
                <Button onClick={()=>handleOpen(d)}>Edit</Button>
                <Button color="error" onClick={()=>handleDelete(d.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editing? "Edit Document":"Upload Document"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{mt:0}}>
            <Grid item xs={12}><TextField fullWidth label="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /></Grid>
            <Grid item xs={12}><input type="file" onChange={e=>setForm({...form, file: e.target.files[0]})} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{editing?"Save":"Upload"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
