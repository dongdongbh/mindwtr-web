# Support Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a calm, script-free `/support` page to the landing site that consolidates every way to help Mindwtr (free and financial), and swap the landing hero image for `landing_image.png`.

**Architecture:** The landing app is a single-entry Vite build. Add a Vite multi-entry config so a second page (`support.html`) is emitted to `dist/` root, which Cloudflare Pages serves at the clean URL `/support`. The page reuses `src/styles.css`, the existing class vocabulary, and `src/main.ts` (which no-ops with no download elements present). New styles are appended to the same `styles.css`.

**Tech Stack:** Bun, Vite, TypeScript (type-check only), hand-written HTML + CSS, Cloudflare Pages static output. No framework, no component library, **no third-party scripts or analytics**.

**Spec:** `project/design/2026-06-21-support-page-design.md`

## Global Constraints

- **No third-party scripts / no analytics / no embeds.** Sponsor CTAs are static links only — no Ko-fi JS widget.
- **Water palette tokens only** (already in `styles.css`): `--ink #0d2b30`, `--ink-soft #1c3b40`, `--muted #4c6a72`, `--paper #eef5f6`, `--surface #ffffff`, `--blue #2e6be6`, `--blue-deep #1b4fbe`, `--teal #0e8c7c`. No cream/green/gold.
- **Reuse existing classes** (`site-header`, `site-footer`, `section-band`, `eyebrow`, `button`, `trust-grid`, `feature-grid`, `text-link`) before adding new CSS. New CSS is appended to `landing/src/styles.css`.
- **Free-ways-first ordering is a hard layout requirement**: the "Ways to help (free)" grid sits *above* the Sponsor block. Never bury it.
- **Honest cost copy**: Apple Developer fee (out of pocket), domain renewal, dev tooling. **No "keep servers running" line** — hosting is free via Cloudflare.
- **Verify empirically**: confirm `dist/support.html` exists at dist root, `/support` resolves, and the page loads with **zero console errors**. Don't assume.
- `BUN_VERSION` pinned to `.bun-version` (currently `1.3.3`) on Cloudflare; build locally with the repo's Bun.
- Build command (from repo root): `bun run landing:build`. Secret scan: `bun run check:secrets`. Full gate: `bun run check`.

---

## File Structure

- Create: `landing/vite.config.ts` — Vite multi-entry config (the two HTML inputs).
- Create: `landing/support.html` — the `/support` page (head, shared header, sections, shared footer).
- Create: `shared-assets/badges/kofi.svg` — official Ko-fi button image, sourced once and committed (synced into `landing/public/assets/badges/` by `sync-assets.mjs`).
- Modify: `landing/index.html` — hero `<img>` + preload swap; add "Support" nav link; consolidate footer sponsor links into one "Support" link.
- Modify: `landing/src/styles.css` — append support-page styles + nav `aria-current` style.
- Modify: `landing/public/sitemap.xml` — add `/support`.
- Reuse unchanged: `landing/src/main.ts` (no-ops on support page).

---

## Task 1: Vite multi-entry config + support page shell

De-risk the riskiest assumption first: that a second HTML entry builds to `dist/` root and resolves at the clean URL `/support` with zero console errors. Build only the shell (head + shared header + shared footer + a single placeholder hero) before writing real content.

**Files:**
- Create: `landing/vite.config.ts`
- Create: `landing/support.html`

**Interfaces:**
- Produces: `dist/support.html` at dist root; clean URL `/support` (Cloudflare) / `/support.html` (vite preview).
- Consumes: existing `landing/src/main.ts`, `landing/src/styles.css`.

- [ ] **Step 1: Create the Vite multi-entry config**

Create `landing/vite.config.ts`:

```ts
import { resolve } from "node:path";
import { defineConfig } from "vite";

// Multi-page build: Vite emits only index.html by default, so every additional
// page must be declared as a rollup input. Each entry's path under the landing
// root is preserved in dist/, so support.html lands at dist/support.html — the
// shape Cloudflare Pages serves at the clean URL /support.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        support: resolve(import.meta.dirname, "support.html"),
      },
    },
  },
});
```

- [ ] **Step 2: Create the support page shell**

