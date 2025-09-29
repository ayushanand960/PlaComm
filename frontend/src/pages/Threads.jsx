// src/pages/Threads.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Threads() {
    const { id } = useParams(); // category id
    const [threads, setThreads] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const res = await axiosInstance.get(`/categories/${id}/threads/`);
                setThreads(res.data);
            } catch (err) {
                console.error("Failed to load threads:", err);
            }
        };
        fetchThreads();
    }, [id]);

    const handleCreateThread = async () => {
        if (!newTitle.trim() || !newContent.trim()) return;

        try {
            const res = await axiosInstance.post(`/categories/${id}/threads/`, {
                title: newTitle,
                content: newContent, // ✅ send both
            });
            setThreads([res.data, ...threads]);
            setNewTitle("");
            setNewContent("");
        } catch (err) {
            alert("Failed to create thread");
            console.error(err);
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Threads</h2>

            {/* Thread creation form */}
            <div className="mb-6 space-y-2">
                <input
                    type="text"
                    placeholder="Thread title..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <textarea
                    placeholder="Thread content..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="border p-2 rounded w-full"
                    rows="4"
                />
                <button
                    onClick={handleCreateThread}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Create Thread
                </button>
            </div>

            {/* Thread list */}
            <ul className="space-y-3">
                {threads.map((thread) => (
                    <li key={thread.id} className="p-3 border rounded">
                        <Link
                            to={`/threads/${thread.id}`}
                            className="text-blue-600 font-semibold"
                        >
                            {thread.title}
                        </Link>
                        <p className="text-gray-600 text-sm">{thread.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
