import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY );

export default function CareerAdvisor() {
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState("");
  const [personality, setPersonality] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  const toggleValue = (val, list, setter) => {
    if (list.includes(val)) {
      setter(list.filter(item => item !== val));
    } else {
      setter([...list, val]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse([]);

    const prompt = `
Act as a career advisor. Based on the following:
- Interests: ${interests.join(", ")}
- Skills: ${skills.join(", ")}
- Education: ${education}
- Personality traits: ${personality}

Suggest 3 suitable career options.
Use bullet points.
Explain *why* each option fits the user.
`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      const text = await result.response.text();

      const cleanedPoints = text
  .split("\n")
  .map(line => line.replace(/^[-*•]\s*/, "").replace(/\*/g, "").trim())
  .filter(line => line.length > 0);

setResponse(cleanedPoints);

    } catch (err) {
      setResponse(["Something went wrong: " + err.message]);
    } finally {
      setLoading(false);
    }
  };

  const renderButtons = (options, selected, setSelected) => (
    <div className="flex flex-wrap gap-2">
      {options.map(option => (
        <button
          key={option}
          type="button"
          onClick={() => toggleValue(option, selected, setSelected)}
          className={`px-3 py-1 rounded-full text-sm 
            ${selected.includes(option) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-blue-400 to-green-300 min-h-screen flex flex-col justify-center items-center">
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <h2 className="text-2xl font-bold mb-6 text-center ">🎯 AI Career Advisor </h2>

    
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="font-medium block mb-1">Select Interests</label>
          {renderButtons(interestOptions, interests, setInterests)}
        </div>

        <div>
          <label className="font-medium block mb-1">Select Skills</label>
          {renderButtons(skillOptions, skills, setSkills)}
        </div>

        <div>
          <label className="font-medium block mb-1">Education Level</label>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Education</option>
            {educationOptions.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium block mb-1">Personality Trait (optional)</label>
          <select
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Trait</option>
            {personalityTraits.map((trait) => (
              <option key={trait} value={trait}>{trait}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {loading ? "Thinking..." : "Get Career Advice"}
        </button>
      </form>

      {response.length > 0 && (
        <div className="mt-8 bg-gray-100 p-4 rounded shadow max-w-4xl">
          <h4 className="font-semibold text-lg mb-3">💡 Suggestions:</h4>
          <ul className="list-disc list-inside space-y-2">
            {response.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
}

const interestOptions = [
    "Computer Science",
    "Mathematics",
    "Biology",
    "Physics",
    "Chemistry",
    "Engineering",
    "Psychology",
    "Sociology",
    "Business",
    "Finance",
    "Economics",
    "Marketing",
    "History",
    "Philosophy",
    "Political Science",
    "Art & Design",
    "Music",
    "Writing",
    "Teaching",
    "Healthcare",
    "Environment",
    "Law",
    "Travel",
    "Gaming",
    "AI & Machine Learning",
    "Cybersecurity",
    "Astronomy",
    "Architecture"
  ];
  
  const skillOptions = [
    "Programming",
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Graphic Design",
    "Video Editing",
    "Public Speaking",
    "Writing & Editing",
    "Data Analysis",
    "Problem Solving",
    "Creativity",
    "Critical Thinking",
    "Leadership",
    "Teamwork",
    "Project Management",
    "Time Management",
    "Sales",
    "Negotiation",
    "Digital Marketing",
    "Research",
    "Teaching",
    "Empathy",
    "Adaptability",
    "Networking",
    "Presentation Skills",
    "Foreign Languages",
    "Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "Electronics"
  ];
  
const educationOptions = ["High School", "Undergraduate", "Postgraduate"];
const personalityTraits = ["Analytical", "Creative", "Empathetic", "Leader"];
