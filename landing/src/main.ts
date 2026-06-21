import "./styles.css";

type Platform = "mac" | "windows" | "linux" | "ios" | "android";

/** Display label per platform, used to personalize the hero CTA. */
const PLATFORM_LABEL: Record<Platform, string> = {
  mac: "macOS",
  windows: "Windows",
  linux: "Linux",
  ios: "iOS",
  android: "Android",
};

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
    cta.textContent = `Download for ${PLATFORM_LABEL[platform]}`;
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
        button.textContent = "Copied";
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

function init(): void {
  applyPlatform(detectPlatform());
  wireCopyButtons();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
