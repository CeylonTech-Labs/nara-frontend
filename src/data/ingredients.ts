export const botanicalIngredients = [
  { name: "Virgin Coconut Oil", image: "virgin-coconut-oil" },
  { name: "Sesame Oil", image: "sesame-oil" },
  { name: "Almond Oil", image: "almond-oil" },
  { name: "Castor Oil", image: "castor-oil" },
  { name: "King Coconut Oil", image: "king-coconut-oil" },
  { name: "Hibiscus", image: "hibiscus" },
  { name: "Blue Water Lily", image: "blue-water-lily" },
  { name: "Fenugreek", image: "fenugreek" },
  { name: "Rosemary", image: "rosemary" },
  { name: "Black Seed", image: "black-seed" },
  { name: "Gotukola", image: "gotukola" },
  { name: "Curry Leaves", image: "curry-leaves" },
] as const;

export type BotanicalIngredient = (typeof botanicalIngredients)[number];
