import { NextResponse } from "next/server";
import { getLessonContent } from "@/app/lib/lessons";
import { serialize } from "next-mdx-remote/serialize";

export async function GET(
  req: Request,
  { params }: { params: { language: string; chapter: string; slug: string } }
) {
  try {
    const { content, frontmatter } = await getLessonContent(
      params.language,
      params.chapter,
      params.slug
    );

    // Serialize the MDX content on the server side
    const mdxSource = await serialize(content);

    return NextResponse.json({
      content: mdxSource,
      frontmatter,
    });
  } catch (error) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }
}
