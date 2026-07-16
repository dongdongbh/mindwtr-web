import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  DOCS_LOCALE_MESSAGES,
  DOCS_LOCALE_ORDER,
  docsLocaleForPath,
  localizedDocsPath,
  stripDocsLocale
} from "./locales/index.mjs";

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

function minimumDescriptionLength(text) {
  return /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(text)
    ? 20
    : 40;
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
    if (text.length >= minimumDescriptionLength(text)) return text;
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

  const localeKey = docsLocaleForPath(pageData.relativePath);
  const fallback =
    pageData.frontmatter.hero?.tagline ?? DOCS_LOCALE_MESSAGES[localeKey].description;
  if (!pageData.filePath) return trimDescription(fallback);

  const sourcePath = resolve(import.meta.dirname, "..", pageData.filePath);
  if (!existsSync(sourcePath)) return trimDescription(fallback);
  return descriptionFromMarkdown(readFileSync(sourcePath, "utf8"), fallback);
}

function structuredData(pageData, title, description, url) {
  const localeKey = docsLocaleForPath(pageData.relativePath);
  const messages = DOCS_LOCALE_MESSAGES[localeKey];
  const baseRelativePath = stripDocsLocale(pageData.relativePath);
  const siteUrl = `${DOCS_ORIGIN}${localizedDocsPath(localeKey, "index.md")}`;
  const websiteId = `${siteUrl}#website`;

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
        alternateName: "如水",
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
        "@id": websiteId,
        name: messages.siteTitle,
        url: siteUrl,
        inLanguage: messages.lang,
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        about: { "@id": `${SITE_ORIGIN}/#software` }
      },
      {
        "@type": baseRelativePath === "index.md" ? "CollectionPage" : "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: messages.lang,
        isPartOf: { "@id": websiteId },
        about: { "@id": `${SITE_ORIGIN}/#software` },
        primaryImageOfPage: { "@type": "ImageObject", url: SOCIAL_IMAGE }
      }
    ]
  }).replaceAll("<", "\\u003c");
}

export function pageSeoHead({ pageData, title, description }) {
  const localeKey = docsLocaleForPath(pageData.relativePath);
  const messages = DOCS_LOCALE_MESSAGES[localeKey];
  const baseRelativePath = stripDocsLocale(pageData.relativePath);
  const url = docsUrl(pageData.relativePath);
  const alternates = DOCS_LOCALE_ORDER.map((alternateLocale) => [
    "link",
    {
      rel: "alternate",
      hreflang: DOCS_LOCALE_MESSAGES[alternateLocale].hreflang,
      href: `${DOCS_ORIGIN}${localizedDocsPath(alternateLocale, baseRelativePath)}`
    }
  ]);
  const alternateOgLocales = DOCS_LOCALE_ORDER.filter(
    (alternateLocale) => alternateLocale !== localeKey
  ).map((alternateLocale) => [
    "meta",
    {
      property: "og:locale:alternate",
      content: DOCS_LOCALE_MESSAGES[alternateLocale].ogLocale
    }
  ]);

  return [
    ["meta", { property: "og:site_name", content: messages.siteTitle }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: messages.ogLocale }],
    ["meta", { property: "og:title", content: title }],
    ["meta", { property: "og:description", content: description }],
    ["meta", { property: "og:url", content: url }],
    ["meta", { property: "og:image:alt", content: messages.socialImageAlt }],
    ["meta", { name: "twitter:title", content: title }],
    ["meta", { name: "twitter:description", content: description }],
    ["meta", { name: "twitter:image:alt", content: messages.socialImageAlt }],
    ...alternates,
    [
      "link",
      {
        rel: "alternate",
        hreflang: "x-default",
        href: `${DOCS_ORIGIN}${localizedDocsPath("root", baseRelativePath)}`
      }
    ],
    ...alternateOgLocales,
    [
      "script",
      { type: "application/ld+json" },
      structuredData(pageData, title, description, url)
    ]
  ];
}
