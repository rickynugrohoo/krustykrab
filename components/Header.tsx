"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";

const leftLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Our Story", href: "/#story" },
  { label: "Testimonial", href: "/#testimonial" },
];

const rightLinks = [
  { label: "Reservation", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

function PillLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-brand px-5 py-3 text-[16px] uppercase text-brand transition-colors hover:bg-brand hover:text-white"
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-border bg-cream/95 backdrop-blur">
      <div className="flex items-center justify-between px-5 py-4 md:px-[60px] md:py-5">
        {/* Left nav (desktop) */}
        <nav className="hidden flex-1 items-center gap-1.5 lg:flex">
          {leftLinks.map((l) => (
            <PillLink key={l.label} {...l} />
          ))}
        </nav>

        {/* Logo -> home */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/icons/logo-icon.svg"
            alt="Krusty Krab logo"
            width={40}
            height={49}
            className="h-[42px] w-auto md:h-[56px]"
            priority
          />
          <span className="font-display text-[32px] leading-none tracking-[-1.5px] text-ink md:text-[48px] md:tracking-[-2.24px]">
            Krusty Krab
          </span>
        </Link>

        {/* Right nav (desktop) */}
        <div className="hidden flex-1 items-center justify-end gap-4 lg:flex">
          {rightLinks.map((l) => (
            <PillLink key={l.label} {...l} />
          ))}
          <Link
            href="/menu"
            className="flex items-center gap-2 rounded-full border-2 border-ink bg-brand px-5 py-2 text-[16px] font-semibold uppercase text-white shadow-hard-black transition-transform hover:-translate-y-0.5"
          >
            Sign Up
            <Image src="/icons/arrow-right.svg" alt="" width={24} height={24} />
          </Link>
          <Link
            href="/cart"
            aria-label={`Cart with ${count} items`}
            className="relative flex items-center justify-center rounded-full border-2 border-ink bg-white p-2 shadow-hard-black transition-transform hover:-translate-y-0.5"
          >
            <Image src="/icons/cart-header.svg" alt="" width={24} height={24} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/cart"
            aria-label={`Cart with ${count} items`}
            className="relative flex items-center justify-center rounded-full border-2 border-ink bg-white p-2 shadow-hard-black"
          >
            <Image src="/icons/cart-header.svg" alt="" width={22} height={22} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-1.5 rounded-full border-2 border-ink bg-white p-3 shadow-hard-black"
          >
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="flex flex-col gap-2 border-t border-pink-border px-5 py-4 lg:hidden">
          {[...leftLinks, ...rightLinks].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-full border border-brand px-5 py-3 text-center text-[15px] uppercase text-brand"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/menu"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-brand px-5 py-3 text-[15px] font-semibold uppercase text-white shadow-hard-black"
          >
            Sign Up
            <Image src="/icons/arrow-right.svg" alt="" width={22} height={22} />
          </Link>
        </nav>
      )}
    </header>
  );
}
