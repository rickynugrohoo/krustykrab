import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interTight = localFont({
  src: "./fonts/intertight.woff2",
  weight: "400 800",
  variable: "--font-sans",
  display: "swap",
});

const ebGaramond = localFont({
  src: "./fonts/ebgaramond.woff2",
  weight: "400 700",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Krusty Krab | Good Menu",
    template: "%s | Krusty Krab",
  },
  description:
    "Smash-seared beef, crispy edges, melty cheese, and sauces worth getting messy for. Burgers, sides, drinks and more from Krusty Krab.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${interTight.variable} ${ebGaramond.variable}`}>
      <body>{children}</body>
    </html>
  );
}
