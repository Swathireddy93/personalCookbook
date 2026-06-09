"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NutrientWebGL } from "@/components/nutrient-webgl";
import { Badge } from "@/components/ui/badge";

type DayPart = "morning" | "noon" | "evening" | "night";
type RhythmPart = "weekly" | "cycle";

const dayParts: Array<{
  id: DayPart;
  title: string;
  mood: string;
  detail: string;
  href: string;
}> = [
  {
    id: "morning",
    title: "Morning",
    mood: "golden clarity",
    detail: "Hydration, minerals, spices, and the first clean signal of the day.",
    href: "/rituals/morning"
  },
  {
    id: "noon",
    title: "Noon",
    mood: "bright focus",
    detail: "Protein, greens, and steady fuel without losing lightness.",
    href: "/rituals/noon"
  },
  {
    id: "evening",
    title: "Evening",
    mood: "warm descent",
    detail: "Recovery foods, calmer digestion, and a deliberate shift down.",
    href: "/rituals/evening"
  },
  {
    id: "night",
    title: "Night",
    mood: "quiet repair",
    detail: "Low light, sleep support, and the rituals that close the kitchen.",
    href: "/rituals/night"
  }
];

const ritualTracks = [
  {
    id: "weekly" as const,
    title: "Weekly Anchors",
    detail: "Batch preps, replenishment recipes, grocery rhythms, and longer reset rituals."
  },
  {
    id: "cycle" as const,
    title: "Cycle Care Rituals",
    detail: "Phase-aware nourishment for period days, luteal support, cravings, comfort, and recovery."
  }
];

const recipeCollections = [
  {
    title: "Detox Drinks",
    detail: "Citrus waters, herbal infusions, spice drinks, and mineral-forward resets that can also belong inside daily rituals.",
    href: "/collections/detox-drinks"
  },
  {
    title: "Soups",
    detail: "Broths, rasams, lentil bowls, and warm restorative recipes gathered as their own nourishing library.",
    href: "/collections/soups"
  },
  {
    title: "Quick pick me ups",
    detail: "Small lifts for low-energy windows: tonics, snacks, warm cups, and fast rituals that do not need a full meal.",
    href: "/collections/quick-pick-me-ups"
  }
];

