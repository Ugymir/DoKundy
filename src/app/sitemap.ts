import type { MetadataRoute } from "next";

const BASE = "https://cyklohomeless.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/prednasky`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
