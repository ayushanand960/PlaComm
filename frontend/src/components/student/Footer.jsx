import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <center><p>© {new Date().getFullYear()} Rama University. All rights reserved.</p></center>
    </footer>
  );
}