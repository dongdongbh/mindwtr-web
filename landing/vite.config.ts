import { resolve } from "node:path";
import { defineConfig } from "vite";
import { chrome } from "./chrome";

// Multi-page build: Vite emits only index.html by default, so every additional
// page must be declared as a rollup input. Each entry's path under the landing
// root is preserved in dist/, so support.html lands at dist/support.html — the
// shape Cloudflare Pages serves at the clean URL /support.
export default defineConfig({
  plugins: [chrome()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        support: resolve(import.meta.dirname, "support.html"),
        donate: resolve(import.meta.dirname, "donate.html"),
        features: resolve(import.meta.dirname, "features.html"),
        brand: resolve(import.meta.dirname, "brand.html"),
        privacy: resolve(import.meta.dirname, "privacy.html"),
      },
    },
  },
});
