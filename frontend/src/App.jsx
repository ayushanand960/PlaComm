// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostJob from "./pages/PostJob";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import JobList from "./pages/JobList";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/dashboard/post-job" element={<PostJob />} />
          <Route path="/dashboard" element={<CoordinatorDashboard />} />
          <Route path="/dashboard/jobs" element={<JobList />} />
        </Routes>
      </div>
    </Router>
  );
}
