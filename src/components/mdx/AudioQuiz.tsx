import { useState, useRef, useEffect } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

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

  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4">
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
            {sequence && (
              <div className="text-lg font-medium text-slate-700">
                {sequence}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-2 gap-2">
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

        <div className="grid grid-cols-2 gap-4 !mt-4">
          {options.map((option) => (
            <Button
              key={option}
              variant="outline"
              className={`p-6 text-xl h-auto ${
                selected === option &&
                "border-blue-500 bg-blue-50 hover:bg-blue-100"
              }`}
              onClick={() => setSelected(option)}
            >
              {option}
            </Button>
          ))}
        </div>

        <Button
          onClick={() => setShowResult(true)}
          disabled={!selected}
          className="w-full"
        >
          Vérifier
        </Button>

        {showResult && (
          <div
            className={`p-4 rounded-lg ${
              selected === answer ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <p className="font-medium">
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
