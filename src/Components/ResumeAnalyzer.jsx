import React, { useState } from "react";
import axios from "axios";

const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileText, setFileText] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
    setError("");
    setAnalysis("");
    setFileText("");
  };

  const handleAnalyze = async () => {
    if (!resumeFile) return;

    const formData = new FormData();
    formData.append("resume", resumeFile);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFileText(response.data.text);
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError("Failed to analyze resume.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-green-300 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto p-6  rounded shadow-md ">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Resume Analyzer
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0 file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />

        {resumeFile && (
          <p className="text-sm text-gray-700 mb-2">
            Selected: {resumeFile.name}
          </p>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading || !resumeFile}
          className={`w-full py-2 px-4 rounded-md font-semibold text-white cursor-pointer
               ${
                 loading || !resumeFile
                   ? "bg-gray-400"
                   : "bg-blue-600 hover:bg-blue-700"
               }`}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {fileText && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg text-gray-800">
              Extracted Text:
            </h3>
            <pre className="bg-gray-100 p-4 rounded text-sm max-h-60 overflow-y-scroll">
              {fileText}
            </pre>
          </div>
        )}

        {analysis && (
          <div className="mt-6 bg-white p-4 rounded-md">
            <h3 className="font-semibold text-lg text-green-800">
              AI Analysis:
            </h3>
            <ul className="text-gray-700 list-disc list-inside pl-4">
              {analysis
                .split(/\*\s+/) // split by star bullets like '* Experience in...'
                .filter((point) => point.trim() !== "") // remove empty points
                .map((point, idx) => (
                  <li className="m-2" key={idx}>
                    {point.trim()}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
