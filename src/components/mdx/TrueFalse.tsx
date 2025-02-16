import { useState } from "react";
import { CheckCircle2, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrueFalseProps {
  question: string;
  answer: boolean;
  explanation: string;
}

const TrueFalse = ({ question, answer, explanation }: TrueFalseProps) => {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  return (
    <Card className="my-6">
      <CardHeader className="pt-6 pb-2">
        <CardTitle className="text-xl font-bold">Vrai ou Faux ?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg">{question}</p>
        <div className="flex gap-4">
          {[true, false].map((value, key) => (
            <button
              onClick={() => setSelected(value)}
              key={key}
              className={`px-4 py-2 rounded-lg transition-all
                  ${
                    selected === value
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
            >
              {value ? "Vrai" : "Faux"}
            </button>
          ))}
        </div>

        {selected !== null && (
          <button
            onClick={() => setShowResult(true)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Vérifier
          </button>
        )}

        {showResult && (
          <div
            className={`p-4 rounded-lg ${
              selected === answer ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div className="flex items-center gap-2">
              {selected === answer ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <span className="text-red-600">✗</span>
              )}
              <span>{selected === answer ? "Correct !" : "Incorrect"}</span>
            </div>
            <p className="mt-2">{explanation}</p>
            <button
              onClick={() => {
                setSelected(null);
                setShowResult(false);
              }}
              className="mt-2 text-sm underline flex items-center"
            >
              <RefreshCcw className="w-4 h-4 mr-1" /> Réessayer
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrueFalse;
