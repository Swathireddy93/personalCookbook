import Image from "next/image";
import { notFound } from "next/navigation";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Clock, FlaskConical, HeartPulse, NotebookPen, Printer, Timer } from "lucide-react";
import { IngredientGraph } from "@/components/ingredient-graph";
import { IngredientTags } from "@/components/ingredient-tags";
import { Badge } from "@/components/ui/badge";
import { benefitIcons, getRecipe, recipes } from "@/data/rituals";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

function evidenceClass(strength: string) {
  if (strength === "Strong") return "bg-emerald-100 text-emerald-900 dark:bg-emerald-400/20 dark:text-emerald-100";
  if (strength === "Moderate") return "bg-sky-100 text-sky-900 dark:bg-sky-400/20 dark:text-sky-100";
  return "bg-amber-100 text-amber-900 dark:bg-amber-400/20 dark:text-amber-100";
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  return (
    <main>
      <section className="relative min-h-[62vh] overflow-hidden">
        <Image alt={recipe.title} className="object-cover" fill priority src={recipe.image} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/58 to-transparent" />
        <div className="relative mx-auto flex min-h-[62vh] max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6">
          <div className="max-w-3xl">
            <Badge className="mb-5 bg-card/80">{recipe.ritual} ritual · step {recipe.order}</Badge>
            <h1 className="text-5xl font-semibold leading-tight sm:text-6xl">{recipe.title}</h1>
            <div className="mt-5 flex flex-wrap gap-3">
              <Badge className="bg-card/85"><Clock className="mr-1 h-3 w-3" />Consumed: {recipe.consumedAt}</Badge>
              <Badge className="bg-card/85"><Timer className="mr-1 h-3 w-3" />Preparation: {recipe.prepTime}</Badge>
              <Badge className={evidenceClass(recipe.science.strength)}>{recipe.science.strength} evidence</Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <section className="rounded-lg border bg-card p-6 shadow-line">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Ingredient Visualization</p>
            <h2 className="mt-2 text-3xl font-semibold">Hover each ingredient</h2>
            <div className="mt-6">
              <IngredientTags ingredients={recipe.ingredients} />
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-primary" />
              <h2 className="text-3xl font-semibold">Benefits</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recipe.benefits.map((benefit) => {
                const Icon = benefitIcons[benefit.icon];
                return (
                  <div className="rounded-lg border bg-card p-5 shadow-line transition hover:-translate-y-1 hover:shadow-soft" key={benefit.label}>
                    <Icon className="h-7 w-7 text-primary" />
                    <h3 className="mt-4 font-semibold">{benefit.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{benefit.detail}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border bg-card p-6 shadow-line">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                <h2 className="text-3xl font-semibold">Why I Consume This</h2>
              </div>
              <Badge className={evidenceClass(recipe.science.strength)}>{recipe.science.strength}</Badge>
            </div>
            <Accordion.Root type="single" collapsible defaultValue="science">
              <Accordion.Item value="science">
                <Accordion.Trigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-3 text-left font-semibold">
                  Mechanism and research summary <ChevronDown className="h-4 w-4" />
                </Accordion.Trigger>
                <Accordion.Content className="pt-5">
                  <p className="font-semibold">Mechanism</p>
                  <p className="mt-2 text-muted-foreground">{recipe.science.mechanism}</p>
                  <p className="mt-5 font-semibold">Research summary</p>
                  <p className="mt-2 text-muted-foreground">{recipe.science.summary}</p>
                  <div className="mt-5 grid gap-2">
                    {recipe.science.takeaways.map((takeaway) => (
                      <div className="rounded-md bg-background p-3 text-sm text-muted-foreground" key={takeaway}>{takeaway}</div>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </section>

          <section>
            <h2 className="text-3xl font-semibold">Preparation</h2>
            <div className="mt-5 grid gap-4">
              {recipe.prep.map((step, index) => (
                <div className="grid gap-4 rounded-lg border bg-card p-5 shadow-line sm:grid-cols-[64px_1fr]" key={step.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">{index + 1}</div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-2 text-muted-foreground">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border bg-card p-6 shadow-line">
            <NotebookPen className="h-6 w-6 text-primary" />
            <h2 className="mt-3 text-xl font-semibold">Personal Notes</h2>
            <p className="mt-3 font-serif text-lg leading-8 text-muted-foreground">"{recipe.notes}"</p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-line">
            <h2 className="text-xl font-semibold">Diet and goals</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[...recipe.diet, ...recipe.goals].map((item) => (
                <Badge className="bg-muted" key={item}>{item}</Badge>
              ))}
            </div>
            <button className="mt-5 inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium hover:bg-muted">
              <Printer className="h-4 w-4" />
              Print card
            </button>
          </div>
          <IngredientGraph focus={recipe.ingredients[0]?.name} />
        </aside>
      </section>
    </main>
  );
}
