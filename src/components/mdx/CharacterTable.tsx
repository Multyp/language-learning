import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default CharacterTable;
