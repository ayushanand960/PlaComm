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
import FullSectionList from "../pages/TrainingOfficerPages/FullSectionList.jsx";

// 🟡 GD Pages
import GDCreate from "../pages/TrainingOfficerPages/GD/GDCreate.jsx";
import GDView from "../pages/TrainingOfficerPages/GD/GDView.jsx";
import GDPast from "../pages/TrainingOfficerPages/GD/GDPast.jsx";

// 🟡 Aptitude Pages
import AptitudeCreate from "../pages/TrainingOfficerPages/Aptitude/AptitudeCreate.jsx";
import AptitudeView from "../pages/TrainingOfficerPages/Aptitude/AptitudeView.jsx";
import AptitudePast from "../pages/TrainingOfficerPages/Aptitude/AptitudePast.jsx";

// 🟡 Technical Pages
import TechnicalCreate from "../pages/TrainingOfficerPages/Technical/TechnicalCreate.jsx";
import TechnicalView from "../pages/TrainingOfficerPages/Technical/TechnicalView.jsx";
import TechnicalPast from "../pages/TrainingOfficerPages/Technical/TechnicalPast.jsx";

// 🟡 Mock Pages
import MockCreate from "../pages/TrainingOfficerPages/Mock/MockCreate.jsx";
import MockView from "../pages/TrainingOfficerPages/Mock/MockView.jsx";
import MockPast from "../pages/TrainingOfficerPages/Mock/MockPast.jsx";

// 🟡 PI Pages
import PICreate from "../pages/TrainingOfficerPages/PI/PICreate.jsx";
import PIView from "../pages/TrainingOfficerPages/PI/PIView.jsx";
import PIPast from "../pages/TrainingOfficerPages/PI/PIPast.jsx";

const TrainingOfficerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TrainingOfficerLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="prioritylist" element={<PriorityList />} />
        <Route path="/prioritylist/:section" element={<FullSectionList />} />
        <Route path="studentevaluation" element={<StudentEvaluation />} />
        <Route path="/studentevaluation/:section" element={<FullSectionList />} />
        <Route path="trainingreport" element={<TrainingReport />} />
        <Route path="mockinterview" element={<MockInterview />} />

      {/* Training Program main page */}
  <Route path="trainingprogram" element={<TrainingProgram />} />

  {/* GD routes */}
  <Route path="trainingprogram/gd/create" element={<GDCreate />} />
  <Route path="trainingprogram/gd/view" element={<GDView />} />
  <Route path="trainingprogram/gd/past" element={<GDPast />} />

  {/* Aptitude routes */}
  <Route path="trainingprogram/aptitude/create" element={<AptitudeCreate />} />
  <Route path="trainingprogram/aptitude/view" element={<AptitudeView />} />
  <Route path="trainingprogram/aptitude/past" element={<AptitudePast />} />

  {/* Technical routes */}
  <Route path="trainingprogram/technical/create" element={<TechnicalCreate />} />
  <Route path="trainingprogram/technical/view" element={<TechnicalView />} />
  <Route path="trainingprogram/technical/past" element={<TechnicalPast />} />

  {/* Mock routes */}
  <Route path="trainingprogram/mock/create" element={<MockCreate />} />
  <Route path="trainingprogram/mock/view" element={<MockView />} />
  <Route path="trainingprogram/mock/past" element={<MockPast />} />

  {/* PI routes */}
  <Route path="trainingprogram/pi/create" element={<PICreate />} />
  <Route path="trainingprogram/pi/view" element={<PIView />} />
  <Route path="trainingprogram/pi/past" element={<PIPast />} />
  </Route>
    </Routes>
  );
};

export default TrainingOfficerRoutes;

