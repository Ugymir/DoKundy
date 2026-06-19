/**
 * Generates src/data/europe-map.ts: a static SVG map of Europe (Natural Earth
 * 50m via world-atlas) projected with a conic conformal projection, plus
 * projected city coordinates and smoothed route paths for the four trips.
 *
 * Run once (and re-run only if waypoints change):
 *   node scripts/generate-map.mjs
 */
import { geoConicConformal, geoPath, geoGraticule } from "d3-geo";
import * as topojson from "topojson-client";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const world = require("world-atlas/countries-50m.json");

const W = 1000;
const H = 1150;

// Window of interest: Šumava to Estonia, Adriatic to Gulf of Finland.
const window_ = {
  type: "Polygon",
  coordinates: [
    [
      // d3 spherical winding: exterior ring clockwise in lon/lat
      [3.5, 42.5],
      [3.5, 61.0],
      [31.5, 61.0],
      [31.5, 42.5],
      [3.5, 42.5],
    ],
  ],
};

const projection = geoConicConformal()
  .rotate([-17, 0])
  .parallels([45, 58])
  .fitSize([W, H], window_);
projection.clipExtent([
  [0, 0],
  [W, H],
]);

const path = geoPath(projection);

const land = topojson.merge(
  world,
  world.objects.countries.geometries
);
const borders = topojson.mesh(
  world,
  world.objects.countries,
  (a, b) => a !== b
);

const landPath = path(land);
const bordersPath = path(borders);
const graticulePath = path(geoGraticule().step([5, 5])());

// [lon, lat]
const CITIES = {
  domov: [15.59, 49.4], // Vysočina
  innsbruck: [11.39, 47.27],
  zadar: [15.23, 44.12],
  benatky: [12.34, 45.44],
  kunda: [26.53, 59.52],
  praha: [14.42, 50.09],
  wien: [16.37, 48.21],
  zagreb: [15.98, 45.81],
  riga: [24.11, 56.95],
  tallinn: [24.75, 59.44],
};

const ROUTES = {
  innsbruck: [
    CITIES.domov,
    [13.5, 49.05], // Šumava
    [12.1, 48.6], // přes Bavorsko
    [11.58, 48.14], // München
    [10.75, 47.56], // Neuschwanstein
    [10.99, 47.42], // Zugspitze
    CITIES.innsbruck,
  ],
  zadar: [
    CITIES.domov,
    [16.05, 48.86], // Znojmo
    [16.37, 48.21], // Wien
    [16.58, 47.68], // Sopron
    [16.93, 47.25], // Sárvár
    [15.44, 47.07], // Graz
    [15.65, 46.55], // Maribor
    [15.98, 45.81], // Zagreb
    [15.62, 44.88], // Plitvická jezera
    CITIES.zadar,
  ],
  benatky: [
    CITIES.domov,
    [14.29, 48.31], // Linz
    [13.04, 47.81], // Salzburg
    [13.2, 47.35], // Sankt Johann
    [13.13, 47.11], // Bad Gastein
    [12.76, 46.83], // Lienz
    [12.14, 46.54], // Cortina d'Ampezzo
    [12.3, 46.27], // Longarone
    CITIES.benatky,
  ],
  kunda: [
    CITIES.domov,
    [17.25, 49.59], // Olomouc
    [18.26, 49.82], // Ostrava
    [19.12, 50.81], // Częstochowa
    [19.46, 51.77], // Łódź
    [19.7, 52.55], // Płock
    [20.48, 53.78], // Olsztyn
    [22.93, 54.1], // Suwałki
    [23.9, 54.9], // Kaunas
    [24.11, 56.95], // Riga
    [24.5, 58.39], // Pärnu
    CITIES.kunda,
    [24.75, 59.44], // Tallinn
  ],
};

const project = ([lon, lat]) => {
  const [x, y] = projection([lon, lat]);
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
};

// Catmull-Rom → cubic bézier for a gently smoothed route line.
function smoothPath(points) {
  const p = points.map(project);
  if (p.length < 3) {
    return `M${p[0]} L${p.slice(1).join(" L")}`;
  }
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[Math.max(0, i - 1)];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[Math.min(p.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    const r = (n) => Math.round(n * 10) / 10;
    d += `C${r(c1[0])},${r(c1[1])} ${r(c2[0])},${r(c2[1])} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const cities = Object.fromEntries(
  Object.entries(CITIES).map(([k, v]) => [k, project(v)])
);
const routePaths = Object.fromEntries(
  Object.entries(ROUTES).map(([k, pts]) => [k, smoothPath(pts)])
);
const routeWaypoints = Object.fromEntries(
  Object.entries(ROUTES).map(([k, pts]) => [k, pts.map(project)])
);

const out = `// Vygenerováno skriptem scripts/generate-map.mjs – needitovat ručně.
// Zdroj geometrie: Natural Earth 50m (world-atlas), konformní kuželová projekce.

export const MAP_W = ${W};
export const MAP_H = ${H};

export const cities: Record<string, [number, number]> = ${JSON.stringify(
  cities,
  null,
  2
)};

export const routePaths: Record<string, string> = ${JSON.stringify(
  routePaths,
  null,
  2
)};

export const routeWaypoints: Record<string, [number, number][]> = ${JSON.stringify(
  routeWaypoints
)};

export const landPath = ${JSON.stringify(landPath)};

export const bordersPath = ${JSON.stringify(bordersPath)};

export const graticulePath = ${JSON.stringify(graticulePath)};
`;

writeFileSync(new URL("../src/data/europe-map.ts", import.meta.url), out);
console.log("OK: src/data/europe-map.ts");
console.log("cities:", cities);
