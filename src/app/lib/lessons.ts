import { NextResponse } from "next/server";
import { readFile, readdir, stat } from "fs/promises";
import path from "path";
import matter from "gray-matter";

interface CourseDescriptor {
  title: string;
  description: string;
  order?: number;
}

interface ChapterDescriptor {
  title: string;
  description: string;
  order?: number;
}

interface Lesson {
  course: string;
  chapter: string;
  slug: string;
  title: string;
  description: string;
  order: number;
}

export async function getLessonsList(language: string) {
  const contentDir = path.join(process.cwd(), "content", language);
  const courses = await readdir(contentDir);
  const lessons: Lesson[] = [];

  for (const course of courses) {
    const coursePath = path.join(contentDir, course);
    const courseStat = await stat(coursePath);

    if (courseStat.isDirectory()) {
      // Read course descriptor
      const courseDescriptorPath = path.join(coursePath, "descriptor.json");
      const courseDescriptor: CourseDescriptor = JSON.parse(
        await readFile(courseDescriptorPath, "utf-8")
      );

      const chapters = await readdir(coursePath);

      for (const chapter of chapters) {
        if (chapter === "descriptor.json") continue;

        const chapterPath = path.join(coursePath, chapter);
        const chapterStat = await stat(chapterPath);

        if (chapterStat.isDirectory()) {
          // Read chapter descriptor
          const chapterDescriptorPath = path.join(
            chapterPath,
            "descriptor.json"
          );
          const chapterDescriptor: ChapterDescriptor = JSON.parse(
            await readFile(chapterDescriptorPath, "utf-8")
          );

          const files = await readdir(chapterPath);
          const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

          for (const file of mdxFiles) {
            const filePath = path.join(chapterPath, file);
            const fileContent = await readFile(filePath, "utf-8");
            const { data: frontmatter } = matter(fileContent);

            lessons.push({
              course,
              chapter,
              slug: file.replace(".mdx", ""),
              title: frontmatter.title || `Lesson ${file.replace(".mdx", "")}`,
              description: frontmatter.description || "",
              order: frontmatter.order || 0,
            });
          }
        }
      }
    }
  }

  return lessons.sort((a, b) => a.order - b.order);
}

export async function getLessonContent(
  language: string,
  course: string,
  chapter: string,
  slug: string
) {
  const filePath = path.join(
    process.cwd(),
    "content",
    language,
    course,
    chapter,
    `${slug}.mdx`
  );

  try {
    const fileContent = await readFile(filePath, "utf-8");
    const { content, data: frontmatter } = matter(fileContent);

    // Read course and chapter descriptors
    const courseDescriptorPath = path.join(
      process.cwd(),
      "content",
      language,
      course,
      "descriptor.json"
    );
    const chapterDescriptorPath = path.join(
      process.cwd(),
      "content",
      language,
      course,
      chapter,
      "descriptor.json"
    );

    const courseDescriptor: CourseDescriptor = JSON.parse(
      await readFile(courseDescriptorPath, "utf-8")
    );
    const chapterDescriptor: ChapterDescriptor = JSON.parse(
      await readFile(chapterDescriptorPath, "utf-8")
    );

    return {
      content,
      frontmatter,
      courseInfo: courseDescriptor,
      chapterInfo: chapterDescriptor,
    };
  } catch (error) {
    throw new Error(
      `Lesson not found: ${language}/${course}/${chapter}/${slug}`
    );
  }
}
