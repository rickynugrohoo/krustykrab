"use client";

import { useMemo, useState } from "react";
import {
  categories,
  menuItems,
  type CategoryId,
} from "@/lib/menu-data";
import Sidebar from "./Sidebar";
import MenuGrid from "./MenuGrid";

type Selection = CategoryId | "all";

export default function MenuExplorer() {
  const [active, setActive] = useState<Selection>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const base: Record<Selection, number> = {
      all: menuItems.length,
      burgers: 0,
      drinks: 0,
      sides: 0,
      extras: 0,
    };
    for (const c of categories) {
      base[c.id] = menuItems.filter((i) => i.category === c.id).length;
    }
    return base;
  }, []);

  const handleSelect = (id: Selection) => {
    setActive(id);
    if (id !== "all") {
      const el = document.getElementById(`section-${id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      document
        .getElementById("menu")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="menu" className="px-5 pb-10 md:px-[60px] md:pb-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
        <Sidebar
          active={active}
          onSelect={handleSelect}
          query={query}
          onQuery={setQuery}
          counts={counts}
        />
        <MenuGrid items={menuItems} query={query} />
      </div>
    </section>
  );
}
