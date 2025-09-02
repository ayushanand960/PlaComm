import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  withCredentials: true, // very important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use((config) => {
//   const csrftoken = Cookies.get("csrftoken");
//   if (csrftoken) {
//     config.headers["X-CSRFToken"] = csrftoken;
//   }
//   return config;
// });

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("Unauthorized, maybe expired token");
      // Optionally redirect to login
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
