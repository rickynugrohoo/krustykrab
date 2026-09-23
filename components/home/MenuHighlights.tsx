"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categories, itemsByCategory, type CategoryId } from "@/lib/menu-data";
import MenuCard from "@/components/MenuCard";

export default function MenuHighlights() {
  const [active, setActive] = useState<CategoryId>("burgers");
  const items = itemsByCategory(active).slice(0, 3);

  return (
    <section id="highlights" className="px-5 py-16 md:px-[60px] md:py-24">
      {/* Category tabs */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-b-2 border-ink/15 pb-4">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            className={`font-display text-[28px] uppercase tracking-[-0.5px] transition-colors md:text-[36px] ${
              active === c.id
                ? "text-brand"
                : "text-ink/35 hover:text-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/menu"
          className="flex items-center gap-2 rounded-full border-2 border-ink bg-brand px-7 py-3.5 text-[15px] font-semibold uppercase text-white shadow-hard-black transition-transform hover:-translate-y-0.5"
        >
          View Full Menu
          <Image src="/icons/arrow-right.svg" alt="" width={22} height={22} />
        </Link>
      </div>
    </section>
  );
}
