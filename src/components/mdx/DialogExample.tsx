import { Card, CardContent } from "@/components/ui/card";

interface DialogExampleProps {
  conversations: Array<{
    speaker: string;
    japanese: string;
    reading: string;
    english: string;
  }>;
}

const DialogExample = ({ conversations }: DialogExampleProps) => {
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

export default DialogExample;
