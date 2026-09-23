import Image from "next/image";
import Link from "next/link";

const HEAD =
  "block text-[58px] leading-[0.8] sm:text-[88px] md:text-[128px] xl:text-[176px] 2xl:text-[200px]";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col overflow-hidden px-5 pb-10 pt-4 md:px-[60px]">
      {/* Headline + burgers */}
      <div className="relative mx-auto flex w-full max-w-[1320px] flex-1 items-center justify-center">
        {/* Left burger */}
        <div className="pointer-events-none absolute left-[2%] top-[55%] z-20 hidden h-[290px] w-[250px] -translate-y-1/2 lg:block xl:h-[340px] xl:w-[290px] 2xl:h-[380px] 2xl:w-[320px]">
          <Image
            src="/hero/hero-burger.png"
            alt="Stacked Krusty Krab burger"
            fill
            sizes="320px"
            className="object-contain"
            priority
          />
        </div>
        {/* Right burger (mirrored) */}
        <div className="pointer-events-none absolute right-[2%] top-[55%] z-20 hidden h-[290px] w-[250px] -translate-y-1/2 scale-x-[-1] lg:block xl:h-[340px] xl:w-[290px] 2xl:h-[380px] 2xl:w-[320px]">
          <Image
            src="/hero/hero-burger.png"
            alt=""
            fill
            sizes="320px"
            className="object-contain"
          />
        </div>

        {/* Text stack */}
        <div className="relative w-full text-center">
          <h1 className="relative z-10 font-display uppercase tracking-[-2px] text-ink">
            <span className={HEAD}>Big Burger</span>
            <span aria-hidden className={`${HEAD} text-transparent`}>
              Bigger
            </span>
            <span className={HEAD}>Flavour</span>
          </h1>
          {/* Red BIGGER overlay — sits above the burgers */}
          <span
            className={`absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 font-display uppercase tracking-[-2px] text-brand ${HEAD}`}
          >
            Bigger
          </span>
        </div>
      </div>

      {/* Bottom row: supporting text + CTAs */}
      <div className="relative z-10 mx-auto mt-6 flex w-full max-w-[1320px] flex-col items-center gap-5 md:flex-row md:items-end md:justify-between">
        <p className="max-w-sm text-center text-[15px] font-medium leading-[1.4] text-muted-1 md:text-left md:text-[17px]">
          Smash-seared beef, crispy edges, melty cheese, and sauces worth
          getting messy for.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/menu"
            className="flex items-center gap-2 rounded-full border-2 border-ink bg-brand px-6 py-3 text-[14px] font-semibold uppercase text-white shadow-hard-black transition-transform hover:-translate-y-0.5"
          >
            Order Now
            <Image src="/icons/arrow-right.svg" alt="" width={20} height={20} />
          </Link>
          <Link
            href="/menu"
            className="flex items-center gap-2 rounded-full border-2 border-ink bg-white px-6 py-3 text-[14px] font-semibold uppercase text-ink shadow-hard-black transition-transform hover:-translate-y-0.5"
          >
            Explore Menu
            <Image
              src="/icons/arrow-right-2.svg"
              alt=""
              width={20}
              height={20}
              className="[filter:brightness(0)]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
