import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface GrammarPointProps {
  pattern: string;
  explanation: string;
  examples: Array<{
    japanese: string;
    reading: string;
    french: string;
  }>;
}

const GrammarPoint = ({
  pattern,
  explanation,
  examples,
}: GrammarPointProps) => {
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

export default GrammarPoint;
