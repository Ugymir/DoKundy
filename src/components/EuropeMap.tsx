"use client";

import {
  MAP_W,
  MAP_H,
  cities,
  routePaths,
  routeWaypoints,
  landPath,
  bordersPath,
  graticulePath,
} from "@/data/europe-map";
import { trips, type Trip } from "@/data/trips";

type EndpointLabel = {
  tripId: Trip["id"];
  city: keyof typeof cities;
  dx: number;
  dy: number;
  anchor: "start" | "middle" | "end";
};

// Umístění popisků cílů tak, aby se nepřekrývaly s trasami
const ENDPOINTS: EndpointLabel[] = [
  { tripId: "innsbruck", city: "innsbruck", dx: -2, dy: 36, anchor: "middle" },
  { tripId: "zadar", city: "zadar", dx: 18, dy: 8, anchor: "start" },
  { tripId: "benatky", city: "benatky", dx: -18, dy: 10, anchor: "end" },
  { tripId: "kunda", city: "kunda", dx: 20, dy: 8, anchor: "start" },
];

const CONTEXT_CITIES: {
  city: keyof typeof cities;
  label: string;
  dx: number;
  dy: number;
  anchor: "start" | "middle" | "end";
}[] = [
  { city: "praha", label: "Praha", dx: -12, dy: -10, anchor: "end" },
  { city: "wien", label: "Vídeň", dx: 14, dy: 4, anchor: "start" },
  { city: "zagreb", label: "Záhřeb", dx: 16, dy: 4, anchor: "start" },
  { city: "riga", label: "Riga", dx: 16, dy: 4, anchor: "start" },
  { city: "tallinn", label: "Tallinn", dx: -14, dy: -8, anchor: "end" },
];

type Props = {
  hoveredId: Trip["id"] | null;
  onHover: (id: Trip["id"] | null) => void;
  onSelect: (id: Trip["id"]) => void;
};

export default function EuropeMap({ hoveredId, onHover, onSelect }: Props) {
  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      role="group"
      aria-label="Mapa Evropy se čtyřmi trasami z Vysočiny: do Innsbrucku (2023), do Zadaru (2024), do Benátek (2025) a plánovaná trasa do Kundy (2026)"
      className={`h-auto w-full ${hoveredId ? "map-has-hot" : ""}`}
    >
      <defs>
        <clipPath id="map-clip">
          <rect x="0" y="0" width={MAP_W} height={MAP_H} rx="28" />
        </clipPath>
      </defs>

      {/* Moře a pevnina */}
      <rect
        x="0"
        y="0"
        width={MAP_W}
        height={MAP_H}
        rx="28"
        fill="var(--color-sea)"
        stroke="var(--color-line)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <g clipPath="url(#map-clip)">
        <path d={graticulePath} fill="none" stroke="var(--color-ink)" strokeOpacity="0.04" strokeWidth="1" />
        <path
          d={landPath}
          fill="oklch(0.225 0.022 230)"
          stroke="oklch(0.4 0.035 220)"
          strokeOpacity="0.75"
          strokeWidth="1.3"
        />
        <path
          d={bordersPath}
          fill="none"
          stroke="oklch(0.32 0.025 230)"
          strokeOpacity="0.5"
          strokeWidth="0.8"
        />
      </g>

      {/* Kontextová města */}
      <g aria-hidden="true">
        {CONTEXT_CITIES.map((c) => {
          const [x, y] = cities[c.city];
          return (
            <g key={c.city}>
              <circle cx={x} cy={y} r="4" fill="var(--color-muted)" opacity="0.55" />
              <text
                x={x + c.dx}
                y={y + c.dy}
                textAnchor={c.anchor}
                fontSize="21"
                fill="var(--color-muted)"
                opacity="0.65"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {c.label}
              </text>
            </g>
          );
        })}
      </g>

      {/* Trasy — pořadí: nejstarší dole, plánovaná navrchu */}
      {trips.map((trip, i) => {
        const d = routePaths[trip.id];
        const waypoints = routeWaypoints[trip.id];
        const endpoint = ENDPOINTS.find((e) => e.tripId === trip.id)!;
        const [ex, ey] = cities[endpoint.city];
        const planned = trip.status === "planned";
        const hot = hoveredId === trip.id;
        const color = `var(${trip.colorVar})`;

        return (
          <g
            key={trip.id}
            className="route"
            data-hot={hot}
            role="button"
            tabIndex={0}
            aria-label={`${trip.title} (${trip.year}) — ${trip.km}, ${
              planned ? "plánovaná cesta" : "dokončeno"
            }. Otevřít detail.`}
            style={{ color }}
            onClick={() => onSelect(trip.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(trip.id);
              }
            }}
            onMouseEnter={() => onHover(trip.id)}
            onMouseLeave={() => onHover(null)}
          >
            {/* širší neviditelný tah = dotyková plocha */}
            <path d={d} fill="none" stroke="transparent" strokeWidth="30" vectorEffect="non-scaling-stroke" />
            {/* podsvícení */}
            <path
              d={d}
              fill="none"
              stroke={color}
              strokeOpacity="0.22"
              strokeWidth="8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              aria-hidden="true"
            />
            {/* hlavní čára */}
            {planned ? (
              <path
                className="route-line route-march"
                d={d}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="12 10"
                vectorEffect="non-scaling-stroke"
              />
            ) : (
              <path
                className="route-line route-draw"
                d={d}
                pathLength={1}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ "--draw-delay": `${0.3 + i * 0.3}s` } as React.CSSProperties}
              />
            )}
            {/* mezizastávky při najetí */}
            <g className="route-waypoints" aria-hidden="true">
              {waypoints.slice(1, -1).map(([wx, wy], wi) => (
                <circle key={wi} cx={wx} cy={wy} r="3.5" fill={color} />
              ))}
            </g>
            {/* cílový bod + popisek */}
            <circle
              className="route-endpoint"
              cx={ex}
              cy={ey}
              r="8"
              fill={color}
              stroke="var(--color-sea)"
              strokeWidth="2.5"
            />
            <text
              className="route-label"
              x={ex + endpoint.dx}
              y={ey + endpoint.dy}
              textAnchor={endpoint.anchor}
              fontSize="30"
              fontWeight="600"
              fill="var(--color-ink)"
              stroke="var(--color-sea)"
              strokeWidth="5"
              paintOrder="stroke"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {trip.destination}
              <tspan fill={color} fontSize="24">
                {" "}
                {`’${String(trip.year).slice(2)}`}
              </tspan>
            </text>
          </g>
        );
      })}

      {/* Domov */}
      <g aria-hidden="true">
        <circle
          className="home-pulse"
          cx={cities.domov[0]}
          cy={cities.domov[1]}
          r="11"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2"
        />
        <circle cx={cities.domov[0]} cy={cities.domov[1]} r="6.5" fill="var(--color-ink)" />
        <text
          x={cities.domov[0] + 18}
          y={cities.domov[1] + 34}
          fontSize="27"
          fontWeight="600"
          fill="var(--color-ink)"
          stroke="var(--color-sea)"
          strokeWidth="5"
          paintOrder="stroke"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Domov · Vysočina
        </text>
      </g>
    </svg>
  );
}
