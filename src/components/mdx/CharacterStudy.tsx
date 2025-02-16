import { useState } from "react";
import { Eye, Pause, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CharacterStudyProps {
  character: string;
  sound: string;
  strokeOrder: string;
  mnemonic: string;
}

const CharacterStudy = ({
  character,
  sound,
  strokeOrder,
  mnemonic,
}: CharacterStudyProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showStrokes, setShowStrokes] = useState(false);

  const handlePlay = () => {
    const audio = new Audio(sound);
    audio.play();
    setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Mémorise la forme et le son de cet hiragana
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center items-center gap-8">
          <div className="text-6xl font-japanese">{character}</div>
          <div className="space-y-4">
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
            <button
              onClick={() => setShowStrokes(!showStrokes)}
              className="p-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
            >
              <Eye className="w-6 h-6" />
            </button>
          </div>
        </div>

        {showStrokes && (
          <div className="flex justify-center">
            <img src={strokeOrder} alt="Ordre des traits" className="h-32" />
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-center text-gray-700">{mnemonic}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterStudy;
