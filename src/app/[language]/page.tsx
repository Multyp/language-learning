import { CoursesPageClient } from "./client";

interface PageProps {
  params: Promise<{
    language: string;
  }>;
}

export default function CoursesPage({ params }: PageProps) {
  return <CoursesPageClient params={Promise.resolve(params)} />;
}

export async function generateStaticParams() {
  return [{ language: "japanese" }];
}
