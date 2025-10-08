// // src/pages/CategoryList.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";

// export default function CategoryList() {
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         axiosInstance.get("/forum/categories/")
//             .then((res) => setCategories(res.data))
//             .catch((err) => setError("Failed to load categories"))
//             .finally(() => setLoading(false));
//     }, []);

//     if (loading) return <p className="p-6">Loading categories...</p>;
//     if (error) return <p className="p-6 text-red-600">{error}</p>;

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Discussion Categories</h1>
//             {categories.length === 0 && <p>No categories available.</p>}
//             <div className="space-y-3">
//                 {categories.map((cat) => (
//                     <Link
//                         key={cat.id}
//                         to={`/categories/${cat.id}/threads`}
//                         className="block bg-white p-4 rounded shadow hover:bg-gray-50 transition"
//                     >
//                         {cat.name}
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// }







// src/pages/CategoryList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Alert,
    Typography,
    Box
} from "@mui/material";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, userRes] = await Promise.all([
                    axiosInstance.get("/forum/categories/"),
                    axiosInstance.get("/users/profile/"),
                ]);
                setCategories(catRes.data);
                setUser(userRes.data);
                console.log("Fetched user:", userRes.data); // DEBUG
            } catch (err) {
                console.error(err);
                setError("Failed to load categories or user data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        setFormError("");
        setFormSuccess("");

        if (!name.trim()) {
            setFormError("Category name is required.");
            return;
        }

        try {
            await axiosInstance.post("/forum/categories/", { name, description });
            setFormSuccess("Category added successfully!");
            setName("");
            setDescription("");

            const res = await axiosInstance.get("/forum/categories/");
            setCategories(res.data);

            setTimeout(() => {
                setOpen(false);
                setFormSuccess("");
            }, 1000);
        } catch (err) {
            console.error(err.response?.data || err.message);
            setFormError("Failed to add category.");
        }
    };

    if (loading) return <p className="p-6">Loading categories...</p>;
    if (error) return <p className="p-6 text-red-600">{error}</p>;

    // Make role check case-insensitive
    const allowedRoles = ["admin", "placement_coordinator", "training_officer"];
    const canAddCategory =
        user && allowedRoles.includes(user.role?.toLowerCase());

    return (
        <div className="p-6">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" fontWeight="bold">
                    Discussion Categories
                </Typography>

                {/* Add Category button */}
                {canAddCategory && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpen(true)}
                    >
                        + Add Category
                    </Button>
                )}
            </Box>

            {categories.length === 0 && <p>No categories available.</p>}
            <div className="space-y-3">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        to={`/categories/${cat.id}/threads`}
                        className="block bg-white p-4 rounded shadow hover:bg-gray-50 transition"
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>

            {/* Add Category Modal */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogContent>
                    {formSuccess && <Alert severity="success" sx={{ mb: 2 }}>{formSuccess}</Alert>}
                    {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}

                    <Box
                        component="form"
                        onSubmit={handleAddCategory}
                        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
                    >
                        <TextField
                            label="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={3}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Add Category
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
