import { basename, relative, sep } from "node:path";
import type { Plugin } from "vite";

// Page chrome for the landing: the head boilerplate, header, and footer that
// every page shares, injected at build/serve time so each page file carries
// only its own content and a small head (title, description, og:title,
// og:description). The canonical URL, og:url, hreflang alternates, and nav
// aria-current state are derived from the page's path, so they cannot drift
// per page. English pages are flat under landing/ — index.html serves "/",
// <name>.html serves "/<name>". Translated pages mirror them under
// landing/<locale>/ and serve at "/<locale>/" and "/<locale>/<name>".

const ORIGIN = "https://mindwtr.app";

export const LOCALES = ["en", "de", "es", "fr", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

// Pages that exist in every locale. Legal pages (privacy, brand) stay
// English-only so the canonical legal wording cannot drift in translation.
const LOCALIZED_PAGES = new Set(["index", "features", "gtd", "donate", "support"]);

const HREFLANG: Record<Locale, string> = {
  en: "en",
  de: "de",
  es: "es",
  fr: "fr",
  zh: "zh-Hans"
};

const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  zh: "简体中文"
};

// Short label shown on the closed header dropdown.
const LANGUAGE_SHORT: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  es: "ES",
  fr: "FR",
  zh: "中文"
};

interface ChromeStrings {
  features: string;
  gtd: string;
  docs: string;
  support: string;
  download: string;
  donate: string;
  brand: string;
  privacy: string;
  homeAria: string;
  primaryNavAria: string;
  footerAria: string;
  languageAria: string;
  copyright: string;
  legal: string;
}

const STRINGS: Record<Locale, ChromeStrings> = {
  en: {
    features: "Features",
    gtd: "What is GTD",
    docs: "Docs",
    support: "Support",
    download: "Download",
    donate: "Donate",
    brand: "Brand",
    privacy: "Privacy",
    homeAria: "Mindwtr home",
    primaryNavAria: "Primary navigation",
    footerAria: "Footer",
    languageAria: "Language",
    copyright: "Free and open source (AGPL-3.0)",
    legal:
      "Mindwtr and the Mindwtr logo are trademarks of the Mindwtr project. " +
      "Getting Things Done and GTD are registered trademarks of the David Allen " +
      "Company. Mindwtr is not affiliated with, endorsed by, or sponsored by the " +
      "David Allen Company."
  },
  de: {
    features: "Funktionen",
    gtd: "Was ist GTD",
    docs: "Doku",
    support: "Support",
    download: "Download",
    donate: "Spenden",
    brand: "Marke",
    privacy: "Datenschutz",
    homeAria: "Mindwtr Startseite",
    primaryNavAria: "Hauptnavigation",
    footerAria: "Fußzeile",
    languageAria: "Sprache",
    copyright: "Frei und Open Source (AGPL-3.0)",
    legal:
      "Mindwtr und das Mindwtr-Logo sind Marken des Mindwtr-Projekts. " +
      "Getting Things Done und GTD sind eingetragene Marken der David Allen " +
      "Company. Mindwtr ist nicht mit der David Allen Company verbunden und " +
      "wird von ihr weder unterstützt noch gesponsert."
  },
  es: {
    features: "Funciones",
    gtd: "Qué es GTD",
    docs: "Docs",
    support: "Soporte",
    download: "Descargar",
    donate: "Donar",
    brand: "Marca",
    privacy: "Privacidad",
    homeAria: "Inicio de Mindwtr",
    primaryNavAria: "Navegación principal",
    footerAria: "Pie de página",
    languageAria: "Idioma",
    copyright: "Libre y de código abierto (AGPL-3.0)",
    legal:
      "Mindwtr y el logotipo de Mindwtr son marcas del proyecto Mindwtr. " +
      "Getting Things Done y GTD son marcas registradas de David Allen " +
      "Company. Mindwtr no está afiliado a David Allen Company ni cuenta con " +
      "su respaldo o patrocinio."
  },
  fr: {
    // "Fonctionnalités" overflows the sticky header on phones; the page
    // itself still uses the full word.
    features: "Fonctions",
    gtd: "C'est quoi, GTD",
    docs: "Docs",
    support: "Support",
    download: "Télécharger",
    donate: "Faire un don",
    brand: "Marque",
    privacy: "Confidentialité",
    homeAria: "Accueil Mindwtr",
    primaryNavAria: "Navigation principale",
    footerAria: "Pied de page",
    languageAria: "Langue",
    copyright: "Libre et open source (AGPL-3.0)",
    legal:
      "Mindwtr et le logo Mindwtr sont des marques du projet Mindwtr. " +
      "Getting Things Done et GTD sont des marques déposées de la David Allen " +
      "Company. Mindwtr n'est ni affilié à la David Allen Company, ni " +
      "approuvé ou sponsorisé par elle."
  },
  zh: {
    features: "功能",
    gtd: "什么是 GTD",
    docs: "文档",
    support: "支持",
    download: "下载",
    donate: "捐赠",
    brand: "品牌",
    privacy: "隐私",
    homeAria: "Mindwtr 首页",
    primaryNavAria: "主导航",
    footerAria: "页脚",
    languageAria: "语言",
    copyright: "自由开源（AGPL-3.0）",
    legal:
      "Mindwtr 及 Mindwtr 标志是 Mindwtr 项目的商标。Getting Things Done 和 " +
      "GTD 是 David Allen Company 的注册商标。Mindwtr 与 David Allen Company " +
      "无任何隶属、认可或赞助关系。"
  }
};

