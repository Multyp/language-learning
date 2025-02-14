import { ReactNode, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Info,
  RefreshCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CourseTitle = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>
      {description && (
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
      )}
      <div className="mt-4 h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
    </div>
  );
};

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

const DidYouKnow = ({ facts }: { facts: string[] }) => {
  return (
    <Card className="my-6 bg-blue-50">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Info className="w-6 h-6 text-blue-500" />
        <CardTitle className="text-xl font-bold text-blue-900">
          Le saviez-vous ?
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-4">
        <ul className="space-y-2">
          {facts.map((fact, index) => (
            <li key={index} className="text-gray-700">
              {fact}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Practice = ({
  question,
  options,
  answer,
}: {
  question: string;
  options: string[];
  answer: string;
}) => {
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

const DialogExample = ({
  conversations,
}: {
  conversations: Array<{
    speaker: string;
    japanese: string;
    reading: string;
    english: string;
  }>;
}) => {
  return (
    <Card className="my-6">
      <CardContent className="p-6 space-y-4">
        {conversations.map((conv, index) => (
          <div
            key={index}
            className={`flex gap-4 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white
              ${
                index % 2 === 0
                  ? "from-blue-400 to-blue-600"
                  : "from-purple-400 to-purple-600"
              }`}
            >
              {conv.speaker[0]}
            </div>
            <div
              className={`flex-1 p-4 rounded-lg ${
                index % 2 === 0 ? "bg-blue-50" : "bg-purple-50"
              }`}
            >
              <div className="text-lg font-medium">{conv.japanese}</div>
              <div className="text-sm text-gray-600">{conv.reading}</div>
              <div className="text-sm text-gray-500 mt-1">{conv.english}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const GrammarPoint = ({
  pattern,
  explanation,
  examples,
}: {
  pattern: string;
  explanation: string;
  examples: Array<{
    japanese: string;
    reading: string;
    french: string;
  }>;
}) => {
  return (
    <Card className="my-6 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
        <CardTitle className="text-xl font-bold text-white">
          {pattern}
        </CardTitle>
      </div>
      <CardContent className="p-6">
        <p className="text-gray-700">{explanation}</p>
        <div className="space-y-4">
          {examples.map((example, index) => (
            <div
              key={index}
              className="group hover:bg-gray-50 p-4 rounded-lg transition-colors"
            >
              <div className="text-lg font-medium group-hover:text-blue-600 transition-colors">
                {example.japanese}
              </div>
              <div className="text-sm text-gray-600">{example.reading}</div>
              <div className="text-sm text-gray-500 mt-1 flex items-center">
                <ArrowRight className="w-4 h-4 mr-1 text-gray-400" />
                {example.french}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const CharacterTable = ({
  data,
}: {
  data: Array<{ [key: string]: ReactNode }>;
}) => {
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Table des caractères
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {Object.keys(data[0]).map((header) => (
                  <th key={header} className="border p-2 bg-gray-50">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex} className="border p-2 text-center">
                      {cell as ReactNode}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const WritingTips = ({ tips }: { tips: string[] }) => {
  return (
    <Card className="my-6">
      <CardHeader className="flex flex-row items-center gap-2">
        <BookOpen className="w-6 h-6 text-green-500" />
        <CardTitle className="text-xl font-bold text-green-900">
          Conseils d'écriture
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="text-gray-700">
              {tip}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

const TrueFalse = ({
  question,
  answer,
  explanation,
}: {
  question: string;
  answer: boolean;
  explanation: string;
}) => {
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

export const components = {
  CourseTitle,
  VocabCard,
  Practice,
  DialogExample,
  GrammarPoint,
  DidYouKnow,
  CharacterTable,
  WritingTips,
  TrueFalse,
};
