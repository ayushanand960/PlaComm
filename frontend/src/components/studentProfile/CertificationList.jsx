// import React, {useEffect,useState} from "react";
// import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Card, CardContent, CardActions, Typography } from "@mui/material";
// import axiosInstance from "../../api/axiosInstance";

// export default function CertificationList(){
//   const [list,setList] = useState([]); const [open,setOpen] = useState(false); const [editing,setEditing] = useState(null);
//   const [form,setForm] = useState({name:"",provider:"",date:"", file: null});

//   const fetch = async ()=>{ try{ const res = await axiosInstance.get("/students/certifications/"); setList(res.data);}catch(e){console.error(e);} };
//   useEffect(()=>{fetch();},[]);

//   const handleOpen = (item=null)=>{ setEditing(item); setForm(item?{...item, file: null}:{name:"",provider:"",date:"",file:null}); setOpen(true); }
//   const handleClose = ()=>{ setOpen(false); setEditing(null); }
//   const handleSubmit = async ()=>{
//     try{
//       const data = new FormData();
//       data.append("name", form.name);
//       data.append("provider", form.provider);
//       if(form.date) data.append("date", form.date);
//       if(form.file) data.append("file", form.file);

//       if(editing){
//         await axiosInstance.put(`/students/certifications/${editing.id}/`, data, { headers: { "Content-Type": "multipart/form-data" }});
//       } else {
//         await axiosInstance.post("/students/certifications/", data, { headers: { "Content-Type": "multipart/form-data" }});
//       }
//       fetch(); handleClose();
//     }catch(e){console.error(e); alert("Failed");}
//   };

//   const handleDelete = async id => { if(!window.confirm("Delete?")) return; await axiosInstance.delete(`/students/certifications/${id}/`); fetch(); }

//   return (
//     <Box>
//       <Button variant="contained" onClick={()=>handleOpen()}>Add Certification</Button>
//       <Grid container spacing={2} sx={{mt:2}}>
//         {list.map(c=>(
//           <Grid item xs={12} md={6} key={c.id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{c.name}</Typography>
//                 <Typography>{c.provider} — {c.date}</Typography>
//               </CardContent>
//               <CardActions>
//                 <Button onClick={()=>handleOpen(c)}>Edit</Button>
//                 <Button color="error" onClick={()=>handleDelete(c.id)}>Delete</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Dialog open={open} onClose={handleClose} fullWidth>
//         <DialogTitle>{editing? "Edit Certification":"Add Certification"}</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{mt:0}}>
//             <Grid item xs={12}><TextField fullWidth label="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></Grid>
//             <Grid item xs={12}><TextField fullWidth label="Provider" value={form.provider} onChange={e=>setForm({...form,provider:e.target.value})} /></Grid>
//             <Grid item xs={12}><TextField fullWidth type="date" InputLabelProps={{shrink:true}} label="Date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} /></Grid>
//             <Grid item xs={12}>
//               <input type="file" onChange={e=>setForm({...form, file: e.target.files[0]})} />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit}>{editing?"Save":"Create"}</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }






// src/pages/student/CertificationList.jsx
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
  Card,
  CardContent,
  CardActions,
  Typography,
  Link,
} from "@mui/material";
import axiosInstance from "../../api/axiosInstance";

export default function CertificationList() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    provider: "",
    date: "",
    file: null,
  });

  // Fetch certifications
  const fetchCertifications = async () => {
    try {
      const res = await axiosInstance.get("/students/certifications/");
      setList(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  // Open modal
  const handleOpen = (item = null) => {
    setEditing(item);
    setForm(
      item
        ? { ...item, file: null }
        : { name: "", provider: "", date: "", file: null }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
  };

  // Submit form
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("provider", form.provider);
      if (form.date) data.append("date", form.date);
      if (form.file) data.append("file", form.file);

      let res;
      if (editing) {
        res = await axiosInstance.patch(
          `/students/certifications/${editing.id}/`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setList(list.map((c) => (c.id === editing.id ? res.data : c)));
      } else {
        res = await axiosInstance.post("/students/certifications/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setList([...list, res.data]);
      }

      handleClose();
    } catch (e) {
      console.error(e.response?.data || e.message);
      alert("Failed to save certification");
    }
  };

  // Delete certification
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certification?")) return;
    try {
      await axiosInstance.delete(`/students/certifications/${id}/`);
      setList(list.filter((c) => c.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete");
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => handleOpen()}>
        Add Certification
      </Button>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {list.map((c) => (
          <Grid item xs={12} md={6} key={c.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{c.name}</Typography>
                <Typography>
                  {c.provider} — {c.date}
                </Typography>

                {/* Show uploaded file if exists */}
                {c.file && (
                  <Box sx={{ mt: 1 }}>
                    <Link
                      href={c.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </Link>
                  </Box>
                )}
              </CardContent>

              <CardActions>
                <Button onClick={() => handleOpen(c)}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(c.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Add/Edit */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {editing ? "Edit Certification" : "Add Certification"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Certification Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Provider / Organization"
                value={form.provider}
                onChange={(e) => setForm({ ...form, provider: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editing ? "Save Changes" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
