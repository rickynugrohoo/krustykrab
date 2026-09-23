import Image from "next/image";

const stats = [
  { value: "98%", label: "Customers Happy" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "∞", label: "Reasons to Return" },
];

export default function PromoStats() {
  return (
    <section id="story" className="relative w-full overflow-hidden bg-brand py-16 md:py-24">
      {/* Repeating burger doodle pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/icons/footer-burger.svg')] bg-[length:150px_140px] bg-repeat opacity-[0.07]"
      />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-[60px] lg:grid-cols-2 lg:gap-16">
        {/* Photo card */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-[440px] rotate-[-2deg]">
            {/* tape */}
            <span className="absolute left-1/2 top-[-14px] z-20 h-7 w-28 -translate-x-1/2 rotate-[2deg] rounded-[2px] bg-cream/70" />
            <div className="relative rounded-[18px] border-2 border-ink bg-cream p-3 shadow-hard">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[10px]">
                <Image
                  src="/menu/burger-double.jpg"
                  alt="A towering Krusty Krab burger"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover"
                />
                {/* archive label */}
                <span className="absolute bottom-3 left-3 rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-[0.4px] text-white">
                  Krusty Krab / Archive 01
                </span>
              </div>
            </div>
            {/* round sticker */}
            <div className="absolute -bottom-6 right-2 z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-ink bg-yellow text-center shadow-hard-black md:h-28 md:w-28">
              <span className="font-display text-[16px] leading-none text-ink md:text-[18px]">
                Krusty Krab
              </span>
              <span className="my-0.5 text-[14px]">🦀</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink">
                100% Beef
              </span>
            </div>
          </div>
        </div>

        {/* Text + stats */}
        <div className="text-white">
          <h2 className="font-display text-[44px] uppercase leading-[0.95] tracking-[-1px] md:text-[60px]">
            Big Flavour.
            <br />
            <span className="text-yellow">Good Burgers.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-[1.6] text-white/85 md:text-[17px]">
            There&apos;s a lot that goes into making a burger worth coming back
            for. We obsess over the little things, from the first sizzle on the
            grill to the final layer of sauce. It&apos;s a little messy, a little
            indulgent, and exactly how we think a really good burger should be.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-[16px] border border-white/25 bg-white/10 p-4 backdrop-blur-sm"
              >
                <p className="font-display text-[30px] leading-none tracking-[-0.5px] text-cream md:text-[42px]">
                  {s.value}
                </p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.3px] text-white md:text-[12px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
