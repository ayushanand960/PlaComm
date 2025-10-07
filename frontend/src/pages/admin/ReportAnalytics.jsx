// ReportAnalytics.jsx
import React, { useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
  TablePagination,
} from "@mui/material";

const ReportAnalytics = () => {
  const reportData = [
    { id: 1, name: "Aarohi Sharma", activity: "Logged In", date: "2025-09-26" },
    { id: 2, name: "Rohan Verma", activity: "Generated Report", date: "2025-09-25" },
    { id: 3, name: "Sanya Gupta", activity: "Updated Profile", date: "2025-09-24" },
    { id: 4, name: "Ankit Kumar", activity: "Logged Out", date: "2025-09-23" },
    { id: 5, name: "Neha Singh", activity: "Downloaded Report", date: "2025-09-22" },
    { id: 6, name: "Priya Sharma", activity: "Logged In", date: "2025-09-21" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("date");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const filteredData = reportData
    .filter(
      (row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.date.includes(searchTerm)
    )
    .sort((a, b) => {
      if (orderBy === "date") {
        return order === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else {
        return order === "asc"
          ? a[orderBy].toString().localeCompare(b[orderBy].toString())
          : b[orderBy].toString().localeCompare(a[orderBy].toString());
      }
    });

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <AdminNavbar />

      <div style={{ padding: "20px", fontFamily: "Roboto, sans-serif" }}>
        {/* Heading */}
        <h1 style={{ color: "#0d47a1", marginBottom: "20px" }}>Report Analytics</h1>

        {/* Search Field */}
        <TextField
          label="Search Reports"
          variant="outlined"
          fullWidth
          size="small"
          style={{ marginBottom: "20px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Table */}
        <TableContainer component={Paper} style={{ boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#0d47a1" }}>
                {["id", "name", "activity", "date"].map((column) => (
                  <TableCell
                    key={column}
                    style={{ color: "#fff", fontWeight: "bold" }}
                  >
                    <TableSortLabel
                      active={orderBy === column}
                      direction={orderBy === column ? order : "asc"}
                      onClick={() => handleSort(column)}
                      sx={{ color: "#fff" }}
                    >
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={() => setSelectedRow(row.id)}
                    style={{
                      backgroundColor:
                        selectedRow === row.id ? "#1976d2" : "transparent",
                      color: selectedRow === row.id ? "#fff" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    <TableCell style={{ color: selectedRow === row.id ? "#fff" : "#000" }}>{row.id}</TableCell>
                    <TableCell style={{ color: selectedRow === row.id ? "#fff" : "#000" }}>{row.name}</TableCell>
                    <TableCell style={{ color: selectedRow === row.id ? "#fff" : "#000" }}>{row.activity}</TableCell>
                    <TableCell style={{ color: selectedRow === row.id ? "#fff" : "#000" }}>{row.date}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          style={{ marginTop: "10px" }}
        />
      </div>
    </div>
  );
};

export default ReportAnalytics;
