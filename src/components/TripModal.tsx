"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Trip } from "@/data/trips";

type Props = {
  trip: Trip | null;
  onClose: () => void;
};

export default function TripModal({ trip, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (trip && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!trip && dialog.open) {
      dialog.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [trip]);

  return (
    <dialog
      ref={ref}
      onClose={() => {
        document.documentElement.style.overflow = "";
        onClose();
      }}
      onClick={(e) => {
        // klik na backdrop zavírá
        if (e.target === ref.current) ref.current?.close();
      }}
      aria-label={trip ? `${trip.title} ${trip.year}` : undefined}
      className="m-auto w-[min(94vw,58rem)] rounded-2xl border border-line/50 bg-surface text-ink shadow-2xl backdrop:bg-transparent"
      style={{ zIndex: "var(--z-modal)" }}
    >
      {trip && (
        <div className="max-h-[85dvh] overflow-y-auto p-6 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="font-display text-xl font-semibold"
                style={{ color: `var(${trip.colorVar})` }}
              >
                {trip.year}
              </p>
              <h2 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                {trip.title}
              </h2>
            </div>
            <button
              onClick={() => ref.current?.close()}
              aria-label="Zavřít detail cesty"
              className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line/60 text-muted transition-colors duration-200 hover:bg-raised hover:text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="font-display text-2xl font-semibold">{trip.km}</p>
            <p className="text-muted">{trip.daysLine}</p>
            {trip.status === "planned" ? (
              <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-ink">
                Plánovaná cesta
              </span>
            ) : (
              <span className="rounded-full border border-line/70 px-3 py-1 text-sm font-medium text-muted">
                Dokončeno
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {trip.route.join(" → ")}
          </p>

          <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed">
            {trip.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 columns-2 gap-3 sm:columns-3 [&>figure]:mb-3">
            {trip.photos.map((photo) => (
              <figure key={photo.src} className="break-inside-avoid overflow-hidden rounded-lg">
                <Image
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  sizes="(max-width: 640px) 47vw, 300px"
                  className="h-auto w-full"
                />
              </figure>
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}
