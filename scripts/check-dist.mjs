import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { resolve, join, posix } from "node:path";
import {
  DOCS_LOCALE_MESSAGES,
  DOCS_LOCALE_ORDER,
  docsLocaleForPath,
  localizedDocsPath
} from "../docs/.vitepress/locales/index.mjs";

// Verifies the built output of both sites — the same files Cloudflare serves.
// Checks: internal links and asset references resolve (including cross-site
// links between mindwtr.app and docs.mindwtr.app), fragment targets exist,
// titles/descriptions/social metadata and schema are complete and consistent,
// canonical/og:url match each page's served URL, social images exist, and each
// sitemap lists exactly the public pages that were emitted. It also protects
// the landing 404 and optional llms.txt links.
// Run after both builds: `bun run check` does this automatically.

const root = resolve(import.meta.dirname, "..");

const sites = {
  "https://mindwtr.app": { name: "landing", dist: resolve(root, "landing/dist") },
  "https://docs.mindwtr.app": { name: "docs", dist: resolve(root, "docs/.vitepress/dist") }
};

const docsLocales = DOCS_LOCALE_ORDER.map((key) => ({
  key,
  prefix: key === "root" ? "" : `/${key}`,
  lang: DOCS_LOCALE_MESSAGES[key].lang,
  hreflang: DOCS_LOCALE_MESSAGES[key].hreflang
}));
const docsLocaleByKey = new Map(docsLocales.map((locale) => [locale.key, locale]));
const landingLocales = [
  { key: "en", hreflang: "en", lang: "en" },
  { key: "de", hreflang: "de", lang: "de" },
  { key: "es", hreflang: "es", lang: "es" },
  { key: "fr", hreflang: "fr", lang: "fr" },
  { key: "zh", hreflang: "zh-Hans", lang: "zh-Hans" }
];
const landingLocalizedPages = [
  "index",
  "features",
  "gtd",
  "donate",
  "support",
  "brand",
  "privacy"
];

const findings = [];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#38;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function tagAttributes(html, tagName) {
  const tagPattern = new RegExp(
    `<${tagName}\\b((?:[^>"']|"[^"]*"|'[^']*')*)>`,
    "gi"
  );
  return [...html.matchAll(tagPattern)].map(([, attributes]) =>
    Object.fromEntries(
      [...attributes.matchAll(/([\w:.-]+)="([^"]*)"/g)].map(([, key, value]) => [
        key,
        value
      ])
    )
  );
}

