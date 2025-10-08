// src/pages/AddCategory.jsx
import React, { useState } from "react";
import { Box, Container, TextField, Button, Typography, Alert } from "@mui/material";
import axiosInstance from "../api/axiosInstance";

export default function AddCategory() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        if (!name.trim()) {
            setError("Category name is required.");
            return;
        }

        try {
            await axiosInstance.post("/forum/categories/", { name, description });
            setSuccess("Category created successfully!");
            setName("");
            setDescription("");
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError("Failed to create category.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h4" mb={4}>
                Add New Category
            </Typography>

            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={3}
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Category
                </Button>
            </Box>
        </Container>
    );
}
