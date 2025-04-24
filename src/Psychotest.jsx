import { useState } from 'react';

export default function PsychometricForm() {
  const [questions] = useState([
    {
      id: 1,
      text: "I prefer to spend time with others rather than alone.",
      category: "Extraversion"
    },
    {
      id: 2,
      text: "I find it easy to stay organized and follow a plan.",
      category: "Conscientiousness"
    },
    {
      id: 3,
      text: "I often worry about things that might go wrong.",
      category: "Neuroticism"
    },
    {
      id: 4,
      text: "I am interested in learning new concepts and abstract ideas.",
      category: "Openness"
    },
    {
      id: 5,
      text: "I tend to trust others and believe in their good intentions.",
      category: "Agreeableness"
    },
    {
      id: 6,
      text: "I am often the one who initiates conversations in social settings.",
      category: "Extraversion"
    },
    {
      id: 7,
      text: "I pay attention to details and prefer thoroughness over speed.",
      category: "Conscientiousness"
    },
    {
      id: 8,
      text: "I remain calm in stressful situations.",
      category: "Neuroticism",
      reverse: true
    },
    {
      id: 9,
      text: "I enjoy trying new experiences and considering different perspectives.",
      category: "Openness"
    },
    {
      id: 10,
      text: "I am willing to compromise and cooperate with others.",
      category: "Agreeableness"
    }
  ]);

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  const handleInputChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: parseInt(value)
    });
  };

  const calculateResults = () => {
    // Initialize category scores
    const categories = {
      Extraversion: { score: 0, count: 0 },
      Conscientiousness: { score: 0, count: 0 },
      Neuroticism: { score: 0, count: 0 },
      Openness: { score: 0, count: 0 },
      Agreeableness: { score: 0, count: 0 }
    };

    // Calculate scores for each category
    questions.forEach(question => {
      if (answers[question.id] !== undefined) {
        let score = answers[question.id];
        // If this is a reverse-scored question, invert the score (5 becomes 1, 4 becomes 2, etc.)
        if (question.reverse) {
          score = 6 - score;
        }
        categories[question.category].score += score;
        categories[question.category].count += 1;
      }
    });

    // Calculate averages and total
    let totalScore = 0;
    const categoryResults = {};

    Object.keys(categories).forEach(category => {
      const { score, count } = categories[category];
      const average = count > 0 ? score / count : 0;
      categoryResults[category] = {
        average: average.toFixed(1),
        score,
        count
      };
      totalScore += score;
    });

    return {
      categories: categoryResults,
      totalScore,
      averageScore: (totalScore / Object.keys(answers).length).toFixed(1),
      completionPercentage: (Object.keys(answers).length / questions.length * 100).toFixed(0)
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setSubmitted(true);
  };

  const resetForm = () => {
    setAnswers({});
    setSubmitted(false);
    setResults(null);
  };

  return (
    <div className='bg-black'>
    <div className="max-w-2xl mx-auto p-6 bg-black text-gray-200 rounded-lg shadow-md border border-green-500">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-400">Personality Assessment</h1>
      
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <p className="mb-4 text-gray-300">
            For each statement below, please indicate how much you agree or disagree on a scale of 1-5:
            <br />
            <span className="text-sm italic text-gray-400">(1: Strongly Disagree, 2: Disagree, 3: Neutral, 4: Agree, 5: Strongly Agree)</span>
          </p>
          
          {questions.map((question) => (
            <div key={question.id} className="mb-6 p-4 bg-gray-900 rounded-md border-l-4 border-green-500">
              <p className="mb-2 font-medium">{question.id}. {question.text}</p>
              <div className="flex justify-between mt-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center">
                    <label className="mb-1 text-sm text-gray-400">
                      {value === 1 ? 'Strongly Disagree' : 
                       value === 2 ? 'Disagree' :
                       value === 3 ? 'Neutral' :
                       value === 4 ? 'Agree' : 'Strongly Agree'}
                    </label>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={value}
                      onChange={() => handleInputChange(question.id, value)}
                      checked={answers[question.id] === value}
                      className="form-radio h-5 w-5 text-green-500 border-green-500 focus:ring-green-400"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit Answers
            </button>
          </div>
        </form>
      ) : (
        <div className="results">
          <h2 className="text-xl font-semibold mb-4 text-center text-green-400">Your Assessment Results</h2>
          
          <div className="mb-6 p-4 bg-gray-900 rounded-md border border-green-500">
            <p className="text-lg font-medium mb-2">
              Overall Score: <span className="font-bold text-green-400">{results.averageScore}/5</span>
            </p>
            <p className="text-sm text-gray-400">
              You answered {results.completionPercentage}% of the questions
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-green-400">Category Breakdown:</h3>
            
            <div className="grid gap-3">
              {Object.keys(results.categories).map((category) => (
                <div key={category} className="p-3 border border-gray-700 rounded-md flex justify-between items-center bg-gray-900">
                  <span className="font-medium">{category}:</span>
                  <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full">
                    {results.categories[category].average}/5
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 text-sm text-gray-400">
            <p className="mb-2 italic">
              Note: This is a simplified psychometric assessment for demonstration purposes.
              Professional psychological evaluations are more comprehensive and should be
              conducted by licensed professionals.
            </p>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={resetForm}
              className="px-6 py-2 bg-gray-800 border border-green-500 text-green-400 font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}