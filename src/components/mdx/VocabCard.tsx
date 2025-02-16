const VocabCard = ({
  word = "例",
  reading = "れい",
  meaning = "Example",
  type = "noun",
  exampleSentence = "これは例です。",
  exampleMeaning = "This is an example.",
}) => {
  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{word}</h2>
            <p className="text-lg text-gray-600 mt-1">{reading}</p>
          </div>
          <span className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
            {type}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <p className="text-xl text-gray-800">{meaning}</p>
        </div>

        <div className="space-y-2 pt-4 border-t border-gray-100">
          <p className="text-gray-800">{exampleSentence}</p>
          <p className="text-gray-600 text-sm italic">{exampleMeaning}</p>
        </div>
      </div>
    </div>
  );
};

export default VocabCard;
