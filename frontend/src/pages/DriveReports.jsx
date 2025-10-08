// src/pages/DriveReports.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DriveReports = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/drives/reports");
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!reports) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Failed to load reports.
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Drive Reports & Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Drives</Typography>
              <Typography variant="h4">{reports.totalDrives}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Students Placed</Typography>
              <Typography variant="h4">{reports.totalPlaced}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">Average Package</Typography>
              <Typography variant="h4">₹{reports.avgPackage} LPA</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Placement Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reports.placementDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label
                  >
                    {reports.placementDistribution.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Company-wise Selections
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reports.companyWise}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="company" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DriveReports;
