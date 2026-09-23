export default function QuoteSection() {
  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-[60px] md:py-28">
      {/* Faint doodles */}
      <span className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 text-[80px] opacity-10 md:text-[110px]">
        🥬
      </span>
      <span className="pointer-events-none absolute bottom-6 left-6 text-[70px] opacity-10 md:text-[100px]">
        🍔
      </span>
      <span className="pointer-events-none absolute bottom-6 right-8 text-[70px] opacity-10 md:text-[100px]">
        🧀
      </span>

      {/* Sticker badges */}
      <span className="absolute left-[16%] top-[14%] z-20 rotate-[-6deg] rounded-[10px] border-2 border-ink bg-yellow px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.5px] text-ink shadow-hard-black md:px-4 md:text-[14px]">
        Worth the Mess
      </span>
      <span className="absolute right-[9%] top-[9%] z-20 rotate-[5deg] rounded-[10px] border-2 border-ink bg-yellow px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.5px] text-ink shadow-hard-black md:px-4 md:text-[14px]">
        No Boring Bites
      </span>
      <span className="absolute left-[30%] top-[46%] z-20 rotate-[-3deg] rounded-[10px] border-2 border-ink bg-yellow px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.5px] text-ink shadow-hard-black md:px-4 md:text-[14px]">
        Handle With Both Hands
      </span>

      {/* Quote text */}
      <p className="relative z-10 mx-auto max-w-5xl text-center font-display text-[30px] uppercase leading-[1.15] tracking-[-0.5px] text-ink sm:text-[40px] md:text-[52px]">
        Come for the burger. Stay for the{" "}
        <span className="text-brand">good mood</span>. Take your time, grab some
        fries, share a table with your{" "}
        <span className="text-brand">favourite people</span>, and enjoy every last
        bite and absolutely <span className="text-brand">zero regrets</span>.
      </p>
    </section>
  );
}
