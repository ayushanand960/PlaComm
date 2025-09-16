

import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function StudentResume() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !jobDescription.trim()) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDescription);

    setLoading(true);
    setSuggestions("");

    try {
      const res = await axiosInstance.post("/resume/analyze/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuggestions(res.data?.suggestions || "No suggestions returned.");
    } catch (err) {
      console.error("Resume analyze error:", err);
      setSuggestions("Error analyzing resume. Check the server logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">AI Resume Analyzer</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Upload Resume (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows="4"
            placeholder="Paste the job description here..."
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {suggestions && (
        <div className="mt-6 p-4 bg-gray-50 border rounded">
          <h3 className="text-lg font-semibold mb-2">AI Suggestions</h3>
          <pre className="whitespace-pre-wrap text-sm">{suggestions}</pre>
        </div>
      )}
    </div>
  );
}
