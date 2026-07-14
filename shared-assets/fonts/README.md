# Fonts

## Instrument Serif

- **Files:** `instrument-serif-latin.woff2`, `instrument-serif-latin-ext.woff2`
- **Designer:** Rodrigo Fuenzalida, Jean Wojciechowski
- **Source:** https://fonts.google.com/specimen/Instrument+Serif
- **Licence:** SIL Open Font License 1.1 — https://openfontlicense.org/

Self-hosted deliberately. Loading these from `fonts.gstatic.com` would make every
visitor's browser issue a request to Google before the page renders, which breaks
the site's no-third-party-requests rule. Serving them from our own origin keeps
that promise and removes a render-blocking round trip.

Subset to latin + latin-ext with `unicode-range` on each `@font-face`, so the
Chinese pages never download them — CJK headings fall through to the system stack.
