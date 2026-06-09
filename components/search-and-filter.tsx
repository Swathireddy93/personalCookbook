"use client";

import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { filters, recipes, rituals } from "@/data/rituals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SearchAndFilter() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((recipe) => {
      const haystack = [
        recipe.title,
        recipe.summary,
        ...recipe.goals,
        ...recipe.diet,
        ...recipe.ingredients.map((ingredient) => ingredient.name),
        ...recipe.benefits.map((benefit) => benefit.label)
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesFilter =
        selected.length === 0 ||
        selected.every((item) =>
          [...recipe.goals, ...recipe.diet, recipe.ritual].map((value) => value.toLowerCase()).includes(item.toLowerCase())
        );
      return matchesQuery && matchesFilter;
    });
  }, [query, selected]);

  function toggleFilter(value: string) {
    setSelected((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-5 rounded-lg border bg-card p-4 shadow-line lg:grid-cols-[1fr_360px]">
        <div>
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-14 w-full rounded-md border bg-background pl-12 pr-4 text-base outline-none transition focus:ring-2 focus:ring-ring"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search gut health, turmeric, protein, sleep..."
              value={query}
            />
          </label>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.slice(0, 6).map((recipe) => {
              const ritual = rituals.find((item) => item.slug === recipe.ritual);
              return (
                <Link
                  className="rounded-lg border bg-background p-4 transition hover:-translate-y-0.5 hover:shadow-soft"
                  href={`/recipes/${recipe.slug}`}
                  key={recipe.slug}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{recipe.title}</p>
                    <Badge className="bg-accent">{ritual?.title.replace(" Ritual", "")}</Badge>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{recipe.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="rounded-lg bg-muted/60 p-4">
          <div className="mb-3 flex items-center gap-2 font-semibold">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </div>
          {[...filters.benefits, ...filters.diet, ...filters.time].map((filter) => (
            <Button
              className="mb-2 mr-2"
              key={filter}
              onClick={() => toggleFilter(filter === "Morning" ? "morning" : filter === "Afternoon" ? "afternoon" : filter === "Evening" ? "evening" : filter)}
              size="sm"
              variant={selected.includes(filter) || selected.includes(filter.toLowerCase()) ? "default" : "outline"}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
