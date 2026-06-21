# Mindwtr Support Page Design

Date: 2026-06-21
Status: Approved

## Goal

Add a calm, on-brand `/support` page to the landing site (`mindwtr.app`) that
consolidates every way to help Mindwtr — financial and non-financial — into one
shareable URL. Also swap the landing hero image for the new
`landing_image.png`.

The page must reflect Mindwtr's principles: free forever, no dark patterns,
technically honest, single source of truth. It leads with the free ways to help
and treats donation as one option among many, not the headline ask.

Competitor references: Planify's `/donate` and "Other Ways to Help" patterns,
and tududi's community surfacing. We borrow the consolidation and the
free-ways-to-help grid, but stay quieter (no gated perks, no "Best Value!"
energy, no fabricated testimonials).

## Scope

In scope:

- New `/support` page.
- Hero image swap on the landing page.
- Site-wide nav + footer link updates to point at `/support`.

Explicitly deferred (the maintainer's call, recorded so they are not silently
dropped):

- Testimonials / reviews wall — only if real, its own decision later.
- Landing/site FAQ — single-source-of-truth concern with the docs FAQ.
- Sponsor-avatar wall — vanity, skipped for now.

## Build / Architecture

The landing app is a single-entry Vite build today (`index.html` only, no
`vite.config`). Adding a second page requires a Vite config.

- Add `landing/vite.config.ts` declaring `build.rollupOptions.input` with both
  `index.html` and `support.html`. This is the only way Vite emits a second
  page; without it `support.html` is ignored.
- Create `landing/support.html` as the second entry at the landing root, so the
  build emits `dist/support.html`. Cloudflare Pages serves a root `foo.html` at
  the clean URL `/foo` automatically — so `support.html` resolves at `/support`.
  **This must be verified empirically, not assumed** (see Verification): confirm
  the built `dist/` contains `support.html` at its root and that `/support`
  resolves to it.
- Reuse `src/styles.css` and the existing class vocabulary (`section-band`,
  `eyebrow`, `trust-grid`, `button`, `site-header`, `site-footer`, etc.). Same
  cool clear-water palette and blue accent (`--ink #0d2b30`, `--paper #eef5f6`,
  `--blue #2e6be6`, `--teal #0e8c7c`). No new design language; new styles are
  additive support-specific classes appended to the same `styles.css`.
- Reuse `/src/main.ts` as the page's module entry. Its platform-detection and
  copy-button logic must no-op safely when its target elements are absent
  (no `.dl-platform`, `#primary-download`, or `.dl-copy` on `support.html`).
  The existing code already guards with null checks and `forEach` over empty
  NodeLists; this must be confirmed to produce **zero console errors** on
  `support.html` load (see Verification). No new JS file is introduced.
- `support.html` gets its own `<title>`, meta description, and OG/Twitter tags.
- Add `/support` to `landing/public/sitemap.xml`.

Forward-looking note (not a blocker): at two–three static pages, hand-managing
`rollupOptions.input` stays simple. If the site later grows toward many pages
(e.g. a future `/features`), revisit whether a light static-site generator beats
hand-wiring entries. Not now.

## Page Content

Calm, top to bottom. Free-ways-first ordering is a layout requirement: the
"Other ways to help" grid must get real estate near the top and must **not** be
buried beneath a large donation block.

1. **Header** — same `site-header`, with the new "Support" nav link present and
   marked as the current page.

2. **Hero (small)** — eyebrow "Support Mindwtr"; headline e.g. *"Help keep
   Mindwtr free."*; subhead leading with the free framing, e.g. *"Mindwtr is
   free, open-source, and has no subscription. Here are honest ways to keep it
   going — most of them don't cost anything."*

3. **Honest costs** — short band mirroring the README/FAQ copy. Mindwtr is free
   and always will be; the real costs are the **annual Apple Developer fee**
   (currently paid out of pocket, keeps the iOS app on the App Store), **domain
   renewal**, and **developer tooling**. Hosting is free thanks to Cloudflare —
   **no "keep servers running" line** (that would be untrue for us).

