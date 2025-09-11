// src/layouts/HomeLayout.jsx
import { Outlet, Link } from "react-router-dom";

export default function HomeLayout() {
  return (
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
      <Outlet />
    </div>
  );
}
