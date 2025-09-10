// src/Routes/TrainingOfficerRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TrainingOfficerLayout from "../Layouts/TrainingOfficerLayout";

import Dashboard from "../pages/TrainingOfficerPages/Dashboard.jsx";
import TrainingProgram from "../pages/TrainingOfficerPages/TrainingProgram.jsx";
import PriorityList from "../pages/TrainingOfficerPages/PriorityList.jsx";
import StudentEvaluation from "../pages/TrainingOfficerPages/StudentEvaluation.jsx";
import MockInterview from "../pages/TrainingOfficerPages/MockInterview.jsx"
import TrainingReport from "../pages/TrainingOfficerPages/TrainingReport.jsx";

const TrainingOfficerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TrainingOfficerLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="trainingprogram" element={<TrainingProgram />} />
        <Route path="prioritylist" element={<PriorityList />} />
        <Route path="studentevaluation" element={<StudentEvaluation />} />
        <Route path="trainingreport" element={<TrainingReport />} />
        <Route path="mockinterview" element={<MockInterview />} />
      </Route>
    </Routes>
  );
};

export default TrainingOfficerRoutes;

