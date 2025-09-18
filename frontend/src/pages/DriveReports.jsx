import React from "react";
import Navbar from "../components/Navbar";
import "../animations.css";

const DriveQuestions = () => {
  const questions = [
    { company: "Google", question: "Explain the difference between stack and queue." },
    { company: "Microsoft", question: "How do you optimize SQL queries?" },
    { company: "TCS", question: "Write a program for Fibonacci series." },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6 fade-in">
        <h1 className="text-2xl font-bold mb-4">Placement Drive Questions</h1>
        <div className="bg-white p-6 rounded-xl shadow-lg slide-up">
          {questions.map((q, index) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <h2 className="font-semibold">{q.company}</h2>
              <p className="text-gray-700">{q.question}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DriveQuestions;
