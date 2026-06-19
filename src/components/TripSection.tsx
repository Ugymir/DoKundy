import Image from "next/image";
import type { Trip } from "@/data/trips";

type Props = {
  trip: Trip;
  flip: boolean;
  priority?: boolean;
  onOpen: (id: Trip["id"]) => void;
};

export default function TripSection({ trip, flip, priority, onOpen }: Props) {
  const [main, secondary] = trip.photos;
  const planned = trip.status === "planned";

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Fotky */}
      <div className={`relative ${flip ? "lg:order-2" : ""}`}>
        <div className="overflow-hidden rounded-xl">
          <Image
            src={main.src}
            width={main.width}
            height={main.height}
            alt={main.alt}
            priority={priority}
            sizes="(max-width: 1024px) 92vw, 44vw"
            className={`h-auto w-full ${planned ? "" : "max-h-[34rem] object-cover"}`}
          />
        </div>
        {secondary && (
          <div
            className={`absolute -bottom-8 w-[38%] overflow-hidden rounded-lg border-4 border-bg shadow-xl ${
              flip ? "-left-3 -rotate-2 sm:-left-6" : "-right-3 rotate-2 sm:-right-6"
            }`}
          >
            <Image
              src={secondary.src}
              width={secondary.width}
              height={secondary.height}
              alt={secondary.alt}
              sizes="(max-width: 1024px) 35vw, 17vw"
              className="h-auto w-full"
            />
          </div>
        )}
      </div>

      {/* Text */}
      <div className={`${secondary ? "mt-6 lg:mt-0" : ""} ${flip ? "lg:order-1" : ""}`}>
        <p
          className="font-display text-2xl font-semibold"
          style={{ color: `var(${trip.colorVar})` }}
        >
          {trip.year}
          {planned && (
            <span className="ml-3 inline-block translate-y-[-2px] rounded-full bg-accent px-3 py-0.5 align-middle text-sm font-semibold text-accent-ink">
              Plánovaná cesta
            </span>
          )}
        </p>
        <h3 className="mt-1 font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
          {trip.title}
        </h3>
        <p className="mt-4 text-lg font-medium">
          {trip.km}
          <span className="mx-2 text-muted" aria-hidden="true">
            ·
          </span>
          <span className="font-normal text-muted">{trip.daysLine}</span>
        </p>
        <p className="mt-3 max-w-[58ch] text-muted">{trip.teaser}</p>
        <button
          onClick={() => onOpen(trip.id)}
          className={`mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-3 font-medium transition-colors duration-200 ${
            planned
              ? "bg-accent text-accent-ink hover:bg-accent/85"
              : "border border-line/70 text-ink hover:border-line hover:bg-raised"
          }`}
        >
          {planned ? "Kudy pojedeme" : "Příběh a fotky"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </article>
  );
}
