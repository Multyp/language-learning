import { NextResponse } from "next/server";
import { readFile, readdir, stat } from "fs/promises";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ language: string }> }
) {
  try {
    const { language } = await params;
    const contentDir = path.join(process.cwd(), "content", language);
    const courses = await readdir(contentDir);
    const coursesInfo = [];

    for (const course of courses) {
      const coursePath = path.join(contentDir, course);
      const courseStat = await stat(coursePath);

      if (courseStat.isDirectory()) {
        const descriptorPath = path.join(coursePath, "descriptor.json");
        const descriptor = JSON.parse(await readFile(descriptorPath, "utf-8"));
        coursesInfo.push({
          id: course,
          ...descriptor,
        });
      }
    }

    return NextResponse.json(
      coursesInfo.sort((a, b) => (a.order || 0) - (b.order || 0))
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-static";
