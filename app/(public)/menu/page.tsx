import type { Metadata } from "next";
import Hero from "@/components/Hero";
import MenuExplorer from "@/components/MenuExplorer";
import { getMenuItems } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
};

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const items = await getMenuItems();
  return (
    <>
      <Hero />
      <MenuExplorer items={items} />
    </>
  );
}
