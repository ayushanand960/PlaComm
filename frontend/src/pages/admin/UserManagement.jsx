import React, { useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AdminNavbar from "../../components/admin/AdminNavbar";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Aarohi Sharma", email: "aarohi@example.com", role: "Admin" },
    { id: 2, name: "Ravi Kumar", email: "ravi@example.com", role: "User" },
    { id: 3, name: "Priya Singh", email: "priya@example.com", role: "User" },
  ]);

  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <>
    <AdminNavbar />
    <Box p={4}>
      <Typography variant="h4" mb={2}>User Management</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Add User
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(user.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
    </>
  );
};

export default UserManagement;
