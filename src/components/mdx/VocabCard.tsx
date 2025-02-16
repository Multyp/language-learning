import { useState } from "react";
import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VocabCard = ({
  word,
  reading,
  meaning,
}: {
  word: string;
  reading: string;
  meaning: string;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Card className="group perspective-1000 my-4 hover:shadow-lg transition-all duration-300">
      <div
        className={`relative transform-style-3d transition-transform duration-500 cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {!isFlipped ? (
          <div className="backface-hidden">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-gray-900">{word}</div>
                <div className="text-lg text-gray-600">{reading}</div>
              </div>
            </CardContent>
          </div>
        ) : (
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl text-gray-900">{meaning}</div>
              </div>
            </CardContent>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VocabCard;
