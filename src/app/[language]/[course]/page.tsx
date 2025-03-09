import { Suspense } from "react";
import { ChaptersClient } from "./client";

interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessonCount: number;
}

interface CourseInfo {
  title: string;
  description: string;
}

interface PageParams {
  language: string;
  course: string;
}

async function fetchChaptersData(params: PageParams) {
  try {
    const response = await fetch(
      `/api/${params.language}/${params.course}/chapters`
    );
    if (!response.ok) throw new Error("Impossible de charger les chapitres");
    const data = await response.json();
    return {
      chapters: data.chapters as Chapter[],
      courseInfo: data.courseInfo as CourseInfo,
    };
  } catch {
    throw new Error("Le chargement des chapitres a échoué");
  }
}

interface PageProps {
  params: Promise<PageParams>;
}

export default async function ChaptersPage({ params }: PageProps) {
  const resolvedParams = await params;

  try {
    const data = await fetchChaptersData(resolvedParams);

    return (
      <Suspense fallback={<ChaptersLoadingSkeleton />}>
        <ChaptersClient
          params={resolvedParams}
          chapters={data.chapters}
          courseInfo={data.courseInfo}
        />
      </Suspense>
    );
  } catch {
    return (
      <ChaptersClient
        params={resolvedParams}
        error="Impossible de charger les chapitres"
      />
    );
  }
}

function ChaptersLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="h-8 w-32 mb-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        <div className="text-center mb-16">
          <div className="h-12 w-12 mx-auto rounded-full mb-4 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
          <div className="h-10 w-96 mx-auto mb-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          <div className="h-6 w-72 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border-2 rounded-xl p-6 bg-white dark:bg-slate-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-6 w-24 ml-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-full mb-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { language: "japanese", course: "course-1" },
    { language: "japanese", course: "course-2" },
  ];
}
