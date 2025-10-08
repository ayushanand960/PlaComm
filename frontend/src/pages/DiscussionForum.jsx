// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import "../animations.css";

// const DiscussionForum = () => {
//   const [posts, setPosts] = useState([
//     { user: "Alice", content: "How to prepare for placement drives?" },
//     { user: "Bob", content: "Any tips for cracking coding interviews?" },
//   ]);
//   const [newPost, setNewPost] = useState("");

//   const handlePost = () => {
//     if (newPost.trim() !== "") {
//       setPosts([...posts, { user: "You", content: newPost }]);
//       setNewPost("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <main className="p-6 fade-in">
//         <h1 className="text-2xl font-bold mb-4">Discussion Forum</h1>
//         <div className="bg-white p-6 rounded-xl shadow-lg slide-up">
//           <div className="mb-4">
//             <textarea
//               value={newPost}
//               onChange={(e) => setNewPost(e.target.value)}
//               placeholder="Share your thoughts..."
//               className="w-full border p-2 rounded-lg"
//             />
//             <button
//               onClick={handlePost}
//               className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//             >
//               Post
//             </button>
//           </div>
//           <div>
//             {posts.map((post, index) => (
//               <div
//                 key={index}
//                 className="border-b py-3 hover:bg-gray-50 transition"
//               >
//                 <p className="font-semibold">{post.user}</p>
//                 <p>{post.content}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DiscussionForum;




// import React, { useState, useEffect } from "react";
// import axiosInstance from "../api/axiosInstance";
// import Navbar from "../components/StudentNavbar";

// const DiscussionForum = () => {
//   const [threads, setThreads] = useState([]);
//   const [newThread, setNewThread] = useState("");

//   const categoryId = 1; // for now, show threads in category 1

//   // Fetch threads for a category
//   useEffect(() => {
//     axiosInstance
//       .get(`/categories/${categoryId}/threads/`)
//       .then((res) => setThreads(res.data))
//       .catch((err) => console.error(err));
//   }, [categoryId]);

//   // Create new thread
//   const handlePost = () => {
//     if (!newThread.trim()) return;

//     axiosInstance
//       .post(`/categories/${categoryId}/threads/`, {
//         title: newThread,
//       })
//       .then((res) => {
//         setThreads([res.data, ...threads]);
//         setNewThread("");
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <main className="p-6">
//         <h1 className="text-2xl font-bold mb-4">Discussion Forum</h1>

//         {/* New Thread Form */}
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <textarea
//             value={newThread}
//             onChange={(e) => setNewThread(e.target.value)}
//             placeholder="Start a new discussion..."
//             className="w-full border p-2 rounded-lg"
//           />
//           <button
//             onClick={handlePost}
//             className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//           >
//             Post
//           </button>
//         </div>

//         {/* Thread List */}
//         <div className="mt-6 space-y-3">
//           {threads.map((thread) => (
//             <div
//               key={thread.id}
//               className="bg-white rounded-xl shadow p-4 hover:bg-gray-50 transition"
//             >
//               <p className="font-semibold">{thread.author || "Anonymous"}</p>
//               <p>{thread.title}</p>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DiscussionForum;
import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/student/StudentNavbar";
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Avatar,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DiscussionForum = () => {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState("");
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const categoryId = 1; // for now, show threads in category 1

  // Fetch threads
  useEffect(() => {
    axiosInstance
      .get(`/categories/${categoryId}/threads/`)
      .then((res) => setThreads(res.data))
      .catch((err) => console.error(err));
  }, [categoryId]);

  // Create new thread
  const handlePost = () => {
    if (!newThread.trim()) return;
    axiosInstance
      .post(`/categories/${categoryId}/threads/`, { title: newThread })
      .then((res) => {
        setThreads([res.data, ...threads]);
        setNewThread("");
      })
      .catch((err) => console.error(err));
  };

  // Open thread (simulate message view)
  const handleOpenThread = (thread) => {
    setSelectedThread(thread);
    // You can later fetch actual comments/messages from backend here
    setMessages([
      { user: "Alice", content: "This is so helpful!" },
      { user: "Bob", content: "Yes, totally agree!" },
    ]);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = { user: "You", content: newMessage };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Navbar />
      <Box sx={{ p: { xs: 2, md: 6 } }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Discussion Forum
        </Typography>

        {/* --- If no thread selected: Show thread cards --- */}
        {!selectedThread && (
          <>
            <Card sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                variant="outlined"
                value={newThread}
                onChange={(e) => setNewThread(e.target.value)}
                placeholder="Start a new discussion..."
              />
              <Button
                onClick={handlePost}
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "#16a34a",
                  "&:hover": { bgcolor: "#15803d" },
                }}
              >
                Post
              </Button>
            </Card>

            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              }}
              gap={3}
            >
              {threads.map((thread) => (
                <Card
                  key={thread.id}
                  sx={{
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: 6,
                      cursor: "pointer",
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleOpenThread(thread)}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="600" gutterBottom>
                        {thread.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        Posted by {thread.author || "Anonymous"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </>
        )}

        {/* --- If thread selected: Show discussion view --- */}
        {selectedThread && (
          <Paper
            elevation={4}
            sx={{
              borderRadius: 3,
              p: 3,
              mt: 2,
              position: "relative",
              minHeight: "70vh",
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <IconButton onClick={() => setSelectedThread(null)}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" fontWeight="bold" ml={1}>
                {selectedThread.title}
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Box
              sx={{
                maxHeight: "60vh",
                overflowY: "auto",
                pr: 1,
                mb: 2,
              }}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="flex-start"
                  mb={2}
                  sx={{
                    flexDirection:
                      msg.user === "You" ? "row-reverse" : "row",
                    textAlign: msg.user === "You" ? "right" : "left",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: msg.user === "You" ? "#16a34a" : "#0284c7",
                      mx: 1,
                    }}
                  >
                    {msg.user[0]}
                  </Avatar>
                  <Box
                    sx={{
                      bgcolor: msg.user === "You" ? "#dcfce7" : "#e0f2fe",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      maxWidth: "75%",
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="600">
                      {msg.user}
                    </Typography>
                    <Typography variant="body2">{msg.content}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                placeholder="Write a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                variant="contained"
                sx={{
                  bgcolor: "#16a34a",
                  "&:hover": { bgcolor: "#15803d" },
                }}
              >
                Send
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default DiscussionForum;