// Served URL of a page in a given locale: the English index is "/", locale
// indexes are "/<locale>/" (Cloudflare Pages serves directory indexes with a
// trailing slash), everything else drops the ".html".
function localePath(locale: Locale, page: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return page === "index" ? `${prefix}/` : `${prefix}/${page}`;
}

function anchor(
  link: { href: string; label: string; className?: string },
  pagePath: string
): string {
  const cls = link.className ? ` class="${link.className}"` : "";
  const current = link.href === pagePath ? ' aria-current="page"' : "";
  return `<a${cls} href="${link.href}"${current}>${link.label}</a>`;
}

// First-visit language detection, injected only into English pages that have
// translations. An explicit choice from the footer language switcher (stored
// by main.ts) always wins; without one, visitors whose browser prefers a
// language we ship are sent to that version once per page load. Traditional
// Chinese readers are not redirected to Simplified — they fall through to
// their next preferred language.
const DETECT_SCRIPT = `    <script>
      (function () {
        try {
          if (localStorage.getItem("mindwtr-lang")) return;
          var page = location.pathname.match(/^\\/(features|gtd|donate|support)?\\/?$/);
          if (!page) return;
          var offered = ["de", "es", "fr"];
          var langs = navigator.languages || [navigator.language || ""];
          var target = "";
          for (var i = 0; i < langs.length && !target; i++) {
            var code = String(langs[i]).toLowerCase();
            if (code.slice(0, 2) === "en") target = "en";
            else if (offered.indexOf(code.slice(0, 2)) !== -1) target = code.slice(0, 2);
            else if (/^zh/.test(code) && !/hant|tw|hk|mo/.test(code)) target = "zh";
          }
          if (!target || target === "en") return;
          var path = "/" + target + (page[1] ? "/" + page[1] : "/");
          location.replace(path + location.search + location.hash);
        } catch (e) {}
      })();
    </script>
`;

function sharedHeadMeta(locale: Locale, pageName: string, pagePath: string): string {
  const url = `${ORIGIN}${pagePath}`;
  const alternates = LOCALIZED_PAGES.has(pageName)
    ? LOCALES.map(
        (l) =>
          `    <link rel="alternate" hreflang="${HREFLANG[l]}" href="${ORIGIN}${localePath(l, pageName)}" />\n`
      ).join("") +
      `    <link rel="alternate" hreflang="x-default" href="${ORIGIN}${localePath("en", pageName)}" />\n`
    : "";
  const detect = locale === "en" && LOCALIZED_PAGES.has(pageName) ? DETECT_SCRIPT : "";
  return `    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ORIGIN}/assets/screenshots/social-preview.jpg" />
    <meta property="og:image:width" content="1280" />
    <meta property="og:image:height" content="640" />
    <meta property="og:image:alt" content="Mindwtr — Get Things Done. Local &amp; Open Source." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${ORIGIN}/assets/screenshots/social-preview.jpg" />
    <link rel="icon" href="/assets/brand/icon.png" />
    <link rel="canonical" href="${url}" />
${alternates}${detect}`;
}

function header(locale: Locale, pageName: string, pagePath: string): string {
  const t = STRINGS[locale];
  const home = localePath(locale, "index");
  // The homepage scrolls to its own download grid; other pages link back.
  const download = pagePath === home ? "#download" : `${home}#download`;
  // GitHub is the one header link narrow phones can live without (it stays
  // in the footer); nav-secondary hides it below 480px.
  const links = [
    { href: localePath(locale, "features"), label: t.features },
    { href: "https://docs.mindwtr.app/", label: t.docs },
    { href: "https://github.com/dongdongbh/Mindwtr", label: "GitHub", className: "nav-secondary" },
    { href: localePath(locale, "support"), label: t.support }
  ]
    .map((link) => `        ${anchor(link, pagePath)}`)
    .join("\n");
  return `    <header class="site-header">
      <a class="brand" href="${home}" aria-label="${t.homeAria}">
        <img src="/assets/brand/icon.png" alt="" />
        <span>Mindwtr</span>
      </a>
      <nav aria-label="${t.primaryNavAria}">
${links}
${languageMenu(locale, pageName, t)}        <a class="nav-download" href="${download}">${t.download}</a>
      </nav>
    </header>

`;
}

