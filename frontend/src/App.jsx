// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PostJob from "./pages/placementCoordinator/PostJob";
import JobList from "./pages/placementCoordinator/JobList";
import Register from "./pages/Register";
import StudentRecruiterLogin from "./pages/StudentRecruiterLogin";
import AdminCoordinatorLogin from "./pages/AdminCoordinatorLogin";
import AdminManageUsers from "./pages/AdminManageUsers";
import PrivateRoute from "./pages/PrivateRoute";

// Newly added dashboards
//import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import JobOpportunities from "./pages/student/JobOpportunities";

import MyApplications from "./pages/student/MyApplications";
import StudentResume from "./pages/student/StudentResume";
import DiscussionForum from "./pages/DiscussionForum";
import DriveQuestions from "./pages/student/DriveQuestions";


import RecruiterDashboard from "./pages/RecruiterDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import TrainingOfficerDashboard from "./pages/TrainingOfficerPages/TrainingOfficerDashboard";
import Gallery from "./pages/Gallery";
import About from "./pages/About";

// Coordinator Layout + Pages
import CoordinatorLayout from "./layouts/CoordinatorLayout";
import CoordinatorDashboard from "./pages/placementCoordinator/CoordinatorDashboard";
// import Profile from "./pages/Profile"
// import JobManagement from "./pages/JobManagement";
import PlacementDrives from "./pages/placementCoordinator/PlacementDrives";
import Applications from "./pages/placementCoordinator/Applications";
import CompanyRelations from "./pages/placementCoordinator/CompanyRelations";
import Reports from "./pages/placementCoordinator/Reports";
import Notifications from "./pages/placementCoordinator/Notifications";
// import StudentResume from "./pages/StudentResume";


//imports for Training Officer
// import Navbar from "./components/trainingOfficer/Navbar";
// import TrainingOfficerRoutes from "./routes/TrainingOfficerRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
//import RoleAssignment from "./pages/admin/RoleAssignment";
import ReportAnalytics from "./pages/admin/ReportAnalytics";
import SystemSettings from "./pages/admin/SystemSettings";
import CategoryList from "./pages/CategoryList";
import ThreadList from "./pages/ThreadList";
import ThreadDetail from "./pages/ThreadDetail";
import AddCategory from "./pages/AddCategory";
import DriveReports from "./pages/student/DriveReports";
import AdminJobAnalysis from "./pages/admin/AdminJobAnalysis";



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
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />


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
<Route path="/admin/job-analysis" element={<AdminJobAnalysis />} />




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

          <Route
            element={
              <PrivateRoute
                allowedRoles={["admin", "placement_coordinator", "officer"]}
              />
            }
          >
          <Route path="/admin/add-category" element={<AddCategory />} />

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
            <Route path="/questions" element={<DriveQuestions />} />
            <Route path="/reports" element={<DriveReports />} />

            {/* Discussion Forum */}
           {/* <Route path="/forum" element={<DiscussionForum />} />
            <Route path="/categories/:categoryId/threads" element={<ThreadList />} />
            <Route path="/threads/:id" element={<ThreadDetail />} />  */}
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
