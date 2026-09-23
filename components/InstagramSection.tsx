import Image from "next/image";

const photos = [
  { src: "/instagram/insta-1.jpg", alt: "Cozy Krusty Krab dining room" },
  { src: "/instagram/insta-2.jpg", alt: "Basket of burger and fries" },
  { src: "/instagram/insta-3.jpg", alt: "Chef plating a fresh order" },
  { src: "/instagram/insta-4.jpg", alt: "Friends sharing a meal" },
];

export default function InstagramSection() {
  return (
    <section id="testimonial" className="px-5 py-10 md:px-[60px] md:py-16">
      <div className="mb-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
        <h2 className="font-display text-[32px] uppercase tracking-[-1px] text-ink md:text-[48px]">
          Follow Us on <span className="text-brand">Instagram</span>
        </h2>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border-2 border-ink bg-brand px-5 py-2.5 text-[15px] font-semibold uppercase text-white shadow-hard-black transition-transform hover:-translate-y-0.5"
        >
          @krusty_krab
          <Image src="/icons/arrow-right.svg" alt="" width={22} height={22} />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {photos.map((p) => (
          <div
            key={p.src}
            className="relative aspect-square overflow-hidden rounded-[20px] border-2 border-ink"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
