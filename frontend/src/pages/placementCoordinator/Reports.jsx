
// // src/pages/placementCoordinator/Reports.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   Grid,
//   Paper,
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   CircularProgress,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody
// } from "@mui/material";

// import { Bar, Line, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";

// import axios from "axios";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const API_BASE = "http://localhost:8000/api"; // change to your backend base URL

// // Dummy data
// const dummySummary = {
//   total_drives: 12,
//   total_companies: 8,
//   total_applications: 240,
//   total_placements: 95
// };

// const dummyChartsData = {
//   placementsPerCompany: {
//     labels: ["XYZ Corp", "ABC Ltd", "TechSoft", "Innovate Inc"],
//     datasets: [
//       {
//         label: "Placements",
//         data: [20, 15, 30, 10],
//         backgroundColor: ["#3f51b5", "#f50057", "#ff9800", "#4caf50"]
//       }
//     ]
//   },
//   trendsOverTime: {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//     datasets: [
//       {
//         label: "Placements",
//         data: [5, 10, 8, 15, 12],
//         borderColor: "#3f51b5",
//         fill: false
//       }
//     ]
//   },
//   studentsPerBranch: {
//     labels: ["CS", "ECE", "ME", "CE"],
//     datasets: [
//       {
//         data: [40, 25, 20, 10],
//         backgroundColor: ["#3f51b5", "#f50057", "#ff9800", "#4caf50"]
//       }
//     ]
//   }
// };

// export default function Reports() {
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState(dummySummary);
//   const [chartsData, setChartsData] = useState(dummyChartsData);
//   const [filters, setFilters] = useState({ semester: "", branch: "", year: "" });

//   // Fetch reports (optional axios call)
//   const fetchReports = async () => {
//     setLoading(true);
//     try {
//       // Uncomment below if backend URL is ready
//       // const summaryRes = await axios.get(`${API_BASE}/reports/summary/`);
//       // const chartsRes = await axios.get(`${API_BASE}/reports/charts/`);
//       // setSummary(summaryRes.data);
//       // setChartsData(chartsRes.data);
      
//       // Using dummy data for now
//       setSummary(dummySummary);
//       setChartsData(dummyChartsData);
//     } catch (err) {
//       console.error("Failed to fetch reports", err);
//       setSummary(dummySummary);
//       setChartsData(dummyChartsData);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, [filters]);

//   const summaryCards = [
//     { title: "Total Drives", value: summary.total_drives },
//     { title: "Total Companies", value: summary.total_companies },
//     { title: "Total Applications", value: summary.total_applications },
//     { title: "Total Placements", value: summary.total_placements }
//   ];

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h5" gutterBottom>Placement Reports</Typography>

//       {loading && <CircularProgress />}

