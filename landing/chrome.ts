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

export const LOCALES = ["en", "de", "es", "fr", "zh-Hans", "zh-Hant"] as const;
export type Locale = (typeof LOCALES)[number];

// Pages that exist in every locale. English remains the source text for the
// translated brand and privacy pages.
const LOCALIZED_PAGES = new Set([
  "index",
  "features",
  "gtd",
  "donate",
  "support",
  "brand",
  "privacy"
]);

const HREFLANG: Record<Locale, string> = {
  en: "en",
  de: "de",
  es: "es",
  fr: "fr",
  "zh-Hans": "zh-Hans",
  "zh-Hant": "zh-Hant"
};

const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文"
};

// Short label shown on the closed header dropdown.
const LANGUAGE_SHORT: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  es: "ES",
  fr: "FR",
  "zh-Hans": "简中",
  "zh-Hant": "繁中"
};

const DOCS_PATH: Record<Locale, string> = {
  en: "https://docs.mindwtr.app/",
  de: "https://docs.mindwtr.app/de/",
  es: "https://docs.mindwtr.app/es/",
  fr: "https://docs.mindwtr.app/fr/",
  "zh-Hans": "https://docs.mindwtr.app/zh-Hans/",
  "zh-Hant": "https://docs.mindwtr.app/zh-Hant/"
};

interface ChromeStrings {
  features: string;
  gtd: string;
  guides: string;
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
  socialImageAlt: string;
}

const STRINGS: Record<Locale, ChromeStrings> = {
  en: {
    features: "Features",
    gtd: "What is GTD",
    guides: "Guides",
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
    socialImageAlt: "Mindwtr — Get Things Done. Local and open source.",
    legal:
      "Mindwtr and the Mindwtr logo are trademarks of the Mindwtr project. " +
      "Getting Things Done and GTD are registered trademarks of the David Allen " +
      "Company. Mindwtr is not affiliated with, endorsed by, or sponsored by the " +
      "David Allen Company."
  },
  de: {
    features: "Funktionen",
    gtd: "Was ist GTD",
    guides: "Ratgeber",
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
    socialImageAlt: "Mindwtr — Getting Things Done. Lokal und Open Source.",
    legal:
      "Mindwtr und das Mindwtr-Logo sind Marken des Mindwtr-Projekts. " +
      "Getting Things Done und GTD sind eingetragene Marken der David Allen " +
      "Company. Mindwtr ist nicht mit der David Allen Company verbunden und " +
      "wird von ihr weder unterstützt noch gesponsert."
  },
  es: {
    features: "Funciones",
    gtd: "Qué es GTD",
    guides: "Guías",
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
    socialImageAlt: "Mindwtr — Getting Things Done. Local y de código abierto.",
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
    guides: "Guides",
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
    socialImageAlt: "Mindwtr — Getting Things Done. Local et open source.",
    legal:
      "Mindwtr et le logo Mindwtr sont des marques du projet Mindwtr. " +
      "Getting Things Done et GTD sont des marques déposées de la David Allen " +
      "Company. Mindwtr n'est ni affilié à la David Allen Company, ni " +
      "approuvé ou sponsorisé par elle."
  },
  "zh-Hans": {
    features: "功能",
    gtd: "什么是 GTD",
    guides: "指南",
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
    socialImageAlt: "Mindwtr — 践行 GTD，本地优先且开源。",
    legal:
      "Mindwtr 及 Mindwtr 标志是 Mindwtr 项目的商标。Getting Things Done 和 " +
      "GTD 是 David Allen Company 的注册商标。Mindwtr 与 David Allen Company " +
      "无任何隶属、认可或赞助关系。"
  },
  "zh-Hant": {
    features: "功能",
    gtd: "什麼是 GTD",
    guides: "指南",
    docs: "文件",
    support: "支援",
    download: "下載",
    donate: "捐贈",
    brand: "品牌",
    privacy: "隱私",
    homeAria: "Mindwtr 首頁",
    primaryNavAria: "主導覽",
    footerAria: "頁尾",
    languageAria: "語言",
    copyright: "自由開源（AGPL-3.0）",
    socialImageAlt: "Mindwtr — 實踐 GTD，在地優先且開源。",
    legal:
      "Mindwtr 及 Mindwtr 標誌是 Mindwtr 專案的商標。Getting Things Done 和 " +
      "GTD 是 David Allen Company 的註冊商標。Mindwtr 與 David Allen Company " +
      "無任何隸屬、認可或贊助關係。"
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
// language we ship are sent to that version once per page load. Chinese
// readers are routed by script: Hant/TW/HK/MO tags go to zh-Hant, everything
// else zh to zh-Hans.
const DETECT_SCRIPT = `    <script>
      (function () {
        try {
          if (localStorage.getItem("mindwtr-lang")) return;
          var page = location.pathname.match(/^\\/(features|gtd|donate|support|brand|privacy)?\\/?$/);
          if (!page) return;
          var offered = ["de", "es", "fr"];
          var langs = navigator.languages || [navigator.language || ""];
          var target = "";
          for (var i = 0; i < langs.length && !target; i++) {
            var code = String(langs[i]).toLowerCase();
            if (code.slice(0, 2) === "en") target = "en";
            else if (offered.indexOf(code.slice(0, 2)) !== -1) target = code.slice(0, 2);
            else if (/^zh/.test(code)) target = /hant|tw|hk|mo/.test(code) ? "zh-Hant" : "zh-Hans";
          }
          if (!target || target === "en") return;
          var path = "/" + target + (page[1] ? "/" + page[1] : "/");
          location.assign(path + location.search + location.hash);
        } catch (e) {}
      })();
    </script>
`;

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  es: "es_ES",
  fr: "fr_FR",
  "zh-Hans": "zh_CN",
  "zh-Hant": "zh_TW"
};

interface PageMeta {
  title: string;
  description: string;
  socialTitle: string;
  socialDescription: string;
}

function decodeHtml(value: string): string {
  const named: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"'
  };
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code: string) => {
    if (code.startsWith("#x")) return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    if (code.startsWith("#")) return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    return named[code.toLowerCase()] ?? entity;
  });
}

