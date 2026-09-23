"use client";

import { categories, type MenuItem } from "@/lib/menu-data";
import MenuCard from "./MenuCard";

interface MenuGridProps {
  items: MenuItem[];
  query: string;
}

export default function MenuGrid({ items, query }: MenuGridProps) {
  const normalized = query.trim().toLowerCase();

  const matches = (item: MenuItem) =>
    normalized === "" ||
    item.name.toLowerCase().includes(normalized) ||
    item.description.toLowerCase().includes(normalized);

  const visible = items.filter(matches);

  if (visible.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-ink/30 bg-white/50 p-16 text-center">
        <p className="font-display text-[32px] uppercase tracking-[-1px] text-ink">
          Nothing here… yet
        </p>
        <p className="mt-2 text-[15px] text-muted-2">
          No items match &ldquo;{query}&rdquo;. Try another craving.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-12">
      {categories.map((category) => {
        const categoryItems = visible.filter(
          (item) => item.category === category.id
        );
        if (categoryItems.length === 0) return null;

        return (
          <section
            key={category.id}
            id={`section-${category.id}`}
            className="flex scroll-mt-28 flex-col gap-3"
          >
            <h2 className="font-display text-[36px] uppercase tracking-[-1.5px] text-ink md:text-[48px]">
              {category.label}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {categoryItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
