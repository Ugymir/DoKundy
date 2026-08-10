import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

// display: "optional" = žádný záblesk fontu při prvním načtení (viz fix.txt).
// Prohlížeč krátce (~100 ms) počká na náš font; když se nestihne, použije
// metricky sladěnou náhradu a už ji nepřepíná (žádný „blik“ ani skok layoutu).
// latin-ext je nutný kvůli českým znakům (č, ř, ž, ě, ů…).
const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "optional",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"], // 500 se v nadpisech nikde nepoužívá
  variable: "--font-barlow-condensed",
  display: "optional",
});

export const metadata: Metadata = {
  title: {
    default: "Z Vysočiny do Kundy · Naše cesty na kole Evropou",
    template: "%s · Z Vysočiny do Kundy",
  },
  description:
    "Každé léto sedáme na kola a jedeme z Vysočiny o kus dál — Innsbruck, Zadar, Benátky. V létě 2026 nás čeká 2 000 km do estonské Kundy. Příběhy, fotky a všechny trasy na jedné mapě Evropy.",
  keywords: [
    "cykloturistika",
    "cesta na kole",
    "bikepacking",
    "Vysočina",
    "Kunda",
    "Estonsko",
    "přednášky",
  ],
  openGraph: {
    title: "Z Vysočiny do Kundy",
    description:
      "Tři léta, tři cesty na kole napříč Evropou — a v roce 2026 ta největší: 2 000 km do estonské Kundy.",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-accent-ink"
        >
          Přeskočit na obsah
        </a>
        <Nav />
        <main id="obsah">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
