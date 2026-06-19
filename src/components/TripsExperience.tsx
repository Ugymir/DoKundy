"use client";

import { useState } from "react";
import EuropeMap from "@/components/EuropeMap";
import TripModal from "@/components/TripModal";
import TripSection from "@/components/TripSection";
import { trips, tripsById, type Trip } from "@/data/trips";

export default function TripsExperience() {
  const [hoveredId, setHoveredId] = useState<Trip["id"] | null>(null);
  const [selectedId, setSelectedId] = useState<Trip["id"] | null>(null);

  return (
    <>
      {/* ---------- Hero: mapa ---------- */}
      <section className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:pt-32 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            <h1
              className="hero-rise font-display text-[clamp(3.2rem,9vw,5.5rem)] font-bold uppercase leading-[0.92]"
              style={{ "--rise-delay": "0s" } as React.CSSProperties}
            >
              Z Vysočiny
              <span className="block text-accent">do Kundy</span>
            </h1>
            <p
              className="hero-rise mt-6 max-w-[58ch] text-lg text-muted"
              style={{ "--rise-delay": "0.12s" } as React.CSSProperties}
            >
              Každé léto sedneme na kola a dojedeme o kus dál než loni — do
              Innsbrucku, do Zadaru, do Benátek. V létě 2026 nás čeká největší
              výzva: 2 000 kilometrů přes Polsko a Pobaltí do estonské Kundy.
            </p>

            {/* Legenda = spolehlivé ovládání mapy (hlavně na mobilu) */}
            <ul
              className="hero-rise mt-8 divide-y divide-line/30 border-y border-line/30"
              style={{ "--rise-delay": "0.24s" } as React.CSSProperties}
            >
              {trips.map((trip) => {
                const planned = trip.status === "planned";
                return (
                  <li key={trip.id}>
                    <button
                      onClick={() => setSelectedId(trip.id)}
                      onMouseEnter={() => setHoveredId(trip.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onFocus={() => setHoveredId(trip.id)}
                      onBlur={() => setHoveredId(null)}
                      className={`flex w-full cursor-pointer items-center gap-4 px-2 py-3 text-left transition-colors duration-200 hover:bg-raised/60 ${hoveredId === trip.id ? "bg-raised/60" : ""
                        }`}
                    >
                      <svg width="40" height="12" aria-hidden="true" className="shrink-0">
                        <line
                          x1="2"
                          y1="6"
                          x2="38"
                          y2="6"
                          stroke={`var(${trip.colorVar})`}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={planned ? "6 5" : undefined}
                        />
                      </svg>
                      <span className="font-display text-xl font-semibold tabular-nums" style={{ color: `var(${trip.colorVar})` }}>
                        {trip.year}
                      </span>
                      <span className="font-medium">{trip.title}</span>
                      <span className="ml-auto text-sm text-muted">{trip.km}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p
              className="hero-rise mt-4 text-sm text-muted"
              style={{ "--rise-delay": "0.32s" } as React.CSSProperties}
            >
              Každá čára na mapě je jedno léto. Klikněte na ni — plná znamená
              dokončeno, čárkovaná nás teprve čeká.
            </p>
          </div>

          <figure className="hero-rise" style={{ "--rise-delay": "0.15s" } as React.CSSProperties}>
            <EuropeMap
              hoveredId={hoveredId}
              onHover={setHoveredId}
              onSelect={setSelectedId}
            />
            <figcaption className="sr-only">
              Mapa Evropy: tři dokončené trasy z Vysočiny (Innsbruck 2023, Zadar
              2024, Benátky 2025) a čárkovaně plánovaná trasa do Kundy v
              Estonsku (2026).
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- Kapitoly jednotlivých cest ---------- */}
      <section id="cesty" className="border-t border-line/30 bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">
            Naše cesty
          </h2>
          <p className="mt-3 max-w-[60ch] text-muted">
            Čtyři léta, čtyři čáry na mapě. Tři už mají cílovou fotku, čtvrtá
            zatím jen jméno, kterému se nedá odolat.
          </p>
          <div className="mt-16 flex flex-col gap-24 lg:mt-20 lg:gap-32">
            {trips.map((trip, i) => (
              <TripSection
                key={trip.id}
                trip={trip}
                flip={i % 2 === 1}
                priority={i === 0}
                onOpen={setSelectedId}
              />
            ))}
          </div>
        </div>
      </section>

      <TripModal
        trip={selectedId ? tripsById[selectedId] : null}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