function docsLocaleForPagePath(path) {
  return docsLocaleByKey.get(docsLocaleForPath(path.replace(/^\//, "")));
}

function localizedLandingPath(locale, pageName) {
  const prefix = locale.key === "en" ? "" : `/${locale.key}`;
  return pageName === "index" ? `${prefix}/` : `${prefix}/${pageName}`;
}

function localizedLandingPageForPath(path) {
  for (const locale of landingLocales) {
    for (const pageName of landingLocalizedPages) {
      if (path === localizedLandingPath(locale, pageName)) {
        return { locale, pageName };
      }
    }
  }
  return null;
}

// Served URL for an emitted html file: index.html files map to their
// directory, everything else is served at the clean URL without ".html"
// (Cloudflare Pages for the landing, VitePress cleanUrls for the docs).
function pagePath(site, file) {
  const rel = posix.join(...file.slice(site.dist.length + 1).split(/[\\/]/));
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel.replace(/\.html$/, "")}`;
}

// Resolve a same-site absolute path to an emitted file, mirroring how the
// host serves clean URLs. Returns the file path or null.
function resolvePath(site, path) {
  const rel = path.replace(/^\//, "");
  const candidates = rel === "" ? ["index.html"] : [rel, `${rel}.html`, posix.join(rel, "index.html")];
  for (const candidate of candidates) {
    const full = join(site.dist, candidate);
    if (existsSync(full) && statSync(full).isFile()) return full;
  }
  return null;
}

function loadRedirects(site) {
  const file = join(site.dist, "_redirects");
  if (!existsSync(file)) return new Set();
  return new Set(
    readFileSync(file, "utf8")
      .split("\n")
      .map((line) => line.trim().split(/\s+/)[0])
      .filter((path) => path?.startsWith("/"))
  );
}

for (const site of Object.values(sites)) {
  if (!existsSync(site.dist)) {
    findings.push(`${site.name}: dist directory missing at ${site.dist} — build first`);
  }
}

if (findings.length === 0) {
  const pages = new Map(); // file -> { site, path, html, ids }
  const pageTitles = new Map(); // site + title -> served page paths
  const descriptions = new Map(); // site + description -> served page paths

  for (const [origin, site] of Object.entries(sites)) {
    site.origin = origin;
    site.redirects = loadRedirects(site);
    site.files = walk(site.dist);
    for (const file of site.files.filter((f) => f.endsWith(".html"))) {
      const html = readFileSync(file, "utf8");
      const ids = new Set([...html.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1]));
      const path = pagePath(site, file);
      if (site.name === "docs" && path.startsWith("/public/")) {
        findings.push(`docs${path}: public asset was compiled as an HTML page`);
      }
      pages.set(file, { site, path, html, ids });
    }
  }

  const siteByOrigin = (url) =>
    Object.entries(sites).find(([origin]) => url === origin || url.startsWith(`${origin}/`));

  function isLocalizedDocs404Fallback(page, raw) {
    if (page.site.name !== "docs" || page.path !== "/404") return false;
    const value = decodeEntities(raw).trim();
    return docsLocales
      .filter(({ key }) => key !== "root")
      .some(
        ({ prefix }) =>
          value === `${page.site.origin}${prefix}/404` || value === `${prefix}/404`
      );
  }

  function checkTarget(page, raw, label) {
    // VitePress's single 404 artifact chooses its locale from the requested
    // path at runtime. Locale-menu links therefore intentionally target
    // /<locale>/404 even though those routes do not have separate HTML files.
    if (isLocalizedDocs404Fallback(page, raw)) return;

    let url = decodeEntities(raw).trim();
    if (
      url === "" ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:") ||
      url.startsWith("data:") ||
      url.startsWith("javascript:")
    ) {
      return;
    }

    let site = page.site;
    if (/^[a-z][a-z0-9+.-]*:/i.test(url)) {
      const match = siteByOrigin(url);
      if (!match) return; // external link — not checked offline
      site = match[1];
      url = url.slice(match[0].length) || "/";
    }

    const [pathAndQuery, fragment] = url.split("#", 2);
    const path = pathAndQuery.split("?", 2)[0];

    if (path.startsWith("#") || path === "") {
      // same-page fragment
      const frag = fragment ?? url.slice(1);
      if (frag && !page.ids.has(frag)) {
        findings.push(`${page.site.name}${page.path}: ${label} "#${frag}" has no matching id`);
      }
      return;
    }

    const absolute = path.startsWith("/")
      ? path
      : posix.resolve(posix.dirname(page.path === "/" ? "/index" : page.path), path);

    if (site.redirects.has(absolute)) return;

    const target = resolvePath(site, absolute);
    if (!target) {
      findings.push(`${page.site.name}${page.path}: ${label} "${raw}" does not resolve in ${site.name} dist`);
      return;
    }

    if (fragment && target.endsWith(".html")) {
      const ids = pages.get(target)?.ids;
      if (ids && !ids.has(fragment)) {
        findings.push(`${page.site.name}${page.path}: ${label} "${raw}" — no id "${fragment}" in ${site.name}${pagePath(site, target)}`);
      }
    }
  }

  for (const page of pages.values()) {
    for (const [, attr, value] of page.html.matchAll(/\s(href|src)="([^"]*)"/g)) {
      checkTarget(page, value, attr);
    }

    // Social/canonical URLs must exist and point at this page's served URL.
    const metas = tagAttributes(page.html, "meta");
    const metaValue = (key) =>
      metas.find((m) => m.property === key || m.name === key)?.content;

    const is404 = page.path.endsWith("/404");
    const expected = `${page.site.origin}${page.path}`;
    if (!is404) {
      const lang = page.html.match(/<html\b[^>]*\slang="([^"]+)"/i)?.[1];
      if (!lang) findings.push(`${page.site.name}${page.path}: missing html lang`);

      const titleMatches = [...page.html.matchAll(/<title(?:\s[^>]*)?>([\s\S]*?)<\/title>/g)];
      const title = decodeEntities(titleMatches[0]?.[1] ?? "").trim();
      if (titleMatches.length !== 1 || title === "") {
        findings.push(`${page.site.name}${page.path}: expected one non-empty title`);
      } else {
        const key = `${page.site.name}\n${lang ?? ""}\n${title}`;
        const paths = pageTitles.get(key) ?? [];
        paths.push(page.path);
        pageTitles.set(key, paths);
      }

      const h1Count = [...page.html.matchAll(/<h1\b/gi)].length;
      if (h1Count !== 1) {
        findings.push(`${page.site.name}${page.path}: expected one h1, found ${h1Count}`);
      }

      const requiredMeta = [
        "description",
        "og:site_name",
        "og:type",
        "og:title",
        "og:description",
        "og:url",
        "og:image",
        "twitter:card",
        "twitter:title",
        "twitter:description",
        "twitter:image"
      ];
      for (const key of requiredMeta) {
        if (!metaValue(key)?.trim()) {
          findings.push(`${page.site.name}${page.path}: missing ${key} metadata`);
        }
      }

      const description = decodeEntities(metaValue("description") ?? "").trim();
      if (description) {
        const key = `${page.site.name}\n${lang ?? ""}\n${description}`;
        const paths = descriptions.get(key) ?? [];
        paths.push(page.path);
        descriptions.set(key, paths);
      }

      const jsonLd = [...page.html.matchAll(
        /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
      )];
      if (jsonLd.length === 0) {
        findings.push(`${page.site.name}${page.path}: missing JSON-LD`);
      }
      let pageNodeFound = false;
      let softwareNodeFound = false;
      for (const [, value] of jsonLd) {
        try {
          const data = JSON.parse(value);
          if (data["@context"] !== "https://schema.org") {
            findings.push(`${page.site.name}${page.path}: JSON-LD must use schema.org context`);
            continue;
          }
          const nodes = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
          const softwareNode = nodes.find(
            (node) => node?.["@id"] === "https://mindwtr.app/#software"
          );
          if (softwareNode) {
            softwareNodeFound = true;
            if (
              softwareNode.name !== "Mindwtr" ||
              softwareNode.alternateName !== "如水"
            ) {
              findings.push(
                `${page.site.name}${page.path}: SoftwareApplication must identify Mindwtr with alternate name 如水`
              );
            }
          }
          const pageNode = nodes.find(
            (node) => node?.["@id"] === `${expected}#webpage`
          );
          if (!pageNode) continue;
          pageNodeFound = true;
          for (const [key, actual, wanted] of [
            ["url", pageNode.url, expected],
            ["name", pageNode.name, title],
            ["description", pageNode.description, description],
            ["inLanguage", pageNode.inLanguage, lang]
          ]) {
            if (actual !== wanted) {
              findings.push(
                `${page.site.name}${page.path}: JSON-LD ${key} is ${JSON.stringify(actual)}, expected ${JSON.stringify(wanted)}`
              );
            }
          }
        } catch (error) {
          findings.push(`${page.site.name}${page.path}: invalid JSON-LD (${error.message})`);
        }
      }
      if (jsonLd.length > 0 && !pageNodeFound) {
        findings.push(`${page.site.name}${page.path}: JSON-LD missing its WebPage node`);
      }
      if (jsonLd.length > 0 && !softwareNodeFound) {
        findings.push(`${page.site.name}${page.path}: JSON-LD missing its SoftwareApplication node`);
      }

      const isLandingHome =
        page.site.name === "landing" && /^(?:\/(?:de|es|fr|zh))?\/$/.test(page.path);
      if (isLandingHome) {
        const approvedHeroFallback = "/assets/screenshots/landing_image.png";
        const responsiveHero = "/assets/screenshots/landing_image-840.webp";
        const responsiveHero2x = "/assets/screenshots/landing_image-1672.webp";
        const image = tagAttributes(page.html, "img").find(
          (attributes) => attributes.src === approvedHeroFallback
        );
        const source = tagAttributes(page.html, "source").find(
          (attributes) =>
            attributes.type === "image/webp" &&
            attributes.srcset?.includes(responsiveHero) &&
            attributes.srcset?.includes(responsiveHero2x)
        );
        const preload = tagAttributes(page.html, "link").find(
          (attributes) =>
            attributes.rel === "preload" &&
            attributes.as === "image" &&
            attributes.type === "image/webp" &&
            attributes.href === responsiveHero &&
            attributes.imagesrcset?.includes(responsiveHero) &&
            attributes.imagesrcset?.includes(responsiveHero2x)
        );
        if (!image || !source || !preload) {
          findings.push(
            `${page.site.name}${page.path}: homepage must preserve the approved PNG hero fallback and preload its responsive WebP source`
          );
        }
      }

    }

    for (const key of ["og:image", "twitter:image"]) {
      const value = metaValue(key);
      if (value) checkTarget(page, value, key);
    }

    for (const [key, value] of [
      ["canonical", page.html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]],
      ["og:url", metaValue("og:url")]
    ]) {
      if (is404) continue;
      if (value === undefined) {
        if (key === "canonical") findings.push(`${page.site.name}${page.path}: missing canonical link`);
        continue;
      }
      if (decodeEntities(value) !== expected) {
        findings.push(`${page.site.name}${page.path}: ${key} is "${value}", expected "${expected}"`);
      }
    }

    if (page.site.name === "docs" && !is404) {
      const locale = docsLocaleForPagePath(page.path);
      if (page.html.match(/<html\b[^>]*\slang="([^"]+)"/i)?.[1] !== locale.lang) {
        findings.push(`${page.site.name}${page.path}: html lang must be "${locale.lang}"`);
      }

      const basePath = locale.key === "root" ? page.path : page.path.slice(locale.prefix.length);
      const linkTags = tagAttributes(page.html, "link");
      const alternates = linkTags.filter(
        (link) => link.rel === "alternate" && typeof link.hreflang === "string"
      );
      const alternateMap = new Map(alternates.map((link) => [link.hreflang, decodeEntities(link.href ?? "")]));

      for (const alternateLocale of docsLocales) {
        const wanted = `${page.site.origin}${localizedDocsPath(alternateLocale.key, basePath)}`;
        if (alternateMap.get(alternateLocale.hreflang) !== wanted) {
          findings.push(
            `${page.site.name}${page.path}: hreflang ${alternateLocale.hreflang} must point to ${wanted}`
          );
        }
      }

      const xDefault = `${page.site.origin}${localizedDocsPath("root", basePath)}`;
      if (alternateMap.get("x-default") !== xDefault) {
        findings.push(`${page.site.name}${page.path}: hreflang x-default must point to ${xDefault}`);
      }
      if (alternateMap.size !== docsLocales.length + 1) {
        findings.push(
          `${page.site.name}${page.path}: expected ${docsLocales.length + 1} unique hreflang alternates`
        );
      }
    }

    const landingPage =
      page.site.name === "landing" && !is404
        ? localizedLandingPageForPath(page.path)
        : null;
    if (landingPage) {
      const { locale, pageName } = landingPage;
      const lang = page.html.match(/<html\b[^>]*\slang="([^"]+)"/i)?.[1];
      if (lang !== locale.lang) {
        findings.push(`${page.site.name}${page.path}: html lang must be "${locale.lang}"`);
      }

      const links = tagAttributes(page.html, "link");
      const alternates = links.filter(
        (link) => link.rel === "alternate" && typeof link.hreflang === "string"
      );
      const alternateMap = new Map(
        alternates.map((link) => [link.hreflang, decodeEntities(link.href ?? "")])
      );
      for (const alternateLocale of landingLocales) {
        const wanted = `${page.site.origin}${localizedLandingPath(alternateLocale, pageName)}`;
        if (alternateMap.get(alternateLocale.hreflang) !== wanted) {
          findings.push(
            `${page.site.name}${page.path}: hreflang ${alternateLocale.hreflang} must point to ${wanted}`
          );
        }
      }
      const xDefault = `${page.site.origin}${localizedLandingPath(landingLocales[0], pageName)}`;
      if (alternateMap.get("x-default") !== xDefault) {
        findings.push(`${page.site.name}${page.path}: hreflang x-default must point to ${xDefault}`);
      }
      if (alternateMap.size !== landingLocales.length + 1) {
        findings.push(
          `${page.site.name}${page.path}: expected ${landingLocales.length + 1} unique hreflang alternates`
        );
      }

      const hrefs = new Set(
        tagAttributes(page.html, "a").map((anchor) => decodeEntities(anchor.href ?? ""))
      );
      for (const target of ["features", "gtd", "support", "donate", "brand", "privacy"]) {
        const wanted = localizedLandingPath(locale, target);
        if (!hrefs.has(wanted)) {
          findings.push(
            `${page.site.name}${page.path}: localized shared navigation must link to ${wanted}`
          );
        }
      }

      if (pageName === "privacy" && locale.key !== "en") {
        if (!hrefs.has("/privacy")) {
          findings.push(
            `${page.site.name}${page.path}: translated privacy policy must link to the English source`
          );
        }
        if (!hrefs.has("https://github.com/dongdongbh/mindwtr-web/issues")) {
          findings.push(
            `${page.site.name}${page.path}: translated privacy policy must invite translation reports`
          );
        }
        if (!page.html.includes("mailto:support@mindwtr.app")) {
          findings.push(
            `${page.site.name}${page.path}: translated privacy policy must provide the support email`
          );
        }
      }
    }
  }

  for (const [label, values] of [
    ["title", pageTitles],
    ["description", descriptions]
  ]) {
    for (const [key, paths] of values) {
      if (paths.length < 2) continue;
      const [siteName] = key.split("\n", 1);
      findings.push(`${siteName}: duplicate ${label} on ${paths.join(", ")}`);
    }
  }

  // Sitemaps: every listed URL must resolve and every emitted public page must
  // appear exactly once. This catches both orphaned pages and accidental
  // Markdown compilation from public asset directories.
  for (const site of Object.values(sites)) {
    const sitemapFile = join(site.dist, "sitemap.xml");
    if (!existsSync(sitemapFile)) {
      findings.push(`${site.name}: sitemap.xml missing from dist`);
      continue;
    }
    const locs = [...readFileSync(sitemapFile, "utf8").matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, loc]) =>
      decodeEntities(loc)
    );
    for (const loc of locs) {
      if (!loc.startsWith(site.origin)) {
        findings.push(`${site.name}: sitemap URL "${loc}" is not under ${site.origin}`);
      } else if (!resolvePath(site, loc.slice(site.origin.length) || "/")) {
        findings.push(`${site.name}: sitemap URL "${loc}" does not resolve`);
      }
    }
    const listed = new Set(locs);
    if (listed.size !== locs.length) {
      findings.push(`${site.name}: sitemap contains duplicate URLs`);
    }
    const expectedUrls = new Set();
    for (const page of pages.values()) {
      if (page.site !== site || page.path.endsWith("/404")) continue;
      const url = `${site.origin}${page.path}`;
      expectedUrls.add(url);
      if (!listed.has(url)) findings.push(`${site.name}: page ${url} missing from sitemap`);
    }
    for (const url of listed) {
      if (!expectedUrls.has(url)) findings.push(`${site.name}: unexpected sitemap URL ${url}`);
    }
  }

  const landing404 = [...pages.values()].find(
    (page) => page.site.name === "landing" && page.path === "/404"
  );
  if (!landing404) {
    findings.push("landing: missing 404.html (unknown paths will soft-404 to the homepage)");
  } else if (!/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(landing404.html)) {
    findings.push("landing/404: missing noindex robots metadata");
  }

  // llms.txt is an experimental navigation aid, not an indexing directive.
  // If we publish it, keep its canonical links inside the same link contract
  // as the human-facing pages so it cannot silently drift.
  for (const site of Object.values(sites)) {
    const llmsFile = join(site.dist, "llms.txt");
    if (!existsSync(llmsFile)) continue;
    const content = readFileSync(llmsFile, "utf8");
    if (!content.startsWith("# ") || !/^>\s+\S/m.test(content)) {
      findings.push(`${site.name}: llms.txt must start with an h1 and include a summary blockquote`);
    }
    const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(([, url]) => url);
    if (links.length === 0) findings.push(`${site.name}: llms.txt contains no links`);
    const page = { site, path: "/llms.txt", html: "", ids: new Set() };
    for (const link of links) checkTarget(page, link, "llms.txt link");
  }
}

if (findings.length > 0) {
  console.error(findings.join("\n"));
  process.exit(1);
}

console.log("Built output verified: URLs, links, metadata, schema, assets, and sitemaps.");
