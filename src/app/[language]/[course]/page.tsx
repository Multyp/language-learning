import { Suspense } from "react";
import { ChaptersClient } from "./client";
import fs from "fs";
import path from "path";

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

function getChaptersData(params: PageParams): {
  chapters: Chapter[];
  courseInfo: CourseInfo;
} {
  try {
    // Get course info from descriptor.json
    const coursePath = path.join(
      process.cwd(),
      "src",
      "app",
      "content",
      params.language,
      params.course
    );
    const courseDescriptorPath = path.join(coursePath, "descriptor.json");
    const courseInfo = JSON.parse(
      fs.readFileSync(courseDescriptorPath, "utf8")
    ) as CourseInfo;

    // Get chapters by reading subdirectories
    const chapterDirs = fs
      .readdirSync(coursePath)
      .filter(
        (dir) =>
          dir.startsWith("chapter-") &&
          fs.statSync(path.join(coursePath, dir)).isDirectory()
      );

    const chapters = chapterDirs
      .map((chapterDir) => {
        const chapterPath = path.join(coursePath, chapterDir);
        const descriptorPath = path.join(chapterPath, "descriptor.json");
        const chapterData = JSON.parse(fs.readFileSync(descriptorPath, "utf8"));

        // Count lessons by counting MDX files
        const lessonFiles = fs
          .readdirSync(chapterPath)
          .filter((file) => file.endsWith(".mdx"));

        return {
          id: chapterDir,
          title: chapterData.title,
          description: chapterData.description,
          order: chapterData.order || parseInt(chapterDir.split("-")[1], 10),
          lessonCount: lessonFiles.length,
        };
      })
      .sort((a, b) => a.order - b.order);

    return {
      chapters,
      courseInfo,
    };
  } catch (error) {
    console.error(
      `Error loading chapters for ${params.language}/${params.course}:`,
      error
    );
    throw new Error("Le chargement des chapitres a échoué");
  }
}

interface PageProps {
  params: Promise<PageParams>;
}

export default async function ChaptersPage({ params }: PageProps) {
  const resolvedParams = await params;
  try {
    const data = getChaptersData(resolvedParams);

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
