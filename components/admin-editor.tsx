"use client";

import { Plus, Save, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import type { Recipe } from "@/data/rituals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AdminEditor({ initialRecipes }: { initialRecipes: Recipe[] }) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [activeSlug, setActiveSlug] = useState(initialRecipes[0]?.slug ?? "");
  const active = useMemo(() => recipes.find((recipe) => recipe.slug === activeSlug), [activeSlug, recipes]);

  function updateField(field: keyof Recipe, value: string) {
    setRecipes((current) =>
      current.map((recipe) => (recipe.slug === activeSlug ? { ...recipe, [field]: value } : recipe))
    );
  }

  function addDraft() {
    const draft: Recipe = {
      ...recipes[0],
      slug: `new-recipe-${recipes.length + 1}`,
      title: "New Ritual Recipe",
      order: recipes.filter((recipe) => recipe.ritual === "morning").length + 1,
      summary: "Draft summary",
      notes: "Personal observation goes here."
    };
    setRecipes((current) => [...current, draft]);
    setActiveSlug(draft.slug);
  }

  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[320px_1fr]">
      <div className="rounded-lg border bg-card p-4 shadow-line">
        <Button className="w-full" onClick={addDraft}>
          <Plus className="h-4 w-4" />
          Add recipe
        </Button>
        <div className="mt-4 space-y-2">
          {[...recipes]
            .sort((a, b) => a.ritual.localeCompare(b.ritual) || a.order - b.order)
            .map((recipe) => (
              <button
                className={`w-full rounded-md border p-3 text-left text-sm transition ${
                  recipe.slug === activeSlug ? "border-primary bg-primary/10" : "bg-background hover:bg-muted"
                }`}
                key={recipe.slug}
                onClick={() => setActiveSlug(recipe.slug)}
              >
                <p className="font-semibold">{recipe.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{recipe.ritual} · step {recipe.order}</p>
              </button>
            ))}
        </div>
      </div>
      <div className="rounded-lg border bg-card p-5 shadow-line">
        {active ? (
          <div className="grid gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">{active.title}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge className="bg-muted">{active.ritual}</Badge>
                  <Badge className="bg-accent">{active.science.strength} evidence</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Upload className="h-4 w-4" />
                  Image
                </Button>
                <Button>
                  <Save className="h-4 w-4" />
                  Save JSON
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Title
                <input className="h-11 rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-ring" value={active.title} onChange={(event) => updateField("title", event.target.value)} />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Image URL
                <input className="h-11 rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-ring" value={active.image} onChange={(event) => updateField("image", event.target.value)} />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium">
              Summary
              <textarea className="min-h-28 rounded-md border bg-background p-3 outline-none focus:ring-2 focus:ring-ring" value={active.summary} onChange={(event) => updateField("summary", event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Personal notes
              <textarea className="min-h-32 rounded-md border bg-background p-3 font-serif text-lg outline-none focus:ring-2 focus:ring-ring" value={active.notes} onChange={(event) => updateField("notes", event.target.value)} />
            </label>
            <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
              Uploads and persistence are mocked in this pilot. The UI is ready for a server action or API route that writes to local JSON, then later to a database or CMS.
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
