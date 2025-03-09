import { NextResponse } from "next/server";
import { readFile, readdir, stat } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      language: string;
      course: string;
      chapter: string;
      slug: string;
    }>;
  }
) {
  try {
    const { language, course, chapter, slug } = await params;

    // Read course descriptor
    const courseDescriptorPath = path.join(
      process.cwd(),
      "content",
      language,
      course,
      "descriptor.json"
    );
    const courseInfo = JSON.parse(
      await readFile(courseDescriptorPath, "utf-8")
    );

    // Read chapter descriptor
    const chapterDescriptorPath = path.join(
      process.cwd(),
      "content",
      language,
      course,
      chapter,
      "descriptor.json"
    );
    const chapterInfo = JSON.parse(
      await readFile(chapterDescriptorPath, "utf-8")
    );

    // Read lesson content
    const filePath = path.join(
      process.cwd(),
      "content",
      language,
      course,
      chapter,
      `${slug}.mdx`
    );

    const fileContent = await readFile(filePath, "utf-8");
    const { content, data: frontmatter } = matter(fileContent);
    const mdxSource = await serialize(content);

    return NextResponse.json({
      content: mdxSource,
      frontmatter,
      courseInfo,
      chapterInfo,
    });
  } catch {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }
}

export async function generateStaticParams() {
  const contentPath = path.join(process.cwd(), "content");
  const languages = await readdir(contentPath);

  const paths = [];

  for (const language of languages) {
    const languagePath = path.join(contentPath, language);
    // Only process if languagePath is a directory
    if (!(await stat(languagePath)).isDirectory()) continue;

    const courses = await readdir(languagePath);

    for (const course of courses) {
      const coursePath = path.join(languagePath, course);
      // Ensure coursePath is a directory (skips descriptor.json or other files)
      if (!(await stat(coursePath)).isDirectory()) continue;

      const chapters = await readdir(coursePath);

      for (const chapter of chapters) {
        const chapterPath = path.join(coursePath, chapter);
        // Only process chapters that are directories
        if (!(await stat(chapterPath)).isDirectory()) continue;

        const lessons = await readdir(chapterPath);

        for (const lesson of lessons) {
          const lessonPath = path.join(chapterPath, lesson);
          // Process only .mdx files and ensure it's a file
          if (lesson.endsWith(".mdx") && (await stat(lessonPath)).isFile()) {
            paths.push({
              language,
              course,
              chapter,
              slug: lesson.replace(".mdx", ""),
            });
          }
        }
      }
    }
  }

  return paths;
}
