import { CoursesPageClient } from "./client";
import fs from "fs";
import path from "path";

interface Course {
  title: string;
  description: string;
  order: number;
  imageUrl?: string;
}

function getCoursesData(language: string): Course[] {
  try {
    const contentDir = path.join(
      process.cwd(),
      "src",
      "app",
      "content",
      language
    );
    const courseDirs = fs
      .readdirSync(contentDir)
      .filter(
        (dir) =>
          dir.startsWith("course-") &&
          fs.statSync(path.join(contentDir, dir)).isDirectory()
      );

    return courseDirs
      .map((courseDir) => {
        const descriptorPath = path.join(
          contentDir,
          courseDir,
          "descriptor.json"
        );
        const courseData = JSON.parse(fs.readFileSync(descriptorPath, "utf8"));
        return {
          title: courseData.title,
          description: courseData.description,
          order: courseData.order || parseInt(courseDir.split("-")[1], 10),
          imageUrl: courseData.imageUrl,
        };
      })
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error(`Failed to load courses for ${language}:`, error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const resolvedParams = await params;
  const courses = getCoursesData(resolvedParams.language);

  return (
    <CoursesPageClient courses={courses} language={resolvedParams.language} />
  );
}

export async function generateStaticParams() {
  return [{ language: "japanese" }];
}
