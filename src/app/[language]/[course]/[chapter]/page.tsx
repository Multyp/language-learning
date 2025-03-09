"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, BookOpenCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolved = await params;
        setResolvedParams(resolved);
      } catch {
        setError("Le chargement des paramètres de la page a échoué");
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
        if (!response.ok) throw new Error("Impossible de charger les leçons");
        const data = await response.json();
        setLessons(data.lessons);
        setChapterInfo(data.chapterInfo);
      } catch {
        setError("Le chargement des leçons a échoué");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [resolvedParams]);

  const BackButton = () => (
    <div className="absolute top-0 left-0 w-full border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          asChild
          className="relative -mb-[1px] h-14 px-4 hover:bg-transparent hover:text-primary border-b-2 border-transparent hover:border-primary rounded-none"
        >
          <Link
            href={`/${resolvedParams?.language}/${resolvedParams?.course}/`}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour aux cours</span>
          </Link>
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
        <div className="container mx-auto max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-12 mx-auto rounded-full mb-4" />
            <Skeleton className="h-10 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-72 mx-auto" />
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-2">
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-64 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <Alert variant="destructive" className="border-2 border-destructive">
          <AlertTitle className="font-bold">Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!resolvedParams) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <BackButton />
      <div className="container mx-auto px-4 py-12 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/10 rounded-full border-2 border-primary/20">
            <BookOpenCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            {chapterInfo?.title}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            {chapterInfo?.description}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/${resolvedParams.language}/${resolvedParams.course}/${resolvedParams.chapter}/${lesson.id}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                aria-label={`Commencer la leçon ${index + 1} : ${lesson.title}`}
              >
                <Card className="group border-2 hover:border-primary/50 transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-2">
                      <Badge
                        variant="outline"
                        className="text-sm font-medium border-2 py-1 px-3"
                      >
                        Leçon {index + 1}
                      </Badge>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {lesson.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-4 pl-16">
                      {lesson.description}
                    </p>
                    <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors pl-16">
                      <span className="font-medium">Commencer la leçon</span>
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

export const dynamic = "force-static";
