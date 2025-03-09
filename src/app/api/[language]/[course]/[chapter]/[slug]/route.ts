import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
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

export const dynamic = "force-static";
