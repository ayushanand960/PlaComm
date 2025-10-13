// // src/pages/TrainingOfficerPages/PriorityList.jsx
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PriorityActivityCard from "../../components/trainingOfficer/PriorityList/PriorityActivityCard";
// import ViewResultDialog from "../../components/trainingOfficer/PriorityList/ViewResultDialog";
// import { Button } from "@mui/material";

// const activityTypes = ["GD", "Technical", "Aptitude", "Mock", "PI"];

// export default function PriorityList() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [selectedActivity, setSelectedActivity] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);

//   // Use state instead of useMemo for dynamic updates
//   const [priorityByType, setPriorityByType] = useState(() => {
//     const storedPriority = JSON.parse(localStorage.getItem("priorityList")) || {};
//     const grouped = {};
//     activityTypes.forEach((t) => {
//       grouped[t] = (storedPriority[t] || [])
//         .filter((a) => !a.deleted)
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     });
//     return grouped;
//   });

//   const handleViewResult = (activity) => {
//     setSelectedActivity(activity);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => setOpenDialog(false);

//   // ✅ Toggle lock/unlock
//   const handleToggleLock = (activityId, type) => {
//     setPriorityByType((prev) => {
//       const updatedType = (prev[type] || []).map((a) =>
//         a.id === activityId ? { ...a, locked: !a.locked } : a
//       );
//       const updated = { ...prev, [type]: updatedType };

//       // update localStorage too
//       const storedPriority = JSON.parse(localStorage.getItem("priorityList")) || {};
//       storedPriority[type] = updatedType;
//       localStorage.setItem("priorityList", JSON.stringify(storedPriority));

//       return updated;
//     });

//     // also update selectedActivity if it's open in dialog
//     setSelectedActivity((prev) =>
//       prev && prev.id === activityId ? { ...prev, locked: !prev.locked } : prev
//     );
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Priority List</h2>

//       {activityTypes.map((type) => {
//         const activities = priorityByType[type] || [];
//         const newest = activities.slice(0, 5);

//         return (
//           <div key={type} style={{ marginBottom: 30 }}>
//             <h3>{type} Activities</h3>

//             {newest.length === 0 ? (
//               <p>No {type} results yet.</p>
//             ) : (
//               <div
//                 style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   gap: "16px", // spacing between cards
//                 }}
//               >
//                 {newest.map((a) => (
//                   <PriorityActivityCard
//                     key={a.id}
//                     activity={a}
//                     onViewResult={() => handleViewResult(a)}
//                     onToggleLock={() => handleToggleLock(a.id, type)} // pass toggle handler
//                   />
//                 ))}
//               </div>
//             )}

//             {activities.length > 5 && (
//               <Button
//                 variant="text"
//                 sx={{ mt: 1 }}
//                 onClick={() =>
//                   navigate(`/officer-dashboard/${id}/prioritylist/${type.toLowerCase()}`)
//                 }
//               >
//                 View All
//               </Button>
//             )}
//           </div>
//         );
//       })}

//       {/* Centered dialog for showing results */}
//       <ViewResultDialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         activity={selectedActivity}
//         onLock={(id) =>
//           selectedActivity
//             ? handleToggleLock(id, selectedActivity.type)
//             : null
//         }
//       />
//     </div>
//   );
// }


// // src/pages/TrainingOfficerPages/PriorityList.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   MenuItem,
//   TextField,
//   Button,
// } from "@mui/material";
// import axiosInstance from "../../api/axiosInstance";

// export default function PriorityList() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [activity, setActivity] = useState("");
//   const [job, setJob] = useState("");
//   const [jobs, setJobs] = useState([]);

//   const activityOptions = [
//     { code: "", label: "All Activities" },
//     { code: "GD", label: "Group Discussion" },
//     { code: "APT", label: "Aptitude" },
//     { code: "TECH", label: "Technical" },
//     { code: "MOCK", label: "Mock Interview" },
//     { code: "PI", label: "Personal Interview" },
//   ];

//   const fetchPriorityList = async () => {
//     try {
//       setLoading(true);
//       let url = "/training/priority-list/";
//       const params = [];
//       if (activity) params.push(`activity=${activity}`);
//       if (job) params.push(`job=${job}`);
//       if (params.length) url += `?${params.join("&")}`;

//       const res = await axiosInstance.get(url);
//       setStudents(res.data);
//     } catch (err) {
//       console.error("Failed to load priority list:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchJobs = async () => {
//     try {
//       const res = await axiosInstance.get("/placements/job-postings/");
//       setJobs(res.data);
//     } catch (err) {
//       console.error("Failed to fetch jobs:", err);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//     fetchPriorityList();
//   }, []);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
//         <CircularProgress size={60} thickness={5} />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Priority Student List
//       </Typography>

