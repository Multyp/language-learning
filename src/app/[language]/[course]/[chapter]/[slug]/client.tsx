"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { components } from "@/components/mdx";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageParams {
  language: string;
  course: string;
  chapter: string;
  slug: string;
}

interface LessonContent {
  content: MDXRemoteSerializeResult<unknown, unknown>;
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

interface LessonClientProps {
  params: PageParams;
  content?: LessonContent | null;
  navigation?: Navigation | null;
  error?: string;
}

export function LessonClient({
  params,
  content,
  navigation,
  error = "",
}: LessonClientProps) {
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-destructive">
        <span className="mr-2">⚠️</span> {error}
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        <BookOpen className="mr-2" /> No content available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        {/* Breadcrumb navigation */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href={`/${params.language}`} className="hover:text-primary">
            Cours
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
