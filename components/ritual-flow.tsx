"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Clock, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/data/rituals";

export function RitualFlow({ recipes }: { recipes: Recipe[] }) {
  const [activeRecipe, setActiveRecipe] = useState<number | null>(null);
  const selectedRecipe = activeRecipe === null ? null : recipes[activeRecipe];

  if (recipes.length === 0) {
    return (
      <div className="ritual-page-empty">
        This ritual is ready for the first recipe.
      </div>
    );
  }

  return (
    <div className={`ritual-page-flow ${selectedRecipe ? "" : "ritual-page-flow--list-only"}`}>
      <div className="ritual-page-list">
        {recipes.map((recipe, index) => (
          <button
            className={`ritual-page-row ${activeRecipe === index ? "ritual-page-row--active" : ""}`}
            key={recipe.slug}
            onClick={() => setActiveRecipe(index)}
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{recipe.title}</strong>
            <small>{recipe.consumedAt}</small>
          </button>
        ))}
      </div>

      {selectedRecipe ? (
        <article className="ritual-page-detail">
          <div className="ritual-page-photo">
            <Image alt={selectedRecipe.title} className="object-cover" fill src={selectedRecipe.image} />
          </div>
          <div className="ritual-page-detail__content">
            <div className="flex flex-wrap gap-2">
              <Badge className="border-white/12 bg-white/[0.06] text-emerald-50/78">
                <Clock className="mr-1 h-3 w-3" />
                {selectedRecipe.consumedAt}
              </Badge>
              <Badge className="border-white/12 bg-white/[0.06] text-emerald-50/78">
                <Timer className="mr-1 h-3 w-3" />
                {selectedRecipe.prepTime}
              </Badge>
            </div>
            <h2>{selectedRecipe.title}</h2>
            <p>{selectedRecipe.summary}</p>

            <div className="ritual-page-grid">
              <section>
                <h3>Ingredients</h3>
                <ul>
                  {selectedRecipe.ingredients.map((ingredient) => (
                    <li key={ingredient.name}>
                      <strong>{ingredient.name}</strong>
                      <span>{ingredient.why}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Nutrients</h3>
                <ul>
                  {selectedRecipe.ingredients.map((ingredient) => (
                    <li key={ingredient.name}>
                      <strong>{ingredient.name}</strong>
                      <span>{ingredient.nutrition}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="ritual-page-science">
              <h3>Why this belongs here</h3>
              <p>{selectedRecipe.science.summary}</p>
            </div>

            <Link className="ritual-page-link" href={`/recipes/${selectedRecipe.slug}`}>
              Open full recipe
            </Link>
          </div>
        </article>
      ) : null}
    </div>
  );
}
