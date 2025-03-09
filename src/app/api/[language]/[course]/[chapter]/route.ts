import { NextResponse } from "next/server";
import { readFile, readdir, stat } from "fs/promises";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ language: string; course: string }> }
) {
  try {
    const { language, course } = await params;
    const coursePath = path.join(process.cwd(), "content", language, course);

    // Read course descriptor
    const courseDescriptorPath = path.join(coursePath, "descriptor.json");
    const courseInfo = JSON.parse(
      await readFile(courseDescriptorPath, "utf-8")
    );

    const entries = await readdir(coursePath);
    const chapters = [];

    for (const entry of entries) {
      if (entry === "descriptor.json") continue;

      const chapterPath = path.join(coursePath, entry);
      const chapterStat = await stat(chapterPath);

      if (chapterStat.isDirectory()) {
        const descriptorPath = path.join(chapterPath, "descriptor.json");
        const descriptor = JSON.parse(await readFile(descriptorPath, "utf-8"));

        // Count lessons in chapter
        const files = await readdir(chapterPath);
        const lessonCount = files.filter((file) =>
          file.endsWith(".mdx")
        ).length;

        chapters.push({
          id: entry,
          lessonCount,
          ...descriptor,
        });
      }
    }

    return NextResponse.json({
      courseInfo,
      chapters: chapters.sort((a, b) => (a.order || 0) - (b.order || 0)),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch chapters" },
      { status: 500 }
    );
  }
}

export async function generateStaticParams() {
  const contentPath = path.join(process.cwd(), "content");
  const languages = await readdir(contentPath);

  const paths = [];

  for (const language of languages) {
    const coursesPath = path.join(contentPath, language);
    const courses = await readdir(coursesPath);

    for (const course of courses) {
      const chaptersPath = path.join(coursesPath, course);
      const chapters = await readdir(chaptersPath);

      for (const chapter of chapters) {
        paths.push({ language, course, chapter });
      }
    }
  }

  return paths;
}

export const dynamic = "force-static";
