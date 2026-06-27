import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { NutrientWebGL } from "@/components/nutrient-webgl";
import { RitualFlow } from "@/components/ritual-flow";
import { Badge } from "@/components/ui/badge";
import { getRitual, recipesForRitual, rituals } from "@/data/rituals";

const ambienceBySlug: Record<string, string> = {
  morning: "ambience-morning",
  noon: "ambience-noon",
  evening: "ambience-evening",
  night: "ambience-night"
};

export function generateStaticParams() {
  return rituals.map((ritual) => ({ slug: ritual.slug }));
}

export default async function RitualPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ritual = getRitual(slug);
  if (!ritual) notFound();
  const recipes = recipesForRitual(slug);
  const ambience = ambienceBySlug[slug] ?? "ambience-morning";

  return (
    <main className={`elite-home-surface ${ambience} home-noise ritual-page relative min-h-screen overflow-hidden bg-[#040706] text-stone-50`}>
      <NutrientWebGL ambient className="fixed inset-0 z-0 pointer-events-none" />
      <div className="ambience-layer pointer-events-none fixed inset-0 z-[1]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-48 bg-gradient-to-b from-black via-black/78 to-transparent" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[1] h-56 bg-gradient-to-t from-[#040706] via-[#040706]/82 to-transparent" />

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:pb-20 lg:pt-20">
        <Link className="ritual-return-link" href="/?onboarding=browse">
          <ArrowLeft className="h-4 w-4" />
          Browse Every Ritual
        </Link>

        <div className="mt-12 max-w-4xl">
          <Badge className="mb-6 border-white/12 bg-white/[0.06] px-3 py-1.5 text-[11px] uppercase tracking-[0.34em] text-emerald-50/78 backdrop-blur-md">
            Ritual flow
          </Badge>
          <h1 className={`ritual-page-title ${slug === "morning" ? "ritual-page-title--cinematic" : ""}`}>
            {ritual.title}
          </h1>
          <p className="home-copy mt-10 max-w-2xl">{ritual.description}</p>
        </div>

        <RitualFlow recipes={recipes} />
      </section>
    </main>
  );
}
