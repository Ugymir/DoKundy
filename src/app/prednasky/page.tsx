import type { Metadata } from "next";
import PrednaskyTable from "@/components/PrednaskyTable";

export const metadata: Metadata = {
  title: "Přednášky",
  description:
    "Termíny přednášek o našich cestách na kole napříč Evropou. Po návratu z Kundy doplníme data, místa i rezervace.",
};

export default function PrednaskyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-28 pb-20 sm:px-6 lg:pt-32 lg:pb-28">
      <h1 className="font-display text-5xl font-bold uppercase sm:text-6xl">
        Přednášky
      </h1>
      <p className="mt-4 max-w-[58ch] text-lg text-muted">
        O cestách rádi vyprávíme naživo — s fotkami, mapou a historkami, které
        se do žádného popisku nevejdou.
      </p>
      <div className="mt-10">
        <PrednaskyTable />
      </div>
    </section>
  );
}
