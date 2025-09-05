// src/api/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  withCredentials: true, // needed for HttpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach CSRF token (important for cookie auth with Django)
axiosInstance.interceptors.request.use((config) => {
  const csrftoken = Cookies.get("csrftoken");
  if (csrftoken) {
    config.headers["X-CSRFToken"] = csrftoken;
  }
  return config;
});

// Handle expired access tokens with silent refresh
axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // Don’t try refresh on auth-free endpoints
    if (
      originalRequest.url.includes("/users/login/") ||
      originalRequest.url.includes("/users/register/") ||
      originalRequest.url.includes("/users/refresh/")
    ) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axiosInstance.post("/users/refresh/", {}, { withCredentials: true });
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);


export default axiosInstance;









// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
//   withCredentials: true, // very important for cookies
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // axiosInstance.interceptors.request.use((config) => {
// //   const csrftoken = Cookies.get("csrftoken");
// //   if (csrftoken) {
// //     config.headers["X-CSRFToken"] = csrftoken;
// //   }
// //   return config;
// // });

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       console.warn("Unauthorized, maybe expired token");
//       // Optionally redirect to login
//     }
//     return Promise.reject(err);
//   }
// );

// export default axiosInstance;
