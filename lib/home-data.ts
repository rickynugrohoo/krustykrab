import type { MenuItem } from "./menu-data";

export const highlights: MenuItem[] = [
  {
    id: "hot-mess",
    name: "Hot Mess",
    description:
      "Double smash patties drowning in beer cheese, jalapeños, and a crispy onion tangle.",
    price: "$18",
    image: "/highlights/hl-hotmess.jpg",
    category: "burgers",
  },
  {
    id: "the-big-cheese",
    name: "The Big Cheese",
    description:
      "Aged cheddar, American, and mozzarella melted over a juicy beef patty with grilled onions.",
    price: "$16",
    image: "/highlights/hl-bigcheese.jpg",
    category: "burgers",
  },
  {
    id: "bacon-avalanche",
    name: "Bacon Avalanche",
    description:
      "A mountain of hickory bacon, smoked gouda, and bourbon BBQ on a toasted brioche bun.",
    price: "$17",
    image: "/highlights/hl-baconstack.jpg",
    category: "burgers",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "What's in your burgers?",
    a: "Fresh-ground Angus beef, smashed on a flat-top for crispy edges, stacked with melty cheese, house sauce, and crunchy toppings on a toasted Martin's potato bun.",
  },
  {
    q: "Can I customize my burger?",
    a: "Always. Swap the cheese, stack extra patties, add bacon, or go sauce-heavy — tell us how you like it and we'll build it your way.",
  },
  {
    q: "Do you have vegetarian options?",
    a: "Yes — our house veggie patty, loaded sides, and build-your-own toppings keep things just as messy and just as good without the meat.",
  },
  {
    q: "Can I order for takeaway?",
    a: "Of course. Order ahead online for pickup and we'll have it boxed, sealed, and ready the moment you walk in.",
  },
  {
    q: "Do you offer delivery?",
    a: "We do. Local orders over $35 ship free, everything else is a flat $4.99, and most deliveries arrive in about 15 minutes.",
  },
];