Create `landing/support.html` with the full head, the shared header (with the new "Support" nav item marked current), a single placeholder hero, and the shared footer. Real sections come in Task 2.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Ways to help keep Mindwtr free and open-source — most of them cost nothing. Star it, translate it, share it, or sponsor ongoing development."
    />
    <meta property="og:title" content="Support Mindwtr" />
    <meta
      property="og:description"
      content="Honest ways to help keep Mindwtr free and open-source. Most of them don't cost a thing."
    />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://mindwtr.app/assets/screenshots/social-preview.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://mindwtr.app/assets/screenshots/social-preview.jpg" />
    <link rel="icon" href="/assets/brand/icon.png" />
    <title>Support Mindwtr</title>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="/" aria-label="Mindwtr home">
        <img src="/assets/brand/icon.png" alt="" />
        <span>Mindwtr</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="https://docs.mindwtr.app/">Docs</a>
        <a href="https://github.com/dongdongbh/Mindwtr">GitHub</a>
        <a href="/support" aria-current="page">Support</a>
        <a class="nav-download" href="/#download">Download</a>
      </nav>
    </header>

    <main>
      <section class="support-hero" aria-labelledby="support-title">
        <p class="eyebrow">Support Mindwtr</p>
        <h1 id="support-title">Help keep Mindwtr free.</h1>
        <p class="support-lead">
          Mindwtr is free, open-source, and has no subscription — and it will
          stay that way. Here are honest ways to keep it going. Most of them
          don't cost a thing.
        </p>
      </section>
    </main>

    <footer class="site-footer">
      <span>Mindwtr</span>
      <a href="https://docs.mindwtr.app/">Docs</a>
      <a href="https://github.com/dongdongbh/Mindwtr">GitHub</a>
      <a href="/support">Support</a>
    </footer>

    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 3: Build and confirm the artifact**

Run: `bun run landing:build`
Expected: build succeeds (`tsc --noEmit` passes, Vite reports both `index.html` and `support.html` transformed). Then:

Run: `ls landing/dist/support.html`
Expected: the file exists at `landing/dist/` root (Cloudflare requirement for `/support`).

- [ ] **Step 4: Verify clean URL + zero console errors**

Preferred (replicates Cloudflare clean URLs locally) — if `wrangler` is available:

Run: `bunx wrangler pages dev landing/dist --port 8788` then load `http://localhost:8788/support`
Expected: the shell renders; **browser console shows zero errors**; `/support` resolves without `.html`.

Fallback (if wrangler is unavailable):

Run: `bun run --cwd landing preview` then load `http://localhost:4173/support.html`
Expected: shell renders; **zero console errors** (confirms `main.ts` no-ops with no `.dl-platform`/`#primary-download`/`.dl-copy`). Note: vite preview serves `/support.html`; the bare `/support` clean URL is Cloudflare-provided and confirmed post-deploy.

- [ ] **Step 5: Commit**

```bash
git add landing/vite.config.ts landing/support.html
git commit -m "feat: scaffold /support page with vite multi-entry build"
```

---

## Task 2: Support page content + styles

Fill the page with real sections in the required order (hero → honest costs → **free ways** → sponsor → community), source the Ko-fi button image, and append the page's CSS.

**Files:**
- Create: `shared-assets/badges/kofi.svg`
- Modify: `landing/support.html` (replace `<main>` contents)
- Modify: `landing/src/styles.css` (append support styles)

**Interfaces:**
- Consumes: `landing/vite.config.ts`, the shell from Task 1, palette tokens + `.section-band`/`.eyebrow`/`.button`/`.trust-grid`/`.feature-grid`/`.text-link` from `styles.css`.

- [ ] **Step 1: Source the official Ko-fi button image**

