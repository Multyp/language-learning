import { NextResponse } from "next/server";
import { getLessonsList } from "@/app/lib/lessons";

export async function GET() {
  try {
    const lessons = await getLessonsList("japanese");
    return NextResponse.json(lessons);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}
