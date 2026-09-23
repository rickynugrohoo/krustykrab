"use client";

import Image from "next/image";
import type { MenuItem } from "@/lib/menu-data";
import { useCart } from "./CartContext";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { add } = useCart();

  return (
    <div className="flex flex-col justify-between rounded-[32px] border-2 border-ink bg-white p-[22px] shadow-hard transition-transform duration-200 hover:-translate-y-1">
      <div>
        <div className="relative h-[224px] w-full overflow-hidden rounded-[24px] border-2 border-ink/20 bg-[#f5f5f5]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
          />
        </div>
        <div className="flex items-center justify-between pt-3">
          <h3 className="text-[24px] font-extrabold uppercase leading-8 tracking-[-0.6px] text-ink">
            {item.name}
          </h3>
        </div>
        <p className="pb-4 text-[14px] leading-[1.5] text-muted-2">
          {item.description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-line pt-4">
        <span className="text-[24px] font-extrabold tracking-[-0.64px] text-ink">
          {item.price}
        </span>
        <button
          type="button"
          onClick={() =>
            add({
              id: item.id,
              name: item.name,
              subtitle: item.category,
              detail: item.description,
              image: item.image,
              unitPrice: Number(item.price.replace(/[^0-9.]/g, "")) || 0,
            })
          }
          className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-white transition-transform hover:scale-[1.03] active:scale-95"
        >
          <Image src="/icons/cart-card.svg" alt="" width={20} height={20} />
          <span className="text-[12px] font-extrabold uppercase tracking-[0.6px]">
            Add to Cart
          </span>
        </button>
      </div>
    </div>
  );
}