Run:
```bash
curl -fsSL "https://ko-fi.com/img/githubbutton_sm.svg" -o shared-assets/badges/kofi.svg && file shared-assets/badges/kofi.svg
```
Expected: an SVG file is written. If the download fails (no network / non-SVG response), **fall back** to a styled on-palette `.button` for the Ko-fi CTA instead of an image (see Step 2's Ko-fi card note) and skip creating `kofi.svg`.

- [ ] **Step 2: Replace the `<main>` of `landing/support.html`**

Replace the placeholder `<main>…</main>` from Task 1 with the full content below. Order is fixed: free-ways grid is above the sponsor block.

```html
    <main>
      <section class="support-hero" aria-labelledby="support-title">
        <p class="eyebrow">Support Mindwtr</p>
        <h1 id="support-title">Help keep Mindwtr free.</h1>
        <p class="support-lead">
          Mindwtr is free, open-source, and has no subscription — and it will
          stay that way. Here are honest ways to keep it going. Most of them
          don't cost a thing.
        </p>
      </section>

      <section class="costs section-band" aria-labelledby="costs-title">
        <div class="section-copy">
          <p class="eyebrow">Where the money goes</p>
          <h2 id="costs-title">Free forever — here's what it actually costs.</h2>
          <p>
            Mindwtr is free and always will be. A few real costs keep it alive:
            the annual Apple Developer fee that keeps the iOS app on the App
            Store (currently paid out of pocket), domain renewal, and developer
            tooling. Hosting is free, thanks to Cloudflare. Sponsorship covers
            the rest and funds new work.
          </p>
        </div>
      </section>

      <section class="help section-band" aria-labelledby="help-title">
        <div class="section-copy">
          <p class="eyebrow">Ways to help</p>
          <h2 id="help-title">Most ways to help are free.</h2>
          <p>Can't or don't want to donate? No problem. These help just as much.</p>
        </div>
        <ul class="help-grid">
          <li>
            <h3>Star on GitHub</h3>
            <p>Stars help people discover Mindwtr and signal the project is alive and maintained.</p>
            <a class="text-link" href="https://github.com/dongdongbh/Mindwtr">Star the repo <span aria-hidden="true">→</span></a>
          </li>
          <li>
            <h3>Help translate</h3>
            <p>Mindwtr speaks 16 languages thanks to contributors. Add or improve your locale.</p>
            <a class="text-link" href="https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md#translation-contributions">Translation guide <span aria-hidden="true">→</span></a>
          </li>
          <li>
            <h3>Leave a store review</h3>
            <p>A rating on your app store helps more people find Mindwtr.</p>
            <span class="help-links">
              <a href="https://apps.apple.com/app/mindwtr/id6758597144">App Store</a>
              <a href="https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr">Google Play</a>
              <a href="https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare">Microsoft Store</a>
            </span>
          </li>
          <li>
            <h3>Share Mindwtr</h3>
            <p>Tell a friend or your community. Word of mouth is how most people find it.</p>
            <span class="help-links">
              <a href="https://twitter.com/intent/tweet?text=I%20like%20Mindwtr%20https%3A%2F%2Fmindwtr.app">Share on X</a>
              <a href="https://www.reddit.com/submit?url=https%3A%2F%2Fmindwtr.app&title=Mindwtr">Reddit</a>
            </span>
          </li>
          <li>
            <h3>Report bugs &amp; ideas</h3>
            <p>Found something, or want a feature? Open an issue so it stays trackable.</p>
            <a class="text-link" href="https://github.com/dongdongbh/Mindwtr/issues">Open an issue <span aria-hidden="true">→</span></a>
          </li>
        </ul>
      </section>

      <section class="sponsor section-band" aria-labelledby="sponsor-title">
        <div class="section-copy">
          <p class="eyebrow">Sponsor</p>
          <h2 id="sponsor-title">Fund ongoing development.</h2>
          <p>
            If Mindwtr saves you time, you can chip in. No perks gated, no
            pressure — recurring or one-off, whatever suits you.
          </p>
        </div>
        <div class="sponsor-grid">
          <article class="sponsor-card">
            <h3>GitHub Sponsors</h3>
            <p>Recurring or one-time support, right from GitHub.</p>
            <a class="button primary sponsor-cta" href="https://github.com/sponsors/dongdongbh">
              <img src="/assets/badges/github-mark.png" alt="" />
              Sponsor on GitHub
            </a>
          </article>
          <article class="sponsor-card">
            <h3>Ko-fi</h3>
            <p>Prefer a quick one-off? Buy me a coffee on Ko-fi.</p>
            <a class="kofi-cta" href="https://ko-fi.com/D1D01T20WK" aria-label="Support Mindwtr on Ko-fi">
              <img src="/assets/badges/kofi.svg" alt="Support me on Ko-fi" />
            </a>
          </article>
        </div>
      </section>

      <section class="community section-band" aria-labelledby="community-title">
        <div class="section-copy">
          <p class="eyebrow">Community</p>
          <h2 id="community-title">Join the conversation.</h2>
          <p>
            Chat with other users and the maintainer on Discord. For bug reports
            and feature requests, GitHub keeps everything trackable and
            searchable.
          </p>
          <div class="community-actions">
            <a class="button primary" href="https://discord.gg/ahhFxuDBb4">Join Discord</a>
            <a class="button secondary" href="https://github.com/dongdongbh/Mindwtr/issues">GitHub Issues</a>
          </div>
        </div>
      </section>
    </main>
```

**Ko-fi card fallback** (only if Step 1 download failed): replace the `<a class="kofi-cta" …><img …/></a>` with:
```html
            <a class="button primary sponsor-cta" href="https://ko-fi.com/D1D01T20WK">Support on Ko-fi</a>
```

- [ ] **Step 3: Append support-page styles to `landing/src/styles.css`**

Append at the end of the file:

```css
/* ---- Support page ---- */
.site-header nav a[aria-current="page"] {
  color: var(--ink);
  font-weight: 600;
}

.support-hero {
  max-width: var(--page-max);
  margin: 0 auto;
  padding: 96px var(--page-gutter) 24px;
  text-align: center;
}

.support-hero h1 {
  margin: 12px 0 0;
}

.support-lead {
  max-width: 60ch;
  margin: 18px auto 0;
  color: var(--muted);
  font-size: 1.125rem;
  line-height: 1.6;
}

.help-grid {
  list-style: none;
  margin: 36px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.help-grid li {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-medium);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.help-grid h3 {
  margin: 0;
}

.help-grid p {
  margin: 0;
  color: var(--muted);
  flex: 1;
}

.help-links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.help-links a {
  color: var(--blue);
  font-weight: 600;
  text-decoration: none;
}

.help-links a:hover {
  color: var(--blue-deep);
}

.sponsor-grid {
  margin: 36px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

.sponsor-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-medium);
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

.sponsor-card h3 {
  margin: 0;
}

.sponsor-card p {
  margin: 0;
  color: var(--muted);
  flex: 1;
}

.sponsor-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.sponsor-cta img {
  width: 18px;
  height: 18px;
}

.kofi-cta img {
  height: 40px;
  width: auto;
  display: block;
}

.community-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}
```

- [ ] **Step 4: Build and verify content + styling**

Run: `bun run landing:build`
Expected: build succeeds; `landing/dist/support.html` updated; `landing/public/assets/badges/kofi.svg` present (synced) if Step 1 succeeded.

Run: `bun run --cwd landing preview` (or `bunx wrangler pages dev landing/dist`), load the support page.
Expected (visual checklist):
- Sections appear in order: hero, costs, **ways to help (free)**, sponsor, community — free grid is clearly above the sponsor block.
- Cards use the water palette (no cream/green/gold); CTAs are readable.
- Sponsor CTAs link out (GitHub Sponsors, Ko-fi); **no third-party script loads** (Network tab shows no ko-fi.com script request).
- **Zero console errors.**

- [ ] **Step 5: Commit**

```bash
git add shared-assets/badges/kofi.svg landing/support.html landing/src/styles.css
git commit -m "feat: build out /support page content and styles"
```

---

## Task 3: Swap the landing hero image

**Files:**
- Modify: `landing/index.html` (hero `<img>` src + preload `<link>`)

**Interfaces:**
- Consumes: `shared-assets/screenshots/landing_image.png` (already present, `1672x941`, synced to `/assets/screenshots/landing_image.png`).

- [ ] **Step 1: Update the preload link**

In `landing/index.html`, change line ~20:
```html
    <link rel="preload" as="image" href="/assets/screenshots/landing_image.png" />
```
(was `href="/assets/screenshots/hero-showcase.jpg"`)

- [ ] **Step 2: Update the hero image**

In `landing/index.html`, change the hero `<img>` (~line 66):
```html
            <img src="/assets/screenshots/landing_image.png" alt="Mindwtr shown on desktop and mobile with focus and review views" />
```
(was `src="/assets/screenshots/hero-showcase.jpg"`)

- [ ] **Step 3: Build and verify the hero**

Run: `bun run landing:build`
Expected: build succeeds; `landing/public/assets/screenshots/landing_image.png` present after sync.

Run: `bun run --cwd landing preview`, load `/` (the landing page).
Expected: the hero shows `landing_image.png` (real Mindwtr UI, the intended image); image is sharp at the frame size; **zero console errors**.

- [ ] **Step 4: Commit**

```bash
git add landing/index.html
git commit -m "feat: swap landing hero image to landing_image.png"
```

---

## Task 4: Site-wide nav + footer + sitemap

Add the "Support" nav link to the landing page, consolidate the two raw footer sponsor links into one "Support" link, and add `/support` to the sitemap.

**Files:**
- Modify: `landing/index.html` (nav + footer)
- Modify: `landing/public/sitemap.xml`

- [ ] **Step 1: Add "Support" to the landing nav**

In `landing/index.html`, update the `<nav>` to insert a Support link before Download:
```html
      <nav aria-label="Primary navigation">
        <a href="https://docs.mindwtr.app/">Docs</a>
        <a href="https://github.com/dongdongbh/Mindwtr">GitHub</a>
        <a href="/support">Support</a>
        <a class="nav-download" href="#download">Download</a>
      </nav>
```

- [ ] **Step 2: Consolidate the landing footer**

In `landing/index.html`, replace the two raw sponsor links with one Support link:
```html
    <footer class="site-footer">
      <span>Mindwtr</span>
      <a href="https://docs.mindwtr.app/">Docs</a>
      <a href="https://github.com/dongdongbh/Mindwtr">GitHub</a>
      <a href="/support">Support</a>
    </footer>
```
(was: `GitHub Sponsors` + `Ko-fi` links.)

- [ ] **Step 3: Add `/support` to the sitemap**

Read `landing/public/sitemap.xml`, then add a `<url>` entry for `https://mindwtr.app/support` mirroring the existing entry's structure (same `<changefreq>`/`<priority>` style as the existing entries; do not invent fields the file doesn't already use).

