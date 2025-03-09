import { useState } from "react";
import { CheckCircle2, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrueFalseProps {
  question: string;
  options: string[];
  answer: string;
}

const Practice = ({ question, options, answer }: TrueFalseProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);

  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          {question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option}
              className={`flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer
                  ${
                    selectedOption === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
            >
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="sr-only"
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>

        <button
          onClick={() => setShowResult(true)}
          disabled={!selectedOption}
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Check Answer
        </button>

        {showResult && (
          <div
            className={`mt-4 p-4 rounded-lg flex items-center justify-between
              ${
                selectedOption === answer
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
          >
            <div className="flex items-center">
              {selectedOption === answer ? (
                <CheckCircle2 className="w-5 h-5 mr-2" />
              ) : (
                <span className="mr-2">✗</span>
              )}
              {selectedOption === answer
                ? "Correct!"
                : `The correct answer is: ${answer}`}
            </div>
            <button
              onClick={() => {
                setShowResult(false);
                setSelectedOption("");
              }}
              className="text-sm underline flex items-center"
            >
              <RefreshCcw className="w-4 h-4 mr-1" /> Try Again
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Practice;
