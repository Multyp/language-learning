"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Lesson {
  chapter: string;
  slug: string;
  title: string;
  description: string;
  order: number;
}

export default function JapanesePage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch("/api/lessons");
        if (!response.ok) throw new Error("Failed to fetch lessons");
        const data = await response.json();
        setLessons(data);
      } catch (err) {
        setError("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading) return <div>Loading lessons...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Japanese Course</h1>
      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.slug}
            href={`/japanese/${lesson.chapter}/${lesson.slug}`}
            className="p-4 border rounded hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{lesson.title}</h2>
            <p className="text-gray-600">{lesson.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
