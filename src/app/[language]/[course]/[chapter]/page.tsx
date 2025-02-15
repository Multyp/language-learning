"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Loader2, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
}

interface PageParams {
  language: string;
  course: string;
  chapter: string;
}

export default function ChapterPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [chapterInfo, setChapterInfo] = useState<{
    title: string;
    description: string;
  }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resolvedParams, setResolvedParams] = useState<PageParams | null>(null);
  3;
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolved = await params;
        setResolvedParams(resolved);
      } catch (err) {
        setError("Failed to load page parameters");
        setLoading(false);
      }
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    const fetchLessons = async () => {
      try {
        const response = await fetch(
          `/api/${resolvedParams.language}/${resolvedParams.course}/${resolvedParams.chapter}/lessons`
        );
        if (!response.ok) throw new Error("Failed to fetch lessons");
        const data = await response.json();
        setLessons(data.lessons);
        setChapterInfo(data.chapterInfo);
      } catch (err) {
        setError("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [resolvedParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading lessons...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!resolvedParams) return null;
  console.log(resolvedParams);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <Link
          href={`/${resolvedParams.language}/${resolvedParams.course}`}
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Chapters
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-2 mb-4 bg-primary/10 rounded-full">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            {chapterInfo?.title}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {chapterInfo?.description}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {lessons.map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/${resolvedParams.language}/${resolvedParams.course}/${resolvedParams.chapter}/${lesson.id}`}
              >
                <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
                  <p className="text-muted-foreground mb-4">
                    {lesson.description}
                  </p>
                  <div className="flex items-center text-primary">
                    <span>Start lesson</span>
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
