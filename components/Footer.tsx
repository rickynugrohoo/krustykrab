import Image from "next/image";

const socials = [
  { src: "/icons/tiktok.svg", alt: "TikTok", href: "https://tiktok.com" },
  { src: "/icons/facebook.svg", alt: "Facebook", href: "https://facebook.com" },
  { src: "/icons/threads.svg", alt: "Threads", href: "https://threads.net" },
];

const footerLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Testimonial", href: "#testimonial" },
  { label: "Reservation", href: "#reservation" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-ink px-5 pt-16 text-white md:px-[60px]"
    >
      {/* Decorative burgers */}
      <Image
        src="/icons/footer-burger.svg"
        alt=""
        width={276}
        height={250}
        className="pointer-events-none absolute left-6 top-16 hidden w-[220px] opacity-30 md:block lg:w-[280px]"
      />
      <Image
        src="/icons/footer-burger.svg"
        alt=""
        width={276}
        height={250}
        className="pointer-events-none absolute right-6 top-16 hidden w-[220px] opacity-30 md:block lg:w-[280px]"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 className="font-display text-[36px] uppercase leading-[1.05] tracking-[-1px] md:text-[64px]">
          Come <span className="text-yellow">Hungry.</span>
          <br />
          Leave <span className="text-yellow">a Little Mess.</span>
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-white/70 md:text-[16px]">
          Made fresh, served fast, and best enjoyed with napkins close by. Come
          for the burgers, stay for the milkshakes.
        </p>

        {/* Socials */}
        <div className="mt-6 flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.alt}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.alt}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
            >
              <Image src={s.src} alt="" width={24} height={24} />
            </a>
          ))}
        </div>
      </div>

      {/* Info row */}
      <div className="relative z-10 mt-12 flex flex-col justify-between gap-6 border-t border-white/15 py-8 text-[14px] text-white/70 md:flex-row">
        <div className="space-y-1">
          <p>Mon–Fri: 10:00 AM – 11:00 PM</p>
          <p>Sat–Sun: 8:00 AM – 12:00 AM</p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-2">
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full border border-white/40 px-4 py-2 text-[13px] uppercase tracking-wide text-white/80 transition-colors hover:bg-white hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="space-y-1 md:text-right">
          <p>Los Angeles, CA 90032, USA</p>
          <p>+1 (213) 555-0824</p>
          <p>hello@krustykrab.com</p>
        </div>
      </div>

      {/* Big logo */}
      <div className="relative z-10 flex items-center justify-center gap-3 border-t border-white/15 pb-6 pt-10 md:gap-6">
        <Image
          src="/icons/footer-brand.svg"
          alt="Krusty Krab crab mascot"
          width={226}
          height={276}
          className="h-[70px] w-auto shrink-0 sm:h-[110px] md:h-[150px] lg:h-[190px] xl:h-[220px]"
        />
        <span className="font-display leading-[0.8] tracking-[-3px] text-[64px] sm:text-[100px] md:text-[140px] lg:text-[180px] xl:text-[210px]">
          Krusty Krab
        </span>
      </div>
    </footer>
  );
}
