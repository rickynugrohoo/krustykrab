"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart, type CartLine } from "@/components/CartContext";

const money = (n: number) => `$${n.toFixed(2)}`;

/* ---------- Empty state ---------- */
function EmptyCart() {
  return (
    <section className="flex flex-col items-center px-5 py-16 text-center md:py-24">
      <div className="relative h-[280px] w-[280px] md:h-[420px] md:w-[420px]">
        <Image
          src="/illustrations/empty-cart.png"
          alt="A lonely burger sitting in an empty shopping cart"
          fill
          sizes="420px"
          className="object-contain"
          priority
        />
      </div>
      <h1 className="mt-6 max-w-xl font-display text-[32px] uppercase leading-[1.05] tracking-[-1px] text-ink md:text-[44px]">
        Your Cart is a Little Too Empty.
      </h1>
      <Link
        href="/menu"
        className="mt-7 flex items-center gap-2 rounded-full border-2 border-ink bg-brand px-7 py-3.5 text-[15px] font-semibold uppercase text-white shadow-hard-black transition-transform hover:-translate-y-0.5"
      >
        Start Ordering
        <Image src="/icons/arrow-right.svg" alt="" width={22} height={22} />
      </Link>
    </section>
  );
}

/* ---------- Stepper ---------- */
function Stepper({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (q: number) => void;
}) {
  return (
    <div className="flex items-center overflow-hidden rounded-full border-2 border-ink">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(qty - 1)}
        className="flex h-9 w-9 items-center justify-center text-[18px] font-bold text-ink transition-colors hover:bg-ink hover:text-white"
      >
        −
      </button>
      <span className="min-w-8 text-center text-[15px] font-bold text-ink">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className="flex h-9 w-9 items-center justify-center text-[18px] font-bold text-ink transition-colors hover:bg-ink hover:text-white"
      >
        +
      </button>
    </div>
  );
}

