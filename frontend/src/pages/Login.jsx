
// src/pages/Login.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function Login() {
    const [message, setMessage] = useState("");

    const login = async () => {
        try {
            // ✅ Cookie-based login: no need to store token
            await axiosInstance.post(
                "/auth/login/",
                {
                    username: "admin",
                    password: "Admin@123",
                },
                { withCredentials: true } // 🔑 this makes cookies work
            );
            console.log("Login successful");
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
        }
    };

    //   const getPing = async () => {
    //     try {
    //       const res = await axiosInstance.get("/testapi/ping/", {
    //         withCredentials: true, // ✅ ensure cookie is sent
    //       });
    //       setMessage(res.data.message);
    //     } catch (err) {
    //       console.error("Ping failed:", err.response?.data || err.message);
    //     }
    //   };


    const getPing = async () => {
        try {
            const res = await axiosInstance.get("/testapi/ping/");
            setMessage(res.data.message); 
            console.log("Ping success:", res.data);
        } catch (err) {
            console.error("Ping failed:", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        login();
    }, []);

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={getPing}>Test Ping</button>
            <p>{message}</p>
        </div>
    );
}
