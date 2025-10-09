// // src/pages/AdminManageUsers.jsx
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import {
//     Container,
//     Typography,
//     Paper,
//     Table,
//     TableHead,
//     TableRow,
//     TableCell,
//     TableBody,
//     Select,
//     MenuItem,
//     Button,
//     CircularProgress,
//     Alert,
// } from "@mui/material";
// import AdminNavbar from "../components/admin/AdminNavbar";

// const roles = [
//     "student",
//     "placement_coordinator" ,
//     "officer",
//     "authority",
//     "admin",
//     "recruiter",
// ];


// export default function AdminManageUsers() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [updating, setUpdating] = useState({}); // track which users are updating

//     // Fetch users on component mount
//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         setLoading(true);
//         setError("");
//         try {
//             const res = await axiosInstance.get("/users/users");
//             setUsers(res.data);
//         } catch (err) {
//             setError("Failed to fetch users");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleRoleChange = async (unique_id, newRole) => {
//         setUpdating((prev) => ({ ...prev, [unique_id]: true }));
//         try {
//             await axiosInstance.patch(`/users/${unique_id}/role/`, { role: newRole });
//             setUsers((prev) =>
//                 prev.map((user) =>
//                     user.unique_id === unique_id ? { ...user, role: newRole } : user
//                 )
//             );
//         } catch (err) {
//             setError(`Failed to update role for ${unique_id}`);
//         } finally {
//             setUpdating((prev) => ({ ...prev, [unique_id]: false }));
//         }
//     };

//     if (loading) return <CircularProgress />;

//     return (

//         <div>
//       {/* Navbar at top */}
//       <AdminNavbar />

//         <Container maxWidth="lg" sx={{ py: 5 }}>
//             <Typography variant="h4" mb={4}>
//                 Admin: Manage Users
//             </Typography>

//             {error && (
//                 <Alert severity="error" sx={{ mb: 2 }}>
//                     {error}
//                 </Alert>
//             )}

//             <Paper>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Unique ID</TableCell>
//                             <TableCell>First Name</TableCell>
//                             <TableCell>Last Name</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>Role</TableCell>
//                             <TableCell>Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {users.map((user) => (
//                             <TableRow key={user.unique_id}>
//                                 <TableCell>{user.unique_id}</TableCell>
//                                 <TableCell>{user.first_name}</TableCell>
//                                 <TableCell>{user.last_name}</TableCell>
//                                 <TableCell>{user.email}</TableCell>
//                                 <TableCell>
//                                     <Select
//                                         value={user.role}
//                                         onChange={(e) =>
//                                             handleRoleChange(user.unique_id, e.target.value)
//                                         }
//                                         disabled={updating[user.unique_id]}
//                                     >
//                                         {roles.map((role) => (
//                                             <MenuItem key={role} value={role}>
//                                                 {role.charAt(0).toUpperCase() + role.slice(1)}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </TableCell>
//                                 <TableCell>
//                                     {updating[user.unique_id] ? (
//                                         <CircularProgress size={20} />
//                                     ) : (
//                                         <Button
//                                             variant="contained"
//                                             onClick={() =>
//                                                 handleRoleChange(user.unique_id, user.role)
//                                             }
//                                         >
//                                             Save
//                                         </Button>
//                                     )}
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//         </Container>
//       </div>  
// );
// }




// src/pages/AdminManageUsers.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
    Container,
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Select,
    MenuItem,
    Button,
    CircularProgress,
    Alert,
    Stack,
} from "@mui/material";
import AdminNavbar from "../components/admin/AdminNavbar";

const roles = [
    "student",
    "placement_coordinator",
    "officer",
    "authority",
    "admin",
    "recruiter",
];

export default function AdminManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState({});

    // Fetch users
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axiosInstance.get("/users/users");
            setUsers(res.data);
        } catch (err) {
            setError("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    // Change role
    const handleRoleChange = async (unique_id, newRole) => {
        setUpdating((prev) => ({ ...prev, [unique_id]: true }));
        try {
            await axiosInstance.patch(`/users/${unique_id}/role/`, { role: newRole });
            setUsers((prev) =>
                prev.map((user) =>
                    user.unique_id === unique_id ? { ...user, role: newRole } : user
                )
            );
        } catch (err) {
            setError(`Failed to update role for ${unique_id}`);
        } finally {
            setUpdating((prev) => ({ ...prev, [unique_id]: false }));
        }
    };

    // ✅ Block/Unblock user
    const handleBlockUnblock = async (unique_id, isCurrentlyBlocked) => {
        const confirmMsg = isCurrentlyBlocked
            ? "Are you sure you want to unblock this user?"
            : "Are you sure you want to block this user?";
        const confirmed = window.confirm(confirmMsg);
        if (!confirmed) return;

        setUpdating((prev) => ({ ...prev, [unique_id]: true }));
        try {
            await axiosInstance.post(`/users/block-unblock/${unique_id}/`);

            // Toggle locally
            setUsers((prev) =>
                prev.map((user) =>
                    user.unique_id === unique_id
                        ? { ...user, is_blocked: !user.is_blocked }
                        : user
                )
            );
        } catch (err) {
            setError(`Failed to toggle block status for ${unique_id}`);
        } finally {
            setUpdating((prev) => ({ ...prev, [unique_id]: false }));
        }
    };



    if (loading) return <CircularProgress />;

    return (
        <div>
            <AdminNavbar />

            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Typography variant="h4" mb={4}>
                    Admin: Manage Users
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Unique ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.unique_id}>
                                    <TableCell>{user.unique_id}</TableCell>
                                    <TableCell>{user.first_name}</TableCell>
                                    <TableCell>{user.last_name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={user.role}
                                            onChange={(e) =>
                                                handleRoleChange(user.unique_id, e.target.value)
                                            }
                                            disabled={updating[user.unique_id]}
                                        >
                                            {roles.map((role) => (
                                                <MenuItem key={role} value={role}>
                                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>

                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            {updating[user.unique_id] ? (
                                                <CircularProgress size={20} />
                                            ) : (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() =>
                                                            handleRoleChange(user.unique_id, user.role)
                                                        }
                                                    >
                                                        Save
                                                    </Button>

                                                    <Button
                                                        variant="outlined"
                                                        color={user.is_blocked ? "success" : "error"}
                                                        onClick={() =>
                                                            handleBlockUnblock(user.unique_id, user.is_blocked)
                                                        }
                                                    >
                                                        {user.is_blocked ? "Unblock" : "Block"}
                                                    </Button>


                                                </>
                                            )}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </div>
    );
}
