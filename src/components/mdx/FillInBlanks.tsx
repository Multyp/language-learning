import { useState, useRef, useEffect } from "react";
import {
  HelpCircle,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioPath);
    audioRef.current.addEventListener("loadedmetadata", () => {
      setDuration(audioRef.current?.duration || 0);
    });

    return () => {
      audioRef.current?.pause();
    };
  }, [audioPath]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        duration
      );
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

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
      <CardContent className="space-y-6">
        {/* Audio Player */}
        <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={skipBackward}
              className="h-8 w-8"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={handlePlay}
              className="h-12 w-12 rounded-full"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={skipForward}
              className="h-8 w-8"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 w-12">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={0.1}
                onValueChange={handleSeek}
                className="flex-1"
              />
              <span className="text-sm text-slate-500 w-12">
                {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-slate-500" />
              <Slider
                value={[volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="flex flex-wrap items-center gap-2 text-lg">
          {parts.map((part, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>{part}</span>
              {index < parts.length - 1 && (
                <Select
                  value={selectedAnswers[index]}
                  onValueChange={(value) => handleOptionSelect(value, index)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>

        {/* Hints Section */}
        {hints && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              {showHints ? "Masquer les indices" : "Afficher les indices"}
            </Button>
          </div>
        )}

        {showHints && hints && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Indices :</h4>
            <ul className="list-disc list-inside space-y-1">
              {hints.map((hint, index) => (
                <li key={index} className="text-slate-700">
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={() => setShowResult(true)}
          disabled={selectedAnswers.some((answer) => !answer)}
          className="w-full"
        >
          Vérifier
        </Button>

        {/* Results */}
        {showResult && (
          <div
            className={`p-4 rounded-lg ${
              checkAnswers() ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <p className="font-medium">
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
