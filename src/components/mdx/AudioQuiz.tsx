import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AudioQuizProps {
  question: string;
  audioPath: string;
  options: string[];
  answer: string;
  sequence?: string;
}

const AudioQuiz = ({
  question,
  audioPath,
  options,
  answer,
  sequence,
}: AudioQuizProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handlePlay = () => {
    try {
      const audio = new Audio(audioPath);
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Audio playback error:", error));

      audio.onended = () => setIsPlaying(false);
    } catch (error) {
      console.error("Error initializing audio:", error);
    }
  };

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
          {sequence && <div className="text-lg font-medium">{sequence}</div>}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`p-4 text-xl rounded-lg border-2 transition-all
                  ${
                    selected === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowResult(true)}
          disabled={!selected}
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Vérifier
        </button>

        {showResult && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              selected === answer ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <p>
              {selected === answer
                ? "Correct !"
                : `La bonne réponse était : ${answer}`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioQuiz;
