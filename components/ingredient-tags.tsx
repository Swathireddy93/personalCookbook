"use client";

import { motion } from "framer-motion";
import type { Ingredient } from "@/data/rituals";

export function IngredientTags({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {ingredients.map((ingredient, index) => (
        <motion.div
          animate={{ y: [0, -4, 0] }}
          className="group relative"
          initial={{ opacity: 0, y: 10 }}
          key={ingredient.name}
          transition={{ delay: index * 0.05, duration: 0.45 }}
          whileHover={{ scale: 1.04 }}
        >
          <button className="rounded-full border bg-card px-4 py-2 text-sm font-semibold shadow-line transition group-hover:border-primary group-hover:text-primary">
            {ingredient.name}
          </button>
          <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-72 -translate-x-1/2 rounded-lg border bg-card p-4 text-left opacity-0 shadow-soft transition group-hover:opacity-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Nutrition</p>
            <p className="mt-1 text-sm text-muted-foreground">{ingredient.nutrition}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">Why included</p>
            <p className="mt-1 text-sm text-muted-foreground">{ingredient.why}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">Rationale</p>
            <p className="mt-1 text-sm text-muted-foreground">{ingredient.rationale}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
