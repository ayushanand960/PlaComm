import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axiosInstance.get("categories/").then((res) => setCategories(res.data));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Discussion Categories</h1>
            <ul>
                {categories.map((cat) => (
                    <li key={cat.id} className="mb-2">
                        <Link
                            to={`/category/${cat.id}`}
                            className="text-blue-600 hover:underline"
                        >
                            {cat.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
