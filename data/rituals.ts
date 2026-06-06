import {
  Brain,
  CalendarDays,
  Droplets,
  Flame,
  Leaf,
  Moon,
  ShieldPlus,
  Sparkles,
  Sun,
  Timer,
  Zap
} from "lucide-react";

export type EvidenceStrength = "Strong" | "Moderate" | "Emerging";
export type RitualSlug = "morning" | "noon" | "evening" | "night" | "weekly" | "seasonal";

export type Ingredient = {
  name: string;
  nutrition: string;
  why: string;
  rationale: string;
};

export type Recipe = {
  slug: string;
  title: string;
  ritual: RitualSlug;
  order: number;
  consumedAt: string;
  prepTime: string;
  image: string;
  summary: string;
  diet: string[];
  goals: string[];
  ingredients: Ingredient[];
  benefits: { label: string; icon: keyof typeof benefitIcons; detail: string }[];
  science: {
    mechanism: string;
    summary: string;
    takeaways: string[];
    strength: EvidenceStrength;
  };
  prep: { title: string; body: string; image?: string }[];
  notes: string;
};

export const benefitIcons = {
  hydration: Droplets,
  inflammation: Flame,
  gut: Leaf,
  focus: Brain,
  energy: Zap,
  immunity: ShieldPlus,
  sleep: Moon,
  rhythm: Timer,
  seasonal: Sparkles
};

export const rituals = [
  {
    slug: "morning",
    title: "Morning Ritual",
    description: "Hydration, minerals, protein, and steady energy before deep work.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1600&auto=format&fit=crop",
    icon: Sun
  },
  {
    slug: "noon",
    title: "Noon Ritual",
    description: "A light reset for focus, blood sugar, and momentum.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop",
    icon: Zap
  },
  {
    slug: "evening",
    title: "Evening Ritual",
    description: "Downshift meals and drinks that support recovery and sleep.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1600&auto=format&fit=crop",
    icon: Moon
  },
  {
    slug: "night",
    title: "Night Ritual",
    description: "Low light, warm cues, and the rituals that close the kitchen.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    icon: Moon
  },
  {
    slug: "weekly",
    title: "Weekly Rituals",
    description: "Batch preps, longer recipes, and replenishing weekend anchors.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop",
    icon: CalendarDays
  },
  {
    slug: "seasonal",
    title: "Seasonal Rituals",
    description: "Rotating recipes for weather, immune support, and ingredient cycles.",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1600&auto=format&fit=crop",
    icon: Sparkles
  }
] as const;

