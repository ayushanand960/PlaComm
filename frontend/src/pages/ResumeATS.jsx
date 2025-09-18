import React from "react";
import Navbar from "../components/Navbar";
import "../animations.css";

const ResumeATS = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6 fade-in">
        <h1 className="text-2xl font-bold mb-4">Resume ATS Checker</h1>
        <div className="bg-white p-6 rounded-xl shadow-lg slide-up">
          <p className="mb-4 text-gray-600">
            Upload your resume and check how well it performs against Applicant Tracking Systems.
          </p>
          <input
            type="file"
            className="mb-4 block w-full border p-2 rounded-lg"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Analyze Resume
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResumeATS;
