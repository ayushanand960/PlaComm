import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./animations.css";
import "./studentResume.css";
import ReactMarkdown from "react-markdown";
import StudentNavbar from "../../components/student/StudentNavbar";
import Footer from "../../components/student/Footer";

export default function StudentResume() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Store full result from backend
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => setResume(e.target.files[0]);

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
    setResult(null);

    try {
      const res = await axiosInstance.post("/resume/analyze/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Resume analyze error:", err);
      setResult({ suggestions: "Error analyzing resume. Check the server logs." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-page">
      <StudentNavbar />

      <div className="resume-container">
        <div className="resume-box fade-in">
          <h1 className="resume-title">
            AI <span>Resume</span> Analyzer
          </h1>
          <p className="resume-subtitle">
            Upload your resume & job description to get{" "}
            <strong>ATS-based insights</strong> and personalized suggestions.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="resume-form">
            <div>
              <label>Upload Resume (PDF)</label>
              <input type="file" accept="application/pdf" onChange={handleFileChange} />
            </div>

            <div>
              <label>Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows="5"
                placeholder="Paste the job description here..."
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </form>

          {/* Results */}
          {/* {result && (
            <div className="resume-suggestions slide-up">
              {result.ats_score && (
                <div className="ats-score-box">
                  <h3>ATS Score: {result.ats_score}</h3>

                </div>
              )}

              <h3>AI Suggestions</h3>
              <pre>{result.suggestions}</pre>
            </div>
          )} */}


          {/* Results */}
          {result && (
            <div className="resume-suggestions slide-up">
              {result.ats_score && (
                <div className="ats-score-box">
                  <h3>ATS Score: {result.ats_score}%</h3>
                </div>
              )}

              {/* Summary */}
              {result.summary && (
                <>
                  <h3>Summary</h3>
                  <ReactMarkdown>{result.summary}</ReactMarkdown>
                </>
              )}

              {/* Key Matches */}
              {result.key_matches && result.key_matches.length > 0 && (
                <>
                  <h3>Key Matches</h3>
                  <ul>
                    {result.key_matches.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* Missing Skills */}
              {result.missing_skills && result.missing_skills.length > 0 && (
                <>
                  <h3>Missing Skills</h3>
                  <ul>
                    {result.missing_skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* Recommendations */}
              {result.recommendations && (
                <>
                  <h3>Recommendations</h3>
                  <ReactMarkdown>{result.recommendations}</ReactMarkdown>
                </>
              )}

              {/* If Gemini didn't return structured data */}
              {result.suggestions && !result.ats_score && (
                <>
                  <h3>AI Suggestions</h3>
                  <ReactMarkdown>{result.suggestions}</ReactMarkdown>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
  <Footer/>
}