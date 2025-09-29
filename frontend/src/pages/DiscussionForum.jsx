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




import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/Navbar";

const DiscussionForum = () => {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState("");

  const categoryId = 1; // for now, show threads in category 1

  // Fetch threads for a category
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
      .post(`/categories/${categoryId}/threads/`, {
        title: newThread,
      })
      .then((res) => {
        setThreads([res.data, ...threads]);
        setNewThread("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Discussion Forum</h1>

        {/* New Thread Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <textarea
            value={newThread}
            onChange={(e) => setNewThread(e.target.value)}
            placeholder="Start a new discussion..."
            className="w-full border p-2 rounded-lg"
          />
          <button
            onClick={handlePost}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Post
          </button>
        </div>

        {/* Thread List */}
        <div className="mt-6 space-y-3">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="bg-white rounded-xl shadow p-4 hover:bg-gray-50 transition"
            >
              <p className="font-semibold">{thread.author || "Anonymous"}</p>
              <p>{thread.title}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DiscussionForum;
