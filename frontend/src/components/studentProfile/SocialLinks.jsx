import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    IconButton,
    Grid,
    Link,
} from "@mui/material";
import { Add, Delete, OpenInNew } from "@mui/icons-material";
import axios from "axios";

const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

const SocialLinks = () => {
    const [links, setLinks] = useState({
        github: "",
        linkedin: "",
        portfolio: "",
        other: [{ name: "", url: "" }],
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [linkId, setLinkId] = useState(null);

    const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

    // ✅ Fetch existing social links
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const res = await axios.get(`${API_BASE}/social-links/`, {
                    withCredentials: true,
                });

                if (res.data.length > 0) {
                    const fetched = res.data[0];
                    setLinks({
                        github: fetched.github || "",
                        linkedin: fetched.linkedin || "",
                        portfolio: fetched.portfolio || "",
                        other: fetched.other ? JSON.parse(fetched.other) : [{ name: "", url: "" }],
                    });
                    setLinkId(fetched.id);
                }
            } catch (err) {
                console.error("Error fetching social links:", err);
            } finally {
                setFetching(false);
            }
        };
        fetchLinks();
    }, []);

    // ✅ Handle input changes
    const handleChange = (e) => {
        setLinks({ ...links, [e.target.name]: e.target.value });
    };

    // ✅ Handle changes for "Other" links
    const handleOtherChange = (index, field, value) => {
        const updatedOthers = [...links.other];
        updatedOthers[index][field] = value;
        setLinks({ ...links, other: updatedOthers });
    };

    // ✅ Add/Remove Other Links
    const addOtherField = () => {
        setLinks({ ...links, other: [...links.other, { name: "", url: "" }] });
    };

    const removeOtherField = (index) => {
        const updatedOthers = links.other.filter((_, i) => i !== index);
        setLinks({ ...links, other: updatedOthers });
    };

    // ✅ URL Validation
    const validateLinks = () => {
        let newErrors = {};
        if (links.github && !urlRegex.test(links.github))
            newErrors.github = "Enter a valid URL";
        if (links.linkedin && !urlRegex.test(links.linkedin))
            newErrors.linkedin = "Enter a valid URL";
        if (links.portfolio && !urlRegex.test(links.portfolio))
            newErrors.portfolio = "Enter a valid URL";

        links.other.forEach((link, idx) => {
            if (link.url && !urlRegex.test(link.url))
                newErrors[`other-${idx}`] = "Enter a valid URL";
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Save or Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

        if (!validateLinks()) return;

        setLoading(true);
        try {
            const payload = { ...links, other: JSON.stringify(links.other) };

            if (linkId) {
                await axios.put(`${API_BASE}/students/social-links/${linkId}/`, payload, {
                    withCredentials: true,
                });
                setMessage({ text: "Links updated successfully!", type: "success" });
            } else {
                const res = await axios.post(`${API_BASE}/students/social-links/`, payload, {
                    withCredentials: true,
                });
                setLinkId(res.data.id);
                setMessage({ text: "Links added successfully!", type: "success" });
            }
        } catch (err) {
            console.error("Error saving links:", err);
            setMessage({ text: "Failed to save links!", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    if (fetching)
        return (
            <Box textAlign="center" sx={{ mt: 3 }}>
                <CircularProgress />
            </Box>
        );

    const renderHyperlink = (url) => {
        if (!url) return null;
        let validUrl = url.startsWith("http") ? url : `https://${url}`;
        return (
            <Link
                href={validUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: "inline-flex", alignItems: "center", ml: 1 }}
            >
                <OpenInNew fontSize="small" sx={{ ml: 0.5 }} />
            </Link>
        );
    };

    return (
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                    Social Links
                </Typography>

                {message.text && (
                    <Alert severity={message.type} sx={{ mb: 2 }}>
                        {message.text}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    {/* ✅ Main Links */}
                    {["github", "linkedin", "portfolio"].map((field) => (
                        <Box key={field} sx={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                label={`${field.charAt(0).toUpperCase() + field.slice(1)} URL`}
                                name={field}
                                value={links[field]}
                                onChange={handleChange}
                                error={!!errors[field]}
                                helperText={errors[field]}
                                fullWidth
                            />
                            {renderHyperlink(links[field])}
                        </Box>
                    ))}

                    {/* ✅ Other Links */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                            Other Links
                        </Typography>

                        {links.other.map((item, index) => (
                            <Grid container spacing={2} alignItems="center" key={index}>
                                <Grid item xs={3}>
                                    <TextField
                                        label="Platform Name"
                                        value={item.name}
                                        onChange={(e) =>
                                            handleOtherChange(index, "name", e.target.value)
                                        }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={7}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <TextField
                                            label="Platform URL"
                                            value={item.url}
                                            onChange={(e) =>
                                                handleOtherChange(index, "url", e.target.value)
                                            }
                                            error={!!errors[`other-${index}`]}
                                            helperText={errors[`other-${index}`]}
                                            fullWidth
                                        />
                                        {renderHyperlink(item.url)}
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        color="error"
                                        onClick={() => removeOtherField(index)}
                                        disabled={links.other.length === 1}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}

                        <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={addOtherField}
                            sx={{ mt: 1 }}
                        >
                            Add Another
                        </Button>
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{ mt: 3 }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Save Links"}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SocialLinks;
