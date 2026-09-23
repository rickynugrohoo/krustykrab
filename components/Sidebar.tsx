"use client";

import { categories, type CategoryId } from "@/lib/menu-data";

type Selection = CategoryId | "all";

interface SidebarProps {
  active: Selection;
  onSelect: (id: Selection) => void;
  query: string;
  onQuery: (value: string) => void;
  counts: Record<Selection, number>;
}

function Pill({
  active,
  emoji,
  label,
  count,
  onClick,
}: {
  active: boolean;
  emoji: string;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-[12px] px-4 py-3 text-left transition-colors ${
        active ? "bg-brand-dark text-white" : "text-ink-soft hover:bg-black/5"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <span className="text-[14px]">{emoji}</span>
        <span className="text-[14px] font-bold uppercase tracking-[0.3px]">
          {label}
        </span>
      </span>
      <span
        className={`flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
          active ? "bg-black/20 text-white" : "bg-[#e7e5e4] text-[#44403c]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

export default function Sidebar({
  active,
  onSelect,
  query,
  onQuery,
  counts,
}: SidebarProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 lg:sticky lg:top-28 lg:w-[300px]">
      {/* Search box */}
      <div className="flex flex-col gap-3 rounded-[16px] border-2 border-ink-soft bg-white p-[18px] shadow-hard-sm">
        <p className="font-display text-[20px] uppercase tracking-[0.6px] text-ink-soft">
          Find Your Craving
        </p>
        <input
          type="text"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search burgers, sides, dip..."
          className="w-full rounded-[12px] border border-[#d6d3d1] bg-[#fbf6ee] px-[17px] py-3 text-[14px] font-medium text-ink-soft placeholder:text-[#a8a29e] focus:border-brand focus:outline-none"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-3 rounded-[16px] border-2 border-ink-soft bg-white p-[18px] shadow-hard-sm">
        <p className="font-display text-[20px] uppercase tracking-[0.6px] text-ink-soft">
          Categories
        </p>
        <div className="flex flex-col gap-1">
          <Pill
            active={active === "all"}
            emoji="🍔"
            label="All Menu Items"
            count={counts.all}
            onClick={() => onSelect("all")}
          />
          {categories.map((c) => (
            <Pill
              key={c.id}
              active={active === c.id}
              emoji={c.emoji}
              label={c.label}
              count={counts[c.id]}
              onClick={() => onSelect(c.id)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
