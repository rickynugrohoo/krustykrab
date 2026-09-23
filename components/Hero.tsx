export default function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col justify-center px-5 py-10 md:px-[60px] md:py-20">
      <div className="flex flex-col items-start justify-between gap-8 rounded-tl-[32px] rounded-tr-[32px] rounded-br-[32px] border-2 border-ink bg-yellow p-7 shadow-hard md:flex-row md:items-center md:p-12">
        <h1 className="font-display uppercase leading-none tracking-[-1.5px] text-ink">
          <span className="block text-[48px] leading-[0.95] md:text-[80px] md:leading-[72px]">
            Krusty Krab
          </span>
          <span className="block text-[48px] leading-[0.95] text-brand md:text-[80px] md:leading-[72px]">
            Good Menu
          </span>
        </h1>
        <p className="max-w-[558px] text-[16px] font-medium leading-[1.5] text-muted-1 md:text-right md:text-[20px]">
          Everything you came for. Burgers, crispy sides, cold drinks, and a few
          very good reasons to order more than you planned.
        </p>
      </div>
    </section>
  );
}
