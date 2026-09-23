import type { Metadata } from "next";
import Hero from "@/components/Hero";
import MenuExplorer from "@/components/MenuExplorer";

export const metadata: Metadata = {
  title: "Menu",
};

export default function MenuPage() {
  return (
    <>
      <Hero />
      <MenuExplorer />
    </>
  );
}
