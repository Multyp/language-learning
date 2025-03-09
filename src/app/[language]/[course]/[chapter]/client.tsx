"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { motion } from "framer-motion";
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { components } from "@/components/mdx";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PageParams {
  language: string;
  course: string;
  chapter: string;
  slug?: string;
}

interface LessonContent {
  content: MDXRemoteSerializeResult<unknown, unknown>;
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

interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessonCount: number;
}

interface ChapterData {
  chapters: Chapter[];
  courseInfo: {
    title: string;
    description: string;
  };
}

interface Lesson {
  slug: string;
  title: string;
  description: string;
  order: number;
}

interface LessonClientProps {
  params: Promise<PageParams> | PageParams;
  content?: LessonContent | null;
  navigation?: Navigation | null;
  chapterData?: ChapterData | null;
  lessonList?: Lesson[] | null;
  error?: string;
}

export function LessonClient({
  params,
  content,
  navigation,
  chapterData,
  lessonList,
  error = "",
}: LessonClientProps) {
  const resolvedParams =
    params instanceof Promise ? ({} as PageParams) : params;

  // BackButton component
  const BackButton = ({ href, text }: { href: string; text: string }) => (
    <div className="absolute top-0 left-0 w-full border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          asChild
          className="relative -mb-[1px] h-14 px-4 hover:bg-transparent hover:text-primary border-b-2 border-transparent hover:border-primary rounded-none"
        >
          <Link href={href} className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>{text}</span>
          </Link>
        </Button>
      </div>
    </div>
  );

  // Error handling
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Alert
          variant="destructive"
          className="border-2 border-destructive max-w-4xl mx-auto mt-8"
        >
          <AlertTitle className="font-bold">Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // If we have content, render the lesson view
  if (content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <BackButton
          href={`/${resolvedParams.language}/${resolvedParams.course}/${resolvedParams.chapter}`}
          text={`Retour à ${content.chapterInfo.title}`}
        />
        <div className="container mx-auto px-4 py-12 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/10 rounded-full border-2 border-primary/20">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
              {content.frontmatter.title}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              {content.frontmatter.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 max-w-4xl mx-auto shadow-lg">
              <CardContent className="p-8 prose lg:prose-xl dark:prose-invert mx-auto">
                <MDXRemote {...content.content} components={components} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto mt-8 flex justify-between items-center"
          >
            {navigation?.previous ? (
              <Link
                href={`/${resolvedParams.language}/${navigation.previous.course}/${navigation.previous.chapter}/${navigation.previous.slug}`}
              >
                <Button
                  variant="outline"
                  className="group flex items-center gap-2 border-2 hover:border-primary/50 transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Leçon précédente</span>
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {navigation?.next && (
              <Link
                href={`/${resolvedParams.language}/${navigation.next.course}/${navigation.next.chapter}/${navigation.next.slug}`}
              >
                <Button className="group flex items-center gap-2 border border-primary/50 bg-primary hover:bg-primary/90 transition-all duration-200">
                  <span>Leçon suivante</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // If we have chapter data, render the LESSON list with ChaptersClient styling
  if (chapterData && lessonList) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <BackButton
          href={`/${resolvedParams.language}/${resolvedParams.course}`}
          text="Retour au cours"
        />
        <div className="container mx-auto px-4 py-12 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/10 rounded-full border-2 border-primary/20">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
              {chapterData.courseInfo.title}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Leçons du chapitre
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {lessonList.map((lesson, index) => (
              <motion.div
                key={lesson.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/${resolvedParams.language}/${resolvedParams.course}/${resolvedParams.chapter}/${lesson.slug}`}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                  aria-label={`Accéder à la leçon ${index + 1} : ${
                    lesson.title
                  }`}
                >
                  <Card className="group border-2 hover:border-primary/50 transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 rounded-lg p-2 border-2 border-primary/20 group-hover:bg-primary/20 transition-colors">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            Leçon {index + 1} : {lesson.title}
                          </h2>
                        </div>
                        <Badge
                          variant="secondary"
                          className="ml-auto border-2 py-1 px-3"
                        >
                          Leçon {lesson.order}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {lesson.description}
                      </p>
                      <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
                        <span className="font-medium">Voir la leçon</span>
                        <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <Card className="border-2 p-6 shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-4 text-muted-foreground">
          <BookOpen className="h-12 w-12 mb-4 text-primary/50" />
          <p className="text-xl font-medium">Aucun contenu disponible</p>
        </CardContent>
      </Card>
    </div>
  );
}