/* ---------- Order item ---------- */
function OrderItem({
  line,
  onQty,
  onRemove,
}: {
  line: CartLine;
  onQty: (q: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-[16px] border border-ink/15 bg-white p-4">
      <div className="flex gap-4">
        <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[12px] border-2 border-ink">
          <Image
            src={line.image}
            alt={line.name}
            fill
            sizes="88px"
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[17px] font-extrabold uppercase tracking-[-0.3px] text-ink">
                {line.name}
              </h3>
              {line.subtitle && (
                <p className="text-[13px] font-semibold text-ink/70">
                  {line.subtitle}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-[16px] font-extrabold text-ink">
                {money(line.unitPrice * line.qty)}
              </p>
              {line.qty > 1 && (
                <p className="text-[11px] text-muted-2">
                  ({money(line.unitPrice)} ea)
                </p>
              )}
            </div>
          </div>
          {line.detail && (
            <p className="mt-1 flex items-start gap-1.5 text-[12px] leading-snug text-muted-2">
              <span className="mt-0.5 text-brand">✓</span>
              {line.detail}
            </p>
          )}
          {line.mods && line.mods.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {line.mods.map((m) => (
                <span
                  key={m}
                  className="rounded-full bg-[#dcf5e3] px-2.5 py-0.5 text-[11px] font-semibold text-[#1f7a43]"
                >
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <Stepper qty={line.qty} onChange={onQty} />
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-muted-2 transition-colors hover:text-brand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
}

/* ---------- Order summary ---------- */
function OrderSummary({ subtotal, count }: { subtotal: number; count: number }) {
  const [tab, setTab] = useState<"delivery" | "pickup">("delivery");
  const packaging = 1.5;
  const tax = subtotal * 0.088;
  const promo = subtotal * 0.1;
  const total = subtotal + packaging + tax - promo;

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-28">
      <div className="rounded-[20px] border-2 border-ink bg-white p-5 shadow-hard md:p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[24px] uppercase tracking-[-0.5px] text-ink">
            Order Summary
          </h2>
          <span className="text-[11px] font-bold tracking-[0.4px] text-ink/60">
            ORDER #KK-84920
          </span>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex rounded-full border border-ink/15 bg-cream p-1">
          {(["delivery", "pickup"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 rounded-full py-2 text-[13px] font-bold uppercase tracking-[0.3px] transition-colors ${
                tab === t ? "bg-ink text-white" : "text-ink/60"
              }`}
            >
              {t === "delivery" ? "Delivery (25m)" : "Pickup (15m)"}
            </button>
          ))}
        </div>

        {/* Free delivery banner */}
        <div className="mt-4 flex flex-col gap-0.5 rounded-[12px] bg-[#dcf5e3] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[13px] font-bold text-[#1f7a43]">
            You unlocked Free Delivery!
          </span>
          <span className="text-[12px] text-[#1f7a43]/80">
            Local orders over $35 ship at $0.00.
          </span>
        </div>

        {/* Rows */}
        <dl className="mt-4 space-y-2.5 text-[14px]">
          <div className="flex justify-between">
            <dt className="text-muted-2">Tray Subtotal ({count} items)</dt>
            <dd className="font-semibold text-ink">{money(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="flex items-center gap-2 text-muted-2">
              Delivery Fee
              <span className="rounded bg-[#dcf5e3] px-1.5 py-0.5 text-[10px] font-bold text-[#1f7a43]">
                FREE
              </span>
            </dt>
            <dd className="font-semibold text-ink">
              <span className="mr-1 text-muted-2 line-through">$4.99</span>$0.00
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-2">Packaging &amp; Heat Seal Box</dt>
            <dd className="font-semibold text-ink">{money(packaging)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-2">Estimated Sales Tax</dt>
            <dd className="font-semibold text-ink">{money(tax)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="flex items-center gap-2 text-muted-2">
              <span className="rounded bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">
                PROMO
              </span>
              SIZZLE30 (-10%)
            </dt>
            <dd className="font-semibold text-brand">-{money(promo)}</dd>
          </div>
        </dl>

        {/* Promo input */}
        <div className="mt-4 flex items-center gap-2">
          <input
            defaultValue="SIZZLE30"
            className="flex-1 rounded-[10px] border border-ink/20 bg-cream px-3 py-2.5 text-[13px] font-semibold uppercase tracking-[0.3px] text-ink focus:border-brand focus:outline-none"
          />
          <button
            type="button"
            className="rounded-[10px] bg-ink px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.3px] text-white"
          >
            Applied
          </button>
        </div>

        {/* Dashed divider */}
        <div className="my-4 border-t-2 border-dashed border-ink/20" />

        {/* Total */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.3px] text-ink">
              Total Amount
            </p>
            <p className="text-[11px] text-muted-2">Includes all local taxes</p>
          </div>
          <p className="font-display text-[36px] leading-none tracking-[-1px] text-brand">
            {money(total)}
          </p>
        </div>

        {/* Order now */}
        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-brand py-4 text-[15px] font-bold uppercase tracking-[0.3px] text-white shadow-hard-black transition-transform hover:-translate-y-0.5"
        >
          Order Now
          <Image src="/icons/arrow-right.svg" alt="" width={22} height={22} />
        </button>

        {/* Deliver to */}
        <div className="mt-4 flex items-center justify-between rounded-[12px] border border-ink/15 bg-cream px-4 py-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3px] text-ink/60">
              Deliver to
            </p>
            <p className="text-[13px] font-semibold text-ink">
              831 Bikini Bottom Way, Apt 4B
            </p>
          </div>
          <button type="button" className="text-[13px] font-semibold text-brand">
            Edit
          </button>
        </div>

        {/* Safe checkout */}
        <div className="mt-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink/50">
            Guaranteed Safe &amp; Fresh Checkout
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {["Pay", "G Pay", "VISA", "MC", "Cash"].map((p) => (
              <span
                key={p}
                className="rounded border border-ink/20 bg-cream px-2 py-1 text-[10px] font-bold text-ink/70"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modify card */}
      <div className="flex items-center justify-between rounded-[16px] border-2 border-ink bg-yellow px-4 py-3 shadow-hard-black">
        <p className="text-[13px] font-semibold text-ink">
          Need to modify a custom burger?
        </p>
        <a href="tel:+12135550824" className="text-[13px] font-bold text-brand underline">
          Call the Kitchen
        </a>
      </div>
    </div>
  );
}

/* ---------- Main view ---------- */
export default function CartView() {
  const { items, count, subtotal, setQty, remove, clear } = useCart();
  const [utensils, setUtensils] = useState(true);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="px-5 py-10 md:px-[60px] md:py-14">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Left: order items */}
        <div className="rounded-[24px] border-2 border-ink bg-white p-5 shadow-hard md:p-7">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-[26px] uppercase tracking-[-0.5px] text-ink md:text-[30px]">
              Order Items ({count})
            </h1>
            <button
              type="button"
              onClick={clear}
              className="text-[13px] font-semibold text-brand underline"
            >
              Clear Tray
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            {items.map((line) => (
              <OrderItem
                key={line.id}
                line={line}
                onQty={(q) => setQty(line.id, q)}
                onRemove={() => remove(line.id)}
              />
            ))}
          </div>

          {/* Kitchen notes */}
          <div className="mt-6">
            <label className="flex items-center justify-between text-[13px] font-bold uppercase tracking-[0.3px] text-ink">
              <span className="flex items-center gap-2">✎ Kitchen Notes &amp; Allergy Info</span>
              <span className="text-[11px] font-medium normal-case text-muted-2">
                Optional
              </span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. sauce on the side, extra paper napkins, allergy to sesame seeds..."
              className="mt-2 w-full resize-none rounded-[12px] border border-ink/20 bg-cream px-4 py-3 text-[14px] text-ink placeholder:text-[#a8a29e] focus:border-brand focus:outline-none"
            />
          </div>

          {/* Utensils toggle */}
          <div className="mt-4 flex items-center justify-between rounded-[12px] border border-ink/15 bg-cream px-4 py-3">
            <div>
              <p className="text-[14px] font-bold text-ink">
                Include wooden utensils &amp; napkins?
              </p>
              <p className="text-[12px] text-muted-2">
                Help Krusty Krab reduce single-use landfill waste.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={utensils}
              onClick={() => setUtensils((v) => !v)}
              className={`relative h-7 w-12 shrink-0 rounded-full border-2 border-ink transition-colors ${
                utensils ? "bg-brand" : "bg-white"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                  utensils ? "left-[22px]" : "left-0.5"
                } ${utensils ? "border-0" : "border border-ink"}`}
              />
            </button>
          </div>
        </div>

        {/* Right: order summary */}
        <OrderSummary subtotal={subtotal} count={count} />
      </div>
    </section>
  );
}
