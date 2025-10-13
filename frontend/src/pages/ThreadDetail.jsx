// // // src/pages/ThreadDetail.jsx
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";

// export default function ThreadDetail() {
//     const { id } = useParams(); // thread id
//     const [thread, setThread] = useState(null);
//     const [replyContent, setReplyContent] = useState("");
//     const [replyTo, setReplyTo] = useState(null); // store the reply object
//     const [loading, setLoading] = useState(false);

//     const fetchThread = async () => {
//         try {
//             const res = await axiosInstance.get(`/forum/threads/${id}/`);
//             setThread(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchThread();
//     }, [id]);

//     const handleSubmitReply = async () => {
//         if (!replyContent.trim()) return;

//         const payload = { content: replyContent };
//         if (replyTo) payload.parent = replyTo.id;

//         setLoading(true);
//         try {
//             await axiosInstance.post(`/forum/threads/${id}/replies/`, payload);
//             setReplyContent("");
//             setReplyTo(null);
//             // Re-fetch thread with updated replies
//             await fetchThread();
//         } catch (err) {
//             console.error(err);
//             alert("Failed to post reply");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const renderReplies = (replies, level = 0) =>
//         replies.map((reply) => (
//             <li key={reply.id} className={`p-3 border rounded ${level > 0 ? "ml-6" : ""}`}>
//                 <p>{reply.content}</p>
//                 <p className="text-sm text-gray-500">
//                     — {reply.author_name}, {new Date(reply.created_at).toLocaleString()}
//                 </p>
//                 <button
//                     className="text-blue-600 text-sm mt-1"
//                     onClick={() => setReplyTo(reply)}
//                 >
//                     Reply
//                 </button>
//                 {reply.children && reply.children.length > 0 && (
//                     <ul className="mt-2 space-y-2">
//                         {renderReplies(reply.children, level + 1)}
//                     </ul>
//                 )}
//             </li>
//         ));

//     if (!thread) return <p className="p-4">Loading...</p>;

//     return (
//         <div className="p-4 max-w-2xl mx-auto">
//             <h2 className="text-2xl font-bold mb-2">{thread.title}</h2>
//             <p className="text-gray-700 mb-4">{thread.content}</p>
//             <p className="text-sm text-gray-500 mb-6">
//                 Posted by <b>{thread.author_name}</b> • {new Date(thread.created_at).toLocaleString()}
//             </p>

//             {/* Reply box */}
//             <div className="mb-6">
//                 {replyTo && (
//                     <p className="text-sm text-gray-600 mb-1">
//                         Replying to <b>{replyTo.author_name}</b>: “
//                         {replyTo.content.length > 50
//                             ? replyTo.content.slice(0, 50) + "..."
//                             : replyTo.content}
//                         ”
//                         <button
//                             onClick={() => setReplyTo(null)}
//                             className="text-red-500 ml-2"
//                         >
//                             Cancel
//                         </button>
//                     </p>
//                 )}
//                 <textarea
//                     rows={3}
//                     className="border p-2 rounded w-full"
//                     placeholder="Write your reply..."
//                     value={replyContent}
//                     onChange={(e) => setReplyContent(e.target.value)}
//                 />
//                 <button
//                     onClick={handleSubmitReply}
//                     disabled={loading}
//                     className="bg-green-600 text-white px-4 py-2 rounded mt-2 disabled:opacity-50"
//                 >
//                     {loading ? "Posting..." : "Post Reply"}
//                 </button>
//             </div>

//             {/* Replies list */}
//             <h3 className="text-lg font-semibold mb-3">Replies</h3>
//             <ul className="space-y-3">{thread.replies && renderReplies(thread.replies)}</ul>
//         </div>
//     );
// }
// // src/pages/ThreadDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  CardActions,
  Stack,
} from "@mui/material";
import StudentNavbar from "../components/student/StudentNavbar";
import Footer from "../components/student/Footer";

export default function ThreadDetail() {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);
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
      await fetchThread();
    } catch (err) {
      console.error(err);
      alert("Failed to post reply");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Utility for “time ago” format
  const getTimeAgo = (dateString) => {
    if (!dateString) return "just now";
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
    for (let [unit, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);
      if (interval >= 1)
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
    return "just now";
  };

  const renderReplies = (replies, level = 0) =>
    replies.map((reply) => (
      <Box key={reply.id} sx={{ ml: level * 3, mt: 2 }}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 2,
            backgroundColor: level > 0 ? "#fafafa" : "#fff",
          }}
        >
          <CardContent>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {reply.content}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              — {reply.author_name} • {getTimeAgo(reply.created_at)}
            </Typography>
          </CardContent>
          <CardActions sx={{ pt: 0 }}>
            <Button
              size="small"
              color="primary"
              onClick={() => setReplyTo(reply)}
            >
              Reply
            </Button>
          </CardActions>
        </Card>

        {reply.children && reply.children.length > 0 && (
          <Box>{renderReplies(reply.children, level + 1)}</Box>
        )}
      </Box>
    ));

  if (!thread)
    return (
      <>
        <StudentNavbar />
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            Loading thread...
          </Typography>
        </Box>
      </>
    );

  return (
    <>
      <StudentNavbar />
      <Box sx={{ p: 4, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            mb: 4,
            background: "linear-gradient(145deg, #ffffff, #f1f1f1)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {thread.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {thread.content}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Posted by <b>{thread.author_name}</b> •{" "}
            {getTimeAgo(thread.created_at)}
          </Typography>
        </Paper>

        {/* Reply input box */}
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: 2,
            mb: 4,
            backgroundColor: "#ffffff",
          }}
        >
          {replyTo && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontStyle: "italic" }}
            >
              Replying to <b>{replyTo.author_name}</b>: “
              {replyTo.content.length > 50
                ? replyTo.content.slice(0, 50) + "..."
                : replyTo.content}
              ”{" "}
              <Button
                size="small"
                color="error"
                sx={{ textTransform: "none" }}
                onClick={() => setReplyTo(null)}
              >
                Cancel
              </Button>
            </Typography>
          )}

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Write your reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2, textTransform: "none" }}
            onClick={handleSubmitReply}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Reply"}
          </Button>
        </Paper>

        {/* Replies list */}
        <Typography variant="h6" gutterBottom>
          Replies
        </Typography>
        {thread.replies && thread.replies.length > 0 ? (
          <Stack spacing={2}>{renderReplies(thread.replies)}</Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No replies yet. Be the first to reply!
          </Typography>
        )}

        <Footer />
      </Box>
      
    </>
  );
}
