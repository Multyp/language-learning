"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ScrollText,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessonCount: number;
}

interface CourseInfo {
  title: string;
  description: string;
}

interface PageParams {
  language: string;
  course: string;
}

interface ChaptersClientProps {
  params: PageParams;
  chapters?: Chapter[];
  courseInfo?: CourseInfo;
  error?: string;
}

export function ChaptersClient({
  params,
  chapters = [],
  courseInfo,
  error = "",
}: ChaptersClientProps) {
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

  const BackButton = () => (
    <div className="absolute top-0 left-0 w-full border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          asChild
          className="relative -mb-[1px] h-14 px-4 hover:bg-transparent hover:text-primary border-b-2 border-transparent hover:border-primary rounded-none"
        >
          <Link
            href={`/${params.language}`}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour aux cours</span>
          </Link>
        </Button>
      </div>
    </div>
  );

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
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            {courseInfo?.title}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            {courseInfo?.description}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/${params.language}/${params.course}/${chapter.id}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                aria-label={`Accéder au chapitre ${index + 1} : ${
                  chapter.title
                }`}
              >
                <Card className="group border-2 hover:border-primary/50 transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-primary/10 rounded-lg p-2 border-2 border-primary/20 group-hover:bg-primary/20 transition-colors">
                        <ScrollText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                          Chapitre {index + 1} : {chapter.title}
                        </h2>
                      </div>
                      <Badge
                        variant="secondary"
                        className="ml-auto border-2 py-1 px-3"
                      >
                        {chapter.lessonCount}{" "}
                        {chapter.lessonCount === 1 ? "leçon" : "leçons"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {chapter.description}
                    </p>
                    <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
                      <span className="font-medium">Voir les leçons</span>
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
