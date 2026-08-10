import Image from "next/image";
import Link from "next/link";
import TripsExperience from "@/components/TripsExperience";

export default function Home() {
  return (
    <>
      <TripsExperience />

      {/* ---------- O nás ---------- */}
      <section id="o-nas" className="border-t border-line/30">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:py-28">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">
              Kdo to vlastně jede
            </h2>
            <div className="mt-6 max-w-[62ch] space-y-4 text-lg leading-relaxed">
              <p>
                Jsme parta kamarádů z Vysočiny. Poprvé jsme na cestu vyrazili
                v osmnácti — s plnými brašnami, nulovými zkušenostmi a sedmi dny
                šlapání bez jediné pauzy. Od té doby je to každé léto stejné:
                naložit kola, vyjet z domova a dojet dál než loni. Jsme studenti,
                Pavel a Lukáš jsou stálými členy, třetí místo se již čtvrtým rokem
                střídá. První rok s námi jel Maty do Innsbrucku, druhý rok Vojta do Zadaru,
                třetí Kuba do Benátek a letos Honza, který už má studentská léta za sebou,
                pojede do Varšavy s Lukášem.
              </p>
              <p>
                Nejsme závodníci. Spíme, kde se dá, vaříme na vařiči u cesty,
                fotíme cedule s divnými jmény a opravujeme píchlé duše tam, kde
                nás zrovna zastihnou. Kilometry si ale počítáme poctivě — zatím
                jich je 2 430. A v létě 2026 by se měly skoro zdvojnásobit.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <figure className="col-span-2 aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src="/photos/zadar/oprava-dusi.jpg"
                width={1080}
                height={923}
                alt="Selfie u silnice: jeden drží kolo za výplet, druhý ukazuje palec nahoru — oprava píchlé duše cestou do Zadaru"
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="h-full w-full object-cover"
              />
            </figure>
            <figure className="aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="/photos/venice/parta-dolomity.jpg"
                width={1080}
                height={1604}
                alt="Tři kluci z party v cyklistických dresech před panoramatem Dolomit nad horským městečkem"
                sizes="(max-width: 1024px) 46vw, 19vw"
                className="h-full w-full object-cover"
              />
            </figure>
            <figure className="aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="/photos/innsbruck/parta-vrchol.jpg"
                width={1080}
                height={1066}
                alt="Tři členové party na vrcholu u zlaté vrcholové tyče polepené samolepkami, kolem zasněžené štíty"
                sizes="(max-width: 1024px) 46vw, 19vw"
                className="h-full w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- Přednášky teaser ---------- */}
      <section className="border-t border-line/30 bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:py-24">
          <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">
            Přijďte si to poslechnout
          </h2>
          <p className="mx-auto mt-4 max-w-[55ch] text-lg text-muted">
            Po návratu z Kundy vyrážíme vyprávět — o 2 000 kilometrech na sever,
            o krabicích od kol i o tom, proč se nejhorší dny vyprávějí nejlíp.
          </p>
          <Link
            href="/prednasky"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent/85"
          >
            Termíny přednášek
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
