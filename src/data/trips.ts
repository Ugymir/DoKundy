export type TripPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Trip = {
  id: "innsbruck" | "zadar" | "benatky" | "kunda";
  year: number;
  title: string;
  destination: string;
  country: string;
  status: "done" | "planned";
  km: string;
  /** krátký řádek s délkou, např. „7 dní v sedle · bez dne volna“ */
  daysLine: string;
  teaser: string;
  story: string[];
  route: string[];
  photos: TripPhoto[];
  /** CSS proměnná s barvou trasy (viz globals.css) */
  colorVar: string;
};

export const trips: Trip[] = [
  {
    id: "innsbruck",
    year: 2023,
    title: "Do Innsbrucku",
    destination: "Innsbruck",
    country: "Rakousko",
    status: "done",
    km: "630 km",
    daysLine: "7 dní v sedle · bez dne volna",
    teaser:
      "První cesta. Bylo nám osmnáct, jeli jsme sedm dní v kuse a den volna nás ani nenapadl.",
    story: [
      "Bylo nám osmnáct a bylo to poprvé, co jsme na kola naložili všechno, co jsme na týden potřebovali. Z domova na Vysočině jsme vyrazili přes Šumavu do Bavorska — kolem Mnichova, pod zámkem Neuschwanstein a úbočím Zugspitze až do Innsbrucku.",
      "630 kilometrů za sedm dní, bez jediného dne odpočinku. Tenkrát nás ani nenapadlo si odpočinout",
    ],
    route: [
      "Vysočina",
      "Šumava",
      "Mnichov",
      "Neuschwanstein",
      "Zugspitze",
      "Innsbruck",
    ],
    photos: [
      {
        src: "/photos/innsbruck/kola-pod-stenou.jpg",
        width: 1080,
        height: 1431,
        alt: "Naložená kola na šotolinové cestě pod vápencovou stěnou v Alpách",
      },
      {
        src: "/photos/innsbruck/seebensee-zugspitze.jpg",
        width: 1080,
        height: 798,
        alt: "Jezero Seebensee pod masivem Zugspitze za slunečného dne",
      },
      {
        src: "/photos/innsbruck/udoli-innu.jpg",
        width: 1080,
        height: 1432,
        alt: "Výhled z horské louky do údolí Innu nad Innsbruckem",
      },
    ],
    colorVar: "--color-route-innsbruck",
  },
  {
    id: "zadar",
    year: 2024,
    title: "Do Zadaru",
    destination: "Zadar",
    country: "Chorvatsko",
    status: "done",
    km: "1 050 km",
    daysLine: "11 dní v sedle · 15 dní celkem",
    teaser:
      "Zatím nejdelší cesta — k Jadranu. A domů letecky, s největšími krabicemi od kol, jaké kdy pražské letiště vidělo.",
    story: [
      "Naše zatím nejdelší cesta: 1 050 kilometrů z Vysočiny až k Jadranu. Přes Znojmo a Vídeň do Maďarska — v Sárváru jsme se zastavili vykoupat v lázních — a dál přes Graz, Maribor a Záhřeb k Plitvickým jezerům a do Zadaru. Jedenáct dní v sedle, patnáct dní celkem: den volna v Záhřebu a tři dny u moře.",
      "A poprvé jsme letěli domů s koly v krabicích. Do servisu v Zadaru jsme psali s půlročním předstihem, aby nám nějaké krabice schovali. Schovali — ale takové, že specialista na nadrozměrná zavazadla na pražském letišti prohlásil, že větší krabice od kol v životě neviděl.",
    ],
    route: [
      "Vysočina",
      "Znojmo",
      "Vídeň",
      "Šoproň",
      "Sárvár",
      "Graz",
      "Maribor",
      "Záhřeb",
      "Plitvická jezera",
      "Zadar",
    ],
    photos: [
      {
        src: "/photos/zadar/rum-cedule.jpg",
        width: 1080,
        height: 1402,
        alt: "Povinná zastávka u cedule maďarské obce Rum",
      },
      {
        src: "/photos/zadar/oprava-dusi.jpg",
        width: 1080,
        height: 923,
        alt: "Selfie s kolem vzhůru nohama — další píchlá duše v chorvatském vnitrozemí",
      },
      {
        src: "/photos/zadar/krava-v-brodu.jpg",
        width: 533,
        height: 731,
        alt: "Kráva brodící se napajedlem u šotolinové cesty poblíž Plitvických jezer",
      },
      {
        src: "/photos/zadar/zapad-nad-velebitem.jpg",
        width: 1080,
        height: 981,
        alt: "Západ slunce pod mrakem nad hřebenem Velebitu",
      },
    ],
    colorVar: "--color-route-zadar",
  },
  {
    id: "benatky",
    year: 2025,
    title: "Do Benátek",
    destination: "Benátky",
    country: "Itálie",
    status: "done",
    km: "750 km",
    daysLine: "8 dní v sedle · den volna v Cortině · 2 dny v Benátkách",
    teaser:
      "Nejtěžší cesta. Ne kvůli kopcům v Dolomitech — prostě nás opustilo štěstí z minulých let.",
    story: [
      "Rozhodně naše nejtěžší cesta. Ne kvůli délce, ani kvůli stoupání v Dolomitech — prostě nás opustilo štěstí z minulých let a řešili jsme jeden problém za druhým.",
      "750 kilometrů za osm dní v sedle: Linec, Salzburg, po cyklostezce Alpe Adria přes Sankt Johann a Bad Gastein do Lienzu, pak Cortina d'Ampezzo s dnem volna, Longarone a sjezd až k moři do Benátek. Dva dny mezi kanály — a domů Flixbusem.",
    ],
    route: [
      "Vysočina",
      "Linec",
      "Salzburg",
      "Sankt Johann",
      "Bad Gastein",
      "Lienz",
      "Cortina d'Ampezzo",
      "Longarone",
      "Benátky",
    ],
    photos: [
      {
        src: "/photos/venice/lago-di-sorapis.jpg",
        width: 1080,
        height: 1424,
        alt: "Tyrkysové jezero Lago di Sorapis pod skalními stěnami Dolomit",
      },
      {
        src: "/photos/venice/svaty-marek-dest.jpg",
        width: 1080,
        height: 1441,
        alt: "Tři promoklí cyklisté v pláštěnkách na náměstí svatého Marka v Benátkách",
      },
      {
        src: "/photos/venice/cortina-zapad.jpg",
        width: 1080,
        height: 1455,
        alt: "Oranžový západ slunce nad štíty kolem Cortiny d'Ampezzo",
      },
      {
        src: "/photos/venice/vareni-u-cesty.jpg",
        width: 1080,
        height: 1421,
        alt: "Večeře z vařiče na lavičce u cesty, v pozadí kolo a alpská vesnice",
      },
      {
        src: "/photos/venice/vittorio-veneto.jpg",
        width: 1080,
        height: 1430,
        alt: "Kanál lemovaný květinami ve Vittorio Veneto cestou z hor",
      },
    ],
    colorVar: "--color-route-benatky",
  },
  {
    id: "kunda",
    year: 2026,
    title: "Do Kundy",
    destination: "Kunda",
    country: "Estonsko",
    status: "planned",
    km: "≈ 2 000 km",
    daysLine: "≈ 25 dní na cestě · léto 2026",
    teaser:
      "Hlavní cíl od začátku: 2 000 kilometrů na sever, do estonského městečka s nezapomenutelným jménem.",
    story: [
      "Hlavní cíl, ke kterému celou dobu míříme: dojet na kole do estonské Kundy. Městečko na pobřeží Finského zálivu, jehož jméno zní v češtině… no, řekněme zajímavě.",
      "Čeká nás kolem 2 000 kilometrů a zhruba 25 dní na cestě — přes Polsko, Litvu a Lotyšsko podél Baltu až na sever Estonska. Bude to skoro dvakrát víc, než jsme kdy ujeli. Léto 2026. Držte nám palce.",
    ],
    route: [
      "Vysočina",
      "Adršpach",
      "Vratislava",
      "Varšava",
      "Kaunas",
      "Riga",
      "Kunda",
      "Tallinn",
    ],
    photos: [
      {
        src: "/photos/kunda/kunda-cedule.jpg",
        width: 2100,
        height: 1182,
        alt: "Modrá silniční cedule s nápisem Kunda u silnice v Estonsku",
      },
    ],
    colorVar: "--color-route-kunda",
  },
];

export const tripsById = Object.fromEntries(
  trips.map((t) => [t.id, t])
) as Record<Trip["id"], Trip>;
