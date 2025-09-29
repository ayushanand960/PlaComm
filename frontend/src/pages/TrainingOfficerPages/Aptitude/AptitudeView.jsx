// import React, { useState } from "react";
// import HeaderBar from "../../../TrainingOfficerComponents/TrainingProgram/HeaderBar";
// import ActivityList from "../../../TrainingOfficerComponents/TrainingProgram/ActivityList";
// import CreateActivityForm from "../../../TrainingOfficerComponents/TrainingProgram/CreateActivityForm";

// const AptitudeView = () => {
//   const [editData, setEditData] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const handleEdit = (activity) => {
//     setEditData(activity); // show form
//     window.scrollTo({ top: 0, behavior: "smooth" }); // optional
//   };

//   const handleUpdate = () => {
//     setEditData(null);      // close form after update
//     setRefreshKey(prev => prev + 1); // refresh list
//   };

//   const handleDelete = (id) => {
//     const stored = JSON.parse(localStorage.getItem("activities")) || [];
//     const updated = stored.filter(a => a.id !== id);
//     localStorage.setItem("activities", JSON.stringify(updated));

//     // If the deleted activity is currently being edited, close the form
//     if (editData && editData.id === id) {
//       setEditData(null);
//     }

//     setRefreshKey(prev => prev + 1); // refresh the list
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <HeaderBar title="Aptitude Activities" backPath="/officer-dashboard/:id/trainingprogram" />

//       <h2>Aptitude Activities</h2>

//       {/* List on top */}
//       <ActivityList
//         key={refreshKey}
//         activityType="Aptitude"
//         limit={5}
//         onEdit={handleEdit}
//         onDelete={handleDelete}  // pass delete handler here
//       />

//       {/* Form below */}
//       {editData && (
//         <div style={{ marginTop: "20px" }}>
//           <CreateActivityForm
//             activityType="Aptitude"
//             editData={editData}
//             onUpdate={handleUpdate}
//           />
//         </div>
//       )}
//     </div>
//   );
// };
// export default AptitudeView;

// src/pages/TrainingOfficer/AptitudeView.jsx
import React, { useState } from "react";
import HeaderBar from "../../../TrainingOfficerComponents/TrainingProgram/HeaderBar";
import ActivityList from "../../../TrainingOfficerComponents/TrainingProgram/ActivityList";
import CreateActivityForm from "../../../TrainingOfficerComponents/TrainingProgram/CreateActivityForm";

const AptitudeView = () => {
  const [editData, setEditData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (activity) => {
    setEditData(activity); // Prefill form for editing
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = () => {
    setEditData(null);
    setRefreshKey((prev) => prev + 1); // reload list
  };

  return (
    <div style={{ padding: "20px" }}>
      <HeaderBar
        title="Aptitude Activities"
        backPath="/officer-dashboard/:id/trainingprogram"
      />

      <h2>Aptitude Activities</h2>

      {/* List on top */}
      <ActivityList
        key={refreshKey}
        activityType="APT" // must match backend choices (GD, APT, TECH, MOCK, PI)
        limit={5}
        onEdit={handleEdit}
      />

      {/* Form below when editing */}
      {editData && (
        <div style={{ marginTop: "20px" }}>
          <CreateActivityForm
            activityType="APT"
            editData={editData}
            onUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  );
};
export default AptitudeView;
