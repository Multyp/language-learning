import { useState } from "react";
import { HelpCircle, Pause, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FillInBlanksProps {
  audioPath: string;
  question: string;
  text: string;
  options: string[];
  answers: string[];
  hints?: string[];
}

const FillInBlanks = ({
  audioPath,
  question,
  text,
  options,
  answers,
  hints,
}: FillInBlanksProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    new Array(answers.length).fill("")
  );
  const [showResult, setShowResult] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const handlePlay = () => {
    const audio = new Audio(audioPath);
    audio.play();
    setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
  };

  const handleOptionSelect = (option: string, index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = option;
    setSelectedAnswers(newAnswers);
  };

  const checkAnswers = () => {
    return selectedAnswers.every((answer, index) => answer === answers[index]);
  };

  const parts = text.split("...");

  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlay}
            className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          {hints && (
            <button
              onClick={() => setShowHints(!showHints)}
              className="p-2 text-blue-500 hover:text-blue-600"
            >
              <HelpCircle className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-lg">
          {parts.map((part, index) => (
            <>
              <span>{part}</span>
              {index < parts.length - 1 && (
                <select
                  value={selectedAnswers[index]}
                  onChange={(e) => handleOptionSelect(e.target.value, index)}
                  className="px-2 py-1 border rounded-md"
                >
                  <option value="">...</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </>
          ))}
        </div>

        {showHints && hints && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Indices :</h4>
            <ul className="list-disc list-inside">
              {hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => setShowResult(true)}
          disabled={selectedAnswers.some((answer) => !answer)}
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Vérifier
        </button>

        {showResult && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              checkAnswers() ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <p>
              {checkAnswers()
                ? "Correct !"
                : `Les bonnes réponses étaient : ${answers.join(", ")}`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FillInBlanks;