4. **Other ways to help (free)** — the borrowed-from-Planify grid, given
   prominence. Cards:
   - **Star on GitHub** → `https://github.com/dongdongbh/Mindwtr`
   - **Help translate** → the Translation contributions section of the guide
     (`https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md#translation-contributions`),
     which lists the locale files — lands translators exactly where they need to
     be, not a generic contributing page.
   - **Leave a store review** → App Store, Google Play, Microsoft Store
   - **Share Mindwtr** → share intents (X, Reddit) as used in the README
   - **Report bugs & ideas** → GitHub Issues
     (`https://github.com/dongdongbh/Mindwtr/issues`)

5. **Sponsor** — two calm cards, no gated perks, no hard-sell:
   - **GitHub Sponsors** (primary, recurring) →
     `https://github.com/sponsors/dongdongbh`
   - **Ko-fi** (one-off) → `https://ko-fi.com/D1D01T20WK`

   **CTA treatment: static, script-free only.** No Ko-fi JavaScript widget
   (floating button / embedded panel) — that would load a third-party script
   and tracking onto an otherwise script-free, privacy-respecting page. Use the
   official Ko-fi button image (sourced into `shared-assets/badges/`) as a plain
   link out, matching the existing badge pattern. GitHub Sponsors uses a
   matching static link/button. Final visual treatment is chosen during
   implementation to stay coherent with the water palette, and verified
   visually.

6. **Community** — surface **Discord** prominently
   (`https://discord.gg/ahhFxuDBb4`) for chat, **alongside GitHub Discussions /
   Issues** so the bug/feature flow stays GitHub-first. Discord is for
   conversation; real issues and feature requests route through GitHub. Do not
   let Discord read as the default support channel.

7. **Footer** — same `site-footer`.

Section order note: sections 4 (free) and 5 (sponsor) put the free ways above
the donation block deliberately, matching the "no pressure, free-ways-first"
framing. Honest-costs (3) sits between hero and free-ways to explain *why*
support helps before asking for anything.

## Hero Image Swap

- Replace the landing hero media image with
  `shared-assets/screenshots/landing_image.png` (PNG, `1672x941` — identical
  dimensions to the current `hero-showcase.jpg`, so it drops into the existing
  `.desktop-frame` with no layout change).
- Update `landing/index.html`:
  - The hero `<img>` (`src="/assets/screenshots/hero-showcase.jpg"`) →
    `/assets/screenshots/landing_image.png`.
  - The `<link rel="preload" as="image" ...>` for the old hero image → the new
    image, so the preload still matches what renders.
- The asset is already in `shared-assets/screenshots/`; `scripts/sync-assets.mjs`
  copies it into `landing/public/assets/` on build. Run the sync locally so dev
  preview and verification see it.
- Leave the old `hero-showcase.jpg` in place (still referenced nowhere after the
  swap, but harmless; removal is out of scope unless requested).

## Site-Wide Changes

- `landing/index.html`:
  - Add a quiet **"Support"** link to the primary nav.
  - Replace the two raw footer links (**GitHub Sponsors**, **Ko-fi**) with a
    single **"Support"** link → `/support`, consolidating them into the new page.
- `landing/support.html`: same header and footer for consistency, with "Support"
  marked current in the nav.

## Verification

Empirical checks, not assumptions:

1. Run `bun run build` (or the landing build) and confirm `dist/support.html`
   exists at the `dist/` root and references the shared styles/JS correctly.
2. Serve the built `dist/` (e.g. `vite preview`) and confirm:
   - `/support` resolves to the support page (clean URL, not requiring
     `/support.html`).
   - Loading `/support` produces **zero console errors** (main.ts no-ops
     cleanly with no download/copy elements present).
   - The landing hero shows `landing_image.png`.
   - The new nav "Support" link and the consolidated footer "Support" link both
     navigate to `/support`.
3. `bun run check:secrets` and the existing `bun run check` pass.

## Out of Scope

- Docs-site changes (`docs/`).
- Any backend, analytics, or dynamic sponsor data.
- The deferred items listed under Scope.
