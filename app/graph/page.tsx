import { IngredientGraph } from "@/components/ingredient-graph";

export default function GraphPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Ingredient Network</p>
      <h1 className="mt-2 text-5xl font-semibold">Recipe Relationship Graph</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Ingredients become discovery points. Shared ingredients connect recipes so visitors can move through the cookbook by function, flavor, or nutritional pattern.
      </p>
      <div className="mt-8">
        <IngredientGraph />
      </div>
    </main>
  );
}