export default function HomePage() {
  const router = useRouter();
  const [activeDay, setActiveDay] = useState<DayPart>("morning");
  const [selectedDay, setSelectedDay] = useState<DayPart | null>(null);
  const [activeRhythm, setActiveRhythm] = useState<RhythmPart | null>(null);
  const activeAmbience = activeRhythm ?? activeDay;

  function handleDayClick(part: (typeof dayParts)[number]) {
    if (selectedDay === part.id) {
      router.push(part.href);
      return;
    }

    setActiveDay(part.id);
    setActiveRhythm(null);
    setSelectedDay(part.id);
  }

  return (
    <main className={`elite-home-surface ambience-${activeAmbience} home-noise relative overflow-hidden bg-[#040706] text-stone-50`}>
      <NutrientWebGL ambient className="fixed inset-0 z-0 pointer-events-none" />
      <div className="ambience-layer pointer-events-none fixed inset-0 z-[1]" />
      <div className="home-top-fade pointer-events-none fixed inset-x-0 top-0 z-[1] h-48 bg-gradient-to-b from-black via-black/78 to-transparent" />
      <div className="home-bottom-fade pointer-events-none fixed inset-x-0 bottom-0 z-[1] h-56 bg-gradient-to-t from-[#040706] via-[#040706]/82 to-transparent" />

      <section className="relative z-10 min-h-[calc(100vh-57px)] overflow-hidden">
        <div className="relative mx-auto flex min-h-[calc(100vh-57px)] max-w-7xl items-center px-4 pb-12 pt-12 sm:px-6 lg:pt-16">
          <div className="max-w-4xl text-stone-50">
            <Badge className="mb-8 border-white/12 bg-white/[0.06] px-3 py-1.5 text-[11px] uppercase tracking-[0.34em] text-emerald-50/78 backdrop-blur-md">
              Personal science cookbook
            </Badge>
            <h1 aria-label="Rituals" className="ritual-title">
              Rituals
            </h1>
            <div className="rustic-rule mt-8 h-px w-72" />
            <p className="home-copy mt-8 max-w-2xl text-balance">
              A quiet archive of food, light, timing, and evidence. Inspired by Ayurvedic
              principles, refined through personal experience, and centered around the practices
              and observations that support well-being.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-12 sm:px-6 lg:py-16">
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <Badge className="mb-6 border-white/12 bg-white/[0.06] px-3 py-1.5 text-[11px] uppercase tracking-[0.34em] text-emerald-50/78 backdrop-blur-md">
              Day rhythm
            </Badge>
            <h2 className="section-heading">Four lights of the day.</h2>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dayParts.map((part) => (
              <button
                aria-label={`${part.title}. Select once to change ambience, select again to open ${part.title} ritual.`}
                className={`day-part ${activeDay === part.id ? "day-part--active" : ""}`}
                key={part.id}
                onMouseEnter={() => setActiveDay(part.id)}
                onClick={() => handleDayClick(part)}
                onFocus={() => setActiveDay(part.id)}
                type="button"
              >
                <span className="day-part__title">{part.title}</span>
                <span className="day-part__mood">{part.mood}</span>
                <span className="day-part__detail">{part.detail}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-12 sm:px-6 lg:py-16">
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <Badge className="mb-6 border-white/12 bg-white/[0.06] px-3 py-1.5 text-[11px] uppercase tracking-[0.34em] text-emerald-50/78 backdrop-blur-md">
              Longer rhythms
            </Badge>
            <h2 className="section-heading">Rituals beyond the day.</h2>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {ritualTracks.map((track) => (
              <button
                className={`ritual-track ${activeRhythm === track.id ? "ritual-track--active" : ""}`}
                key={track.title}
                onClick={() => {
                  setActiveRhythm(track.id);
                  setSelectedDay(null);
                }}
                type="button"
              >
                <h3>{track.title}</h3>
                <p>{track.detail}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-12 sm:px-6 lg:py-16">
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <Badge className="mb-6 border-white/12 bg-white/[0.06] px-3 py-1.5 text-[11px] uppercase tracking-[0.34em] text-emerald-50/78 backdrop-blur-md">
              Recipe library
            </Badge>
            <h2 className="section-heading">One recipe, many places.</h2>
          </div>
          <div className="library-grid mt-8">
            {recipeCollections.map((collection) => (
              <Link className="library-card" href={collection.href} key={collection.title}>
                <h3>{collection.title}</h3>
                <p>{collection.detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-14 sm:px-6 lg:py-20">
        <div className="absolute left-[8%] top-12 h-80 w-80 rounded-full bg-emerald-200/8 blur-3xl" />
        <div className="absolute bottom-0 right-[10%] h-96 w-96 rounded-full bg-orange-400/8 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          <div className="portrait-bleed relative mx-auto w-full max-w-xl lg:mx-0">
            <Image
              alt="Portrait for the About Me section"
              className="portrait-image object-cover"
              fill
              priority
              src="/about-me.jpeg"
            />
          </div>

          <div>
            <Badge className="mb-6 border-white/12 bg-white/[0.06] px-3 py-1.5 text-[11px] uppercase tracking-[0.34em] text-emerald-50/78 backdrop-blur-md">
              Behind the Rituals
            </Badge>
            <h2 className="about-heading">
              Meticulous by nature.
              <br />
              Ritualistic by choice.
            </h2>
            <p className="home-copy mt-6 max-w-2xl">
              I notice the tiny things: the color of morning light, the order of ingredients, the
              way a drink feels before breakfast, and the difference between a claim and a personal
              observation.{" "}
              This archive brings together recipes, ingredients, and reflections gathered over more
              than a decade of practice capturing what I keep returning to, what continues to
              evolve, and what remains worth sharing. Many of these recipes are inspired by the
              Indian women in my life (and yes, a few thanks to my exes mothers), whose quiet
              wisdom shaped the way I think about food and nourishment.
            </p>
            <p className="home-copy mt-5 max-w-2xl">
              I&apos;m Swathi. If something here resonates, I hope it finds a place in your own routine.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-12 sm:px-6 lg:py-16">
        <div className="relative mx-auto max-w-7xl">
          <div className="serenity-note">
            <p>Serenity to things I cannot change</p>
            <p>Courage to change the things I can</p>
            <p>Wisdom to know the difference!</p>
          </div>
        </div>
      </section>
    </main>
  );
}
