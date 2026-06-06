"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { recipes } from "@/data/rituals";

export function IngredientGraph({ focus }: { focus?: string }) {
  const ingredientMap = recipes.reduce<Record<string, typeof recipes>>((acc, recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      acc[ingredient.name] = acc[ingredient.name] ? [...acc[ingredient.name], recipe] : [recipe];
    });
    return acc;
  }, {});
  const entries = Object.entries(ingredientMap)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, focus ? 8 : 12);
  const active = focus ? entries.filter(([name]) => name === focus || ingredientMap[focus]) : entries;
  const center = focus && ingredientMap[focus] ? focus : entries[0]?.[0] ?? "Ingredients";
  const connectedRecipes = ingredientMap[center] ?? [];

  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-lg border bg-card p-6 shadow-line">
      <div className="absolute left-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 bg-border" />
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          className="flex h-36 w-36 items-center justify-center rounded-full bg-primary text-center text-sm font-semibold text-primary-foreground shadow-soft"
          transition={{ duration: 3, repeat: Infinity }}
        >
          {center}
        </motion.div>
      </div>
      {connectedRecipes.map((recipe, index) => {
        const angle = (index / connectedRecipes.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 150;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <motion.div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0 }}
            key={recipe.slug}
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link className="block max-w-36 rounded-lg border bg-background p-3 text-center text-xs font-semibold shadow-line hover:border-primary" href={`/recipes/${recipe.slug}`}>
              {recipe.title}
            </Link>
          </motion.div>
        );
      })}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
        {active.map(([name, list]) => (
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground" key={name}>
            {name} · {list.length}
          </span>
        ))}
      </div>
    </div>
  );
}
