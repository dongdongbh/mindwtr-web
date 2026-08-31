import "./styles.css";
import { initCoverflow } from "./coverflow";
import { initLoopTour } from "./tour";

type Platform = "mac" | "windows" | "linux" | "ios" | "android";

/** Display label per platform, used to personalize the hero CTA. */
const PLATFORM_LABEL: Record<Platform, string> = {
  mac: "macOS",
  windows: "Windows",
  linux: "Linux",
  ios: "iOS",
  android: "Android",
};

type Locale = "en" | "de" | "es" | "fr" | "zh-Hans" | "zh-Hant";

/**
 * The few strings this script writes into the page. Everything else is
 * translated in the HTML itself; the page's <html lang> attribute tells us
 * which language the visitor is reading.
 */
const JS_STRINGS: Record<Locale, { downloadFor: (platform: string) => string; copied: string }> = {
  en: { downloadFor: (p) => `Download for ${p}`, copied: "Copied" },
  de: { downloadFor: (p) => `Für ${p} herunterladen`, copied: "Kopiert" },
  es: { downloadFor: (p) => `Descargar para ${p}`, copied: "Copiado" },
  fr: { downloadFor: (p) => `Télécharger pour ${p}`, copied: "Copié" },
  "zh-Hans": { downloadFor: (p) => `下载 ${p} 版`, copied: "已复制" },
  "zh-Hant": { downloadFor: (p) => `下載 ${p} 版`, copied: "已複製" },
};

function pageLocale(): Locale {
  const lang = (document.documentElement.lang || "en").toLowerCase();
  if (lang.startsWith("zh")) return lang.includes("hant") ? "zh-Hant" : "zh-Hans";
  const short = lang.slice(0, 2);
  return short in JS_STRINGS ? (short as Locale) : "en";
}

/**
 * Best-effort client-side platform sniffing. Order matters: iOS and Android
 * user-agents also contain "Mac" / "Linux", so they must be checked first.
 * Anything unrecognized returns null and the CTA stays neutral.
 */
function detectPlatform(): Platform | null {
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  const ua = nav.userAgent || "";
  const legacy = nav.platform || "";
  const hint = (nav.userAgentData?.platform || "").toLowerCase();

  // iPadOS reports as "MacIntel" with a touch screen.
  const isIpadOS = legacy === "MacIntel" && nav.maxTouchPoints > 1;
  if (/iphone|ipad|ipod/i.test(ua) || isIpadOS) return "ios";

  if (/android/i.test(ua) || hint === "android") return "android";
  if (/windows|win32|win64/i.test(ua) || hint === "windows" || /^win/i.test(legacy)) {
    return "windows";
  }
  if (/macintosh|mac os x/i.test(ua) || hint === "macos" || /^mac/i.test(legacy)) {
    return "mac";
  }
  if (/linux|x11|cros/i.test(ua) || hint === "linux" || /linux/i.test(legacy)) {
    return "linux";
  }
  return null;
}

/**
 * Highlight the visitor's platform card and personalize the hero CTA label.
 * The CTA keeps its in-page "#download" target (detect-to-surface, never gate):
 * it scrolls to the grid with the right card already highlighted, so a wrong
 * guess is harmless — every channel stays visible and one click away.
 */
function applyPlatform(platform: Platform | null): void {
  if (!platform) return;

  const card = document.querySelector<HTMLElement>(
    `.dl-platform[data-platform="${platform}"]`,
  );
  if (card) {
    card.classList.add("is-detected");
    const pill = card.querySelector<HTMLElement>(".dl-recommended");
    if (pill) pill.hidden = false;
  }

  const cta = document.getElementById("primary-download");
  if (cta instanceof HTMLAnchorElement) {
    cta.textContent = JS_STRINGS[pageLocale()].downloadFor(PLATFORM_LABEL[platform]);
    // Anchor at the detected card, not the section wrapper, so a stacked
    // mobile layout scrolls to the visitor's card (e.g. Android, far down the
    // stack) rather than the section top (macOS, first card).
    if (card) cta.setAttribute("href", `#download-${platform}`);
  }
}