//       {/* Filter bar */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 2,
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <TextField
//           select
//           label="Activity"
//           value={activity}
//           onChange={(e) => setActivity(e.target.value)}
//           sx={{ minWidth: 200 }}
//         >
//           {activityOptions.map((opt) => (
//             <MenuItem key={opt.code} value={opt.code}>
//               {opt.label}
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           select
//           label="Job Drive"
//           value={job}
//           onChange={(e) => setJob(e.target.value)}
//           sx={{ minWidth: 300 }}
//         >
//           <MenuItem value="">All Jobs</MenuItem>
//           {jobs.map((j) => (
//             <MenuItem key={j.job_id} value={j.job_id}>
//               {j.company_name} — {j.job_title}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={fetchPriorityList}
//           sx={{ height: 56 }}
//         >
//           Apply Filters
//         </Button>
//       </Box>

//       {students.length === 0 ? (
//         <Typography>No evaluation data found for selected filters.</Typography>
//       ) : (
//         <Box sx={{ mt: 3, overflowX: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#f5f5f5" }}>
//                 <th style={{ border: "1px solid #ccc", padding: "8px" }}>Rank</th>
//                 <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
//                 <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
//                 <th style={{ border: "1px solid #ccc", padding: "8px" }}>
//                   Activities Count
//                 </th>
//                 <th style={{ border: "1px solid #ccc", padding: "8px" }}>
//                   Average Score (%)
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((s, index) => (
//                 <tr key={s.unique_id}>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                     {index + 1}
//                   </td>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                     {s.name}
//                   </td>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                     {s.unique_id}
//                   </td>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                     {s.total_activities}
//                   </td>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                     {s.average_score}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </Box>
//       )}
//     </Box>
//   );
// }

// src/pages/TrainingOfficerPages/PriorityList.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import axiosInstance from "../../api/axiosInstance";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function PriorityList() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const [activity, setActivity] = useState("");
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState([]);
  const [limit, setLimit] = useState("All");
  const [search, setSearch] = useState("");

  const activityOptions = [
    { code: "", label: "All Activities" },
    { code: "GD", label: "Group Discussion" },
    { code: "APT", label: "Aptitude" },
    { code: "TECH", label: "Technical" },
    { code: "MOCK", label: "Mock Interview" },
    { code: "PI", label: "Personal Interview" },
  ];

  //👇 FETCH DATA
  const fetchPriorityList = async () => {
    try {
      setLoading(true);
      let url = "/training/priority-list/";
      const params = [];
      if (activity) params.push(`activity=${activity}`);
      if (job) params.push(`job=${job}`);
      if (limit !== "All") params.push(`limit=${limit}`);
      if (params.length) url += `?${params.join("&")}`;

      const res = await axiosInstance.get(url);
      setStudents(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Failed to load priority list:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axiosInstance.get("/placements/job-postings/");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchPriorityList();
  }, []);

  //👇 SEARCH FILTER
  useEffect(() => {
    let data = [...students];
    if (search)
      data = data.filter((s) =>
        s.Student_Name.toLowerCase().includes(search.toLowerCase())
      );
    if (limit !== "All") data = data.slice(0, parseInt(limit));
    setFiltered(data);
  }, [search, limit, students]);

  //👇 EXPORT TO EXCEL
  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PriorityList");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "PriorityList.xlsx");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress size={60} thickness={5} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Priority Student List
      </Typography>

      {/* ========= FILTER BAR ========= */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          select
          label="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {activityOptions.map((opt) => (
            <MenuItem key={opt.code} value={opt.code}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Job Drive"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          sx={{ minWidth: 260 }}
        >
          <MenuItem value="">All Jobs</MenuItem>
          {jobs.map((j) => (
            <MenuItem key={j.job_id} value={j.job_id}>
              {j.company_name} — {j.job_title}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Number of Students"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="All">All</MenuItem>
          {[10, 20, 50, 100].map((n) => (
            <MenuItem key={n} value={n}>{`Top ${n}`}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Search Student"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={fetchPriorityList}
          sx={{ height: 56 }}
        >
          Apply Filters
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleDownloadExcel}
          sx={{ height: 56 }}
        >
          Download Excel
        </Button>
      </Box>

      {/* ========= TABLE ========= */}
      {filtered.length === 0 ? (
        <Typography>No data found for selected filters.</Typography>
      ) : (
        <Box sx={{ mt: 3, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Rank</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Student Name
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Unique ID
                </th>
                {/* <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Activities Count
                </th> */}
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Avg Score (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, index) => (
                <tr key={s.unique_id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {index + 1}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {s.Student_Name}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {s.Student_id}
                  </td>
                  {/* <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {s.Total_activities}
                  </td> */}
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {s.Average_score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  );
}