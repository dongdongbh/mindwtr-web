export type Platform = "mac" | "windows" | "linux" | "ios" | "android";

export interface PlatformNavigator {
  userAgent?: string;
  platform?: string;
  maxTouchPoints?: number;
  userAgentData?: { mobile?: boolean; platform?: string };
}

/**
 * Best-effort client-side platform sniffing. Order matters: iOS and Android
 * user-agents also contain "Mac" / "Linux", so they must be checked first.
 * Anything unrecognized returns null and the CTA stays neutral.
 */
export function detectPlatform(nav: PlatformNavigator): Platform | null {
  const ua = nav.userAgent || "";
  const legacy = nav.platform || "";
  const legacyLower = legacy.toLowerCase();
  const hint = (nav.userAgentData?.platform || "").toLowerCase();

  // iPadOS can report a desktop Mac platform and UA. Require multiple touch
  // points so a desktop Mac with a touch-capable accessory remains macOS.
  const isLegacyIos = /^(iphone|ipad|ipod)$/.test(legacyLower);
  const isIpadOS = legacy === "MacIntel" && (nav.maxTouchPoints ?? 0) > 1;
  if (/iphone|ipad|ipod/i.test(ua) || isLegacyIos || isIpadOS) return "ios";

  // Chromium freezes this exact digit-one value for Android, including when
  // desktop mode makes both the UA and client hints look like desktop Linux.
  // Current Chromium Linux instead freezes navigator.platform to x86_64.
  if (legacy === "Linux armv81") return "android";

  // Prefer the platform client hint when Chromium exposes it. It stays
  // Android in many embedded and desktop-shaped browser configurations.
  if (hint === "android") return "android";
  if (hint === "windows") return "windows";
  if (hint === "macos") return "mac";
  if (hint === "ios") return "ios";

  // Chromium exposes the mobile bit as a default low-entropy hint. Some
  // Android scanners reduce the platform and UA to Linux but preserve this
  // bit, which is enough to recover the Android store without guessing from
  // screen size or touch support.
  if (nav.userAgentData?.mobile === true && (!hint || hint === "linux")) {
    return "android";
  }

  if (/android/i.test(ua)) return "android";
  if (/windows|win32|win64/i.test(ua) || /^win/i.test(legacy)) {
    return "windows";
  }
  if (/macintosh|mac os x/i.test(ua) || /^mac/i.test(legacy)) {
    return "mac";
  }
  if (/linux|x11|cros/i.test(ua) || hint === "linux" || /linux/i.test(legacy)) {
    return "linux";
  }
  return null;
}
