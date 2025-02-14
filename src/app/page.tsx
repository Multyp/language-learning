import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BookOpen, ChevronRight, Globe2, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  // This will be expanded as more languages are added
  const courses = [
    {
      id: "japanese",
      title: "Japanese",
      description:
        "Master Japanese through structured lessons covering speaking, reading, and writing",
      status: "Available",
      icon: "🇯🇵",
    },
    // Future languages will be added here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto p-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-6 py-12 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Languages className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Language Learning Platform</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Embark on your language learning journey with our comprehensive
            courses. Master new languages through interactive lessons and
            structured learning paths.
          </p>
          <Badge variant="secondary" className="text-sm">
            More languages coming soon
          </Badge>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/${course.id}`} className="group">
              <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-4xl">{course.icon}</span>
                      <CardTitle className="text-2xl">{course.title}</CardTitle>
                    </div>
                    <Badge>{course.status}</Badge>
                  </div>
                  <CardDescription className="text-base">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    Start Learning
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Coming Soon Cards */}
          {[
            {
              title: "German",
              icon: "🇩🇪",
              description:
                "Learn German with comprehensive lessons covering grammar, vocabulary, and conversation",
            },
            {
              title: "Portuguese",
              icon: "🇵🇹",
              description:
                "Master Portuguese through interactive lessons focused on European variants",
            },
          ].map((comingSoon) => (
            <Card key={comingSoon.title} className="opacity-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-4xl">{comingSoon.icon}</span>
                  <CardTitle className="text-2xl">{comingSoon.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {comingSoon.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Coming Soon</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen className="h-6 w-6" />,
              title: "Structured Learning",
              description:
                "Progress through carefully crafted lessons designed for optimal learning",
            },
            {
              icon: <Globe2 className="h-6 w-6" />,
              title: "Cultural Context",
              description:
                "Learn not just the language, but also the cultural nuances and customs",
            },
            {
              icon: <Languages className="h-6 w-6" />,
              title: "Multiple Languages",
              description:
                "Expand your linguistic horizons with our growing collection of language courses",
            },
          ].map((feature, index) => (
            <Card key={index} className="bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
