
// // src/pages/admin/AdminJobApplicants.jsx
// import React, { useEffect, useState } from "react";

// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CircularProgress,
//   Button,
//   Avatar,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import LogoutIcon from "@mui/icons-material/Logout";

// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import PersonIcon from "@mui/icons-material/Person";

// const AdminJobApplicants = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [companyData, setCompanyData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCompanyDetails = async () => {
//     try {
//       const response = await axiosInstance.get(
//         `placements/company-details/${id}/`
//       );
//       setCompanyData(response.data);
//     } catch (error) {
//       console.error("Error fetching company details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanyDetails();
//   }, [id]);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
//         <CircularProgress thickness={4} size={48} />
//       </Box>
//     );
//   }

//   if (!companyData) {
//     return (
//       <Typography textAlign="center" mt={5} color="textSecondary">
//         Company details not found.
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 } }}>
//       {/* Back Button */}
//       <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//   <Button
//     startIcon={<ArrowBackIcon />}
//     onClick={() => navigate(-1)}
//     sx={{
//       color: "#1565C0",
//       textTransform: "none",
//       fontWeight: "bold",
//     }}
//   >
//     Back to Job List
//   </Button>

//   <Button
//     startIcon={<LogoutIcon />}
//     onClick={() => navigate("/")}
//     sx={{
//       color: "#fff",
//       background: "#1565C0",
//       textTransform: "none",
//       fontWeight: "bold",
//       "&:hover": { background: "#0d47a1" },
//     }}
//   >
//     Logout
//   </Button>
// </Box>


//       {/* Company Header */}
//       <Card
//         sx={{
//           borderRadius: "18px",
//           mb: 4,
//           background: "linear-gradient(135deg, #E3F2FD, #FFFFFF)",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//         }}
//       >
//         <CardContent>
//           <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//             <WorkOutlineIcon sx={{ color: "#1565C0", mr: 1 }} />
//             <Typography variant="h5" fontWeight="bold" color="#1565C0">
//               {companyData.company_name}
//             </Typography>
//           </Box>
//           <Typography variant="subtitle1" color="textSecondary">
//             Total Jobs: {companyData.jobs?.length || 0}
//           </Typography>
//         </CardContent>
//       </Card>

//       {/* Jobs & Applicants Table */}
//       {companyData.jobs?.map((job, jobIndex) => (
//         <Box key={jobIndex} sx={{ mb: 5 }}>
//           <Typography
//             variant="h6"
//             fontWeight="bold"
//             mb={2}
//             sx={{
//               background: "linear-gradient(90deg, #1565C0, #42A5F5)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             {job.title} — Applicants ({job.applications_count})
//           </Typography>

//           {job.students.length === 0 ? (
//             <Typography color="textSecondary" sx={{ ml: 1 }}>
//               No applicants for this job.
//             </Typography>
//           ) : (
//             <TableContainer
//               component={Paper}
//               elevation={3}
//               sx={{
//                 borderRadius: "12px",
//                 overflow: "hidden",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//               }}
//             >
//               <Table>
//                 <TableHead sx={{ backgroundColor: "#E3F2FD" }}>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
//                     <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
//                     <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
//                     <TableCell sx={{ fontWeight: "bold" }}>RUM No</TableCell>
//                     <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {job.students.map((student, index) => (
//                     <TableRow
//                       key={index}
//                       sx={{
//                         "&:nth-of-type(odd)": { backgroundColor: "#F9FAFB" },
//                         "&:hover": {
//                           backgroundColor: "#E3F2FD",
//                           transition: "0.3s",
//                         },
//                       }}
//                     >
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 1,
//                             cursor: "pointer",
//                             "&:hover .name-text": {
//                               textDecoration: "underline",
//                             },
//                           }}
//                           onClick={() => navigate(`/admin/student/${student.rum_number}`)}
//                         >
//                           <Avatar
//                             sx={{ bgcolor: "#1565C0", width: 32, height: 32 }}
//                           >
//                             <PersonIcon fontSize="small" />
//                           </Avatar>
//                           <Typography
//                             className="name-text"
//                             color="#1565C0"
//                             fontWeight="bold"
//                           >
//                             {student.first_name} {student.last_name}
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell>{student.email}</TableCell>
//                       <TableCell>{student.rum_number}</TableCell>
//                       <TableCell>{student.phone}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default AdminJobApplicants;




// src/pages/admin/AdminJobApplicants.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonIcon from "@mui/icons-material/Person";

const AdminJobApplicants = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompanyDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `placements/company-details/${id}/`
      );
      setCompanyData(response.data);
    } catch (error) {
      console.error("Error fetching company details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress thickness={4} size={48} />
      </Box>
    );

  if (!companyData)
    return (
      <Typography textAlign="center" mt={5} color="textSecondary">
        Company details not found.
      </Typography>
    );

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Back + Logout Buttons */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            color: "#1565C0",
            textTransform: "none",
            fontWeight: "bold",
            border: "1px solid #1565C0",
            "&:hover": {
              background: "#E3F2FD",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
            },
          }}
        >
          Back to Job List
        </Button>

        <Button
          startIcon={<LogoutIcon />}
          onClick={() => navigate("/")}
          sx={{
            color: "#fff",
            background: "#1565C0",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              background: "#0d47a1",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            },
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Company Header */}
      <Card
        sx={{
          borderRadius: "18px",
          mb: 4,
          background: "linear-gradient(135deg, #E3F2FD, #FFFFFF)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          p: 2,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <WorkOutlineIcon sx={{ color: "#1565C0", fontSize: 30 }} />
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#1565C0"
              sx={{ letterSpacing: "0.5px" }}
            >
              {companyData.company_name}
            </Typography>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="subtitle1" color="textSecondary">
            Total Jobs: {companyData.jobs?.length || 0}
          </Typography>
        </CardContent>
      </Card>

      {/* Jobs & Applicants */}
      {companyData.jobs?.map((job, jobIndex) => (
        <Card
          key={jobIndex}
          sx={{
            borderRadius: "16px",
            mb: 5,
            p: 2,
            boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
            transition: "0.3s",
            "&:hover": { boxShadow: "0 8px 28px rgba(0,0,0,0.1)" },
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
            sx={{
              background: "linear-gradient(90deg, #1565C0, #42A5F5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {job.title} — Applicants ({job.applications_count})
          </Typography>

          {job.students.length === 0 ? (
            <Typography color="textSecondary" sx={{ ml: 1 }}>
              No applicants for this job.
            </Typography>
          ) : (
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#E3F2FD" }}>
                  <TableRow>
                    {["#", "Name", "Email", "RUM No", "Phone"].map(
                      (head, idx) => (
                        <TableCell
                          key={idx}
                          sx={{
                            fontWeight: "bold",
                            color: "#1565C0",
                          }}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {job.students.map((student, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#F9FAFB" },
                        "&:hover": {
                          backgroundColor: "#E3F2FD",
                          transform: "translateY(-1px)",
                          transition: "0.3s",
                        },
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate(`/admin/student/${student.rum_number}`)
                      }
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Avatar sx={{ bgcolor: "#1565C0", width: 32, height: 32 }}>
                            <PersonIcon fontSize="small" />
                          </Avatar>
                          <Typography
                            color="#1565C0"
                            fontWeight="bold"
                            sx={{ "&:hover": { textDecoration: "underline" } }}
                          >
                            {student.first_name} {student.last_name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.rum_number}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      ))}
    </Box>
  );
};

export default AdminJobApplicants;
