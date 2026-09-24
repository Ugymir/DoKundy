"use client";

/**
 * Cloudflare Image Transformations loader pro next/image.
 *
 * Přesměruje optimalizaci obrázků na Cloudflare (/cdn-cgi/image/…), takže se
 * fotky na edge reálně zmenšují a překódují (format=auto → WebP/AVIF).
 *
 * POZOR: /cdn-cgi/image funguje jen na vlastní doméně (cyklohomeless.cz) se
 * zapnutými Transformations. Na localhost i na *.workers.dev vrací originál.
 * Proto se do next.config.ts zapojí až po zprovoznění domény.
 */
export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // Lokální vývoj: nech originál, /cdn-cgi/image tu neexistuje.
  if (process.env.NODE_ENV === "development") return src;
  const params = [`width=${width}`, `quality=${quality || 75}`, "format=auto"];
  return `/cdn-cgi/image/${params.join(",")}${src}`;
}
