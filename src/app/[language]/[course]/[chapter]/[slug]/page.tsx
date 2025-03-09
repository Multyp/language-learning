import { Suspense } from "react";
import { LessonClient } from "./client";
import { serialize } from "next-mdx-remote/serialize";
import fs from "fs/promises";
import path from "path";

interface LessonContent {
  serializedContent: string; // Serialized content as string to pass to client
  frontmatter: {
    title: string;
    description: string;
    order: number;
  };
  courseInfo: {
    title: string;
    description: string;
  };
  chapterInfo: {
    title: string;
    description: string;
  };
}

interface Navigation {
  previous: {
    course: string;
    chapter: string;
    slug: string;
    title: string;
  } | null;
  next: {
    course: string;
    chapter: string;
    slug: string;
    title: string;
  } | null;
}

interface PageParams {
  language: string;
  course: string;
  chapter: string;
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

// Server-side function to load lesson content
async function getLessonData(params: PageParams): Promise<LessonContent> {
  try {
    const basePath = path.join(process.cwd(), "src/app/content");
    const languagePath = path.join(basePath, params.language);
    const coursePath = path.join(languagePath, params.course);
    const chapterPath = path.join(coursePath, params.chapter);
    const lessonPath = path.join(chapterPath, `${params.slug}.mdx`);

    // Read lesson MDX content
    const mdxContent = await fs.readFile(lessonPath, "utf-8");

    // Read course descriptor
    const courseDescriptorPath = path.join(coursePath, "descriptor.json");
    const courseDescriptorRaw = await fs.readFile(
      courseDescriptorPath,
      "utf-8"
    );
    const courseInfo = JSON.parse(courseDescriptorRaw);

    // Read chapter descriptor
    const chapterDescriptorPath = path.join(chapterPath, "descriptor.json");
    const chapterDescriptorRaw = await fs.readFile(
      chapterDescriptorPath,
      "utf-8"
    );
    const chapterInfo = JSON.parse(chapterDescriptorRaw);

    // Extract frontmatter and serialize MDX content
    const frontmatter = {
      title: params.slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      description: "Lesson description",
      order: parseInt(params.slug.replace("lesson-", "")),
    };

    // Serialize the MDX content
    const mdxResult = await serialize(mdxContent);
    // Convert the serialized content to a string to pass to the client
    const serializedContent = JSON.stringify(mdxResult);

    return {
      serializedContent,
      frontmatter,
      courseInfo,
      chapterInfo,
    };
  } catch (error) {
    console.error("Error loading lesson data:", error);
    throw new Error("Le chargement de la leçon a échoué");
  }
}

// Server-side function to determine navigation options
async function getNavigationData(params: PageParams): Promise<Navigation> {
  try {
    const basePath = path.join(process.cwd(), "src/app/content");
    const languagePath = path.join(basePath, params.language);
    const coursePath = path.join(languagePath, params.course);
    const chapterPath = path.join(coursePath, params.chapter);

    // Get all lessons in current chapter
    const files = await fs.readdir(chapterPath);
    const lessonFiles = files
      .filter((file) => file.endsWith(".mdx"))
      .sort((a, b) => {
        const aNum = parseInt(a.replace("lesson-", "").replace(".mdx", ""));
        const bNum = parseInt(b.replace("lesson-", "").replace(".mdx", ""));
        return aNum - bNum;
      });

    const currentIndex = lessonFiles.findIndex(
      (file) => file === `${params.slug}.mdx`
    );

    let previous = null;
    let next = null;

    // Previous lesson in same chapter
    if (currentIndex > 0) {
      const prevSlug = lessonFiles[currentIndex - 1].replace(".mdx", "");
      previous = {
        course: params.course,
        chapter: params.chapter,
        slug: prevSlug,
        title: prevSlug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
      };
    } else {
      // Check if there's a previous chapter
      const chapters = await fs.readdir(coursePath, { withFileTypes: true });
      const chapterDirs = chapters
        .filter((dir) => dir.isDirectory() && dir.name.startsWith("chapter-"))
        .map((dir) => dir.name)
        .sort();

      const currentChapterIndex = chapterDirs.indexOf(params.chapter);

      if (currentChapterIndex > 0) {
        const prevChapter = chapterDirs[currentChapterIndex - 1];
        const prevChapterPath = path.join(coursePath, prevChapter);
        const prevChapterFiles = await fs.readdir(prevChapterPath);
        const prevChapterLessons = prevChapterFiles
          .filter((file) => file.endsWith(".mdx"))
          .sort();

        if (prevChapterLessons.length > 0) {
          const prevSlug = prevChapterLessons[
            prevChapterLessons.length - 1
          ].replace(".mdx", "");
          previous = {
            course: params.course,
            chapter: prevChapter,
            slug: prevSlug,
            title: prevSlug
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
          };
        }
      }
    }

    // Next lesson in same chapter
    if (currentIndex < lessonFiles.length - 1) {
      const nextSlug = lessonFiles[currentIndex + 1].replace(".mdx", "");
      next = {
        course: params.course,
        chapter: params.chapter,
        slug: nextSlug,
        title: nextSlug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
      };
    } else {
      // Check if there's a next chapter
      const chapters = await fs.readdir(coursePath, { withFileTypes: true });
      const chapterDirs = chapters
        .filter((dir) => dir.isDirectory() && dir.name.startsWith("chapter-"))
        .map((dir) => dir.name)
        .sort();

      const currentChapterIndex = chapterDirs.indexOf(params.chapter);

      if (currentChapterIndex < chapterDirs.length - 1) {
        const nextChapter = chapterDirs[currentChapterIndex + 1];
        const nextChapterPath = path.join(coursePath, nextChapter);
        const nextChapterFiles = await fs.readdir(nextChapterPath);
        const nextChapterLessons = nextChapterFiles
          .filter((file) => file.endsWith(".mdx"))
          .sort();

        if (nextChapterLessons.length > 0) {
          const nextSlug = nextChapterLessons[0].replace(".mdx", "");
          next = {
            course: params.course,
            chapter: nextChapter,
            slug: nextSlug,
            title: nextSlug
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
          };
        }
      }
    }

    return { previous, next };
  } catch (error) {
    console.error("Error getting navigation data:", error);
    return { previous: null, next: null };
  }
}

export default async function LessonPage({ params }: PageProps) {
  const resolvedParams = await params;
  try {
    const [content, navigation] = await Promise.all([
      getLessonData(resolvedParams),
      getNavigationData(resolvedParams),
    ]);

    return (
      <Suspense fallback={<LessonLoadingSkeleton />}>
        <LessonClient
          params={resolvedParams}
          content={content}
          navigation={navigation}
        />
      </Suspense>
    );
  } catch {
    return (
      <LessonClient
        params={resolvedParams}
        error="Le chargement de la leçon a échoué"
      />
    );
  }
}

function LessonLoadingSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    {
      language: "japanese",
      course: "course-1",
      chapter: "chapter-1",
      slug: "lesson-1",
    },
    {
      language: "japanese",
      course: "course-2",
      chapter: "chapter-1",
      slug: "lesson-1",
    },
    {
      language: "japanese",
      course: "course-2",
      chapter: "chapter-1",
      slug: "lesson-2",
    },
    {
      language: "japanese",
      course: "course-2",
      chapter: "chapter-2",
      slug: "lesson-1",
    },
  ];
}
