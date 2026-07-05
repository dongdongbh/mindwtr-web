import { readdirSync } from "node:fs";
import { basename, resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import { chrome } from "./chrome";

// The page registry: every *.html file under landing/ is a page. Rollup
// inputs and sitemap.xml are both derived from this list, so adding a page
// means creating one file — Vite emits it (multi-page builds only include
// declared inputs) and the sitemap picks it up automatically. Cloudflare
// Pages serves dist/<name>.html at the clean URL /<name>.
const pages = readdirSync(import.meta.dirname)
  .filter((file) => file.endsWith(".html"))
  .sort();

const pagePaths = pages
  .map((page) => (page === "index.html" ? "/" : `/${basename(page, ".html")}`))
  .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

function sitemap(): Plugin {
  return {
    name: "mindwtr:sitemap",
    generateBundle() {
      const urls = pagePaths
        .map((path) => `  <url>\n    <loc>https://mindwtr.app${path}</loc>\n  </url>`)
        .join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      });
    }
  };
}

export default defineConfig({
  plugins: [chrome(), sitemap()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [basename(page, ".html"), resolve(import.meta.dirname, page)])
      )
    }
  }
});
