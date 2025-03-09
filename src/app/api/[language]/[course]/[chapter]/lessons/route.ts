import { NextResponse } from "next/server";
import { readFile, readdir, stat } from "fs/promises";
import path from "path";
import matter from "gray-matter";

export async function GET(
  req: Request,
  {
    params,
  }: { params: Promise<{ language: string; course: string; chapter: string }> }
) {
  try {
    const { language, course, chapter } = await params;
    const chapterPath = path.join(
      process.cwd(),
      "content",
      language,
      course,
      chapter
    );

    const chapterDescriptorPath = path.join(chapterPath, "descriptor.json");
    const chapterInfo = JSON.parse(
      await readFile(chapterDescriptorPath, "utf-8")
    );

    const entries = await readdir(chapterPath);
    const lessons = [];
    for (const entry of entries) {
      if (entry === "descriptor.json") continue;
      const lessonPath = path.join(chapterPath, entry);

      try {
        const lessonStat = await stat(lessonPath);
        if (lessonStat.isFile() && entry.endsWith(".mdx")) {
          const lessonContent = await readFile(lessonPath, "utf-8");
          const { data: frontmatter } = matter(lessonContent);

          lessons.push({
            id: entry.replace(".mdx", ""),
            title: frontmatter.title || `Lesson ${entry.replace(".mdx", "")}`,
            description: frontmatter.description || "",
            order: frontmatter.order || 0,
          });
        }
      } catch (fsError) {
        console.error(`Error accessing file at ${lessonPath}:`, fsError);
      }
    }

    return NextResponse.json({
      chapterInfo,
      lessons: lessons.sort((a, b) => (a.order || 0) - (b.order || 0)),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
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
