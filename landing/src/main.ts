import "./styles.css";

type DownloadTarget = {
  label: string;
  href: string;
};

const downloads: Record<string, DownloadTarget> = {
  android: {
    label: "Get Mindwtr on Google Play",
    href: "https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr"
  },
  ios: {
    label: "Download on the App Store",
    href: "https://apps.apple.com/app/mindwtr/id6758597144"
  },
  mac: {
    label: "Download for macOS",
    href: "https://apps.apple.com/app/mindwtr/id6758597144"
  },
  windows: {
    label: "Get Mindwtr from Microsoft Store",
    href: "https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare"
  },
  linux: {
    label: "Install from Flathub",
    href: "https://flathub.org/apps/tech.dongdongbh.mindwtr"
  },
  fallback: {
    label: "Download Mindwtr",
    href: "#download"
  }
};

function detectPlatform(userAgent: string, platform: string): keyof typeof downloads {
  const source = `${userAgent} ${platform}`.toLowerCase();

  if (source.includes("android")) return "android";
  if (/iphone|ipad|ipod/.test(source)) return "ios";
  if (source.includes("mac")) return "mac";
  if (source.includes("win")) return "windows";
  if (/linux|x11|wayland/.test(source)) return "linux";

  return "fallback";
}

const primaryDownload = document.querySelector<HTMLAnchorElement>("#primary-download");

if (primaryDownload) {
  const target = downloads[detectPlatform(navigator.userAgent, navigator.platform)];
  primaryDownload.href = target.href;
  primaryDownload.textContent = target.label;
}
