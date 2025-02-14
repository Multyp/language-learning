import { useState } from "react";

// Vocabulary Card Component
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
    <div
      className="border rounded-lg p-4 my-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {!isFlipped ? (
        <div className="text-center">
          <div className="text-2xl font-bold">{word}</div>
          <div className="text-gray-600">{reading}</div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-xl">{meaning}</div>
        </div>
      )}
    </div>
  );
};

// Practice Exercise Component
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

  const handleCheck = () => {
    setShowResult(true);
  };

  return (
    <div className="border-l-4 border-blue-500 pl-4 my-6 py-4">
      <h3 className="font-bold mb-4">{question}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="radio"
              id={option}
              name="practice"
              value={option}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
      <button
        onClick={handleCheck}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Check Answer
      </button>
      {showResult && (
        <div
          className={`mt-4 p-2 rounded ${
            selectedOption === answer ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {selectedOption === answer
            ? "Correct!"
            : `Incorrect. The answer is: ${answer}`}
        </div>
      )}
    </div>
  );
};

// Dialog Example Component
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
    <div className="my-6 space-y-4">
      {conversations.map((conv, index) => (
        <div key={index} className="border-b pb-2">
          <div className="font-bold text-gray-700">{conv.speaker}:</div>
          <div className="text-lg">{conv.japanese}</div>
          <div className="text-sm text-gray-600">{conv.reading}</div>
          <div className="text-sm text-gray-500">{conv.english}</div>
        </div>
      ))}
    </div>
  );
};

// Grammar Point Component
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
    english: string;
  }>;
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg my-6">
      <div className="text-lg font-bold mb-2">{pattern}</div>
      <p className="mb-4">{explanation}</p>
      <div className="space-y-2">
        {examples.map((example, index) => (
          <div key={index} className="border-l-2 border-gray-300 pl-3">
            <div>{example.japanese}</div>
            <div className="text-sm text-gray-600">{example.reading}</div>
            <div className="text-sm text-gray-500">{example.english}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export all components for MDX
export const components = {
  VocabCard,
  Practice,
  DialogExample,
  GrammarPoint,
};