- [ ] **Step 4: Build and verify navigation**

Run: `bun run landing:build`
Expected: build succeeds.

Run: `bunx wrangler pages dev landing/dist` (preferred, for clean URLs) or `bun run --cwd landing preview`.
Expected:
- Landing nav shows "Support"; clicking it reaches the support page.
- Landing footer shows a single "Support" link (no separate Sponsors/Ko-fi); it reaches the support page.
- Support page nav "Support" is marked current.
- `sitemap.xml` is well-formed and includes `/support`.
- **Zero console errors** on both pages.

- [ ] **Step 5: Commit**

```bash
git add landing/index.html landing/public/sitemap.xml
git commit -m "feat: link /support from landing nav and footer, add to sitemap"
```

---

## Task 5: Full verification gate

Run the repo's complete checks and the spec's empirical verification end to end before handoff.

**Files:** none (verification only).

- [ ] **Step 1: Run the full repo gate**

Run: `bun run check`
Expected: `check:secrets` passes (no committed secrets), `landing:build` passes, `docs:build` passes.

- [ ] **Step 2: Final empirical checklist (spec Verification section)**

Serve the built `landing/dist` (`bunx wrangler pages dev landing/dist` if available, else `bun run --cwd landing preview`) and confirm all of:
- [ ] `landing/dist/support.html` exists at the dist root.
- [ ] `/support` resolves to the support page (clean URL via wrangler; via vite preview confirm `/support.html` renders and rely on Cloudflare for the bare path).
- [ ] Loading the support page produces **zero console errors**.
- [ ] Landing hero shows `landing_image.png`.
- [ ] Nav "Support" link and consolidated footer "Support" link both navigate to the support page.
- [ ] No `ko-fi.com` (or other third-party) script request in the Network tab.
- [ ] Free-ways grid renders above the sponsor block.

