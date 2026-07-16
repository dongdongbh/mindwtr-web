import { defineConfig } from "vitepress";
import { DOCS_LOCALES } from "./locales/index.mjs";
import { descriptionForPage, docsUrl, pageSeoHead } from "./seo.mjs";

export default defineConfig({
  title: "Mindwtr Docs",
  description: "Searchable documentation for Mindwtr, the free, local-first GTD app.",
  locales: DOCS_LOCALES,
  base: "/",
  // Public assets are copied beneath docs/ during the build. Keep any
  // accompanying Markdown notes out of VitePress's page registry.
  srcExclude: ["public/**/*.md"],
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", href: "/assets/brand/icon.png" }],
    ["meta", { property: "og:image", content: "https://docs.mindwtr.app/assets/screenshots/social-preview.jpg" }],
    ["meta", { property: "og:image:width", content: "1280" }],
    ["meta", { property: "og:image:height", content: "640" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: "https://docs.mindwtr.app/assets/screenshots/social-preview.jpg" }]
  ],
  transformHead(context) {
    return pageSeoHead(context);
  },
  vite: {
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          target: "ES2022"
        }
      }
    }
  },
  sitemap: {
    hostname: "https://docs.mindwtr.app"
  },
  // With cleanUrls each page is reachable at /path and /path.html; the
  // canonical tag tells crawlers which one to index.
  transformPageData(pageData) {
    const canonicalUrl = docsUrl(pageData.relativePath);
    pageData.description = descriptionForPage(pageData);
    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(["link", { rel: "canonical", href: canonicalUrl }]);
  },
  themeConfig: {
    logo: "/assets/brand/icon.png",
    // The logo/title links back to the main marketing site; the nav row below
    // is doc sections only, and the source repo lives in socialLinks (icon).
    logoLink: "https://mindwtr.app/",
    i18nRouting: true,
    socialLinks: [
      { icon: "github", link: "https://github.com/dongdongbh/Mindwtr" }
    ]
  }
});
