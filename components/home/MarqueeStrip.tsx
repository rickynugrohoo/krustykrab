const features = [
  "Made to Order",
  "Melty by Nature",
  "Crispy Edges",
  "Sauce It Up",
  "No Boring Bites",
  "100% Fresh Beef",
];

function Sparkle() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M12 2c.5 4.5 1.5 5.5 6 6-4.5.5-5.5 1.5-6 6-.5-4.5-1.5-5.5-6-6 4.5-.5 5.5-1.5 6-6Z"
        fill="#ffffff"
      />
    </svg>
  );
}

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {features.map((f) => (
        <span key={f} className="flex items-center gap-8">
          <span className="text-[18px] font-bold uppercase leading-none tracking-[1.5px] text-white md:text-[22px]">
            {f}
          </span>
          <Sparkle />
        </span>
      ))}
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <div className="w-full overflow-hidden bg-ink py-5 md:py-6">
      <div className="flex w-max animate-marquee">
        <Track />
        <Track />
      </div>
    </div>
  );
}
