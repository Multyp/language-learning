import { readFile, readdir, stat } from "fs/promises";
import path from "path";
import matter from "gray-matter";

export async function getLessonsList(language: string) {
  const contentDir = path.join(process.cwd(), "content", language);
  const chapters = await readdir(contentDir);

  const lessons = [];

  for (const chapter of chapters) {
    const chapterPath = path.join(contentDir, chapter);
    const chapterStat = await stat(chapterPath);

    if (chapterStat.isDirectory()) {
      const files = await readdir(chapterPath);
      const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

      for (const file of mdxFiles) {
        const filePath = path.join(chapterPath, file);
        const fileContent = await readFile(filePath, "utf-8");
        const { data: frontmatter } = matter(fileContent);

        lessons.push({
          chapter,
          slug: file.replace(".mdx", ""),
          title: frontmatter.title || `Lesson ${file.replace(".mdx", "")}`,
          description: frontmatter.description || "",
          order: frontmatter.order || 0,
        });
      }
    }
  }

  return lessons.sort((a, b) => a.order - b.order);
}

export async function getLessonContent(
  language: string,
  chapter: string,
  slug: string
) {
  const filePath = path.join(
    process.cwd(),
    "content",
    language,
    chapter,
    `${slug}.mdx`
  );

  try {
    const fileContent = await readFile(filePath, "utf-8");
    const { content, data: frontmatter } = matter(fileContent);
    return { content, frontmatter };
  } catch (error) {
    throw new Error(`Lesson not found: ${language}/${chapter}/${slug}`);
  }
}
