export type CategoryId = "burgers" | "drinks" | "sides" | "extras";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: CategoryId;
}

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
}

export const categories: Category[] = [
  { id: "burgers", label: "Burgers", emoji: "🥩" },
  { id: "drinks", label: "Drinks", emoji: "🥤" },
  { id: "sides", label: "Sides", emoji: "🍟" },
  { id: "extras", label: "Extras", emoji: "🍯" },
];

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: "the-og",
    name: "The OG",
    description:
      "Juicy beef patty, melted American cheese, lettuce, tomato, pickles, onion, and house sauce on a golden sesame bun.",
    price: "$12",
    image: "/menu/burger-og.jpg",
    category: "burgers",
  },
  {
    id: "double-trouble",
    name: "Double Trouble",
    description:
      "Two smashed beef patties, double cheddar, caramelized onions, and smoky bacon jam stacked sky high.",
    price: "$16",
    image: "/menu/burger-double.jpg",
    category: "burgers",
  },
  {
    id: "smoky-baron",
    name: "Smoky Baron",
    description:
      "Flame-grilled patty, hickory bacon, crispy fried onions, and bourbon BBQ glaze on a toasted brioche bun.",
    price: "$15",
    image: "/menu/burger-smoky.jpg",
    category: "burgers",
  },
  {
    id: "crispy-chick",
    name: "Crispy Chick",
    description:
      "Buttermilk-fried chicken thigh, spicy slaw, dill pickles, and honey-sriracha mayo on a soft bun.",
    price: "$14",
    image: "/menu/burger-crispy.jpg",
    category: "burgers",
  },
  // Drinks
  {
    id: "krusty-cola",
    name: "Krusty Cola",
    description:
      "Ice-cold classic cola served over crushed ice with a fresh wedge of lime.",
    price: "$4",
    image: "/menu/drink-cola.jpg",
    category: "drinks",
  },
  {
    id: "thick-shake",
    name: "Thick Shake",
    description:
      "Hand-spun vanilla malt milkshake topped with whipped cream and a cherry.",
    price: "$7",
    image: "/menu/drink-shake.jpg",
    category: "drinks",
  },
  {
    id: "fresh-lemonade",
    name: "Fresh Lemonade",
    description:
      "House-pressed lemonade with muddled mint and just a hint of raw honey.",
    price: "$5",
    image: "/menu/drink-lemonade.jpg",
    category: "drinks",
  },
  {
    id: "iced-coffee",
    name: "Iced Coffee",
    description:
      "Slow cold-brew coffee poured over ice with a smooth splash of sweet cream.",
    price: "$5",
    image: "/menu/drink-coffee.jpg",
    category: "drinks",
  },
  // Sides
  {
    id: "golden-fries",
    name: "Golden Fries",
    description:
      "Crispy skin-on fries tossed in sea salt, served with our signature house dip.",
    price: "$5",
    image: "/menu/side-fries.jpg",
    category: "sides",
  },
  {
    id: "onion-rings",
    name: "Onion Rings",
    description:
      "Beer-battered sweet onion rings fried golden, thick-cut and extra crunchy.",
    price: "$6",
    image: "/menu/side-onionrings.jpg",
    category: "sides",
  },
  {
    id: "garden-salad",
    name: "Garden Salad",
    description:
      "Crisp mixed greens, cherry tomatoes, and cucumber tossed in a tangy house vinaigrette.",
    price: "$6",
    image: "/menu/side-slaw.jpg",
    category: "sides",
  },
  {
    id: "chicken-nuggets",
    name: "Chicken Nuggets",
    description:
      "Eight all-white-meat nuggets, crispy outside and juicy inside, with a dip of choice.",
    price: "$7",
    image: "/menu/side-nuggets.jpg",
    category: "sides",
  },
  // Extras
  {
    id: "dip-trio",
    name: "Dip Trio",
    description:
      "Three house-made sauces: garlic aioli, smoky chipotle, and sweet honey mustard.",
    price: "$3",
    image: "/menu/extra-sauce.jpg",
    category: "extras",
  },
  {
    id: "loaded-nachos",
    name: "Loaded Nachos",
    description:
      "Warm tortilla chips smothered in melted cheddar, jalapeños, and a drizzle of crema.",
    price: "$8",
    image: "/menu/extra-cheese.jpg",
    category: "extras",
  },
  {
    id: "fudge-brownie",
    name: "Fudge Brownie",
    description:
      "Warm double-chocolate brownie with a gooey molten center and sea-salt flakes.",
    price: "$6",
    image: "/menu/extra-brownie.jpg",
    category: "extras",
  },
  {
    id: "soft-serve",
    name: "Soft Serve",
    description:
      "Swirled vanilla soft serve piled high in a crunchy, freshly-pressed waffle cone.",
    price: "$5",
    image: "/menu/extra-icecream.jpg",
    category: "extras",
  },
];

export function itemsByCategory(id: CategoryId): MenuItem[] {
  return menuItems.filter((item) => item.category === id);
}
