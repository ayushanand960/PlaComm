// import React from "react";
// import { Link } from "react-router-dom";

// export default function CoordinatorDashboard() {
//   return (
//     <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-50 rounded-2xl shadow-md">
//       <h1 className="text-3xl font-bold text-center mb-8">
//         Placement Coordinator Dashboard
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Card: Post Job */}
//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//           <h2 className="text-xl font-semibold mb-3">Post New Job</h2>
//           <p className="text-gray-600 mb-4">
//             Create and publish a new on-campus hiring post.
//           </p>
//           <Link
//             to="/dashboard/post-job"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Post Job
//           </Link>
//         </div>

//         {/* Card: Manage Jobs */}
//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//           <h2 className="text-xl font-semibold mb-3">Manage Job Postings</h2>
//           <p className="text-gray-600 mb-4">
//             View, edit, or delete your previously posted jobs.
//           </p>
//           <Link
//             to="/dashboard/jobs"
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             View Jobs
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { Work, AddCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PostJob from "./PostJob";

export default function CoordinatorDashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
        Placement Coordinator Dashboard
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Post Job */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <AddCircle sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Post New Job
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Create and publish a new on-campus hiring post.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/dashboard/post-job")}
              >
                Post Job
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Manage Jobs */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Work sx={{ fontSize: 60, color: "secondary.main", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Manage Job Postings
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                View, edit, or delete your previously posted jobs.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/dashboard/jobs")}
              >
                View Jobs
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
