// // import React from 'react'

// // const PlacementDrives = () => {
// //   return (
// //     <div>PlacementDrives</div>
// //   )
// // }

// // export default PlacementDrives


// // src/pages/PlacementDrives.jsx
// import React, { useEffect, useState } from "react";
// import { Container, Typography, Button, Tabs, Tab, Box } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import DriveCard from "../components/DriveCard";
// import JobList from "./JobList"; // ✅ Import JobList at the top


// import axiosInstance from "../api/axiosInstance";

// const PlacementDrives = () => {
//   const navigate = useNavigate();
//    const { id } = useParams();
//   const [drives, setDrives] = useState([]);
//   const [tab, setTab] = useState(0);

//   useEffect(() => {
//     // Fetch drives dynamically from backend
//     axiosInstance.get("/drives") 
//       .then(res => setDrives(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const handleTabChange = (event, newValue) => {
//     setTab(newValue);
//   };

//   const filterDrives = () => {
//     switch(tab){
//       case 1: return drives.filter(d => d.status === "Upcoming");
//       case 2: return drives.filter(d => d.status === "Ongoing");
//       case 3: return drives.filter(d => d.status === "Completed");
//       default: return drives;
//     }
//   };

//   return (
//     <Container sx={{ py: 3 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//         <Box>
//           <Typography variant="h5">Placement Drives Management</Typography>
//           <Typography color="text.secondary">Create, manage and track placement drives and recruitment activities</Typography>
//         </Box>
//         <Button variant="contained"      onClick={() => navigate(`/coordinator-dashboard/${id}/job-postings`)} >+ Create New Drive</Button>
//       </Box>

//       <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
//         <Tab label="All Drives"/>
//         <Tab label="Upcoming"/>
//         <Tab label="Ongoing"/>
//         <Tab label="Completed"/>
//       </Tabs>

//       <Box>
//         {filterDrives().map(drive => (
//           <DriveCard key={drive.id} drive={drive} />
//         ))}
//       </Box>
//       {/* <pre>{JSON.stringify(drives, null, 2)}</pre> */}
//       <Box>
//   {tab === 0 ? (
//     // ✅ Reuse JobList component for "All Drives"
//     <JobList />
//   ) : (
//     // ✅ For other tabs keep using DriveCard
//     filterDrives().map((drive) => (
//       <DriveCard key={drive.id} drive={drive} />
//     ))
//   )}
// </Box>


//     </Container>

//   );
// };

// export default PlacementDrives;








// import React, { useEffect, useState } from "react";
// import { Container, Typography, Button, Tabs, Tab, Box } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import DriveCard from "../../components/PlacementCoordinator/DriveCard";
// import JobList from "./JobList";
// import axiosInstance from "../../api/axiosInstance";

// const PlacementDrives = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [drives, setDrives] = useState([]);
//   const [tab, setTab] = useState(0);

//   useEffect(() => {
//     axiosInstance.get("/drives")
//       .then(res => setDrives(res.data))
//       .catch(err => console.error("Error fetching drives:", err));
//   }, []);

//   const handleTabChange = (_, newValue) => {
//     setTab(newValue);
//   };

//   const filterDrives = () => {
//     switch (tab) {
//       case 1: return drives.filter(d => d.status === "Upcoming");
//       case 2: return drives.filter(d => d.status === "Ongoing");
//       case 3: return drives.filter(d => d.status === "Completed");
//       default: return drives;
//     }
//   };

//   return (
//     <Container sx={{ py: 3 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//         <Box>
//           <Typography variant="h5">Placement Drives Management</Typography>
//           <Typography color="text.secondary">
//             Create, manage and track placement drives and recruitment activities
//           </Typography>
//         </Box>
//         <Button
//           variant="contained"
//           onClick={() => navigate(`/coordinator-dashboard/${id}/placements/job-postings/`)}
//         >
//           + Create New Drive
//         </Button>
//       </Box>

//       <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
//         <Tab label="All Drives" />
//         <Tab label="Upcoming" />
//         <Tab label="Ongoing" />
//         <Tab label="Completed" />
//       </Tabs>

//       <Box>
//         {tab === 0 ? (
//           <JobList />
//         ) : (
//           filterDrives().map((drive) => (
//             <DriveCard key={drive.id} drive={drive} />
//           ))
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default PlacementDrives;






import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import DriveCard from "../../components/PlacementCoordinator/DriveCard";
import JobList from "./JobList";
import axiosInstance from "../../api/axiosInstance";

const PlacementDrives = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [drives, setDrives] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all"); // default value

  useEffect(() => {
    axiosInstance.get("/drives")
      .then(res => setDrives(res.data))
      .catch(err => console.error("Error fetching drives:", err));
  }, []);

  const handleSelectChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const filterDrives = () => {
    switch (selectedTab) {
      case "upcoming": return drives.filter(d => d.status === "Upcoming");
      case "ongoing": return drives.filter(d => d.status === "Ongoing");
      case "completed": return drives.filter(d => d.status === "Completed");
      default: return drives;
    }
  };

  return (
    <Container sx={{ py: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box>
          <Typography variant="h5">Placement Drives Management</Typography>
          <Typography color="text.secondary">
            Create, manage and track placement drives and recruitment activities
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate(`/coordinator-dashboard/${id}/placements/job-postings/`)}
        >
          + Create New Drive
        </Button>
      </Box>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Section</InputLabel>
        <Select value={selectedTab} onChange={handleSelectChange} label="Select Section">
          <MenuItem value="all">All Drives</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
          <MenuItem value="ongoing">Ongoing</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Box>
        {selectedTab === "all" ? (
          <JobList />
        ) : (
          filterDrives().map((drive) => (
            <DriveCard key={drive.id} drive={drive} />
          ))
        )}
      </Box>
    </Container>
  );
};

export default PlacementDrives;


