import "./styles.css";
import { initCoverflow } from "./coverflow";

type Platform = "mac" | "windows" | "linux" | "ios" | "android";

/** Display label per platform, used to personalize the hero CTA. */
const PLATFORM_LABEL: Record<Platform, string> = {
  mac: "macOS",
  windows: "Windows",
  linux: "Linux",
  ios: "iOS",
  android: "Android",
};

type Locale = "en" | "de" | "es" | "fr" | "zh";

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
  zh: { downloadFor: (p) => `下载 ${p} 版`, copied: "已复制" },
};

function pageLocale(): Locale {
  const lang = (document.documentElement.lang || "en").toLowerCase();
  if (lang.startsWith("zh")) return "zh";
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
 * Remember an explicit language choice from the footer switcher. The inline
 * detect script in the page head (see chrome.ts) never redirects once this
 * key is set, so a visitor who picks a language keeps it.
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
}

function init(): void {
  applyPlatform(detectPlatform());
  wireCopyButtons();
  wireLanguageSwitch();
  initCoverflow();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
