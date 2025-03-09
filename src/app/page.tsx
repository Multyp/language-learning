"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, BookOpenCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function HomePage() {
  const courses = [
    {
      id: "japanese",
      title: "Japonais",
      description: "Apprenez le japonais de façon structurée",
      icon: "🇯🇵",
      available: true,
    },
    {
      id: "german",
      title: "Allemand",
      description: "Cours d'allemand - Bientôt disponible",
      icon: "🇩🇪",
      available: false,
    },
    {
      id: "portuguese",
      title: "Portugais",
      description: "Cours de portugais - Bientôt disponible",
      icon: "🇵🇹",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/10 rounded-full border-2 border-primary/20">
            <BookOpenCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            Apprentissage des langues
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Cours structurés pour apprendre une nouvelle langue
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {course.available ? (
                <Link
                  href={`/${course.id}`}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                  aria-label={`Accéder aux cours de ${course.title}`}
                >
                  <Card className="group border-2 hover:border-primary/50 transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{course.icon}</span>
                        <div className="flex-grow">
                          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            {course.title}
                          </h2>
                          <p className="text-muted-foreground">
                            {course.description}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <Card className="border-2 opacity-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{course.icon}</span>
                      <div className="flex-grow">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1">
                          {course.title}
                        </h2>
                        <p className="text-muted-foreground">
                          {course.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="border-2">
                        Bientôt
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
