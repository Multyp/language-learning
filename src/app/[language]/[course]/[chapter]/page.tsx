import { Suspense } from "react";
import { ChaptersClient } from "./client";
import { Skeleton } from "@/components/ui/skeleton";
import fs from "fs/promises";
import path from "path";

interface PageParams {
  language: string;
  course: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

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

async function getChaptersData(params: PageParams): Promise<{
  chapters: Chapter[];
  courseInfo: CourseInfo;
}> {
  try {
    const coursePath = path.join(
      process.cwd(),
      "src/app/content",
      params.language,
      params.course
    );

    const courseDescriptorPath = path.join(coursePath, "descriptor.json");
    const courseDescriptorRaw = await fs.readFile(
      courseDescriptorPath,
      "utf-8"
    );
    const courseInfo: CourseInfo = JSON.parse(courseDescriptorRaw);

    const items = await fs.readdir(coursePath, { withFileTypes: true });
    const chapterDirs = items.filter(
      (item) => item.isDirectory() && item.name.startsWith("chapter-")
    );

    const chapters: Chapter[] = await Promise.all(
      chapterDirs.map(async (dir) => {
        const chapterId = dir.name;
        const chapterPath = path.join(coursePath, chapterId);

        const descriptorPath = path.join(chapterPath, "descriptor.json");
        const descriptorRaw = await fs.readFile(descriptorPath, "utf-8");
        const descriptor = JSON.parse(descriptorRaw);

        const chapterItems = await fs.readdir(chapterPath);
        const lessonCount = chapterItems.filter((item) =>
          item.endsWith(".mdx")
        ).length;

        return {
          id: chapterId,
          title: descriptor.title,
          description: descriptor.description,
          order:
            descriptor.order || parseInt(chapterId.replace("chapter-", "")),
          lessonCount,
        };
      })
    );

    chapters.sort((a, b) => a.order - b.order);

    return { chapters, courseInfo };
  } catch (error) {
    console.error("Error reading chapter data:", error);
    throw new Error("Impossible de charger les chapitres");
  }
}

export default async function ChaptersPage({ params }: PageProps) {
  const resolvedParams = await params;
  try {
    const data = await getChaptersData(resolvedParams);

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
