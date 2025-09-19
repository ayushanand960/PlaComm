// import React from "react";
// import Navbar from "../components/Navbar";
// import "../animations.css";

// const ResumeATS = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <main className="p-6 fade-in">
//         <h1 className="text-2xl font-bold mb-4">Resume ATS Checker</h1>
//         <div className="bg-white p-6 rounded-xl shadow-lg slide-up">
//           <p className="mb-4 text-gray-600">
//             Upload your resume and check how well it performs against Applicant Tracking Systems.
//           </p>
//           <input
//             type="file"
//             className="mb-4 block w-full border p-2 rounded-lg"
//           />
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
//             Analyze Resume
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ResumeATS;





import React from "react";
import Navbar from "../components/Navbar";
import "../animations.css";

const ResumeATS = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="flex items-center justify-center px-4 py-12 fade-in">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">
            Resume <span className="text-blue-600">ATS</span> Checker
          </h1>

          <div className="bg-white border border-gray-200 p-10 rounded-3xl shadow-2xl slide-up">
            <p className="mb-8 text-center text-gray-600 text-lg leading-relaxed">
              Upload your resume to instantly check how well it performs with
              Applicant Tracking Systems.
            </p>

            <div className="mb-6">
              <input
                type="file"
                className="w-full text-gray-700 border border-gray-300 rounded-xl p-4 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow transition-all duration-200"
            >
              Analyze Resume
            </button>

            <p className="mt-6 text-sm text-gray-500 text-center">
              Supported formats: <span className="font-medium">PDF, DOCX</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeATS;

