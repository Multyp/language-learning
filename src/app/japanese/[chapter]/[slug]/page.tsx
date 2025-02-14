"use client";
import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { BookOpen } from "lucide-react";
import { components } from "@/app/components/mdx";

interface LessonContent {
  content: string;
  frontmatter: {
    title: string;
    description: string;
    order: number;
  };
}

// Main Lesson Page Component
export default function LessonPage({
  params,
}: {
  params: Promise<{ chapter: string; slug: string }>;
}) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chapter, setChapter] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setChapter(resolvedParams.chapter);
      setSlug(resolvedParams.slug);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!chapter || !slug) return;
    const fetchLesson = async () => {
      try {
        const response = await fetch(
          `/api/lessons/japanese/${chapter}/${slug}`
        );
        if (!response.ok) throw new Error("Failed to fetch lesson");
        const data: LessonContent = await response.json();
        const mdxSource = data.content;
        setContent(mdxSource);
      } catch (err) {
        setError("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [chapter, slug]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <span className="mr-2">⚠️</span> {error}
      </div>
    );

  if (!content)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <BookOpen className="mr-2" /> No content available
      </div>
    );

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <article className="prose lg:prose-xl">
        <MDXRemote {...content} components={components} />
      </article>
    </div>
  );
}
