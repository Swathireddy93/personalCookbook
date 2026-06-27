"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Recipe } from "@/data/rituals";

export function RitualFlow({ recipes }: { recipes: Recipe[] }) {
  const isMorningRitual = recipes[0]?.ritual === "morning";
  const detailRef = useRef<HTMLElement>(null);
  const [activeRecipe, setActiveRecipe] = useState<number | null>(isMorningRitual ? 0 : null);
  const [showSimilarRecipes, setShowSimilarRecipes] = useState(false);
  const selectedRecipe = activeRecipe === null ? null : recipes[activeRecipe];
  const showRecipeImage = selectedRecipe?.ritual === "morning" && selectedRecipe.image.startsWith("/");
  const papayaSproutsIndex = recipes.findIndex((recipe) => recipe.slug === "papaya-sprouts");

  function showRecipe(index: number) {
    setActiveRecipe(index);
    setShowSimilarRecipes(false);
    window.setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  useEffect(() => {
    if (!isMorningRitual || !detailRef.current) return;

    const scrollTimer = window.setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1650);

    return () => window.clearTimeout(scrollTimer);
  }, [isMorningRitual]);

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
                showRecipe(index);
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
        <article className="ritual-page-detail" ref={detailRef}>
          {showRecipeImage ? (
            <figure className="ritual-recipe-hero">
              <Image
                alt={`${selectedRecipe.title} cinematic morning ritual image`}
                fill
                priority={selectedRecipe.order === 1}
                sizes="(max-width: 767px) 92vw, (max-width: 1279px) 58vw, 780px"
                src={selectedRecipe.image}
              />
            </figure>
          ) : null}
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

            {selectedRecipe.prep.length ? (
              <div className="ritual-page-prep">
                <h3>Method</h3>
                <ol>
                  {selectedRecipe.prep.map((step) => (
                    <li key={step.title}>
                      <strong>{step.title}</strong>
                      <span>{step.body}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {selectedRecipe.notes ? (
              <div className="ritual-page-notes">
                <h3>Why I Return to It</h3>
                <p>{selectedRecipe.notes}</p>
              </div>
            ) : null}

            {selectedRecipe.similarRecipes?.length ? (
              <section className="similar-recipes">
                <button
                  aria-expanded={showSimilarRecipes}
                  className="similar-recipes__trigger"
                  onClick={() => setShowSimilarRecipes((open) => !open)}
                  type="button"
                >
                  Experience similar warm water rituals
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
            ) : selectedRecipe.slug === "berries-dark-chocolate" && papayaSproutsIndex >= 0 ? (
              <button className="ritual-page-link ritual-page-link--button" onClick={() => showRecipe(papayaSproutsIndex)} type="button">
                Continue to Papaya & Sprouts
              </button>
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
