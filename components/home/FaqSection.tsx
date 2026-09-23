"use client";

import Image from "next/image";
import { useState } from "react";
import { faqs } from "@/lib/home-data";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 py-16 md:px-[60px] md:py-24">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: heading + accordion */}
        <div>
          <h2 className="font-display text-[36px] uppercase leading-[0.95] tracking-[-1px] text-ink md:text-[52px]">
            We Take <span className="text-brand">Our Burgers</span> Seriously.
          </h2>
          <div className="mt-8 flex flex-col gap-3">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className="rounded-[16px] border-2 border-ink bg-white shadow-hard-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-bold text-ink md:text-[16px]">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-transform ${
                        isOpen ? "rotate-45 bg-brand text-white" : "bg-cream text-ink"
                      }`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-5 pb-5 text-[14px] leading-[1.6] text-muted-2">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: image + floating quote cards */}
        <div className="relative">
          <div className="relative h-[400px] w-full overflow-hidden rounded-[24px] border-2 border-ink shadow-hard md:h-[520px]">
            <Image
              src="/instagram/insta-1.jpg"
              alt="Guests enjoying a meal at Krusty Krab"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          {/* Quote card top-left */}
          <div className="absolute -left-2 top-6 w-[250px] rotate-[-3deg] rounded-[24px] border-2 border-ink bg-yellow p-[22px] shadow-hard md:-left-6">
            <p className="font-display text-[22px] uppercase leading-[1.05] tracking-[-0.45px] text-ink md:text-[24px]">
              &ldquo;Life&apos;s too short for boring burgers.&rdquo;
            </p>
            <p className="mt-3 text-[12px] leading-[1.5] text-ink/70">
              — Krusty Krab Crew
            </p>
          </div>
          {/* Tagline card bottom-right */}
          <div className="absolute -right-2 bottom-6 w-[270px] rotate-[3deg] rounded-[24px] border-2 border-ink bg-brand p-[22px] text-white shadow-hard md:-right-6">
            <p className="font-display text-[22px] uppercase leading-[1.15] tracking-[-0.9px] md:text-[24px]">
              A Little Place.
              <br />
              A Lot of Burger.
            </p>
            <p className="mt-2 text-[12px] leading-[1.5] text-white/90">
              Built for quick bites, long conversations, and the occasional
              &ldquo;let&apos;s get another one.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
