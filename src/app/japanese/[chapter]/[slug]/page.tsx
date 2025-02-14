"use client";
import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { components } from "@/app/components/mdx";

interface LessonContent {
  content: string;
  frontmatter: {
    title: string;
    description: string;
    order: number;
  };
}

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

  if (loading) return <div>Loading lesson...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!content) return <div>No content available</div>;
  if (content == "") return <div>Empty content</div>;

  return (
    <div className="container mx-auto p-8">
      <article className="prose lg:prose-xl">
        <MDXRemote {...content} components={components} />
      </article>
    </div>
  );
}
