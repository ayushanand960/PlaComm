// import React, { useState, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import ActivityCard from "../../TrainingOfficerComponents/StudentEvaluation/ActivityCard";
// import UploadResultDialog from "../../TrainingOfficerComponents/StudentEvaluation/UploadResultDialog";
// import { Button } from "@mui/material";

// const activityTypes = ["GD", "Technical", "Aptitude", "Mock", "PI"];

// export default function StudentEvaluation() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedActivity, setSelectedActivity] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   // Group activities by type (newest → oldest)
//   const activitiesByType = useMemo(() => {
//     const stored = JSON.parse(localStorage.getItem("activities")) || [];
//     const grouped = {};
//     activityTypes.forEach((t) => (grouped[t] = []));
//     stored.forEach((a) => {
//       if (!a.deleted && !a.resultUploaded) {
//         if (!grouped[a.type]) grouped[a.type] = [];
//         grouped[a.type].push(a);
//       }
//     });
//     Object.keys(grouped).forEach((t) =>
//       grouped[t].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     );
//     return grouped;
//   }, [refreshKey]);

//   const handleUploadClick = (activity) => {
//     setSelectedActivity(activity);
//     setOpenDialog(true);
//   };

//   const handleSubmitResult = (activity, students) => {
//     const stored = JSON.parse(localStorage.getItem("activities")) || [];
//     const updated = stored.map((a) =>
//       a.id === activity.id ? { ...a, resultUploaded: true, students } : a
//     );
//     localStorage.setItem("activities", JSON.stringify(updated));

//     // Push to priority list
//     const priority = JSON.parse(localStorage.getItem("priorityList")) || {};
//     if (!priority[activity.type]) priority[activity.type] = [];
//     priority[activity.type].push({ ...activity, students });
//     localStorage.setItem("priorityList", JSON.stringify(priority));

//     setRefreshKey((k) => k + 1);
//     setOpenDialog(false);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Student Evaluation</h2>

//       {activityTypes.map((type) => {
//         const activities = activitiesByType[type] || [];
//         const newest = activities.slice(0, 5);

//         return (
//           <div key={type} style={{ marginBottom: 30 }}>
//             <h3>{type} Activities</h3>

//             {newest.length === 0 ? (
//               <p>No pending {type} activities.</p>
//             ) : (
//               <div
//                 style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   gap: "16px", // space between cards
//                 }}
//               >
//                 {newest.map((a) => (
//                   <ActivityCard
//                     key={a.id}
//                     activity={a}
//                     onUpload={() => handleUploadClick(a)}
//                     sx={{ width: { xs: "100%", sm: 220, md: 250 } }} // optional card width
//                   />
//                 ))}
//               </div>
//             )}

//             {activities.length > 5 && (
//               <Button
//                 variant="text"
//                 sx={{ mt: 1 }}
//                 onClick={() =>
//                   navigate(
//                     `/officer-dashboard/${id}/studentevaluation/${type.toLowerCase()}`
//                   )
//                 }
//               >
//                 View All
//               </Button>
//             )}
//           </div>
//         );
//       })}

//       <UploadResultDialog
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         activity={selectedActivity}
//         onSubmit={handleSubmitResult}
//       />
//     </div>
//   );
// }

// src/pages/TrainingOfficerPages/StudentEvaluation.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Box } from "@mui/material";
import ActivityCard from "../../components/trainingOfficer/studentEvaluation/ActivityCard";
import UploadResultDialog from "../../components/trainingOfficer/studentEvaluation/UploadResultDialog";
import axiosInstance from "../../api/axiosInstance";

// Match exact backend activity codes
const activityTypes = [
  { code: "GD", label: "Group Discussion" },
  { code: "TECH", label: "Technical" },
  { code: "APT", label: "Aptitude" },
  { code: "MOCK", label: "Mock" },
  { code: "PI", label: "PI" },
];

export default function StudentEvaluation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]); // all fetched activities
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch all training activities from backend
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/training/activities/");
      setActivities(res.data || []);
    } catch (err) {
      console.error("Failed to fetch activities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [refreshKey]);

  // Group activities by type for display, newest → oldest
  const activitiesByType = useMemo(() => {
    const grouped = {};
    activityTypes.forEach(({ code }) => (grouped[code] = []));
    activities.forEach((a) => {
      if (a.type && grouped[a.type]) grouped[a.type].push(a);
    });
    Object.keys(grouped).forEach((t) =>
      grouped[t].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    );
    return grouped;
  }, [activities]);

  // Open upload dialog
  const handleUploadClick = (activity) => {
    setSelectedActivity(activity);
    setOpenDialog(true);
  };

  // Called after successful result submit
  const handleSubmitResult = () => {
    setRefreshKey((k) => k + 1);
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Student Evaluation</h2>

      {activityTypes.map(({ code, label }) => {
        const list = activitiesByType[code] || [];
        const newest = list.slice(0, 5);

        return (
          <div key={code} style={{ marginBottom: 30 }}>
            <h3>{label} Activities</h3>

            {newest.length === 0 ? (
              <p>No pending {label} activities.</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                {newest.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={{
                      // Map backend fields to frontend expectations
                      ...activity,
                      jobListing: `${activity.job.company_name} - ${activity.job.job_title}`,
                      resultDate: activity.result_date,
                      maxMarks: activity.max_marks,
                      minMarks: activity.min_marks,
                      courses: activity.courses || [],
                    }}
                    onUpload={() => handleUploadClick(activity)}
                    isResultUploaded={false} // could check EvaluationResult table later
                  />
                ))}
              </div>
            )}

            {list.length > 5 && (
              <Button
                variant="text"
                sx={{ mt: 1 }}
                onClick={() =>
                  navigate(
                    `/officer-dashboard/${id}/studentevaluation/${code.toLowerCase()}`
                  )
                }
              >
                View All
              </Button>
            )}
          </div>
        );
      })}

      {/* Upload Result Dialog */}
      <UploadResultDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        activity={selectedActivity}
        onSubmit={handleSubmitResult}
      />
    </div>
  );
}
