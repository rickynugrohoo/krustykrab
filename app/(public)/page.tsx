import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import MenuHighlights from "@/components/home/MenuHighlights";
import QuoteSection from "@/components/home/QuoteSection";
import PromoStats from "@/components/home/PromoStats";
import FaqSection from "@/components/home/FaqSection";
import { getMenuItems } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Home",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await getMenuItems();
  return (
    <>
      <HomeHero />
      <MarqueeStrip />
      <MenuHighlights items={items} />
      <QuoteSection />
      <PromoStats />
      <FaqSection />
    </>
  );
}