function jsonLd(value: unknown): string {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function structuredData(locale: Locale, pagePath: string, meta: PageMeta): string {
  const url = `${ORIGIN}${pagePath}`;
  return jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${ORIGIN}/#organization`,
        name: "Mindwtr project",
        url: ORIGIN,
        logo: `${ORIGIN}/assets/brand/icon.png`,
        sameAs: ["https://github.com/dongdongbh/Mindwtr"]
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${ORIGIN}/#software`,
        name: "Mindwtr",
        alternateName: "如水",
        url: ORIGIN,
        description:
          "A free, open-source, local-first GTD and to-do application for desktop, mobile, and web.",
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Windows, macOS, Linux, iOS, Android, Web",
        isAccessibleForFree: true,
        license: "https://www.gnu.org/licenses/agpl-3.0.html",
        publisher: { "@id": `${ORIGIN}/#organization` },
        sameAs: ["https://github.com/dongdongbh/Mindwtr"]
      },
      {
        "@type": "WebSite",
        "@id": `${ORIGIN}/#website`,
        name: "Mindwtr",
        url: ORIGIN,
        inLanguage: LOCALES.map((item) => HREFLANG[item]),
        publisher: { "@id": `${ORIGIN}/#organization` },
        about: { "@id": `${ORIGIN}/#software` }
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: decodeHtml(meta.title),
        description: decodeHtml(meta.description),
        inLanguage: HREFLANG[locale],
        isPartOf: { "@id": `${ORIGIN}/#website` },
        about: { "@id": `${ORIGIN}/#software` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${ORIGIN}/assets/screenshots/social-preview.jpg`
        }
      }
    ]
  });
}

function sharedHeadMeta(
  locale: Locale,
  pageName: string,
  pagePath: string,
  meta: PageMeta
): string {
  const url = `${ORIGIN}${pagePath}`;
  const t = STRINGS[locale];
  const alternates = LOCALIZED_PAGES.has(pageName)
    ? LOCALES.map(
        (l) =>
          `    <link rel="alternate" hreflang="${HREFLANG[l]}" href="${ORIGIN}${localePath(l, pageName)}" />\n`
      ).join("") +
      `    <link rel="alternate" hreflang="x-default" href="${ORIGIN}${localePath("en", pageName)}" />\n`
    : "";
  const detect = locale === "en" && LOCALIZED_PAGES.has(pageName) ? DETECT_SCRIPT : "";
  // The headline is the LCP element, so the display face is on the critical
  // path — preload it. Skipped on zh: its unicode-range excludes CJK, so the
  // Chinese pages never fetch the font and preloading it would be dead weight.
  const displayFont =
    locale.startsWith("zh")
      ? ""
      : `    <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/instrument-serif-latin.woff2" crossorigin />\n`;
  const alternateLocales = LOCALIZED_PAGES.has(pageName)
    ? LOCALES.filter((item) => item !== locale)
        .map((item) => `    <meta property="og:locale:alternate" content="${OG_LOCALE[item]}" />`)
        .join("\n") + "\n"
    : "";
  const canonical =
    pageName === "404" ? "" : `    <link rel="canonical" href="${url}" />\n`;
  const schema =
    pageName === "404"
      ? ""
      : `    <script type="application/ld+json">${structuredData(locale, pagePath, meta)}</script>\n`;
  return `    <meta property="og:site_name" content="Mindwtr" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${OG_LOCALE[locale]}" />
${alternateLocales}    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ORIGIN}/assets/screenshots/social-preview.jpg" />
    <meta property="og:image:width" content="1280" />
    <meta property="og:image:height" content="640" />
    <meta property="og:image:alt" content="${t.socialImageAlt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.socialTitle}" />
    <meta name="twitter:description" content="${meta.socialDescription}" />
    <meta name="twitter:image" content="${ORIGIN}/assets/screenshots/social-preview.jpg" />
    <meta name="twitter:image:alt" content="${t.socialImageAlt}" />
    <link rel="icon" type="image/png" sizes="96x96" href="/assets/brand/icon-96.png" />
${canonical}${schema}${displayFont}${alternates}${detect}`;
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
    // Docs and GitHub drop out on narrow phones — both are one tap away in the
    // footer, and a nav CTA that wraps or clips is worse than a shorter nav.
    { href: DOCS_PATH[locale], label: t.docs, className: "nav-tertiary" },
    { href: "https://github.com/dongdongbh/Mindwtr", label: "GitHub", className: "nav-secondary" },
    { href: localePath(locale, "support"), label: t.support }
  ]
    .map((link) => `        ${anchor(link, pagePath)}`)
    .join("\n");
  return `    <header class="site-header">
      <div class="site-header-inner">
        <a class="brand" href="${home}" aria-label="${t.homeAria}">
          <img src="/assets/brand/icon-96.png" alt="" width="34" height="34" />
          <span>Mindwtr</span>
        </a>
        <nav aria-label="${t.primaryNavAria}">
${links}
${languageMenu(locale, pageName, t)}          <a class="nav-download" href="${download}">${t.download}</a>
        </nav>
      </div>
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
    // The guides index is English-only, so every locale's footer points at
    // the same /guides page.
    { href: "/guides", label: t.guides },
    { href: DOCS_PATH[locale], label: t.docs },
    { href: "https://github.com/dongdongbh/Mindwtr", label: "GitHub" },
    { href: localePath(locale, "support"), label: t.support },
    { href: localePath(locale, "donate"), label: t.donate },
    { href: localePath(locale, "brand"), label: t.brand },
    { href: localePath(locale, "privacy"), label: t.privacy }
  ]
    .map((link) => `        ${anchor(link, pagePath)}`)
    .join("\n");
  return `    <footer class="site-footer">
      <nav class="footer-nav" aria-label="${t.footerAria}">
        <span>Mindwtr&trade;</span>
${links}
      </nav>
      <div class="footer-social">
        <a href="https://github.com/dongdongbh/Mindwtr" aria-label="GitHub"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
        <a href="https://discord.gg/gc4h5t58PR" aria-label="Discord"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg></a>
        <a href="https://www.youtube.com/@mindwtr" aria-label="YouTube"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      </div>
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
  "zh-Hans": "zh-Hans-CN",
  "zh-Hant": "zh-Hant-TW"
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
        const title = html.match(/<title(?:\s[^>]*)?>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "Mindwtr";
        const description =
          html.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i)?.[1] ?? "";
        const socialTitle =
          html.match(/<meta\s+property="og:title"\s+content="([^"]*)"\s*\/?>/i)?.[1] ?? title;
        const socialDescription =
          html.match(/<meta\s+property="og:description"\s+content="([^"]*)"\s*\/?>/i)?.[1] ??
          description;
        const meta = { title, description, socialTitle, socialDescription };
        return html
          .replace(/[ \t]*<!-- chrome:.*?-->\n/gs, "")
          .replaceAll("__GITHUB_STARS__", `${starsRounded.toLocaleString(STAR_LOCALE[locale])}+`)
          .replace(
            "<head>",
            `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />`
          )
          .replace(
            /[ \t]*<\/head>/,
            `${sharedHeadMeta(locale, pageName, pagePath, meta)}  </head>`
          )
          .replace("<body>", `<body>\n${header(locale, pageName, pagePath)}`)
          .replace(/[ \t]*<\/body>/, `${footer(locale, pagePath)}  </body>`);
      }
    }
  };
}
