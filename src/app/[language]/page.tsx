"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, GraduationCap, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HiraganaGame from "@/components/games/HiraganaGame";

interface Course {
  title: string;
  description: string;
  order: number;
  imageUrl?: string;
}

export default function CoursesPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setLanguage(resolvedParams.language);
      } catch {
        setError("Le chargement des paramètres de la page a échoué");
        setLoading(false);
      }
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!language) return;

    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/${language}/courses`);
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch {
        setError("Impossible de charger les cours");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-2">
                <CardContent className="p-6">
                  <div className="flex gap-6 items-center">
                    <Skeleton className="w-24 h-24 rounded-lg" />
                    <div className="flex-grow space-y-3">
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
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

  const BackButton = () => (
    <div className="absolute top-0 left-0 w-full border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          asChild
          className="relative -mb-[1px] h-14 px-4 hover:bg-transparent hover:text-primary border-b-2 border-transparent hover:border-primary rounded-none"
        >
          <Link href={`/`} className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Retour au menu principal</span>
          </Link>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <BackButton />
      <div className="container mx-auto px-4 py-12 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/10 rounded-full border-2 border-primary/20">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-primary text-transparent bg-clip-text">
            Cours de japonais
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Apprenez le japonais à votre rythme avec nos cours en ligne.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/${language}/course-${index + 1}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                aria-label={`Accéder au cours : ${course.title}`}
              >
                <Card className="group border-2 hover:border-primary/50 transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex gap-6 items-center">
                      {course.imageUrl ? (
                        <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg border-2 border-slate-200 dark:border-slate-700">
                          <Image
                            src={course.imageUrl}
                            alt=""
                            width={96}
                            height={96}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-200 dark:border-slate-700">
                          <BookOpen className="h-8 w-8 text-slate-400" />
                        </div>
                      )}
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                            {course.title}
                          </h2>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">
                          {course.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors duration-200" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        {language === "japanese" && <HiraganaGame />}
      </div>
    </div>
  );
}
