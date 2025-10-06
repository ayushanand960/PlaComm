// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Box,
//   Chip,
// } from "@mui/material";

// const dummyStudents = [
//   { id: 1, name: "Ravi Kumar", marks: 9 },
//   { id: 2, name: "Sneha Gupta", marks: 7 },
//   { id: 3, name: "Aman Verma", marks: 5 },
//   { id: 4, name: "Priya Sharma", marks: 3 },
// ];

// export default function UploadResultDialog({
//   open,
//   onClose,
//   activity,
//   onSubmit,
// }) {
//   const [students, setStudents] = useState([]);
//   const [verified, setVerified] = useState(false);

//   const handleVerify = () => {
//     // Sort dummy students descending by marks
//     const sorted = [...dummyStudents].sort((a, b) => b.marks - a.marks);
//     setStudents(sorted);
//     setVerified(true);
//   };

//   const handleSubmit = () => {
//     onSubmit(activity, students);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>Upload Result</DialogTitle>
//       <DialogContent dividers>
//         {/* Activity Info */}
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Topic:</strong> {activity?.topic}
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Job:</strong> {activity?.jobListing}
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Session:</strong> {activity?.session}
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Date:</strong> {activity?.date}
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Courses:</strong> {activity?.courses?.join(", ")}
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Total Courses:</strong> {activity?.courses?.length}
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Max Marks:</strong> {activity?.maxMarks}
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Min Marks:</strong> {activity?.minMarks}
//         </Typography>

//         {/* File Upload (dummy now, Excel parsing later) */}
//         <Box mt={2} mb={2}>
//           <Button variant="outlined" component="label">
//             Upload Excel File
//             <input type="file" hidden />
//           </Button>
//         </Box>

//         {/* Verify Button */}
//         <Button variant="contained" onClick={handleVerify}>
//           Verify
//         </Button>

//         {/* Students List After Verify */}
//         {verified && (
//           <Box mt={3}>
//             <Typography variant="h6" gutterBottom>
//               Student Results (Descending Order)
//             </Typography>
//             {students.map((s) => (
//               <Box
//                 key={s.id}
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 p={1}
//                 borderBottom="1px solid #ddd"
//               >
//                 <Typography>
//                   {s.name} — {s.marks} Marks
//                 </Typography>
//                 {s.marks >= activity.minMarks ? (
//                   <Chip label="Eligible" color="primary" />
//                 ) : (
//                   <Chip label="Non Eligible" color="success" />
//                 )}
//               </Box>
//             ))}
//           </Box>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button
//           onClick={handleSubmit}
//           disabled={!verified}
//           variant="contained"
//           color="primary"
//         >
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// src/TrainingOfficerComponents/StudentEvaluation/UploadResultDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import axiosInstance from "../../api/axiosInstance"; // ✅ same axiosInstance used elsewhere

export default function UploadResultDialog({
  open,
  onClose,
  activity,
  onSubmit,
}) {
  const [students, setStudents] = useState([]);
  const [verified, setVerified] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setVerified(false);
    setStudents([]);
  };

  const handleVerify = async () => {
    if (!selectedFile) {
      alert("Please upload an Excel file first.");
      return;
    }

    setUploading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("activity_id", activity.id);

    try {
      const res = await axiosInstance.post(
        "/training/evaluations/upload-excel/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const sorted = res.data.results.sort((a, b) => b.marks - a.marks);
      setStudents(sorted);
      setVerified(true);
      setMessage(res.data.message);
    } catch (err) {
      console.error("Excel verification failed:", err);
      const apiMsg = err.response?.data?.detail || "Failed to upload file.";
      alert(apiMsg);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    onSubmit(activity, students);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Upload Result</DialogTitle>

      <DialogContent dividers>
        {/* Activity Info */}
        <Typography variant="subtitle1" gutterBottom>
          <strong>Topic:</strong> {activity?.topic}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Job:</strong> {activity?.jobListing}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Session:</strong> {activity?.session}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Date:</strong> {activity?.date}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Courses:</strong> {activity?.courses?.join(", ")}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Total Courses:</strong> {activity?.courses?.length}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Max Marks:</strong> {activity?.maxMarks}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Min Marks:</strong> {activity?.minMarks}
        </Typography>

        {/* File Upload */}
        <Box mt={2} mb={2}>
          <Button variant="outlined" component="label">
            Upload Excel File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {selectedFile && (
            <Typography variant="body2" sx={{ ml: 2, display: "inline" }}>
              {selectedFile.name}
            </Typography>
          )}
        </Box>

        {/* Verify Button */}
        <Button
          variant="contained"
          onClick={handleVerify}
          disabled={uploading}
          sx={{
            mb: 2,
            backgroundColor: "goldenrod",
            "&:hover": { backgroundColor: "#2984d4ff" },
          }}
        >
          {uploading ? "Verifying..." : "Verify"}
        </Button>

        {message && (
          <Typography
            variant="body2"
            sx={{ mt: 1, mb: 1, color: "gray", fontStyle: "italic" }}
          >
            {message}
          </Typography>
        )}

        {/* Students List After Verify */}
        {verified && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Student Results (Descending Order)
            </Typography>

            {students.map((s, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
                borderBottom="1px solid #ddd"
              >
                <Typography>
                  {s.name || "Unknown"} — {s.marks} Marks
                </Typography>

                {s.eligible ? (
                  <Chip label="Eligible" color="primary" />
                ) : (
                  <Chip label="Non Eligible" color="success" />
                )}
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={!verified || uploading}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
