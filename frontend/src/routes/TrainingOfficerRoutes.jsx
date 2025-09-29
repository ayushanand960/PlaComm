// src/Routes/TrainingOfficerRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TrainingOfficerLayout from "../Layouts/TrainingOfficerLayout";

import ViewActivity from "../TrainingOfficerComponents/TrainingProgram/ViewActivity";
import PastActivities from "../TrainingOfficerComponents/TrainingProgram/PastActivities";
import CreateActivityForm from "../TrainingOfficerComponents/TrainingProgram/CreateActivityForm";

import Dashboard from "../pages/TrainingOfficerPages/Dashboard.jsx";
import TrainingProgram from "../pages/TrainingOfficerPages/TrainingProgram.jsx";
import PriorityList from "../pages/TrainingOfficerPages/PriorityList.jsx";
import StudentEvaluation from "../pages/TrainingOfficerPages/StudentEvaluation.jsx";
import MockInterview from "../pages/TrainingOfficerPages/MockInterview.jsx";
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
        <Route
          path="/studentevaluation/:section"
          element={<FullSectionList />}
        />
        <Route path="trainingreport" element={<TrainingReport />} />
        <Route path="mockinterview" element={<MockInterview />} />

        {/* Training Program main page */}
        <Route path="trainingprogram" element={<TrainingProgram />} />
        <Route
          path="trainingprogram/gd/view"
          element={<ViewActivity activityType="GD" title="Group Discussion" />}
        />
        <Route
          path="trainingprogram/gd/create"
          element={<CreateActivityForm activityType="GD" />}
        />
        <Route
          path="trainingprogram/gd/past"
          element={
            <PastActivities activityType="GD" title="Group Discussion" />
          }
        />

        {/* Aptitude */}
        <Route
          path="trainingprogram/apt/view"
          element={<ViewActivity activityType="APT" title="Aptitude Test" />}
        />
        <Route
          path="trainingprogram/apt/create"
          element={<CreateActivityForm activityType="APT" />}
        />
        <Route
          path="trainingprogram/apt/past"
          element={<PastActivities activityType="APT" title="Aptitude Test" />}
        />

        {/* Technical */}
        <Route
          path="trainingprogram/tech/view"
          element={
            <ViewActivity activityType="TECH" title="Technical Assessment" />
          }
        />
        <Route
          path="trainingprogram/tech/create"
          element={<CreateActivityForm activityType="TECH" />}
        />
        <Route
          path="trainingprogram/tech/past"
          element={
            <PastActivities activityType="TECH" title="Technical Assessment" />
          }
        />

        {/* Mock */}
        <Route
          path="trainingprogram/mock/view"
          element={<ViewActivity activityType="MOCK" title="Mock Interview" />}
        />
        <Route
          path="trainingprogram/mock/create"
          element={<CreateActivityForm activityType="MOCK" />}
        />
        <Route
          path="trainingprogram/mock/past"
          element={
            <PastActivities activityType="MOCK" title="Mock Interview" />
          }
        />

        {/* Personal */}
        <Route
          path="trainingprogram/pi/view"
          element={
            <ViewActivity activityType="PI" title="Personal Interview" />
          }
        />
        <Route
          path="trainingprogram/pi/create"
          element={<CreateActivityForm activityType="PI" />}
        />
        <Route
          path="trainingprogram/pi/past"
          element={
            <PastActivities activityType="PI" title="Personal Interview" />
          }
        />
      </Route>
    </Routes>
  );
};

export default TrainingOfficerRoutes;
