import { Suspense } from "react";
import { ChaptersClient } from "./client";
import { Skeleton } from "@/components/ui/skeleton";

interface PageParams {
  language: string;
  course: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

async function fetchChaptersData(params: PageParams) {
  try {
    const response = await fetch(
      `/api/${params.language}/${params.course}/chapters`
    );
    if (!response.ok) throw new Error("Impossible de charger les chapitres");
    return await response.json();
  } catch {
    throw new Error("Impossible de charger les chapitres");
  }
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
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-12 mx-auto rounded-full mb-4" />
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-72 mx-auto" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-2 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-6 w-24 ml-auto" />
              </div>
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { language: "japanese", course: "course-1", chapter: "chapter-1" },
    { language: "japanese", course: "course-2", chapter: "chapter-1" },
    { language: "japanese", course: "course-2", chapter: "chapter-2" },
  ];
}
