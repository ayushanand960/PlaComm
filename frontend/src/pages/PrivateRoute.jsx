// // src/components/PrivateRoute.jsx
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = ({ allowedRoles }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     return <Navigate to="/admin-coordinator-login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />; // redirect if unauthorized
//   }

//   return <Outlet />;
// };

// export default PrivateRoute;


// src/pages/PrivateRoute.jsx
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

// Map friendly/alias roles to backend roles
const roleAliases = {
  admin: "admin",
  authority: "authority",
  student: "student",
  recruiter: "recruiter",

  // coordinator variants
  coordinator: "placement_coordinator",
  "placement-coordinator": "placement_coordinator",
  placement_coordinator: "placement_coordinator",

  // training officer variants
  officer: "officer",
  training_officer: "officer",
  "training officer": "officer",
};

const normalizeRole = (r) => (r ? roleAliases[r] || r : r);

const defaultDashboard = (user) => {
  const id = user?.unique_id;
  switch (normalizeRole(user?.role)) {
    case "admin":
      return "/admin/manage-users";
    case "placement_coordinator":
      return `/coordinator-dashboard/${id}`;
    case "authority":
      return `/authority-dashboard/${id}`;
    case "officer":
      return `/officer-dashboard/${id}`;
    case "student":
      return `/student-dashboard/${id}`;
    case "recruiter":
      return `/recruiter-dashboard/${id}`;
    default:
      return "/";
  }
};

const PrivateRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();
  const params = useParams();

  // Read user from localStorage (must contain { unique_id, role, ... })
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    user = raw ? JSON.parse(raw) : null;
  } catch {
    user = null;
  }

  // Not logged in → go to login
  if (!user) {
    return (
      <Navigate
        to="/admin-coordinator-login"
        replace
        state={{ from: location }}
      />
    );
  }

  const userRole = normalizeRole(user.role);
  const normalizedAllowed = allowedRoles.map(normalizeRole);

  // Role not allowed → bounce to user's own home
  if (normalizedAllowed.length && !normalizedAllowed.includes(userRole)) {
    return <Navigate to={defaultDashboard(user)} replace />;
  }

  // If the route has :id, enforce ownership (only that user can view)
  if (typeof params.id !== "undefined") {
    const urlId = String(params.id);
    const userId = String(user.unique_id);
    if (urlId !== userId) {
      // Trying to access someone else's dashboard → send to own dashboard
      return <Navigate to={defaultDashboard(user)} replace />;
    }
  }

  // All good
  return <Outlet />;
};

export default PrivateRoute;
