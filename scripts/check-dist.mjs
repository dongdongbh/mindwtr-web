import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { resolve, join, posix } from "node:path";

// Verifies the built output of both sites — the same files Cloudflare serves.
// Checks: internal links and asset references resolve (including cross-site
// links between mindwtr.app and docs.mindwtr.app), fragment targets exist,
// canonical/og:url match each page's served URL, social images exist, and the
// landing sitemap lists exactly the pages that were emitted.
// Run after both builds: `bun run check` does this automatically.

const root = resolve(import.meta.dirname, "..");

const sites = {
  "https://mindwtr.app": { name: "landing", dist: resolve(root, "landing/dist") },
  "https://docs.mindwtr.app": { name: "docs", dist: resolve(root, "docs/.vitepress/dist") }
};

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

  for (const [origin, site] of Object.entries(sites)) {
    site.origin = origin;
    site.redirects = loadRedirects(site);
    site.files = walk(site.dist);
    for (const file of site.files.filter((f) => f.endsWith(".html"))) {
      const html = readFileSync(file, "utf8");
      const ids = new Set([...html.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1]));
      pages.set(file, { site, path: pagePath(site, file), html, ids });
    }
  }

  const siteByOrigin = (url) =>
    Object.entries(sites).find(([origin]) => url === origin || url.startsWith(`${origin}/`));

  function checkTarget(page, raw, label) {
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
    const metas = [...page.html.matchAll(/<meta\s+([^>]*?)\/?>/g)].map(([, attrs]) =>
      Object.fromEntries([...attrs.matchAll(/([\w:.-]+)="([^"]*)"/g)].map(([, k, v]) => [k, v]))
    );
    const metaValue = (key) =>
      metas.find((m) => m.property === key || m.name === key)?.content;

    for (const key of ["og:image", "twitter:image"]) {
      const value = metaValue(key);
      if (value) checkTarget(page, value, key);
    }

    const expected = `${page.site.origin}${page.path}`;
    const is404 = page.path.endsWith("/404");
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
  }

  // Sitemaps: every listed URL must resolve; the landing sitemap must also
  // list every emitted page (docs pages are curated by VitePress itself).
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
    if (site.name === "landing") {
      const listed = new Set(locs);
      for (const page of pages.values()) {
        if (page.site !== site || page.path.endsWith("/404")) continue;
        const url = `${site.origin}${page.path}`;
        if (!listed.has(url)) findings.push(`landing: page ${url} missing from sitemap`);
      }
    }
  }
}

if (findings.length > 0) {
  console.error(findings.join("\n"));
  process.exit(1);
}

console.log("Built output verified: links, fragments, canonicals, social images, and sitemaps.");