// The header language dropdown: a native <details> menu (works without JS,
// keyboard accessible) linking to the current page in every language it
// exists in. main.ts stores the clicked language so auto-detection never
// overrides an explicit choice, and closes the menu on outside clicks.
function languageMenu(locale: Locale, pageName: string, t: ChromeStrings): string {
  if (!LOCALIZED_PAGES.has(pageName)) return "";
  const check = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.6 4.6L19 7.5" /></svg>`;
  const links = LOCALES.map((l) => {
    const current = l === locale ? ' aria-current="true"' : "";
    return `            <li><a href="${localePath(l, pageName)}" hreflang="${HREFLANG[l]}" lang="${HREFLANG[l]}" data-lang-switch="${l}"${current}>${LANGUAGE_NAMES[l]}${l === locale ? check : ""}</a></li>`;
  }).join("\n");
  return `        <details class="lang-menu">
          <summary aria-label="${t.languageAria}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3.6 9h16.8M3.6 15h16.8M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" />
            </svg>
            <span class="lang-current" aria-hidden="true">${LANGUAGE_SHORT[locale]}</span>
          </summary>
          <ul class="lang-menu-list">
${links}
          </ul>
        </details>
`;
}

function footer(locale: Locale, pagePath: string): string {
  const t = STRINGS[locale];
  const links = [
    { href: localePath(locale, "features"), label: t.features },
    { href: localePath(locale, "gtd"), label: t.gtd },
    { href: "https://docs.mindwtr.app/", label: t.docs },
    { href: "https://github.com/dongdongbh/Mindwtr", label: "GitHub" },
    { href: localePath(locale, "support"), label: t.support },
    { href: localePath(locale, "donate"), label: t.donate },
    { href: "/brand", label: t.brand },
    { href: "/privacy", label: t.privacy }
  ]
    .map((link) => `        ${anchor(link, pagePath)}`)
    .join("\n");
  return `    <footer class="site-footer">
      <nav class="footer-nav" aria-label="${t.footerAria}">
        <span>Mindwtr</span>
${links}
      </nav>
      <p class="footer-copyright">
        &copy; 2025&ndash;2026 Dongda Li &middot; ${t.copyright}
      </p>
      <p class="footer-legal">
        ${t.legal}
      </p>
    </footer>

    <script type="module" src="/src/main.ts"></script>
`;
}

// Star count baked in at build time from the public GitHub API — no token and
// no client-side request, so visitors never talk to GitHub. Rounded down to
// the nearest hundred (shown as "1,200+"); offline builds keep the fallback.
const STARS_FALLBACK = 1200;
let starsRounded = STARS_FALLBACK;

async function fetchStars(): Promise<void> {
  try {
    const res = await fetch("https://api.github.com/repos/dongdongbh/Mindwtr", {
      signal: AbortSignal.timeout(5000)
    });
    if (!res.ok) return;
    const data = (await res.json()) as { stargazers_count?: number };
    if (typeof data.stargazers_count === "number" && data.stargazers_count > 0) {
      starsRounded = Math.floor(data.stargazers_count / 100) * 100;
    }
  } catch {
    // keep the fallback
  }
}

const STAR_LOCALE: Record<Locale, string> = {
  en: "en-US",
  de: "de-DE",
  es: "es-ES",
  fr: "fr-FR",
  zh: "zh-Hans-CN"
};

export function chrome(): Plugin {
  return {
    name: "mindwtr:chrome",
    async buildStart() {
      await fetchStars();
    },
    transformIndexHtml: {
      // "pre" so the injected main.ts script tag goes through Vite's own HTML
      // processing and gets bundled like a hand-written one.
      order: "pre",
      handler(html, ctx) {
        const rel = relative(import.meta.dirname, ctx.filename).split(sep).join("/");
        const [maybeLocale] = rel.split("/");
        const locale = (
          rel.includes("/") && (LOCALES as readonly string[]).includes(maybeLocale)
            ? maybeLocale
            : "en"
        ) as Locale;
        const pageName = basename(rel, ".html");
        const pagePath = localePath(locale, pageName);
        return html
          .replace(/[ \t]*<!-- chrome:.*?-->\n/gs, "")
          .replaceAll("__GITHUB_STARS__", `${starsRounded.toLocaleString(STAR_LOCALE[locale])}+`)
          .replace(
            "<head>",
            `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />`
          )
          .replace(/[ \t]*<\/head>/, `${sharedHeadMeta(locale, pageName, pagePath)}  </head>`)
          .replace("<body>", `<body>\n${header(locale, pageName, pagePath)}`)
          .replace(/[ \t]*<\/body>/, `${footer(locale, pagePath)}  </body>`);
      }
    }
  };
}
