// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PostJob from "./pages/PostJob";
import JobList from "./pages/JobList";
import Register from "./pages/Register";
import StudentRecruiterLogin from "./pages/StudentRecruiterLogin";
import AdminCoordinatorLogin from "./pages/AdminCoordinatorLogin";
import AdminManageUsers from "./pages/AdminManageUsers";
import PrivateRoute from "./pages/PrivateRoute";

// Newly added dashboards
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import TrainingOfficerDashboard from "./pages/TrainingOfficerDashboard";
import Gallery from "./pages/Gallery";
import About from "./pages/About";

//Coordinator Layout + Pages
import CoordinatorLayout from "./layouts/CoordinatorLayout";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
// import JobManagement from "./pages/JobManagement";
import PlacementDrives from "./pages/PlacementDrives";
import Applications from "./pages/Applications";
import CompanyRelations from "./pages/CompanyRelations";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <Router>
      <div>

        <Routes>
          {/* Public Routes */}
          {/* <Route element={<HomeLayout />}> */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student-recruiter-login" element={<StudentRecruiterLogin />} />
            <Route path="/admin-coordinator-login" element={<AdminCoordinatorLogin />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={["placement_coordinator"]} />}>
            <Route path="/coordinator-dashboard/:id/*" element={<CoordinatorLayout />}>
              {/* <Route path="dashboard" element={<CoordinatorDashboard />} /> */}
              <Route index element={<CoordinatorDashboard />} />
              {/* <Route path="job-management" element={<JobManagement />} /> */}
              <Route path="placement-drives" element={<PlacementDrives />} />
              <Route path="applications" element={<Applications />} />
              <Route path="company-relations" element={<CompanyRelations />} />
              <Route path="reports" element={<Reports />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
          </Route>




          {/* Admin */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/manage-users" element={<AdminManageUsers />} />
          </Route>

          {/* Authority */}
          <Route element={<PrivateRoute allowedRoles={["authority"]} />}>
            <Route
              path="/authority-dashboard/:id"
              element={<AuthorityDashboard />}
            />
          </Route>

          {/* Training Officer */}
          <Route element={<PrivateRoute allowedRoles={["training_officer"]} />}>
            <Route
              path="/officer-dashboard/:id"
              element={<TrainingOfficerDashboard />}
            />
          </Route>

          {/* Student */}
          <Route element={<PrivateRoute allowedRoles={["student"]} />}>
            <Route
              path="/student-dashboard/:id"
              element={<StudentDashboard />}
            />
            <Route path="/student-profile/:id" element={<StudentProfile />} />
          </Route>

          {/* Recruiter */}
          <Route element={<PrivateRoute allowedRoles={["recruiter"]} />}>
            <Route
              path="/recruiter-dashboard/:id"
              element={<RecruiterDashboard />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}