//       {/* Summary Cards */}
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         {summaryCards.map((card, i) => (
//           <Grid item xs={12} sm={6} md={3} key={i}>
//             <Paper sx={{ p: 2, textAlign: "center" }}>
//               <Typography variant="subtitle1">{card.title}</Typography>
//               <Typography variant="h6">{card.value}</Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Filters */}
//       <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Semester</InputLabel>
//           <Select
//             value={filters.semester}
//             onChange={e => setFilters(f => ({ ...f, semester: e.target.value }))}
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="1">1</MenuItem>
//             <MenuItem value="2">2</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Branch</InputLabel>
//           <Select
//             value={filters.branch}
//             onChange={e => setFilters(f => ({ ...f, branch: e.target.value }))}
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="CS">CS</MenuItem>
//             <MenuItem value="ECE">ECE</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Year</InputLabel>
//           <Select
//             value={filters.year}
//             onChange={e => setFilters(f => ({ ...f, year: e.target.value }))}
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="2025">2025</MenuItem>
//             <MenuItem value="2026">2026</MenuItem>
//           </Select>
//         </FormControl>

//         <Button variant="contained" onClick={fetchReports}>Apply</Button>
//       </Box>

//       {/* Charts */}
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={6}>
//           <Typography variant="subtitle1">Placements per Company</Typography>
//           <Bar data={chartsData.placementsPerCompany} />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Typography variant="subtitle1">Placement Trends Over Time</Typography>
//           <Line data={chartsData.trendsOverTime} />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Typography variant="subtitle1">Students per Branch</Typography>
//           <Pie data={chartsData.studentsPerBranch} />
//         </Grid>
//       </Grid>

//       {/* Export Buttons & Company-wise Table */}
//       <Box sx={{ mt: 4 }}>
//         <Button variant="outlined" sx={{ mr: 2 }}>Export PDF</Button>
//         <Button variant="outlined">Export Excel</Button>

//         <Table sx={{ mt: 2 }}>
//           <TableHead>
//             <TableRow>
//               <TableCell>Company</TableCell>
//               <TableCell>Total Applications</TableCell>
//               <TableCell>Total Selected</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell>XYZ Corp</TableCell>
//               <TableCell>50</TableCell>
//               <TableCell>20</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>ABC Ltd</TableCell>
//               <TableCell>40</TableCell>
//               <TableCell>15</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </Box>
//     </Container>
//   );
// }




// src/pages/placementCoordinator/Reports.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// ✅ import AdminNavbar
import AdminNavbar from "../../components/admin/AdminNavbar";
import axiosInstance from "../../api/axiosInstance"; // use your axiosInstance

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const dummySummary = {
  total_drives: 12,
  total_companies: 8,
  total_applications: 240,
  total_placements: 95
};

const dummyChartsData = {
  placementsPerCompany: {
    labels: ["XYZ Corp", "ABC Ltd", "TechSoft", "Innovate Inc"],
    datasets: [
      {
        label: "Placements",
        data: [20, 15, 30, 10],
        backgroundColor: ["#3f51b5", "#f50057", "#ff9800", "#4caf50"]
      }
    ]
  },
  trendsOverTime: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Placements",
        data: [5, 10, 8, 15, 12],
        borderColor: "#3f51b5",
        fill: false
      }
    ]
  },
  studentsPerBranch: {
    labels: ["CS", "ECE", "ME", "CE"],
    datasets: [
      {
        data: [40, 25, 20, 10],
        backgroundColor: ["#3f51b5", "#f50057", "#ff9800", "#4caf50"]
      }
    ]
  }
};

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(dummySummary);
  const [chartsData, setChartsData] = useState(dummyChartsData);
  const [filters, setFilters] = useState({ semester: "", branch: "", year: "" });
  const [userRole, setUserRole] = useState(null); // ✅ store user role

  // ✅ Get logged-in user's role
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axiosInstance.get("/users/profile/");
        setUserRole(res.data.role); // "admin" / "placement_coordinator"
      } catch (err) {
        console.log("Failed to fetch user role", err);
      }
    };

    fetchRole();
    fetchReports();
  }, [filters]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      setSummary(dummySummary);
      setChartsData(dummyChartsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const summaryCards = [
    { title: "Total Drives", value: summary.total_drives },
    { title: "Total Companies", value: summary.total_companies },
    { title: "Total Applications", value: summary.total_applications },
    { title: "Total Placements", value: summary.total_placements }
  ];

  return (
    <>
      {/* ✅ ✅ Admin sees Admin Navbar */}
      {userRole === "admin" && <AdminNavbar />}

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>Placement Reports</Typography>

        {loading && <CircularProgress />}

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {summaryCards.map((card, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="subtitle1">{card.title}</Typography>
                <Typography variant="h6">{card.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Filters */}
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Semester</InputLabel>
            <Select
              value={filters.semester}
              onChange={e => setFilters(f => ({ ...f, semester: e.target.value }))}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Branch</InputLabel>
            <Select
              value={filters.branch}
              onChange={e => setFilters(f => ({ ...f, branch: e.target.value }))}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="CS">CS</MenuItem>
              <MenuItem value="ECE">ECE</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={filters.year}
              onChange={e => setFilters(f => ({ ...f, year: e.target.value }))}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2026">2026</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={fetchReports}>Apply</Button>
        </Box>

        {/* Charts */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Placements per Company</Typography>
            <Bar data={chartsData.placementsPerCompany} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Placement Trends Over Time</Typography>
            <Line data={chartsData.trendsOverTime} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Students per Branch</Typography>
            <Pie data={chartsData.studentsPerBranch} />
          </Grid>
        </Grid>

        {/* Table */}
        <Box sx={{ mt: 4 }}>
          <Button variant="outlined" sx={{ mr: 2 }}>Export PDF</Button>
          <Button variant="outlined">Export Excel</Button>

          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Total Applications</TableCell>
                <TableCell>Total Selected</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>XYZ Corp</TableCell>
                <TableCell>50</TableCell>
                <TableCell>20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ABC Ltd</TableCell>
                <TableCell>40</TableCell>
                <TableCell>15</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Container>
    </>
  );
}
