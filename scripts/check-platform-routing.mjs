import assert from "node:assert/strict";
import { detectPlatform } from "../landing/src/platform.ts";

const desktopLinuxUa =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36";

assert.equal(
  detectPlatform({
    userAgent: desktopLinuxUa,
    platform: "Linux armv81",
    maxTouchPoints: 5,
    userAgentData: { platform: "Linux", mobile: false },
  }),
  "android",
  "Android desktop mode must retain its reduced navigator.platform signal",
);

for (const platform of ["Linux x86_64", "Linux aarch64", "Linux armv8l"]) {
  assert.equal(
    detectPlatform({
      userAgent: desktopLinuxUa,
      platform,
      maxTouchPoints: 5,
      userAgentData: { platform: "Linux", mobile: false },
    }),
    "linux",
    `${platform} must not be redirected as Android`,
  );
}

for (const platform of ["iPhone", "iPad", "iPod"]) {
  assert.equal(
    detectPlatform({ userAgent: "", platform, maxTouchPoints: 1 }),
    "ios",
    `${platform} must use the iOS App Store route`,
  );
}

assert.equal(
  detectPlatform({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15",
    platform: "MacIntel",
    maxTouchPoints: 5,
    userAgentData: { platform: "macOS", mobile: false },
  }),
  "ios",
  "iPadOS desktop browsing must take precedence over its macOS-shaped values",
);

for (const maxTouchPoints of [0, 1]) {
  assert.equal(
    detectPlatform({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15",
      platform: "MacIntel",
      maxTouchPoints,
    }),
    "mac",
    `MacIntel with ${maxTouchPoints} touch point(s) must remain macOS`,
  );
}

assert.equal(
  detectPlatform({
    userAgent: "",
    platform: "",
    maxTouchPoints: 0,
    userAgentData: { platform: "macOS", mobile: false },
  }),
  "mac",
  "the modern macOS client hint must use the macOS App Store route",
);

console.log("Platform routing checks passed.");
