
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
import HomeLayout from "./layouts/HomeLayout"

// Newly added dashboards
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import TrainingOfficerDashboard from "./pages/TrainingOfficerDashboard";

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
        {/* <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
          <Link to="/student-recruiter-login" style={{ marginRight: "1rem" }}>
            Student / Recruiter Login
          </Link>
          <Link to="/admin-coordinator-login" style={{ marginRight: "1rem" }}>
            Admin / Coordinator Login
          </Link>
          <Link to="/register">Register</Link>
        </nav> */}

        <Routes>
          {/* Public Routes */}
          <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student-recruiter-login" element={<StudentRecruiterLogin />} />
          <Route path="/admin-coordinator-login" element={<AdminCoordinatorLogin />} />
</Route>
          {/* Protected Routes */}

          {/* Coordinator */}
           {/* <Route element={<PrivateRoute allowedRoles={["placement_coordinator"]} />}>
            <Route path="/coordinator-dashboard/:id" element={<CoordinatorDashboard />} />
            <Route path="/coordinator-dashboard/:id/post-job" element={<PostJob />} />
            <Route path="/coordinator-dashboard/:id/jobs" element={<JobList />} />
          </Route> */}

          <Route element={<PrivateRoute allowedRoles={["placement_coordinator"]} />}>
          <Route path="/coordinator-dashboard/:id" element={<CoordinatorLayout />}>
            {/* Default dashboard home */}
            <Route index element={<CoordinatorDashboard />} />

            {/* Nested coordinator pages */}
            <Route path="post-job" element={<PostJob />} />
            <Route path="jobs" element={<JobList />} />
          </Route>
        </Route>


          <Route element={<PrivateRoute allowedRoles={["student", "recruiter", "placement_coordinator", "authority", "training_officer"]} />}>
  <Route path="/dashboard/:id/*" element={<CoordinatorLayout />}>
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
            <Route path="/authority-dashboard/:id" element={<AuthorityDashboard />} />
          </Route>

          {/* Training Officer */}
          <Route element={<PrivateRoute allowedRoles={["training_officer"]} />}>
            <Route path="/officer-dashboard/:id" element={<TrainingOfficerDashboard />} />
          </Route>

          {/* Student */}
          <Route element={<PrivateRoute allowedRoles={["student"]} />}>
            <Route path="/student-dashboard/:id" element={<StudentDashboard />} />
          </Route>

          {/* Recruiter */}
          <Route element={<PrivateRoute allowedRoles={["recruiter"]} />}>
            <Route path="/recruiter-dashboard/:id" element={<RecruiterDashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}