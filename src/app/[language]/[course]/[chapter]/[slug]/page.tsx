import { Suspense } from "react";
import { LessonClient } from "./client";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

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

interface PageParams {
  language: string;
  course: string;
  chapter: string;
  slug: string;
}

async function fetchLessonData(params: PageParams) {
  try {
    const response = await fetch(
      `/api/${params.language}/${params.course}/${params.chapter}/${params.slug}`
    );

    if (!response.ok) throw new Error("Failed to fetch lesson");
    return (await response.json()) as LessonContent;
  } catch {
    throw new Error("Le chargement de la leçon a échoué");
  }
}

async function fetchNavigationData(params: PageParams) {
  try {
    const response = await fetch(
      `/api/${params.language}/${params.course}/${params.chapter}/${params.slug}/navigation`
    );

    if (!response.ok) return null;
    return (await response.json()) as Navigation;
  } catch {
    return null;
  }
}

interface PageProps {
  params: Promise<PageParams>;
}

export default async function LessonPage({ params }: PageProps) {
  const resolvedParams = await params;

  try {
    const [content, navigation] = await Promise.all([
      fetchLessonData(resolvedParams),
      fetchNavigationData(resolvedParams),
    ]);

    return (
      <Suspense fallback={<LessonLoadingSkeleton />}>
        <LessonClient
          params={resolvedParams}
          content={content}
          navigation={navigation}
        />
      </Suspense>
    );
  } catch {
    return (
      <LessonClient
        params={resolvedParams}
        error="Le chargement de la leçon a échoué"
      />
    );
  }
}

function LessonLoadingSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    {
      language: "japanese",
      course: "course-1",
      chapter: "chapter-1",
      slug: "lesson-1",
    },
    {
      language: "japanese",
      course: "course-2",
      chapter: "chapter-1",
      slug: "lesson-1",
    },
    {
      language: "japanese",
      course: "course-2",
      chapter: "chapter-1",
      slug: "lesson-2",
    },
    {
      language: "japanese",
      course: "course-2",
      chapter: "chapter-2",
      slug: "lesson-1",
    },
  ];
}

export const dynamic = "force-dynamic";
export const revalidate = 3600;
