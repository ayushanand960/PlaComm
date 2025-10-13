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
  Box,
  Card,
  CardContent,
  CardActionArea,
  Grid,
} from "@mui/material";
import StudentNavbar from "../components/student/StudentNavbar";
import Footer from "../components/student/Footer";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
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

  const allowedRoles = ["admin", "placement_coordinator", "training_officer"];
  const canAddCategory = user && allowedRoles.includes(user.role?.toLowerCase());

  return (
    <>
      <StudentNavbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)",
          py: 6,
          px: { xs: 2, sm: 6 },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#1e293b",
            }}
          >
            Discussion Categories
          </Typography>

          {canAddCategory && (
            <Button
              variant="contained"
              sx={{
                background: "#2563eb",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "10px",
                "&:hover": { background: "#1d4ed8" },
              }}
              onClick={() => setOpen(true)}
            >
              + Add Category
            </Button>
          )}
        </Box>

        {categories.length === 0 ? (
          <Typography>No categories available.</Typography>
        ) : (
          <Grid container spacing={3}>
            {categories.map((cat) => (
              <Grid item xs={12} sm={6} md={4} key={cat.id}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardActionArea component={Link} to={`/categories/${cat.id}/threads`}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="600"
                        gutterBottom
                        sx={{
                          color: "#1e40af",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {cat.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#475569",
                          fontSize: "0.9rem",
                          minHeight: "60px",
                        }}
                      >
                        {cat.description || "No description provided."}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Add Category Modal */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogContent>
            {formSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {formSuccess}
              </Alert>
            )}
            {formError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formError}
              </Alert>
            )}

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
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "#2563eb",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { background: "#1d4ed8" },
                }}
              >
                Add Category
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
        <Footer />
      </Box>
    </>
  );
}
