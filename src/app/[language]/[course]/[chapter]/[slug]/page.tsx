"use client";

import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { components } from "@/app/components/mdx";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LessonContent {
  content: any;
  frontmatter: {
    title: string;
    description: string;
    order: number;
  };
  courseInfo: {
    title: string;
    description: string;
  };
  chapterInfo: {
    title: string;
    description: string;
  };
}

interface Navigation {
  previous: {
    course: string;
    chapter: string;
    slug: string;
    title: string;
  } | null;
  next: {
    course: string;
    chapter: string;
    slug: string;
    title: string;
  } | null;
}

export default function LessonPage({
  params: paramsPromise,
}: {
  params: Promise<{
    language: string;
    course: string;
    chapter: string;
    slug: string;
  }>;
}) {
  const [params, setParams] = useState<{
    language: string;
    course: string;
    chapter: string;
    slug: string;
  } | null>(null);
  const [content, setContent] = useState<LessonContent | null>(null);
  const [navigation, setNavigation] = useState<Navigation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const resolveParamsAndFetch = async () => {
      try {
        const resolvedParams = await paramsPromise;
        setParams(resolvedParams);

        const response = await fetch(
          `/api/${resolvedParams.language}/${resolvedParams.course}/${resolvedParams.chapter}/${resolvedParams.slug}`
        );
        if (!response.ok) throw new Error("Failed to fetch lesson");
        const data: LessonContent = await response.json();
        setContent(data);

        // Fetch navigation info
        const navResponse = await fetch(
          `/api/${resolvedParams.language}/${resolvedParams.course}/${resolvedParams.chapter}/${resolvedParams.slug}/navigation`
        );
        if (navResponse.ok) {
          const navData: Navigation = await navResponse.json();
          setNavigation(navData);
        }
      } catch (err) {
        setError("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    resolveParamsAndFetch();
  }, [paramsPromise]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-destructive">
        <span className="mr-2">⚠️</span> {error}
      </div>
    );

  if (!content || !params)
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        <BookOpen className="mr-2" /> No content available
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        {/* Breadcrumb navigation */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href={`/${params.language}`} className="hover:text-primary">
            Courses
          </Link>
          <span>/</span>
          <Link
            href={`/${params.language}/${params.course}`}
            className="hover:text-primary"
          >
            {content.courseInfo.title}
          </Link>
          <span>/</span>
          <Link
            href={`/${params.language}/${params.course}/${params.chapter}`}
            className="hover:text-primary"
          >
            {content.chapterInfo.title}
          </Link>
        </nav>

        {/* Main content */}
        <article className="prose lg:prose-xl dark:prose-invert mx-auto bg-card rounded-xl p-8 shadow-lg">
          <MDXRemote {...content.content} components={components} />
        </article>

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between items-center">
          {navigation?.previous ? (
            <Link
              href={`/${params.language}/${navigation.previous.course}/${navigation.previous.chapter}/${navigation.previous.slug}`}
            >
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Lesson
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {navigation?.next && (
            <Link
              href={`/${params.language}/${navigation.next.course}/${navigation.next.chapter}/${navigation.next.slug}`}
            >
              <Button className="flex items-center">
                Next Lesson
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
