"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface Course {
  title: string;
  description: string;
  order: number;
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
      } catch (err) {
        setError("Failed to load page parameters");
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
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading courses...</span>
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
            Japanese Courses
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Master Japanese with our structured learning paths
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/${language}/course-${index + 1}`}>
                <div className="bg-card rounded-xl p-6 shadow-lg h-full hover:shadow-xl transition-shadow">
                  <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                  <p className="text-muted-foreground mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center text-primary">
                    <span>Start learning</span>
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
