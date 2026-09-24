import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimalizaci obrázků řeší Cloudflare Image Transformations, viz image-loader.ts.
    // (Funguje na cyklohomeless.cz; na *.workers.dev by ne, proto je workers_dev vypnuté.)
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
};

export default nextConfig;