/** Upgrade command chips into copy-to-clipboard buttons where supported. */
function wireCopyButtons(): void {
  if (!navigator.clipboard) return;

  document.querySelectorAll<HTMLButtonElement>(".dl-copy").forEach((button) => {
    const command = button.dataset.copy;
    if (!command) return;

    const idleLabel = button.textContent || "Copy";
    button.hidden = false;

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(command);
        button.classList.add("is-copied");
        button.textContent = JS_STRINGS[pageLocale()].copied;
        window.setTimeout(() => {
          button.classList.remove("is-copied");
          button.textContent = idleLabel;
        }, 1600);
      } catch {
        // Clipboard write can fail (permissions, insecure context); the command
        // text stays visible and selectable, so no fallback is needed.
      }
    });
  });
}

/**
 * Remember an explicit language choice from the header dropdown. The inline
 * detect script in the page head (see chrome.ts) never redirects once this
 * key is set, so a visitor who picks a language keeps it. The dropdown is a
 * native <details>, so it opens and closes without JS; this only adds the
 * expected light-dismiss on outside clicks.
 */
function wireLanguageSwitch(): void {
  document.querySelectorAll<HTMLAnchorElement>("a[data-lang-switch]").forEach((link) => {
    link.addEventListener("click", () => {
      try {
        localStorage.setItem("mindwtr-lang", link.dataset.langSwitch || "en");
      } catch {
        // Storage can be unavailable (private mode); the link still navigates.
      }
    });
  });

  const menu = document.querySelector<HTMLElement>("details.lang-menu");
  if (menu instanceof HTMLDetailsElement) {
    document.addEventListener("click", (event) => {
      if (menu.open && event.target instanceof Node && !menu.contains(event.target)) {
        menu.open = false;
      }
    });
  }
}

/**
 * Scroll-morph the header. At the top of the page it has no chrome at all and
 * sits directly on the paper; once the page scrolls it grows a blurred bar.
 * A zero-height sentinel at the top of the document does the detection, so
 * there's no scroll handler running on every frame — the observer only fires
 * when the sentinel crosses the viewport edge. All the morphing is CSS.
 */
function wireHeaderMorph(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!header) return;

  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px;pointer-events:none;";
  document.body.prepend(sentinel);

  if (!("IntersectionObserver" in window)) {
    header.classList.add("is-stuck");
    return;
  }

  new IntersectionObserver(
    ([entry]) => header.classList.toggle("is-stuck", !entry.isIntersecting),
    { threshold: 0 },
  ).observe(sentinel);
}

/**
 * The demo clips autoplay because they read as animated stills, not as video.
 * For anyone asking for reduced motion that reading is wrong, so the clip
 * stops and grows controls — still there, just no longer moving on its own.
 */
function calmShotVideos(): void {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document
    .querySelectorAll<HTMLVideoElement>(".article-shot video, .feature-shot video")
    .forEach((video) => {
      video.autoplay = false;
      video.removeAttribute("autoplay");
      video.controls = true;
      video.pause();
    });
}

/**
 * The video cards ship as plain links to YouTube with a locally hosted poster,
 * so the page makes no Google request on load. A plain left-click swaps the
 * poster for a youtube-nocookie embed and plays in place; modified clicks,
 * middle-click and no-JS visitors keep the ordinary link.
 */
function wireVideoCards(): void {
  document.querySelectorAll<HTMLAnchorElement>("a.video-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      const id = card.href.match(/youtu\.be\/([\w-]{6,})/)?.[1];
      const poster = card.querySelector<HTMLElement>(".video-poster");
      if (!id || !poster) return;
      event.preventDefault();
      const iframe = document.createElement("iframe");
      iframe.className = "video-embed";
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      iframe.title = card.querySelector("h3")?.textContent ?? "YouTube";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;
      poster.replaceChildren(iframe);
    });
  });
}

function init(): void {
  applyPlatform(detectPlatform());
  wireCopyButtons();
  wireLanguageSwitch();
  wireHeaderMorph();
  initCoverflow();
  initLoopTour();
  calmShotVideos();
  wireVideoCards();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
