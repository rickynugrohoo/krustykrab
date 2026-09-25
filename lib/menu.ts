import { createClient } from "@supabase/supabase-js";
import {
  menuItems as fallbackItems,
  type CategoryId,
  type MenuItem,
} from "./menu-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

interface MenuRow {
  id: string;
  name: string;
  description: string | null;
  price: number | string | null;
  category: CategoryId;
  image_url: string | null;
  sort_order: number | null;
}

function formatPrice(value: number | string | null): string {
  const n = Number(value ?? 0);
  return `$${Number.isInteger(n) ? n.toString() : n.toFixed(2)}`;
}

function rowToItem(row: MenuRow): MenuItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    price: formatPrice(row.price),
    image: row.image_url ?? "",
    category: row.category,
  };
}

/**
 * Fetches menu items from Supabase (public read).
 * Falls back to the bundled static list if Supabase is unavailable or empty,
 * so the site always renders.
 */
export async function getMenuItems(): Promise<MenuItem[]> {
  if (!url || !anonKey) return fallbackItems;

  try {
    const supabase = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return fallbackItems;
    return (data as MenuRow[]).map(rowToItem);
  } catch {
    return fallbackItems;
  }
}
