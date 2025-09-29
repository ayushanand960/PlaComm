// src/pages/ThreadDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function ThreadDetail() {
    const { id } = useParams(); // thread id
    const [thread, setThread] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const [replyTo, setReplyTo] = useState(null); // store the reply object
    const [loading, setLoading] = useState(false);

    const fetchThread = async () => {
        try {
            const res = await axiosInstance.get(`/forum/threads/${id}/`);
            setThread(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchThread();
    }, [id]);

    const handleSubmitReply = async () => {
        if (!replyContent.trim()) return;

        const payload = { content: replyContent };
        if (replyTo) payload.parent = replyTo.id;

        setLoading(true);
        try {
            await axiosInstance.post(`/forum/threads/${id}/replies/`, payload);
            setReplyContent("");
            setReplyTo(null);
            // Re-fetch thread with updated replies
            await fetchThread();
        } catch (err) {
            console.error(err);
            alert("Failed to post reply");
        } finally {
            setLoading(false);
        }
    };

    const renderReplies = (replies, level = 0) =>
        replies.map((reply) => (
            <li key={reply.id} className={`p-3 border rounded ${level > 0 ? "ml-6" : ""}`}>
                <p>{reply.content}</p>
                <p className="text-sm text-gray-500">
                    — {reply.author_name}, {new Date(reply.created_at).toLocaleString()}
                </p>
                <button
                    className="text-blue-600 text-sm mt-1"
                    onClick={() => setReplyTo(reply)}
                >
                    Reply
                </button>
                {reply.children && reply.children.length > 0 && (
                    <ul className="mt-2 space-y-2">
                        {renderReplies(reply.children, level + 1)}
                    </ul>
                )}
            </li>
        ));

    if (!thread) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">{thread.title}</h2>
            <p className="text-gray-700 mb-4">{thread.content}</p>
            <p className="text-sm text-gray-500 mb-6">
                Posted by <b>{thread.author_name}</b> • {new Date(thread.created_at).toLocaleString()}
            </p>

            {/* Reply box */}
            <div className="mb-6">
                {replyTo && (
                    <p className="text-sm text-gray-600 mb-1">
                        Replying to <b>{replyTo.author_name}</b>: “
                        {replyTo.content.length > 50
                            ? replyTo.content.slice(0, 50) + "..."
                            : replyTo.content}
                        ”
                        <button
                            onClick={() => setReplyTo(null)}
                            className="text-red-500 ml-2"
                        >
                            Cancel
                        </button>
                    </p>
                )}
                <textarea
                    rows={3}
                    className="border p-2 rounded w-full"
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                />
                <button
                    onClick={handleSubmitReply}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded mt-2 disabled:opacity-50"
                >
                    {loading ? "Posting..." : "Post Reply"}
                </button>
            </div>

            {/* Replies list */}
            <h3 className="text-lg font-semibold mb-3">Replies</h3>
            <ul className="space-y-3">{thread.replies && renderReplies(thread.replies)}</ul>
        </div>
    );
}
