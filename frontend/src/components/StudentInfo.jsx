// // src/components/StudentInfo.jsx
// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Button,
//   Box,
// } from "@mui/material";

// const StudentInfo = ({ onEdit = () => {} }) => {
//   // Dummy student data
//   const student = {
//     name: "John Doe",
//     rollNumber: "CS2023001",
//     course: "B.Tech Computer Science",
//     year: "3rd Year",
//     email: "johndoe@example.com",
//     phone: "+91 9876543210",
//     avatar: "https://i.pravatar.cc/150?img=3",
//   };

//   return (
//     <Box sx={{ width: "100%", mb: 3 }}>
//       <Card
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           alignItems: "center",
//           justifyContent: "space-between",
//           p: 3,
//           borderRadius: 3,
//           bgcolor: "primary.main",
//           color: "white",
//           boxShadow: 4,
//           width: "100%",
//         }}
//       >
//         {/* Left: Avatar + Info */}
//         <Box display="flex" alignItems="center" gap={3}>
//           <Avatar
//             src={student.avatar}
//             alt={student.name}
//             sx={{ width: 100, height: 100, border: "2px solid white" }}
//           />
//           <CardContent sx={{ p: 0 }}>
//             <Typography variant="h5" fontWeight="bold">
//               {student.name}
//             </Typography>
//             <Typography variant="body1">{student.course}</Typography>
//             <Typography variant="body2">Roll No: {student.rollNumber}</Typography>
//             <Typography variant="body2">Year: {student.year}</Typography>
//             <Typography variant="body2">{student.email}</Typography>
//             <Typography variant="body2">{student.phone}</Typography>
//           </CardContent>
//         </Box>

//         {/* Right: Edit button */}
//         <Box>
//           <Button
//             variant="contained"
//             sx={{
//               bgcolor: "white",
//               color: "primary.main",
//               fontWeight: "bold",
//               "&:hover": { bgcolor: "grey.200" },
//             }}
//             onClick={onEdit}
//           >
//             Edit Profile
//           </Button>
//         </Box>
//       </Card>
//     </Box>
//   );
// };

// export default StudentInfo;

// src/components/StudentInfo.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudentInfo = ({ student, onEdit = () => {} }) => {
  const navigate = useNavigate();
  if (!student) {
    return (
      <Typography color="error" sx={{ textAlign: "center", my: 2 }}>
        Failed to load profile.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
          borderRadius: 3,
          bgcolor: "primary.main",
          color: "white",
          boxShadow: 4,
          width: "100%",
        }}
      >
        {/* Left: Avatar + Info */}
        <Box display="flex" alignItems="center" gap={3}>
          <Avatar
            src={student.photo || "/images/default-avatar.png"}
            alt={student.full_name}
            sx={{ width: 100, height: 100, border: "2px solid white" }}
          />
          <CardContent sx={{ p: 0 }}>
            <Typography variant="h5" fontWeight="bold">
              Welcom, {student.first_name} {student.last_name}
            </Typography>
            <Typography variant="body2">RUM Number: {student.unique_id || "N/A"}</Typography>
            <Typography variant="body1">Course: {student.course || "N/A"}</Typography>
            <Typography variant="body1">Branch: {student.branch || "N/A"}</Typography>
            <Typography variant="body2">Year: {student.year || "N/A"}</Typography>
            <Typography variant="body2">Email: {student.email}</Typography>
            <Typography variant="body2">Phone: {student.phone || "N/A"}</Typography>
          </CardContent>
        </Box>

        {/* Right: Edit button */}
        <Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              fontWeight: "bold",
              "&:hover": { bgcolor: "grey.200" },
            }}
            onClick={() => navigate(`/student-profile/${student.unique_id}`)}
          >
            Edit Profile
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default StudentInfo;
