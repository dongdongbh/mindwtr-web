import { createLocaleConfig, withLocale } from "./base.mjs";
import de from "./de.mjs";
import en from "./en.mjs";
import es from "./es.mjs";
import fr from "./fr.mjs";
import zhHans from "./zh-Hans.mjs";
import zhHant from "./zh-Hant.mjs";

export const DOCS_LOCALE_ORDER = ["root", "de", "es", "fr", "zh-Hans", "zh-Hant"];

export const DOCS_LOCALE_MESSAGES = {
  root: en,
  de,
  es,
  fr,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant
};

export const DOCS_LOCALES = Object.fromEntries(
  DOCS_LOCALE_ORDER.map((localeKey) => [
    localeKey,
    createLocaleConfig(localeKey, DOCS_LOCALE_MESSAGES[localeKey])
  ])
);

export function docsLocaleForPath(relativePath) {
  for (const localeKey of DOCS_LOCALE_ORDER) {
    if (localeKey !== "root" && relativePath.startsWith(`${localeKey}/`)) return localeKey;
  }
  return "root";
}

export function stripDocsLocale(relativePath) {
  const localeKey = docsLocaleForPath(relativePath);
  return localeKey === "root" ? relativePath : relativePath.slice(localeKey.length + 1);
}

export function localizedDocsPath(localeKey, baseRelativePath) {
  const path = baseRelativePath
    .replace(/^\//, "")
    .replace(/index\.md$/, "")
    .replace(/\.md$/, "");
  return withLocale(localeKey, `/${path}`);
}
