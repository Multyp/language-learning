"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, ScrollText, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface Lesson {
  chapter: string;
  slug: string;
  title: string;
  description: string;
  order: number;
}

export default function JapanesePage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch("/api/lessons");
        if (!response.ok) throw new Error("Failed to fetch lessons");
        const data = await response.json();
        setLessons(data);
      } catch (err) {
        setError("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const groupedLessons = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.chapter]) {
      acc[lesson.chapter] = [];
    }
    acc[lesson.chapter].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading course content...</span>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-2 mb-4 bg-primary/10 rounded-full">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            Japanese Course
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Master Japanese through our structured learning path
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {Object.entries(groupedLessons).map(
            ([chapter, chapterLessons], index) => (
              <motion.div
                key={chapter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <ScrollText className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Chapter {index + 1}</h2>
                  <Badge variant="secondary" className="ml-auto">
                    {chapterLessons.length}{" "}
                    {chapterLessons.length === 1 ? "lesson" : "lessons"}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {chapterLessons
                    .sort((a, b) => a.order - b.order)
                    .map((lesson) => (
                      <Link
                        key={lesson.slug}
                        href={`/japanese/${lesson.chapter}/${lesson.slug}`}
                        className="block"
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-4 rounded-lg bg-background hover:bg-accent transition-colors duration-200 flex items-center gap-4 group"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                              {lesson.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {lesson.description}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </motion.div>
                      </Link>
                    ))}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
