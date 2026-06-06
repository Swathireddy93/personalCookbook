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
export type CollectionSlug = "detox-drinks" | "soups" | "quick-pick-me-ups";

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
  collections?: CollectionSlug[];
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

export const collectionDefinitions: Array<{
  slug: CollectionSlug;
  title: string;
  description: string;
}> = [
  {
    slug: "detox-drinks",
    title: "Detox Drinks",
    description: "Citrus waters, spice drinks, herbal infusions, and mineral-forward resets gathered across rituals."
  },
  {
    slug: "soups",
    title: "Soups",
    description: "Warm bowls, broths, rasams, and vegetable soups that can belong to noon, evening, or recovery days."
  },
  {
    slug: "quick-pick-me-ups",
    title: "Quick pick me ups",
    description: "Small lifts for low-energy windows: fruit, tonics, warm cups, and fast bites that do not need a full meal."
  }
];

export const recipes: Recipe[] = [
  {
    slug: "warm-lemon-mineral-water",
    title: "Warm drink to start the day",
    ritual: "morning",
    order: 1,
    consumedAt: "6:15 AM",
    prepTime: "4 minutes",
    image: "/warm-drink.jpeg",
    summary: "A gentle warm-water ritual with citrus, turmeric, honey, and black pepper before breakfast.",
    diet: ["Vegetarian", "Low Carb"],
    goals: ["Gut Health", "Energy", "Immunity"],
    collections: ["detox-drinks"],
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
    slug: "berries-dark-chocolate",
    title: "Berries & Dark Chocolate",
    ritual: "morning",
    order: 2,
    consumedAt: "7:00 AM",
    prepTime: "3 minutes",
    image: "/ragi-malt.jpeg",
    summary: "A bright second choice with berries and dark chocolate for polyphenols, texture, and a gentle lift.",
    diet: ["Vegetarian"],
    goals: ["Focus", "Energy", "Gut Health"],
    collections: ["quick-pick-me-ups"],
    ingredients: [
      {
        name: "Blackberries",
        nutrition: "Anthocyanins, fiber, vitamin C",
        why: "Adds deep color, tartness, and fiber.",
        rationale: "Dark berries are studied for anthocyanins, which are associated with vascular and cognitive health markers."
      },
      {
        name: "Raspberries",
        nutrition: "Fiber, vitamin C, ellagic acid",
        why: "Balances sweetness with acidity and adds a high-fiber fruit.",
        rationale: "Raspberries contribute soluble and insoluble fiber, supporting satiety and gut health."
      },
      {
        name: "Dark Chocolate",
        nutrition: "Cocoa flavanols, magnesium, iron",
        why: "Adds bitterness, pleasure, and a small cocoa ritual.",
        rationale: "Cocoa flavanols are studied for vascular function, though benefits depend on cocoa content and portion size."
      }
    ],
    benefits: [
      { label: "Focus", icon: "focus", detail: "A small cocoa ritual and berry acidity can feel mentally bright." },
      { label: "Gut Health", icon: "gut", detail: "Berries add fiber and polyphenols." },
      { label: "Energy", icon: "energy", detail: "Light, quick, and easy before a fuller breakfast." }
    ],
    science: {
      strength: "Moderate",
      mechanism: "Berry polyphenols and cocoa flavanols contribute antioxidant activity and may support vascular signaling.",
      summary: "Berries are consistently associated with fiber and polyphenol intake. Dark chocolate can add cocoa flavanols, but portion and sugar content matter, so this stays a small, intentional ritual.",
      takeaways: ["Use dark chocolate in a small portion.", "Keep berries whole rather than juiced.", "Treat this as a light second choice, not a full meal."]
    },
    prep: [
      { title: "Rinse berries", body: "Rinse and drain berries gently." },
      { title: "Plate", body: "Add berries to a small bowl." },
      { title: "Finish", body: "Add a small piece of dark chocolate and eat slowly." }
    ],
    notes: "This feels like a beautiful, minimal morning lift when I want something light but sensory."
  },
  {
    slug: "papaya-sprouts",
    title: "Papaya & Sprouts",
    ritual: "morning",
    order: 3,
    consumedAt: "7:30 AM",
    prepTime: "10 minutes",
    image: "/papaya-sprouts.jpeg",
    summary: "A fresh morning plate pairing papaya with sprouted mung for enzymes, fiber, and plant protein.",
    diet: ["Vegan", "High Protein"],
    goals: ["Gut Health", "Energy", "Immunity"],
    ingredients: [
      {
        name: "Papaya",
        nutrition: "Vitamin C, beta-carotene, papain, fiber",
        why: "Adds sweetness, color, and digestive lightness.",
        rationale: "Papaya contributes vitamin C and carotenoids; papain is a proteolytic enzyme often discussed in digestion contexts."
      },
      {
        name: "Sprouted Mung Beans",
        nutrition: "Plant protein, folate, fiber, minerals",
        why: "Adds crunch, protein, and a traditional sprout rhythm.",
        rationale: "Sprouting can improve digestibility and changes nutrient availability in legumes."
      },
      {
        name: "Carrot",
        nutrition: "Beta-carotene, fiber",
        why: "Adds earthiness and color to the sprouts.",
        rationale: "Carrots provide provitamin A carotenoids and support overall vegetable intake."
      },
      {
        name: "Cilantro and Lime",
        nutrition: "Vitamin C, aromatic compounds",
        why: "Makes the sprouts taste bright and fresh.",
        rationale: "Acid and herbs can improve palatability, making fiber-rich foods easier to repeat."
      }
    ],
    benefits: [
      { label: "Gut Health", icon: "gut", detail: "Fiber, sprouts, and papaya make this a digestion-centered plate." },
      { label: "Energy", icon: "energy", detail: "Light carbohydrates plus plant protein keep it fresh but grounded." },
      { label: "Immunity", icon: "immunity", detail: "Papaya and lime contribute vitamin C." }
    ],
    science: {
      strength: "Moderate",
      mechanism: "Fiber supports gut motility and microbial fermentation, while sprouted legumes add plant protein and micronutrients.",
      summary: "The strongest science-backed framing is fiber, micronutrients, and legume sprouting. Papaya enzymes are interesting, but personal tolerance and freshness matter.",
      takeaways: ["Use fresh sprouts.", "Keep seasoning simple.", "Separate digestive comfort observations from medical claims."]
    },
    prep: [
      { title: "Cut papaya", body: "Cube ripe papaya and set it aside." },
      { title: "Season sprouts", body: "Toss sprouts with grated carrot, herbs, lime, and a little salt." },
      { title: "Plate together", body: "Serve papaya and sprouts side by side." }
    ],
    notes: "This feels especially alive on mornings when I want freshness, crunch, and color."
  },
  {
    slug: "ragi-malt-dry-fruits",
    title: "Ragi Malt with Dry Fruits",
    ritual: "morning",
    order: 4,
    consumedAt: "8:00 AM",
    prepTime: "15 minutes",
    image: "/berries-dark-chocolate.jpeg",
    summary: "A warm ragi malt bowl with dry fruits for a more grounding, mineral-rich breakfast.",
    diet: ["Vegetarian", "High Protein"],
    goals: ["Energy", "Recovery", "Gut Health"],
    collections: ["quick-pick-me-ups"],
    ingredients: [
      {
        name: "Ragi",
        nutrition: "Calcium, fiber, complex carbohydrates, polyphenols",
        why: "Creates the earthy, grounding base.",
        rationale: "Finger millet is valued for mineral density and slow-digesting carbohydrates."
      },
      {
        name: "Milk or Water",
        nutrition: "Hydration, optional protein and calcium",
        why: "Turns the flour into a warm, spoonable malt.",
        rationale: "Liquid choice changes protein and calcium content while keeping the preparation gentle."
      },
      {
        name: "Walnuts and Cashews",
        nutrition: "Healthy fats, magnesium, copper",
        why: "Adds crunch, richness, and satiety.",
        rationale: "Nuts contribute unsaturated fats and minerals that can make a grain-based breakfast more sustaining."
      },
      {
        name: "Cardamom",
        nutrition: "Aromatic compounds",
        why: "Adds warmth and a familiar Indian breakfast note.",
        rationale: "Aromatics can improve satisfaction and make lower-sugar preparations feel complete."
      }
    ],
    benefits: [
      { label: "Energy", icon: "energy", detail: "Complex carbohydrates make this a more sustaining morning option." },
      { label: "Recovery", icon: "rhythm", detail: "Minerals and nuts make it useful after active mornings." },
      { label: "Gut Health", icon: "gut", detail: "Ragi fiber supports a grounded breakfast structure." }
    ],
    science: {
      strength: "Strong",
      mechanism: "Fiber and complex carbohydrates slow digestion, while nuts add fats that support satiety.",
      summary: "Whole grains and millets can support fiber and mineral intake. Ragi is especially known for calcium content, though preparation and portion size shape the full nutritional impact.",
      takeaways: ["Cook thoroughly to avoid lumps.", "Use nuts for satiety.", "Sweeten lightly if needed."]
    },
    prep: [
      { title: "Make a slurry", body: "Whisk ragi flour with a little cool water until smooth." },
      { title: "Cook", body: "Add to warm milk or water and stir until thick and glossy." },
      { title: "Finish", body: "Top with dry fruits, nuts, and cardamom." }
    ],
    notes: "This is the option I imagine for mornings that need warmth, patience, and something more rooted."
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
    collections: ["quick-pick-me-ups"],
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
    slug: "beetroot-soup",
    title: "Beetroot Soup",
    ritual: "noon",
    order: 2,
    consumedAt: "12:30 PM",
    prepTime: "25 minutes",
    image: "/beetroot-soup.jpeg",
    summary: "A vivid noon soup with beetroot, warming aromatics, and a savory base for a grounded midday reset.",
    diet: ["Vegetarian"],
    goals: ["Energy", "Recovery", "Gut Health"],
    collections: ["soups"],
    ingredients: [
      {
        name: "Beetroot",
        nutrition: "Dietary nitrates, betalains, folate, fiber",
        why: "Creates the deep red base and mineral-rich sweetness.",
        rationale: "Beets are studied for nitrate-related blood flow support and betalain antioxidant activity."
      },
      {
        name: "Garlic",
        nutrition: "Organosulfur compounds",
        why: "Adds savory depth and a familiar soup foundation.",
        rationale: "Garlic compounds are studied for cardiometabolic and immune-related pathways."
      },
      {
        name: "Black Pepper",
        nutrition: "Piperine",
        why: "Adds gentle heat and lifts the earthiness of beetroot.",
        rationale: "Pepper improves flavor and can support the perception of warmth in vegetable soups."
      },
      {
        name: "Whole Grain Toast",
        nutrition: "Complex carbohydrates, fiber",
        why: "Makes the soup feel complete when needed.",
        rationale: "Pairing soup with a fiber-containing carbohydrate can make it more sustaining."
      }
    ],
    benefits: [
      { label: "Energy", icon: "energy", detail: "Beet nitrates are studied for blood flow and exercise-related performance markers." },
      { label: "Recovery", icon: "rhythm", detail: "A warm vegetable soup can be a gentle midday reset." },
      { label: "Gut Health", icon: "gut", detail: "Beetroot adds fiber and plant compounds." }
    ],
    science: {
      strength: "Moderate",
      mechanism: "Beetroot nitrates can convert to nitric oxide, a molecule involved in vascular tone and blood flow.",
      summary: "Beetroot has meaningful research around dietary nitrates and vascular function. Soup-specific benefits should be framed through the ingredients, hydration, warmth, and overall dietary pattern.",
      takeaways: ["Keep it savory rather than overly sweet.", "Use whole beets when possible.", "Pair with protein or whole grain if it needs to be a meal."]
    },
    prep: [
      { title: "Cook beets", body: "Cook beetroot until tender, then blend with broth or water." },
      { title: "Season", body: "Add garlic, pepper, salt, and warming spices as desired." },
      { title: "Serve", body: "Serve warm with toast or a protein pairing if needed." }
    ],
    notes: "This is the kind of soup that brings color into the middle of the day without feeling heavy."
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
    collections: ["soups"],
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

export function getCollection(slug: string) {
  return collectionDefinitions.find((collection) => collection.slug === slug);
}

export function recipesForRitual(slug: string) {
  return recipes
    .filter((recipe) => recipe.ritual === slug)
    .sort((a, b) => a.order - b.order);
}

export function recipesForCollection(slug: string) {
  return recipes
    .filter((recipe) => recipe.collections?.includes(slug as CollectionSlug))
    .sort((a, b) => a.title.localeCompare(b.title));
}
