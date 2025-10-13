
// src/pages/coordinator/CoordinatorApplications.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  TextField,
  TableSortLabel,
  Button,
} from "@mui/material";
import { Download, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axiosInstance from "../../api/axiosInstance";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("applied_at");
  const [order, setOrder] = useState("desc");

  const coordinator = JSON.parse(localStorage.getItem("user")); // coordinator info

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // 1. Get all jobs posted by this coordinator
        const res = await axiosInstance.get("/placements/job-postings/");
        const myJobs = (Array.isArray(res.data) ? res.data : []).filter(
          (job) => job.coordinator === coordinator.username
        );

        // 2. For each job, fetch its applications
        const allApplications = await Promise.all(
          myJobs.map(async (job) => {
            try {
              const appRes = await axiosInstance.get(
                `/placements/job-postings/${job.job_id}/apply/`
              );
              return appRes.data.map((app) => ({
                ...app,
                jobTitle: job.job_title,
                company: job.company_name,
                location: job.location,
              }));
            } catch {
              return [];
            }
          })
        );

        setApplications(allApplications.flat());
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchApplications();
  }, [coordinator.username]);

  // Sorting
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sorted = [...applications].sort((a, b) => {
    if (!a[orderBy]) return 1;
    if (!b[orderBy]) return -1;
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const filtered = sorted.filter((app) =>
    [app.student_username, app.company, app.jobTitle]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Download Excel
  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applications");
    XLSX.writeFile(wb, "Coordinator_Applications.xlsx");
  };

  // // Download PDF
  // const handleDownloadPDF = () => {
  //   const doc = new jsPDF();
  //   doc.text("Coordinator Applications", 14, 15);
  //   doc.autoTable({
  //     startY: 20,
  //     head: [
  //       [
  //         "Student Username",
  //         "Email",
  //         "Job Title",
  //         "Company",
  //         "Location",
  //         "Status",
  //         "Applied At",
  //       ],
  //     ],
  //     body: filtered.map((a) => [
  //       a.student_username,
  //       a.student_email,
  //       a.jobTitle,
  //       a.company,
  //       a.location || "—",
  //       a.status,
  //       new Date(a.applied_at).toLocaleDateString("en-IN"),
  //     ]),
  //   });
  //   doc.save("Coordinator_Applications.pdf");
  // };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Student Applications Overview
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1">Total Applications: {applications.length}</Typography>
        <Box display="flex" gap={2}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by Student / Company / Job"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outlined" startIcon={<FileSpreadsheet size={18} />} onClick={handleDownloadExcel}>
            Excel
          </Button>
          {/* <Button variant="outlined" color="error" startIcon={<Download size={18} />} onClick={handleDownloadPDF}>
            PDF
          </Button> */}
        </Box>
      </Box>

      {filtered.length === 0 ? (
        <Typography color="text.secondary" mt={4}>
          No applications yet.
        </Typography>
      ) : (
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  { key: "student_username", label: "Student Username" },
                  { key: "student_email", label: "Email" },
                  { key: "jobTitle", label: "Job Title" },
                  { key: "company", label: "Company" },
                  { key: "location", label: "Location" },
                  { key: "status", label: "Status" },
                  { key: "applied_at", label: "Applied Date" },
                ].map((col) => (
                  <TableCell key={col.key}  sx={{ fontWeight: "bold" }} >
                    <TableSortLabel
                      active={orderBy === col.key}
                      direction={orderBy === col.key ? order : "asc"}
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.student_username}</TableCell>
                  <TableCell>{app.student_email}</TableCell>
                  <TableCell>{app.jobTitle}</TableCell>
                  <TableCell>{app.company}</TableCell>
                  <TableCell>{app.location || "—"}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>{new Date(app.applied_at).toLocaleDateString("en-IN")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default Applications;





