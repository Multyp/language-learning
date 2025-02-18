import React, { useEffect, useState } from "react";
import { Timer, Check, X, Gamepad, Award, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import hiraganaData from "@/data/HiraganaData";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface HiraganaQuizSettings {
  selectedHiragana: string[];
  includeAccents: boolean;
  questionCount: number;
  timePerQuestion: number;
}

interface HiraganaChar {
  hiragana: string;
  romaji: string;
}

interface HiraganaRow {
  row: string;
  chars: HiraganaChar[];
}

const HiraganaGame = () => {
  const [showGame, setShowGame] = useState(false);
  const [gameSettings, setGameSettings] = useState<HiraganaQuizSettings>({
    selectedHiragana: [],
    includeAccents: false,
    questionCount: 20,
    timePerQuestion: 10,
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [currentHiragana, setCurrentHiragana] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const getAllHiragana = () => {
    const all = [
      ...hiraganaData.basic.flatMap((row) =>
        row.chars.map((char) => char.hiragana)
      ),
      ...hiraganaData.dakuten.flatMap((row) =>
        row.chars.map((char) => char.hiragana)
      ),
      ...hiraganaData.handakuten.flatMap((row) =>
        row.chars.map((char) => char.hiragana)
      ),
      ...hiraganaData.combinations.flatMap((row) =>
        row.chars.map((char) => char.hiragana)
      ),
    ];
    return all;
  };

  const generateQuestion = () => {
    const availableHiragana =
      gameSettings.selectedHiragana.length > 0
        ? gameSettings.selectedHiragana
        : getAllHiragana();

    const correctAnswer =
      availableHiragana[Math.floor(Math.random() * availableHiragana.length)];
    const wrongAnswers = availableHiragana
      .filter((h) => h !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [...wrongAnswers, correctAnswer].sort(
      () => Math.random() - 0.5
    );

    setCurrentHiragana(correctAnswer);
    setOptions(allOptions);
    setTimer(gameSettings.timePerQuestion);
    setIsAnswered(false);
    setSelectedAnswer("");
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    generateQuestion();
  };

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(answer);

    if (answer === currentHiragana) {
      setScore((prev) => prev + 1);
    }

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < gameSettings.questionCount) {
        setCurrentQuestion((prev) => prev + 1);
        generateQuestion();
      } else {
        setShowResult(true);
        setGameStarted(false);
      }
    }, 1500);
  };

  useEffect(() => {
    if (gameStarted && !isAnswered) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            handleAnswer("");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    }
  }, [gameStarted, currentQuestion, isAnswered]);

  const HiraganaTable = ({
    title,
    rows,
  }: {
    title: string;
    rows: HiraganaRow[];
  }) => (
    <div className="rounded-lg bg-slate-50 p-4 mb-6">
      <h4 className="font-semibold text-slate-700 mb-4">{title}</h4>
      <div className="grid grid-cols-6 gap-3">
        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="font-medium text-slate-400">{row.row}</div>
            {row.chars.map((char, charIndex) => (
              <label
                key={`${rowIndex}-${charIndex}`}
                className="flex items-center space-x-2 hover:bg-slate-100 p-2 rounded-md transition-colors"
              >
                <Checkbox
                  checked={gameSettings.selectedHiragana.includes(
                    char.hiragana
                  )}
                  onCheckedChange={(checked) => {
                    setGameSettings((prev) => ({
                      ...prev,
                      selectedHiragana: checked
                        ? [...prev.selectedHiragana, char.hiragana]
                        : prev.selectedHiragana.filter(
                            (x) => x !== char.hiragana
                          ),
                    }));
                  }}
                />
                <span className="text-sm">
                  {char.hiragana}{" "}
                  <span className="text-slate-500">({char.romaji})</span>
                </span>
              </label>
            ))}
            {row.chars.length < 5 &&
              [...Array(5 - row.chars.length)].map((_, i) => (
                <div key={`empty-${rowIndex}-${i}`} />
              ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
          <Gamepad className="mr-2 h-4 w-4" />
          Mini-jeu Hiragana
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 max-w-4xl">
        {showResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Award className="w-16 h-16 mx-auto mb-4 text-purple-500" />
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Résultat Final
            </h3>
            <div className="text-6xl font-bold mb-6 text-purple-600">
              {score} / {gameSettings.questionCount}
            </div>
            <div className="mb-8 text-slate-600">
              Pourcentage de réussite:{" "}
              <span className="font-semibold">
                {((score / gameSettings.questionCount) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowGame(false)}
                className="border-2"
              >
                Quitter
              </Button>
              <Button
                onClick={() => setShowResult(false)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                Rejouer
              </Button>
            </div>
          </motion.div>
        ) : gameStarted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm font-medium text-slate-500">
                Question {currentQuestion + 1} / {gameSettings.questionCount}
              </div>
              <div className="flex items-center px-4 py-2 bg-slate-100 rounded-full">
                <Timer className="h-4 w-4 mr-2 text-purple-500" />
                <span className="font-medium">{timer}s</span>
              </div>
            </div>
            <Progress
              value={(timer / gameSettings.timePerQuestion) * 100}
              className="mb-8 h-2"
            />
            <motion.div
              key={currentHiragana}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-8xl font-bold mb-12 text-center text-slate-800"
            >
              {currentHiragana}
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => {
                const romaji = hiraganaData.basic
                  .flatMap((row) => row.chars)
                  .concat(hiraganaData.dakuten.flatMap((row) => row.chars))
                  .concat(hiraganaData.handakuten.flatMap((row) => row.chars))
                  .concat(hiraganaData.combinations.flatMap((row) => row.chars))
                  .find((char) => char.hiragana === option)?.romaji;

                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`h-20 text-2xl font-medium transition-all ${
                      isAnswered
                        ? option === currentHiragana
                          ? "bg-green-500 hover:bg-green-600"
                          : option === selectedAnswer
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-slate-100 hover:bg-slate-200"
                        : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    }`}
                    disabled={isAnswered}
                  >
                    {romaji}
                    {isAnswered && option === currentHiragana && (
                      <Check className="ml-2 h-5 w-5" />
                    )}
                    {isAnswered &&
                      option === selectedAnswer &&
                      option !== currentHiragana && (
                        <X className="ml-2 h-5 w-5" />
                      )}
                  </Button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="h-5 w-5 text-purple-500" />
              <h3 className="text-xl font-bold">
                Configuration du Mini-jeu Hiragana
              </h3>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
              <HiraganaTable
                title="Hiragana de base"
                rows={hiraganaData.basic}
              />
              <HiraganaTable
                title="Hiragana avec dakuten (゛)"
                rows={hiraganaData.dakuten}
              />
              <HiraganaTable
                title="Hiragana avec handakuten (゜)"
                rows={hiraganaData.handakuten}
              />
              <HiraganaTable
                title="Combinaisons"
                rows={hiraganaData.combinations}
              />

              <Button
                variant="outline"
                className="mb-4 w-full"
                onClick={() =>
                  setGameSettings((prev) => ({
                    ...prev,
                    selectedHiragana: getAllHiragana(),
                  }))
                }
              >
                Tout sélectionner
              </Button>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-4">Nombre de questions</h4>
                  <RadioGroup
                    value={gameSettings.questionCount.toString()}
                    onValueChange={(value) =>
                      setGameSettings((prev) => ({
                        ...prev,
                        questionCount: parseInt(value),
                      }))
                    }
                    className="space-y-2"
                  >
                    {[20, 30, 40, 50].map((count) => (
                      <div key={count} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={count.toString()}
                          id={`q-${count}`}
                        />
                        <label htmlFor={`q-${count}`}>{count} questions</label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-4">Temps par question</h4>
                  <RadioGroup
                    value={gameSettings.timePerQuestion.toString()}
                    onValueChange={(value) =>
                      setGameSettings((prev) => ({
                        ...prev,
                        timePerQuestion: parseInt(value),
                      }))
                    }
                    className="space-y-2"
                  >
                    {[5, 10, 20].map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={time.toString()}
                          id={`t-${time}`}
                        />
                        <label htmlFor={`t-${time}`}>{time} secondes</label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>

            <Button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 h-12 text-lg"
              disabled={gameSettings.selectedHiragana.length === 0}
            >
              Commencer le jeu
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HiraganaGame;
