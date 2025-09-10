// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PostJob from "./pages/PostJob";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import JobList from "./pages/JobList";
import Register from "./pages/Register";
import StudentRecruiterLogin from "./pages/StudentRecruiterLogin";
import AdminCoordinatorLogin from "./pages/AdminCoordinatorLogin";
import AdminManageUsers from "./pages/AdminManageUsers";
import PrivateRoute from "./pages/PrivateRoute";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
// Newly added dashboards
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import TrainingOfficerDashboard from "./pages/TrainingOfficerDashboard";

export default function App() {
  return (
    <Router>
      <div>
        {/* <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>
            {  Home }
          </Link>
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
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/student-recruiter-login"
            element={<StudentRecruiterLogin />}
          />
          <Route
            path="/admin-coordinator-login"
            element={<AdminCoordinatorLogin />}
          />
          <Route path="/about" element={<About />} />
          {/* Protected Routes */}

          {/* Coordinator */}
          <Route
            element={<PrivateRoute allowedRoles={["placement_coordinator"]} />}
          >
            <Route
              path="/coordinator-dashboard/:id"
              element={<CoordinatorDashboard />}
            />
            <Route
              path="/coordinator-dashboard/:id/post-job"
              element={<PostJob />}
            />
            <Route
              path="/coordinator-dashboard/:id/jobs"
              element={<JobList />}
            />
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
