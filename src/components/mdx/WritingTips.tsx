import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default WritingTips;
