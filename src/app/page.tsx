import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Language Learning Platform</h1>
      <div className="grid gap-4">
        <Link href="/japanese" className="p-4 border rounded hover:bg-gray-50">
          Japanese Course
        </Link>
        {/* Add more languages here later */}
      </div>
    </div>
  );
}
