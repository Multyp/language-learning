// app/api/[language]/[course]/[chapter]/lessons/route.ts
import { NextResponse } from "next/server";
import { readFile, readdir, stat } from "fs/promises";
import path from "path";

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

          const orderMatch = lessonContent.match(/order:\s*(\d+)/);
          const order = orderMatch ? parseInt(orderMatch[1], 10) : 0;

          lessons.push({
            id: entry.replace(".mdx", ""),
            order: order,
          });
        }
      } catch (fsError) {
        console.error(`Error accessing file at ${lessonPath}:`, fsError);
        // Handle the error appropriately, e.g., skip this entry or return an error response
      }
    }

    return NextResponse.json({
      chapterInfo,
      lessons: lessons.sort((a, b) => (a.order || 0) - (b.order || 0)),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}
