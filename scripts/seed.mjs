// One-time seed: loads the 16 existing menu items into Supabase.
// Run with:  node --env-file=.env.local scripts/seed.mjs
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

const items = [
  // Burgers
  { name: "The OG", description: "Juicy beef patty, melted American cheese, lettuce, tomato, pickles, onion, and house sauce on a golden sesame bun.", price: 12, category: "burgers", image_url: "/menu/burger-og.jpg" },
  { name: "Double Trouble", description: "Two smashed beef patties, double cheddar, caramelized onions, and smoky bacon jam stacked sky high.", price: 16, category: "burgers", image_url: "/menu/burger-double.jpg" },
  { name: "Smoky Baron", description: "Flame-grilled patty, hickory bacon, crispy fried onions, and bourbon BBQ glaze on a toasted brioche bun.", price: 15, category: "burgers", image_url: "/menu/burger-smoky.jpg" },
  { name: "Crispy Chick", description: "Buttermilk-fried chicken thigh, spicy slaw, dill pickles, and honey-sriracha mayo on a soft bun.", price: 14, category: "burgers", image_url: "/menu/burger-crispy.jpg" },
  // Drinks
  { name: "Krusty Cola", description: "Ice-cold classic cola served over crushed ice with a fresh wedge of lime.", price: 4, category: "drinks", image_url: "/menu/drink-cola.jpg" },
  { name: "Thick Shake", description: "Hand-spun vanilla malt milkshake topped with whipped cream and a cherry.", price: 7, category: "drinks", image_url: "/menu/drink-shake.jpg" },
  { name: "Fresh Lemonade", description: "House-pressed lemonade with muddled mint and just a hint of raw honey.", price: 5, category: "drinks", image_url: "/menu/drink-lemonade.jpg" },
  { name: "Iced Coffee", description: "Slow cold-brew coffee poured over ice with a smooth splash of sweet cream.", price: 5, category: "drinks", image_url: "/menu/drink-coffee.jpg" },
  // Sides
  { name: "Golden Fries", description: "Crispy skin-on fries tossed in sea salt, served with our signature house dip.", price: 5, category: "sides", image_url: "/menu/side-fries.jpg" },
  { name: "Onion Rings", description: "Beer-battered sweet onion rings fried golden, thick-cut and extra crunchy.", price: 6, category: "sides", image_url: "/menu/side-onionrings.jpg" },
  { name: "Garden Salad", description: "Crisp mixed greens, cherry tomatoes, and cucumber tossed in a tangy house vinaigrette.", price: 6, category: "sides", image_url: "/menu/side-slaw.jpg" },
  { name: "Chicken Nuggets", description: "Eight all-white-meat nuggets, crispy outside and juicy inside, with a dip of choice.", price: 7, category: "sides", image_url: "/menu/side-nuggets.jpg" },
  // Extras
  { name: "Dip Trio", description: "Three house-made sauces: garlic aioli, smoky chipotle, and sweet honey mustard.", price: 3, category: "extras", image_url: "/menu/extra-sauce.jpg" },
  { name: "Loaded Nachos", description: "Warm tortilla chips smothered in melted cheddar, jalapeños, and a drizzle of crema.", price: 8, category: "extras", image_url: "/menu/extra-cheese.jpg" },
  { name: "Fudge Brownie", description: "Warm double-chocolate brownie with a gooey molten center and sea-salt flakes.", price: 6, category: "extras", image_url: "/menu/extra-brownie.jpg" },
  { name: "Soft Serve", description: "Swirled vanilla soft serve piled high in a crunchy, freshly-pressed waffle cone.", price: 5, category: "extras", image_url: "/menu/extra-icecream.jpg" },
].map((item, index) => ({ ...item, sort_order: index }));

async function main() {
  // Clear existing rows so the seed is safe to re-run.
  const { error: delErr } = await supabase
    .from("menu_items")
    .delete()
    .not("id", "is", null);
  if (delErr) {
    console.error("Delete failed:", delErr.message);
    process.exit(1);
  }

  const { data, error } = await supabase.from("menu_items").insert(items).select();
  if (error) {
    console.error("Insert failed:", error.message);
    process.exit(1);
  }
  console.log(`Seeded ${data.length} menu items.`);
}

main();