export const recipes: Recipe[] = [
  {
    slug: "warm-lemon-mineral-water",
    title: "Warm drink to start the day",
    ritual: "morning",
    order: 1,
    consumedAt: "6:15 AM",
    prepTime: "4 minutes",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1600&auto=format&fit=crop",
    summary: "A gentle warm-water ritual with citrus, turmeric, honey, and black pepper before breakfast.",
    diet: ["Vegetarian", "Low Carb"],
    goals: ["Gut Health", "Energy", "Immunity"],
    ingredients: [
      {
        name: "Hot Water",
        nutrition: "Hydration, warmth, ritual timing",
        why: "Creates a slow first signal before breakfast.",
        rationale: "Warm fluids can be easier to sip gradually after sleep, supporting hydration consistency without a cold shock."
      },
      {
        name: "Lemon or Lime",
        nutrition: "Vitamin C, citric acid, polyphenols",
        why: "Adds brightness and supports a consistent hydration habit.",
        rationale: "Citrus compounds may support iron absorption and antioxidant status."
      },
      {
        name: "Turmeric",
        nutrition: "Curcuminoids, manganese",
        why: "Adds the earthy, anti-inflammatory spice anchor.",
        rationale: "Curcumin is studied for inflammatory signaling, though bioavailability depends on preparation."
      },
      {
        name: "Black Pepper Powder",
        nutrition: "Piperine",
        why: "A tiny pinch supports the turmeric pairing.",
        rationale: "Piperine may increase curcumin bioavailability by slowing metabolism."
      },
      {
        name: "Honey",
        nutrition: "Simple carbohydrates, phenolic compounds",
        why: "Adds mild sweetness and makes the ritual sustainable.",
        rationale: "Small doses can improve palatability without turning the drink into a large sugar load."
      }
    ],
    benefits: [
      { label: "Hydration", icon: "hydration", detail: "Starts the day with warm fluids and electrolytes." },
      { label: "Gut Support", icon: "gut", detail: "Gentle acidity can cue digestion before breakfast." },
      { label: "Immune Support", icon: "immunity", detail: "Citrus adds vitamin C and plant compounds." }
    ],
    science: {
      strength: "Moderate",
      mechanism: "Warm hydration supports morning fluid intake, while citrus and spices add polyphenols and a repeatable digestive cue.",
      summary: "The strongest evidence is for hydration behavior and ingredient-specific compounds. Ayurvedic practice often frames warm water as a gentle first input; the science-backed framing should stay focused on hydration consistency, citrus micronutrients, and the curcumin-piperine pairing.",
      takeaways: ["Use warm, not boiling, water.", "Use just a pinch of pepper.", "Keep personal digestive observations separate from medical claims."]
    },
    prep: [
      { title: "Warm water", body: "Heat filtered water until warm and comfortable to sip." },
      { title: "Add citrus", body: "Squeeze in fresh lemon or lime and stir." },
      { title: "Whisk spices", body: "Add turmeric and a tiny pinch of black pepper powder." },
      { title: "Finish", body: "Stir in honey once the drink is warm, not boiling." }
    ],
    notes: "I notice I drink more water when it is warm and slightly bright, especially before coffee."
  },
  {
    slug: "green-smoothie",
    title: "Green Smoothie",
    ritual: "morning",
    order: 2,
    consumedAt: "6:45 AM",
    prepTime: "8 minutes",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=1600&auto=format&fit=crop",
    summary: "Fiber-forward greens blended with berries, chia, and protein for a calm energy curve.",
    diet: ["Vegetarian", "High Protein"],
    goals: ["Energy", "Focus", "Gut Health"],
    ingredients: [
      {
        name: "Spinach",
        nutrition: "Folate, magnesium, vitamin K",
        why: "Adds greens without overpowering the taste.",
        rationale: "Leafy greens contribute nitrates and micronutrients that support vascular and metabolic health."
      },
      {
        name: "Blueberries",
        nutrition: "Anthocyanins, fiber, vitamin C",
        why: "Gives sweetness and polyphenol density.",
        rationale: "Berry polyphenols are studied for vascular and cognitive effects."
      },
      {
        name: "Chia",
        nutrition: "Omega-3 ALA, soluble fiber, minerals",
        why: "Thickens texture and supports satiety.",
        rationale: "Soluble fiber slows gastric emptying and feeds gut microbes."
      },
      {
        name: "Protein Powder",
        nutrition: "Essential amino acids",
        why: "Makes the smoothie a real breakfast component.",
        rationale: "Adequate protein supports satiety and muscle protein synthesis."
      }
    ],
    benefits: [
      { label: "Gut Health", icon: "gut", detail: "Fiber and polyphenols support microbial diversity." },
      { label: "Energy", icon: "energy", detail: "Protein and fiber reduce a sharp glucose swing." },
      { label: "Focus", icon: "focus", detail: "Stable breakfast structure helps deep work." }
    ],
    science: {
      strength: "Strong",
      mechanism: "Fiber, protein, and polyphenols work together to support satiety and metabolic control.",
      summary: "Protein at breakfast and higher fiber intake have strong backing for satiety and metabolic health. Berry research is promising for cognition and vascular function.",
      takeaways: ["Anchor with protein.", "Use berries before juice.", "Rotate greens to avoid monotony."]
    },
    prep: [
      { title: "Layer", body: "Add liquid first, then greens, berries, chia, and protein." },
      { title: "Blend", body: "Blend until smooth, pausing once to scrape the sides." },
      { title: "Rest", body: "Let it sit for two minutes so chia can hydrate." }
    ],
    notes: "This works best for me when it is not too sweet. I feel steadier when protein is included."
  },
  {
    slug: "turmeric-ginger-drink",
    title: "Morning Turmeric Ginger Drink",
    ritual: "morning",
    order: 3,
    consumedAt: "7:15 AM",
    prepTime: "5 minutes",
    image: "https://images.unsplash.com/photo-1604908812868-0f0fca982ad6?q=80&w=1600&auto=format&fit=crop",
    summary: "A spicy anti-inflammatory drink built around turmeric, ginger, lemon, and black pepper.",
    diet: ["Vegan", "Low Carb"],
    goals: ["Recovery", "Gut Health", "Immunity"],
    ingredients: [
      {
        name: "Turmeric",
        nutrition: "Curcuminoids, manganese",
        why: "The signature anti-inflammatory ingredient.",
        rationale: "Curcumin is studied for inflammatory pathways, though bioavailability is a known limitation."
      },
      {
        name: "Ginger",
        nutrition: "Gingerols, shogaols",
        why: "Adds heat and digestive support.",
        rationale: "Ginger compounds have evidence for nausea support and inflammatory signaling."
      },
      {
        name: "Black Pepper",
        nutrition: "Piperine",
        why: "Included to improve curcumin absorption.",
        rationale: "Piperine can increase curcumin bioavailability by slowing metabolism."
      },
      {
        name: "Lemon",
        nutrition: "Vitamin C, citric acid",
        why: "Balances bitterness and adds acidity.",
        rationale: "Acidity improves flavor and may support mineral absorption in meals."
      }
    ],
    benefits: [
      { label: "Anti-inflammatory", icon: "inflammation", detail: "Curcumin and gingerols are studied for inflammatory pathways." },
      { label: "Gut Health", icon: "gut", detail: "Ginger is commonly used for digestive comfort." },
      { label: "Recovery", icon: "energy", detail: "A low-calorie way to add functional spices." }
    ],
    science: {
      strength: "Moderate",
      mechanism: "Curcuminoids influence inflammatory signaling, while piperine may increase curcumin exposure.",
      summary: "Black pepper contains piperine, which may increase bioavailability of curcumin. Human research is encouraging but dose, formulation, and individual tolerance matter.",
      takeaways: ["Use a tiny pinch of pepper.", "Pair with a little fat when possible.", "Avoid high doses if contraindicated."]
    },
    prep: [
      { title: "Boil water", body: "Bring water to a gentle simmer." },
      { title: "Add ginger", body: "Add grated ginger and steep for three minutes." },
      { title: "Add turmeric", body: "Whisk in turmeric, lemon, and a small pinch of black pepper." },
      { title: "Sip slowly", body: "Drink warm before or alongside breakfast." }
    ],
    notes: "I've noticed improved digestion when consuming this before breakfast, especially on colder mornings."
  },
  {
    slug: "protein-breakfast-bowl",
    title: "Protein Breakfast Bowl",
    ritual: "morning",
    order: 4,
    consumedAt: "8:00 AM",
    prepTime: "12 minutes",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=1600&auto=format&fit=crop",
    summary: "Greek yogurt, seeds, berries, and nuts arranged as a high-protein breakfast bowl.",
    diet: ["Vegetarian", "High Protein"],
    goals: ["Energy", "Focus", "Recovery"],
    ingredients: [
      {
        name: "Greek Yogurt",
        nutrition: "Protein, calcium, probiotics",
        why: "Creates the protein base.",
        rationale: "High-protein breakfasts are associated with satiety and better appetite control."
      },
      {
        name: "Pumpkin Seeds",
        nutrition: "Magnesium, zinc, protein",
        why: "Adds minerals and crunch.",
        rationale: "Magnesium and zinc support metabolic and immune functions."
      },
      {
        name: "Blueberries",
        nutrition: "Anthocyanins, fiber",
        why: "Adds antioxidant-rich sweetness.",
        rationale: "Anthocyanins are studied for vascular and cognitive benefits."
      }
    ],
    benefits: [
      { label: "High Protein", icon: "energy", detail: "Supports satiety and recovery." },
      { label: "Focus", icon: "focus", detail: "A slower breakfast for a calmer work block." },
      { label: "Recovery", icon: "rhythm", detail: "Amino acids and minerals support training days." }
    ],
    science: {
      strength: "Strong",
      mechanism: "Protein intake stimulates satiety hormones and supports muscle protein synthesis.",
      summary: "Protein distribution across the day is well supported. Yogurt also adds calcium and, depending on the product, live cultures.",
      takeaways: ["Choose unsweetened yogurt.", "Add fruit for fiber.", "Adjust seeds to digestion tolerance."]
    },
    prep: [
      { title: "Spoon yogurt", body: "Add yogurt to a shallow bowl." },
      { title: "Add toppings", body: "Layer berries, seeds, nuts, and cinnamon." },
      { title: "Finish", body: "Let it warm slightly for better flavor." }
    ],
    notes: "This is the most reliable breakfast for avoiding a mid-morning crash."
  },
  {
    slug: "matcha-focus-tonic",
    title: "Matcha Focus Tonic",
    ritual: "noon",
    order: 1,
    consumedAt: "1:30 PM",
    prepTime: "6 minutes",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1600&auto=format&fit=crop",
    summary: "A lower-jitter caffeine ritual with matcha, mint, and collagen or plant protein.",
    diet: ["Vegetarian"],
    goals: ["Focus", "Energy"],
    ingredients: [
      {
        name: "Matcha",
        nutrition: "Caffeine, L-theanine, catechins",
        why: "Provides alertness with a smoother subjective feel.",
        rationale: "L-theanine may modulate attention and caffeine response."
      },
      {
        name: "Mint",
        nutrition: "Aromatic oils",
        why: "Adds a clean reset flavor.",
        rationale: "Aroma and flavor cues help mark the ritual transition."
      }
    ],
    benefits: [
      { label: "Focus", icon: "focus", detail: "Caffeine plus L-theanine supports alert attention." },
      { label: "Energy", icon: "energy", detail: "A lighter afternoon stimulant than coffee." }
    ],
    science: {
      strength: "Moderate",
      mechanism: "Caffeine increases alertness; L-theanine may improve the subjective quality of attention.",
      summary: "The caffeine and L-theanine pairing is supported by human studies, though matcha dose varies by preparation.",
      takeaways: ["Keep it before mid-afternoon.", "Avoid adding too much sweetener.", "Use it as a work transition cue."]
    },
    prep: [
      { title: "Sift matcha", body: "Sift matcha into a cup to prevent clumps." },
      { title: "Whisk", body: "Add warm water and whisk until frothy." },
      { title: "Top", body: "Add mint and milk of choice." }
    ],
    notes: "Best on writing days, especially when I need alertness without another full coffee."
  },
  {
    slug: "night-wind-down-drink",
    title: "Night Wind-Down Drink",
    ritual: "night",
    order: 1,
    consumedAt: "9:15 PM",
    prepTime: "7 minutes",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1600&auto=format&fit=crop",
    summary: "A quiet warm drink used as a low-light cue to close the day.",
    diet: ["Vegetarian"],
    goals: ["Sleep", "Recovery"],
    ingredients: [
      {
        name: "Warm Milk or Herbal Infusion",
        nutrition: "Fluid, warmth, optional protein and calcium",
        why: "Creates a gentle sensory signal before sleep.",
        rationale: "A consistent evening cue can support sleep hygiene by reducing stimulation and late snacking."
      },
      {
        name: "Cinnamon",
        nutrition: "Polyphenols",
        why: "Adds warmth without needing much sweetness.",
        rationale: "Cinnamon is studied for metabolic markers, but here it mainly supports flavor and ritual consistency."
      },
      {
        name: "Nutmeg",
        nutrition: "Aromatic compounds",
        why: "Adds a small, cozy finish.",
        rationale: "Used in tiny culinary amounts as a sensory cue; avoid high-dose use."
      }
    ],
    benefits: [
      { label: "Sleep Ritual", icon: "sleep", detail: "Signals the nervous system that the day is closing." },
      { label: "Recovery", icon: "rhythm", detail: "A calmer alternative to late snacks or scrolling." }
    ],
    science: {
      strength: "Emerging",
      mechanism: "The main mechanism is behavioral: predictable timing, low light, warmth, and reduced stimulation.",
      summary: "Warm evening drinks should be framed as routine design rather than a sedative. Sleep hygiene evidence supports consistent wind-down cues, while ingredient claims are more modest.",
      takeaways: ["Keep the room dim.", "Avoid caffeine.", "Use tiny culinary amounts of nutmeg."]
    },
    prep: [
      { title: "Warm gently", body: "Heat the milk or infusion on low." },
      { title: "Add spices", body: "Stir in cinnamon and a tiny pinch of nutmeg." },
      { title: "Sip slowly", body: "Drink away from screens when possible." }
    ],
    notes: "This is less about the drink doing magic and more about giving the day a clean closing signal."
  },
  {
    slug: "evening-golden-milk",
    title: "Evening Golden Milk",
    ritual: "evening",
    order: 1,
    consumedAt: "8:30 PM",
    prepTime: "10 minutes",
    image: "https://images.unsplash.com/photo-1577594990850-e007465baf7f?q=80&w=1600&auto=format&fit=crop",
    summary: "A calming turmeric milk with cinnamon, ginger, and a touch of fat for absorption.",
    diet: ["Vegetarian", "Low Carb"],
    goals: ["Sleep", "Recovery", "Gut Health"],
    ingredients: [
      {
        name: "Turmeric",
        nutrition: "Curcuminoids",
        why: "Connects the evening recovery ritual to anti-inflammatory spice intake.",
        rationale: "Curcumin research is strongest when bioavailability is addressed."
      },
      {
        name: "Cinnamon",
        nutrition: "Polyphenols",
        why: "Adds warmth and perceived sweetness.",
        rationale: "Cinnamon has emerging evidence around glucose handling, depending on type and dose."
      },
      {
        name: "Milk",
        nutrition: "Protein, calcium, fat depending on type",
        why: "Carries the spices and makes the ritual soothing.",
        rationale: "A small amount of fat may support absorption of fat-soluble compounds."
      }
    ],
    benefits: [
      { label: "Sleep Ritual", icon: "sleep", detail: "A repeatable sensory cue for winding down." },
      { label: "Recovery", icon: "rhythm", detail: "Warm spices and protein can fit an evening recovery routine." },
      { label: "Gut Health", icon: "gut", detail: "Gentle warmth may be easier than late snacks." }
    ],
    science: {
      strength: "Emerging",
      mechanism: "The strongest role may be behavioral: a consistent low-light evening ritual that reduces snacking and stimulation.",
      summary: "Curcumin evidence is broader than golden milk evidence specifically. The sleep benefit is mainly ritual design, temperature, and replacement of more stimulating choices.",
      takeaways: ["Keep caffeine out.", "Use low light.", "Treat this as a routine cue, not a sedative."]
    },
    prep: [
      { title: "Warm milk", body: "Heat milk of choice on low." },
      { title: "Whisk spices", body: "Add turmeric, cinnamon, ginger, and pepper." },
      { title: "Steep", body: "Let it sit for two minutes before drinking." }
    ],
    notes: "This helps me close the kitchen mentally and avoid late scrolling with snacks."
  },
  {
    slug: "weekly-recovery-smoothie",
    title: "Weekly Recovery Smoothie",
    ritual: "weekly",
    order: 1,
    consumedAt: "Post workout",
    prepTime: "9 minutes",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?q=80&w=1600&auto=format&fit=crop",
    summary: "A training-day smoothie with berries, protein, tart cherry, and electrolytes.",
    diet: ["High Protein"],
    goals: ["Recovery", "Energy"],
    ingredients: [
      {
        name: "Tart Cherry",
        nutrition: "Anthocyanins, polyphenols",
        why: "Included for recovery support.",
        rationale: "Tart cherry has human research around soreness and recovery markers."
      },
      {
        name: "Protein Powder",
        nutrition: "Essential amino acids",
        why: "Supports muscle repair after training.",
        rationale: "Protein timing is flexible, but post-workout intake is a practical anchor."
      },
      {
        name: "Blueberries",
        nutrition: "Anthocyanins, fiber",
        why: "Adds flavor and polyphenol overlap.",
        rationale: "Polyphenol-rich fruit can support overall dietary quality."
      }
    ],
    benefits: [
      { label: "Recovery", icon: "rhythm", detail: "Protein and tart cherry fit training recovery." },
      { label: "Energy", icon: "energy", detail: "Carbs plus protein replenish without a heavy meal." }
    ],
    science: {
      strength: "Moderate",
      mechanism: "Amino acids support repair; tart cherry polyphenols may influence oxidative stress after training.",
      summary: "Protein is strongly supported for training adaptation. Tart cherry has more targeted, still developing evidence for recovery outcomes.",
      takeaways: ["Use after harder sessions.", "Keep protein adequate.", "Do not overcorrect with excess sugar."]
    },
    prep: [
      { title: "Add liquid", body: "Use water, milk, or kefir depending on the day." },
      { title: "Blend", body: "Blend fruit, tart cherry, protein, and electrolytes." },
      { title: "Drink", body: "Consume within the post-training meal window that fits your schedule." }
    ],
    notes: "This is mainly for heavier lift days or long walks when appetite is low afterward."
  },
  {
    slug: "seasonal-immune-broth",
    title: "Seasonal Immune Broth",
    ritual: "seasonal",
    order: 1,
    consumedAt: "Cold evenings",
    prepTime: "18 minutes",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1600&auto=format&fit=crop",
    summary: "A mineral-rich broth with garlic, ginger, mushrooms, and herbs during colder months.",
    diet: ["Low Carb"],
    goals: ["Immunity", "Gut Health"],
    ingredients: [
      {
        name: "Garlic",
        nutrition: "Organosulfur compounds",
        why: "Adds depth and immune-season tradition.",
        rationale: "Garlic compounds have immune and cardiometabolic research, though food doses vary."
      },
      {
        name: "Ginger",
        nutrition: "Gingerols",
        why: "Adds heat and digestive comfort.",
        rationale: "Ginger is well studied for nausea and has anti-inflammatory research."
      },
      {
        name: "Mushrooms",
        nutrition: "Beta-glucans, minerals",
        why: "Adds umami and immune-relevant fibers.",
        rationale: "Mushroom beta-glucans are studied for immune modulation."
      }
    ],
    benefits: [
      { label: "Immunity", icon: "immunity", detail: "Warm broth with garlic, ginger, and mushrooms." },
      { label: "Seasonal", icon: "seasonal", detail: "Rotates in when colder weather changes appetite." },
      { label: "Gut Health", icon: "gut", detail: "A gentle way to add minerals and savory plants." }
    ],
    science: {
      strength: "Emerging",
      mechanism: "Food-based immune support is broad and indirect, centered on micronutrients, fibers, and consistent nourishment.",
      summary: "Individual ingredients have mechanistic and some clinical evidence, but a seasonal broth should be framed as supportive nutrition rather than treatment.",
      takeaways: ["Use as supportive food.", "Do not replace care when sick.", "Rotate herbs and mushrooms seasonally."]
    },
    prep: [
      { title: "Simmer", body: "Simmer broth with sliced ginger, garlic, and mushrooms." },
      { title: "Season", body: "Add herbs, salt, and a squeeze of lemon." },
      { title: "Serve", body: "Drink in a mug or serve over rice." }
    ],
    notes: "This feels especially useful when I want something savory but not heavy."
  }
];

export const filters = {
  benefits: ["Energy", "Focus", "Recovery", "Sleep", "Immunity", "Gut Health"],
  diet: ["Vegetarian", "Vegan", "High Protein", "Low Carb"],
  time: ["Morning", "Afternoon", "Evening"]
};

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getRitual(slug: string) {
  return rituals.find((ritual) => ritual.slug === slug);
}

export function recipesForRitual(slug: string) {
  return recipes
    .filter((recipe) => recipe.ritual === slug)
    .sort((a, b) => a.order - b.order);
}
