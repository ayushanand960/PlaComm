// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/Login"; // optional, remove if not needed
import PostJob from "./pages/PostJob";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import JobList from "./pages/JobList";
import Register from "./pages/Register";
import StudentRecruiterLogin from "./pages/StudentRecruiterLogin";
import AdminCoordinatorLogin from "./pages/AdminCoordinatorLogin"; // new page
import AdminManageUsers from "./pages/AdminManageUsers";

export default function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
          <Link to="/student-recruiter-login" style={{ marginRight: "1rem" }}>
            Student / Recruiter Login
          </Link>
          <Link to="/admin-coordinator-login" style={{ marginRight: "1rem" }}>
            Admin / Coordinator Login
          </Link>
          <Link to="/register">Register</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student-recruiter-login" element={<StudentRecruiterLogin />} />
          <Route path="/admin-coordinator-login" element={<AdminCoordinatorLogin />} />

          {/* Coordinator / Dashboard routes */}
          <Route path="/dashboard/post-job" element={<PostJob />} />
          <Route path="/dashboard" element={<CoordinatorDashboard />} />
          <Route path="/dashboard/jobs" element={<JobList />} />
          <Route path="/admin/manage-users" element={<AdminManageUsers />} />


          {/* Optional old login page */}
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
