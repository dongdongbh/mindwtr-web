import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const DOCS_ORIGIN = "https://docs.mindwtr.app";
const SITE_ORIGIN = "https://mindwtr.app";
const SOCIAL_IMAGE = `${DOCS_ORIGIN}/assets/screenshots/social-preview.jpg`;
const DEFAULT_DESCRIPTION =
  "Official documentation for Mindwtr, a free, open-source, local-first GTD and to-do app.";

function decodeEntities(value) {
  const named = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code.startsWith("#x")) return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    if (code.startsWith("#")) return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    return named[code.toLowerCase()] ?? entity;
  });
}

function trimDescription(value, maxLength = 170) {
  const text = decodeEntities(value).replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 120 ? lastSpace : undefined).trimEnd()}…`;
}

function markdownToText(value) {
  return trimDescription(
    value
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/<https?:\/\/[^>]+>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/[*_~]/g, "")
      .replace(/\[(?:\^)?[^\]]+\]/g, "")
  );
}

export function descriptionFromMarkdown(source, fallback = DEFAULT_DESCRIPTION) {
  const withoutFrontmatter = source.replace(/^---\s*\n[\s\S]*?\n---\s*(?:\n|$)/, "");
  const withoutCode = withoutFrontmatter
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");

  for (const block of withoutCode.split(/\n\s*\n/)) {
    const candidate = block.trim();
    if (
      candidate === "" ||
      /^(?:#{1,6}\s|[-*+]\s|\d+[.)]\s|>|\||:::|<|import\s|export\s|---+$)/.test(candidate)
    ) {
      continue;
    }
    const text = markdownToText(candidate.replace(/\n/g, " "));
    if (text.length >= 40) return text;
  }

  return trimDescription(fallback);
}

export function docsUrl(relativePath) {
  const path = relativePath.replace(/index\.md$/, "").replace(/\.md$/, "");
  return `${DOCS_ORIGIN}/${path}`;
}

export function descriptionForPage(pageData) {
  const explicit = pageData.frontmatter.description;
  if (typeof explicit === "string" && explicit.trim()) return trimDescription(explicit);

  const fallback = pageData.frontmatter.hero?.tagline ?? DEFAULT_DESCRIPTION;
  if (!pageData.filePath) return trimDescription(fallback);

  const sourcePath = resolve(import.meta.dirname, "..", pageData.filePath);
  if (!existsSync(sourcePath)) return trimDescription(fallback);
  return descriptionFromMarkdown(readFileSync(sourcePath, "utf8"), fallback);
}

function structuredData(pageData, title, description, url) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: "Mindwtr project",
        url: SITE_ORIGIN,
        logo: `${SITE_ORIGIN}/assets/brand/icon.png`,
        sameAs: ["https://github.com/dongdongbh/Mindwtr"]
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_ORIGIN}/#software`,
        name: "Mindwtr",
        url: SITE_ORIGIN,
        description:
          "A free, open-source, local-first GTD and to-do application for desktop, mobile, and web.",
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Windows, macOS, Linux, iOS, Android, Web",
        isAccessibleForFree: true,
        license: "https://www.gnu.org/licenses/agpl-3.0.html",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        sameAs: ["https://github.com/dongdongbh/Mindwtr"]
      },
      {
        "@type": "WebSite",
        "@id": `${DOCS_ORIGIN}/#website`,
        name: "Mindwtr Docs",
        url: `${DOCS_ORIGIN}/`,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        about: { "@id": `${SITE_ORIGIN}/#software` }
      },
      {
        "@type": pageData.relativePath === "index.md" ? "CollectionPage" : "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "en-US",
        isPartOf: { "@id": `${DOCS_ORIGIN}/#website` },
        about: { "@id": `${SITE_ORIGIN}/#software` },
        primaryImageOfPage: { "@type": "ImageObject", url: SOCIAL_IMAGE }
      }
    ]
  }).replaceAll("<", "\\u003c");
}

export function pageSeoHead({ pageData, title, description }) {
  const url = docsUrl(pageData.relativePath);
  return [
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "en_US" }],
    ["meta", { property: "og:title", content: title }],
    ["meta", { property: "og:description", content: description }],
    ["meta", { property: "og:url", content: url }],
    ["meta", { name: "twitter:title", content: title }],
    ["meta", { name: "twitter:description", content: description }],
    ["meta", { name: "twitter:image:alt", content: "Mindwtr — local-first GTD documentation." }],
    [
      "script",
      { type: "application/ld+json" },
      structuredData(pageData, title, description, url)
    ]
  ];
}
