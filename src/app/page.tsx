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
  // Ceci sera étendu à mesure que d'autres langues seront ajoutées
  const courses = [
    {
      id: "japanese",
      title: "Japonais",
      description:
        "Maîtrisez le japonais grâce à des leçons structurées couvrant la parole, la lecture et l'écriture",
      status: "Disponible",
      icon: "🇯🇵",
    },
    // D'autres langues seront ajoutées ici
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto p-8">
        {/* Section Héros */}
        <div className="flex flex-col items-center text-center space-y-6 py-12 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Languages className="h-12 w-12" />
            <h1 className="text-5xl font-bold">
              Plateforme d'apprentissage des langues
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Commencez votre parcours d'apprentissage des langues avec nos cours
            complets. Maîtrisez de nouvelles langues grâce à des leçons
            interactives et des parcours d'apprentissage structurés.
          </p>
          <Badge variant="secondary" className="text-sm">
            Plus de langues à venir
          </Badge>
        </div>

        {/* Grille des cours */}
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
                    Commencer à apprendre
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Cartes à venir */}
          {[
            {
              title: "Allemand",
              icon: "🇩🇪",
              description:
                "Apprenez l'allemand grâce à des leçons complètes couvrant la grammaire, le vocabulaire et la conversation",
            },
            {
              title: "Portugais",
              icon: "🇵🇹",
              description:
                "Maîtrisez le portugais grâce à des leçons interactives axées sur les variantes européennes",
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
                <Badge variant="secondary">À venir</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section des fonctionnalités */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen className="h-6 w-6" />,
              title: "Apprentissage structuré",
              description:
                "Progressez grâce à des leçons soigneusement élaborées pour un apprentissage optimal",
            },
            {
              icon: <Globe2 className="h-6 w-6" />,
              title: "Contexte culturel",
              description:
                "Apprenez non seulement la langue, mais aussi les nuances culturelles et les coutumes",
            },
            {
              icon: <Languages className="h-6 w-6" />,
              title: "Plusieurs langues",
              description:
                "Élargissez vos horizons linguistiques avec notre collection croissante de cours de langues",
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
