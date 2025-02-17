import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const VocabCard = ({
  word = "例",
  reading = "れい",
  meaning = "Example",
  type = "noun",
  exampleSentence = "これは例です。",
  exampleMeaning = "This is an example.",
}) => {
  return (
    <Card className="w-full mx-auto border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 group">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2
              className="text-4xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300"
              aria-label={`Word: ${word}`}
            >
              {word}
            </h2>
            <p
              className="text-lg text-gray-600 group-hover:text-gray-500 transition-colors duration-300"
              aria-label={`Reading: ${reading}`}
            >
              {reading}
            </p>
          </div>
          <Badge
            variant="secondary"
            className="text-sm font-medium capitalize"
            aria-label={`Word type: ${type}`}
          >
            {type}
          </Badge>
        </div>

        <Separator className="my-4" />

        <div>
          <p
            className="text-xl text-gray-800 group-hover:text-gray-700 transition-colors duration-300"
            aria-label={`Meaning: ${meaning}`}
          >
            {meaning}
          </p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <p
            className="text-gray-800 group-hover:text-gray-700 transition-colors duration-300"
            aria-label={`Example sentence: ${exampleSentence}`}
          >
            {exampleSentence}
          </p>
          <p
            className="text-gray-600 text-sm italic group-hover:text-gray-500 transition-colors duration-300"
            aria-label={`Example translation: ${exampleMeaning}`}
          >
            {exampleMeaning}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VocabCard;
