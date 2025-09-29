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
//import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import JobOpportunities from "./pages/JobOpportunities";

import MyApplications from "./pages/MyApplications";
import StudentResume from "./pages/StudentResume";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import TrainingOfficerDashboard from "./pages/TrainingOfficerDashboard";
import Gallery from "./pages/Gallery";
import About from "./pages/About";

// Coordinator Layout + Pages
import CoordinatorLayout from "./layouts/CoordinatorLayout";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
// import Profile from "./pages/Profile"
// import JobManagement from "./pages/JobManagement";
import PlacementDrives from "./pages/PlacementDrives";
import Applications from "./pages/Applications";
import CompanyRelations from "./pages/CompanyRelations";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
// import StudentResume from "./pages/StudentResume";


//imports for Training Officer
import Navbar from "./TrainingOfficerComponents/Navbar";
import TrainingOfficerRoutes from "./routes/TrainingOfficerRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
//import RoleAssignment from "./pages/admin/RoleAssignment";
import ReportAnalytics from "./pages/admin/ReportAnalytics";
import SystemSettings from "./pages/admin/SystemSettings";
import CategoryList from "./pages/CategoryList";
import ThreadList from "./pages/ThreadList";
import ThreadDetail from "./pages/ThreadDetail";
import AddCategory from "./pages/admin/AddCategory";


export default function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        {/* <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
          <Link to="/student-recruiter-login" style={{ marginRight: "1rem" }}>Student / Recruiter Login</Link>
          <Link to="/admin-coordinator-login" style={{ marginRight: "1rem" }}>Admin / Coordinator Login</Link>
          <Link to="/register">Register</Link>
        </nav> */}

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student-recruiter-login" element={<StudentRecruiterLogin />} />
          <Route path="/admin-coordinator-login" element={<AdminCoordinatorLogin />} />

          {/* Protected Routes */}

          {/* Coordinator Routes */}
          <Route element={<PrivateRoute allowedRoles={["placement_coordinator"]} />}>
            <Route path="/coordinator-dashboard/:id/*" element={<CoordinatorLayout />}>
              <Route index element={<CoordinatorDashboard />} />
              <Route path="placements/job-postings" element={<PostJob />} />

              {/* <Route path="post-job" element={<JobManagement />} /> */}

              <Route path="placement-drives" element={<PlacementDrives />} />
              <Route path="applications" element={<Applications />} />
              <Route path="company-relations" element={<CompanyRelations />} />
              <Route path="reports" element={<Reports />} />
              <Route path="notifications" element={<Notifications />} />
              {/* <Route path="profile" element={<Profile />}></Route> */}
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/manage-users" element={<AdminManageUsers />} />
            {/*Routing for Admin Navbar */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/role-assignment" element={<AdminManageUsers />} />
            <Route path="/admin/reports-analytics" element={<ReportAnalytics />} />
            <Route path="/admin/system-settings" element={<SystemSettings />} />
            <Route path="/admin/add-category" element={<AddCategory />} />



            {/* <Route path="/admin/discussion-forum" element={<CategoryList />} />
            <Route path="/admin/categories/:categoryId/threads" element={<ThreadList />} />
            <Route path="/admin/threads/:id" element={<ThreadDetail />} /> */}

          </Route>


          <Route
            element={
              <PrivateRoute
                allowedRoles={["student", "admin", "placement_coordinator", "officer"]}
              />
            }
          >
            <Route path="/discussion-forum" element={<CategoryList />} />
            <Route path="/categories/:categoryId/threads" element={<ThreadList />} />
            <Route path="/threads/:id" element={<ThreadDetail />} />
          </Route>



          {/* Authority Routes */}
          <Route element={<PrivateRoute allowedRoles={["authority"]} />}>
            <Route path="/authority-dashboard/:id" element={<AuthorityDashboard />} />
          </Route>

          {/* Training Officer Routes */}
          <Route element={<PrivateRoute allowedRoles={["training_officer"]} />}>
            <Route
              path="/officer-dashboard/:id/*"
              element={<TrainingOfficerDashboard />}
            />
          </Route>

          {/* Student */}
          {/* <Route element={<PrivateRoute allowedRoles={["student"]} />}>
            <Route
              path="/student-dashboard/:id"
              element={<StudentDashboard />}
            />
            <Route path="/student-profile/:id" element={<StudentProfile />} />
            <Route path="/jobs" element={<JobOpportunities />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/resume" element={<StudentResume />} />

            {/* Discussion Forum */}
          {/* <Route path="/discussion-forum" element={<CategoryList />} />
            <Route path="/categories/:categoryId/threads" element={<ThreadList />} />
            <Route path="/threads/:id" element={<ThreadDetail />} />  {/* ✅ ThreadDetail route */}

          {/* </Route> */}

          <Route element={<PrivateRoute allowedRoles={["student"]} />}>
            <Route path="/student-dashboard/:id" element={<StudentDashboard />} />
            <Route path="/student-profile/:id" element={<StudentProfile />} />
            <Route path="/jobs" element={<JobOpportunities />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/resume" element={<StudentResume />} />

            {/* Discussion Forum */}
            {/* <Route path="/discussion-forum" element={<CategoryList />} />
            <Route path="/categories/:categoryId/threads" element={<ThreadList />} />
            <Route path="/threads/:id" element={<ThreadDetail />} />  ✅ ThreadDetail route */}
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