- [ ] **Step 3: Report results**

Report the actual command output and checklist results (pass/fail with evidence). Do not claim success without the build output and a clean console.

---

## Self-Review

**Spec coverage:**
- `/support` page + Vite multi-entry → Tasks 1, 2. ✓
- Free-ways-first ordering (hard requirement) → Task 2 Step 2 order + Step 4 checklist. ✓
- Honest costs, no servers line → Task 2 costs section copy. ✓
- Sponsor static/script-free, official Ko-fi button (+ fallback) → Task 2 Steps 1–2. ✓
- Community: Discord surfaced + GitHub-first → Task 2 community section. ✓
- Translate link to the Translation contributions anchor → Task 2 help grid. ✓
- Hero image swap (img + preload) → Task 3. ✓
- Nav "Support" + consolidated footer → Task 4. ✓
- Sitemap `/support` → Task 4. ✓
- Empirical verification (artifact at dist root, clean URL, zero console errors, no 3rd-party script) → Tasks 1, 2, 4, 5. ✓
- Deferred items (testimonials, FAQ, sponsor-avatar wall) → correctly absent. ✓

**Placeholder scan:** No TBD/TODO. The only branch is the Ko-fi-image fallback, which has explicit alternative markup. ✓

**Type/name consistency:** Class names used in `support.html` (`support-hero`, `support-lead`, `help-grid`, `help-links`, `sponsor-grid`, `sponsor-card`, `sponsor-cta`, `kofi-cta`, `community-actions`) all have matching CSS in Task 2 Step 3. Reused classes (`section-band`, `eyebrow`, `button`, `text-link`) exist in `styles.css`. ✓
