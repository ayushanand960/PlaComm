// src/pages/CategoryList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axiosInstance.get("/forum/categories/")
            .then((res) => setCategories(res.data))
            .catch((err) => setError("Failed to load categories"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="p-6">Loading categories...</p>;
    if (error) return <p className="p-6 text-red-600">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Discussion Categories</h1>
            {categories.length === 0 && <p>No categories available.</p>}
            <div className="space-y-3">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        to={`/categories/${cat.id}/threads`}
                        className="block bg-white p-4 rounded shadow hover:bg-gray-50 transition"
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
