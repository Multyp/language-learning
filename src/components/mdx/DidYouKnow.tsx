import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default DidYouKnow;
