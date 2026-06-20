import "./styles.css";

type Platform = "mac" | "windows" | "linux" | "ios" | "android";

/**
 * Recommended one-click channel per platform. Detection sets the hero CTA to
 * these; it never hides the full grid, so a wrong guess is never a dead end.
 */
const RECOMMENDED: Record<Platform, { href: string; label: string }> = {
  mac: { href: "https://apps.apple.com/app/mindwtr/id6758597144", label: "macOS" },
  windows: {
    href: "https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare",
    label: "Windows",
  },
  linux: { href: "https://flathub.org/apps/tech.dongdongbh.mindwtr", label: "Linux" },
  ios: { href: "https://apps.apple.com/app/mindwtr/id6758597144", label: "iOS" },
  android: {
    href: "https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr",
    label: "Android",
  },
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

/** Highlight the visitor's platform card and point the hero CTA at its store. */
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
  const rec = RECOMMENDED[platform];
  if (cta instanceof HTMLAnchorElement && rec) {
    cta.href = rec.href;
    cta.textContent = `Download for ${rec.label}`;
    cta.rel = "noopener";
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
