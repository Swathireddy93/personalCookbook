"use client";

import Link from "next/link";
import { useState } from "react";
import type { Recipe } from "@/data/rituals";

export function RitualFlow({ recipes }: { recipes: Recipe[] }) {
  const [activeRecipe, setActiveRecipe] = useState<number | null>(null);
  const [showSimilarRecipes, setShowSimilarRecipes] = useState(false);
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
      <aside className="ritual-page-rail">
        <div className="ritual-page-list">
          {recipes.map((recipe, index) => (
            <button
              className={`ritual-page-row ${activeRecipe === index ? "ritual-page-row--active" : ""}`}
              key={recipe.slug}
              onClick={() => {
                setActiveRecipe(index);
                setShowSimilarRecipes(false);
              }}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{recipe.title}</strong>
            </button>
          ))}
        </div>

      </aside>

      {selectedRecipe ? (
        <article className="ritual-page-detail">
          <RecipeImagePlaceholder />
          <div className="ritual-page-detail__content">
            <h2>{selectedRecipe.title}</h2>
            <p>{selectedRecipe.summary}</p>

            <div className="ritual-page-grid">
              <section>
                <h3>Ingredients</h3>
                <ul>
                  {(selectedRecipe.ingredientBenefits ?? selectedRecipe.ingredients).map((ingredient) => {
                    const ayurvedic = "ayurvedic" in ingredient ? ingredient.ayurvedic : ingredient.why;
                    const scientific = "scientific" in ingredient ? ingredient.scientific : ingredient.rationale;

                    return (
                      <li key={ingredient.name}>
                        <strong>{ingredient.name}</strong>
                        <span>
                          <b>Ayurvedic</b>
                          {ayurvedic}
                        </span>
                        <span>
                          <b>Scientific</b>
                          {scientific}
                        </span>
                      </li>
                    );
                  })}
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
              {selectedRecipe.science.summary.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {selectedRecipe.similarRecipes?.length ? (
              <section className="similar-recipes">
                <button
                  aria-expanded={showSimilarRecipes}
                  className="similar-recipes__trigger"
                  onClick={() => setShowSimilarRecipes((open) => !open)}
                  type="button"
                >
                  Open similar recipes
                </button>
                {showSimilarRecipes ? (
                  <div className="similar-recipes__grid">
                    {selectedRecipe.similarRecipes.map((recipe) => (
                      <article className="similar-recipe-card" key={recipe.title}>
                        <p>{recipe.title}</p>
                        <span>{recipe.subtitle}</span>
                        <ul>
                          {recipe.ingredients.map((ingredient) => (
                            <li key={ingredient.name}>
                              <strong>{ingredient.name}</strong>
                              <span>
                                <b>Ayurvedic</b>
                                {ingredient.ayurvedic}
                              </span>
                              <span>
                                <b>Scientific</b>
                                {ingredient.scientific}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                ) : null}
              </section>
            ) : (
              <Link className="ritual-page-link" href={`/recipes/${selectedRecipe.slug}`}>
                Open full recipe
              </Link>
            )}
          </div>
        </article>
      ) : null}
    </div>
  );
}

function RecipeImagePlaceholder() {
  return (
    <div className="recipe-image-placeholder">
      <div className="recipe-image-placeholder__mark" />
      <div>
        <p>Image coming soon</p>
        <span>Personal photo or illustration placeholder</span>
      </div>
    </div>
  );
}
