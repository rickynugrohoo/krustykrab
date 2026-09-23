import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import MenuHighlights from "@/components/home/MenuHighlights";
import QuoteSection from "@/components/home/QuoteSection";
import PromoStats from "@/components/home/PromoStats";
import FaqSection from "@/components/home/FaqSection";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <MarqueeStrip />
      <MenuHighlights />
      <QuoteSection />
      <PromoStats />
      <FaqSection />
    </>
  );
}
