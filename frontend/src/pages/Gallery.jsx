// src/pages/Gallery.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const colors = {
  primary: "#6C63FF",
  secondary: "#FF6584",
  background: "#F8F9FB",
  dark: "#2B2D42",
};

const images = [
  { src: "/images/ln11.jpg", title: "Campus Drive 2025" },
  { src: "/images/ln8.jpg", title: "Campus Drive 2025" },
  { src: "/images/ln3.jpg", title: "Mock Interview Session" },
  { src: "/images/ln4.jpg", title: "CDC Orientation" },
  { src: "/images/ln5.jpg", title: "Recruiter Interaction" },
  { src: "/images/ln6.jpg", title: "Internship Fair" },
  { src: "/images/ln13.jpg", title: "Internship Fair" },
  { src: "/images/ln1.jpg", title: "Expert Talk on Neo Banking & Fintech" },
  { src: "/images/ln7.jpg", title: "Internship Fair" },
  { src: "/images/ln2.jpg", title: "DSA Session" },
];

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (img) => {
    setSelectedImage(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box sx={{ bgcolor: colors.background, py: 8, minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ color: colors.primary }}
        >
          📸 Placement Events Gallery
        </Typography>

        <Typography
          variant="subtitle1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 5 }}
        >
          Explore the memorable moments of our placement drives, workshops, and
          campus activities.
        </Typography>

        {/* Gallery Grid */}
        <Grid container spacing={4}>
          {images.map((img, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  background: "#fff",
                  cursor: "pointer",
                  border: "4px solid transparent",
                  backgroundImage: `linear-gradient(#fff, #fff), 
                    linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  backgroundOrigin: "border-box",
                  backgroundClip: "content-box, border-box",
                }}
                onClick={() => handleOpen(img)}
              >
                <CardMedia
                  component="img"
                  image={img.src}
                  alt={img.title}
                  height="250"
                  style={{ objectFit: "cover" }}
                />
                <Box sx={{ p: 2, textAlign: "center" }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    sx={{ color: colors.dark }}
                  >
                    {img.title}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Fullscreen Image Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ position: "relative" }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              "&:hover": { background: "rgba(0,0,0,0.8)" },
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage?.src}
            alt={selectedImage?.title}
            style={{
              width: "100%",
              maxHeight: "80vh",
              borderRadius: "16px",
              objectFit: "cover",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          />
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ py: 2, fontWeight: "bold", color: "#fff" }}
          >
            {selectedImage?.title}
          </Typography>
        </motion.div>
      </Dialog>
    </Box>
  );
}
