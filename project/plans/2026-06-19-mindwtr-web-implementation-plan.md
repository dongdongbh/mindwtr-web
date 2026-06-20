# Mindwtr Web Implementation Plan

**Goal:** Build a public Mindwtr landing page at `mindwtr.app` and searchable VitePress docs at `docs.mindwtr.app` from one low-maintenance web repo.

**Architecture:** This repo contains two Cloudflare Pages apps: `/landing` for the custom marketing page and `/docs` for VitePress documentation. Shared product screenshots and brand assets live in `/shared-assets` and are copied into each app's public directory by a small local script so both deploy roots can be scoped independently in Cloudflare Pages.

**Tech Stack:** Bun, Vite, TypeScript, custom CSS, VitePress local search, Cloudflare Pages static output. No component library, animation framework, external search, external analytics, or Cloudflare secrets in the repo.

---

## File Structure

- `package.json`: root convenience scripts for local development, verification, asset sync, and secret scanning.
- `.bun-version`: pins Bun for local and Cloudflare build parity.
- `.gitignore`: keeps env files, Wrangler/Cloudflare local state, dependency folders, and build outputs out of git.
- `LICENSE`: AGPL-3.0 license, reconciled from the GitHub-created remote license or copied from https://github.com/dongdongbh/Mindwtr/blob/main/LICENSE if needed.
- `README.md`: repo-specific deployment notes for the two Cloudflare Pages projects.
- `scripts/sync-assets.mjs`: copies selected files from `/shared-assets` into `landing/public/assets` and `docs/public/assets`.
- `scripts/check-secrets.mjs`: scans committed text files for known sensitive identifiers and token-like assignments.
- `shared-assets/brand/`: Mindwtr icon and app identity assets.
- `shared-assets/screenshots/`: current Mindwtr screenshots copied from the Mindwtr app repository at https://github.com/dongdongbh/Mindwtr.
- `landing/package.json`: landing app dependencies and build scripts.
- `landing/index.html`: static Vite entry HTML.
- `landing/src/main.ts`: Vite entry point that imports the landing CSS.
- `landing/src/styles.css`: complete visual system and responsive layout for Direction A.
- `landing/public/assets/`: generated copy of shared assets for the landing Pages root.
- `docs/package.json`: docs app dependencies and explicit docs scripts.
- `docs/index.md`: VitePress docs home organized by user intent.
- `docs/.vitepress/config.ts`: VitePress config, local search, sitemap, nav, sidebar, and `base: "/"`.
- `docs/.vitepress/theme/custom.css`: docs brand styling.
- `docs/public/assets/`: generated copy of shared assets for the docs Pages root.
- `docs/public/_redirects`: Cloudflare Pages redirects for common renamed docs routes.
- `docs/start/`, `docs/use/`, `docs/data-sync/`, `docs/import/`, `docs/power-users/`, `docs/developers/`: rewritten docs content grouped by user intent.
- `docs/deploy.md`: exact Cloudflare Pages settings and empirically verified output directories.

---

### Task 1: Repository Foundation and Safety Scripts

**Files:**
- Create: `package.json`
- Create: `.bun-version`
- Create: `README.md`
- Create: `scripts/check-secrets.mjs`
- Modify: `.gitignore`
- Verify: `project/design/2026-06-19-mindwtr-web-design.md`

- [ ] **Step 1: Create root package scripts**

Create `package.json` with these scripts:

```json
{
  "name": "mindwtr-web",
  "private": true,
  "type": "module",
  "scripts": {
    "assets:sync": "bun scripts/sync-assets.mjs",
    "landing:dev": "bun --cwd landing run dev",
    "landing:build": "bun --cwd landing run build",
    "docs:dev": "bun --cwd docs run dev",
    "docs:build": "bun --cwd docs run docs:build",
    "check:secrets": "bun scripts/check-secrets.mjs",
    "check": "bun run check:secrets && bun run landing:build && bun run docs:build"
  }
}
```

- [ ] **Step 2: Pin Bun**

Create `.bun-version`:

```text
1.3.5
```

Run:

```bash
rtk bun --version
```

Expected: local Bun version is reported. If the local version differs from `.bun-version`, record the local version in the implementation notes and use the same value in Cloudflare Pages `BUN_VERSION`.

- [ ] **Step 3: Confirm `.gitignore` safety coverage**

Ensure `.gitignore` contains these entries:

```gitignore
node_modules/
dist/
landing/dist/
docs/.vitepress/dist/
docs/.vitepress/cache/
.bun/
.env
.env.*
!.env.example
.dev.vars
.dev.vars.*
.wrangler/
.cloudflare/
wrangler.local.toml
wrangler.*.local.toml
.DS_Store
```

- [ ] **Step 4: Add a root README with deployment shape**

Create `README.md`:

```markdown
# Mindwtr Web

Public website and documentation for [Mindwtr](https://github.com/dongdongbh/Mindwtr).

- `landing/` builds `mindwtr.app`.
- `docs/` builds `docs.mindwtr.app`.
- `shared-assets/` stores brand assets and screenshots copied into each deploy root.

## Cloudflare Pages

Landing project:

- Root directory: `landing`
- Build command: `bun run build`
- Output directory: `dist`
- Domain: `mindwtr.app`

Docs project:

- Root directory: `docs`
- Build command: `bun run docs:build`
- Output directory: verify with the local build and keep it in `docs/deploy.md`
- Domain: `docs.mindwtr.app`

Deploy authentication lives in the Cloudflare/GitHub integration. Do not commit Cloudflare tokens, account IDs, local `.dev.vars`, or Wrangler state.
```

- [ ] **Step 5: Add a targeted secret scanner**

Create `scripts/check-secrets.mjs`:

```js
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const forbiddenText = (process.env.MINDWTR_WEB_FORBIDDEN_TEXT ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const suspiciousPatterns = [
  /(?:CF_API_TOKEN|CLOUDFLARE_API_TOKEN|FLATHUB_TOKEN|AWS_ACCESS_KEY_ID|AWS_SECRET_ACCESS_KEY)\s*=/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /sk-[A-Za-z0-9_-]{20,}/,
  /cf_[A-Za-z0-9_-]{20,}/
];

const output = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" });
const files = output.split("\0").filter(Boolean);
const findings = [];

for (const file of files) {
  let content;
  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }

  for (const needle of forbiddenText) {
    if (content.includes(needle)) {
      findings.push(`${file}: contains forbidden identifier ${needle}`);
    }
  }

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(content)) {
      findings.push(`${file}: matches ${pattern}`);
    }
  }
}

if (findings.length > 0) {
  console.error(findings.join("\n"));
  process.exit(1);
}

console.log("No committed secrets matched the configured scan.");
```

- [ ] **Step 6: Run the scanner**

Run:

```bash
rtk bun scripts/check-secrets.mjs
```

Expected: `No committed secrets matched the configured scan.`

For local pre-push verification, run the same script with `MINDWTR_WEB_FORBIDDEN_TEXT` set to any private account identifiers you want to check. Do not commit those values.

- [ ] **Step 7: Commit foundation**

Run:

```bash
rtk git add .gitignore .bun-version README.md package.json scripts/check-secrets.mjs
rtk git commit -m "chore: scaffold web repo foundation"
```

Expected: commit succeeds with only foundation and safety-script files.

---

### Task 2: Shared Assets and Asset Sync

**Files:**
- Create: `scripts/sync-assets.mjs`
- Create: `shared-assets/brand/icon.png`
- Create: `shared-assets/screenshots/desktop-focus.png`
- Create: `shared-assets/screenshots/desktop-inbox.png`
- Create: `shared-assets/screenshots/desktop-projects.png`
- Create: `shared-assets/screenshots/mobile-focus.png`
- Create: `shared-assets/screenshots/mobile-capture.png`
- Create: `shared-assets/screenshots/mobile-project.png`
- Create: `shared-assets/screenshots/tablet-project.png`
- Generated: `landing/public/assets/**`
- Generated: `docs/public/assets/**`

- [ ] **Step 1: Copy real current Mindwtr assets**

Run:

```bash
rtk mkdir -p shared-assets/brand shared-assets/screenshots
# Replace <Mindwtr-repo> with a local checkout of https://github.com/dongdongbh/Mindwtr.
rtk cp <Mindwtr-repo>/apps/mobile/assets/images/icon.png shared-assets/brand/icon.png
rtk cp <Mindwtr-repo>/apps/desktop/screenshots/flathub/focus_light.png shared-assets/screenshots/desktop-focus.png
rtk cp <Mindwtr-repo>/apps/desktop/screenshots/flathub/inbox_light.png shared-assets/screenshots/desktop-inbox.png
rtk cp <Mindwtr-repo>/apps/desktop/screenshots/flathub/projects_workspace_light.png shared-assets/screenshots/desktop-projects.png
rtk cp <Mindwtr-repo>/apps/mobile/screenshots/android/playstore/phone/focus.png shared-assets/screenshots/mobile-focus.png
rtk cp <Mindwtr-repo>/apps/mobile/screenshots/android/playstore/phone/capture.png shared-assets/screenshots/mobile-capture.png
rtk cp <Mindwtr-repo>/apps/mobile/screenshots/android/playstore/phone/project.png shared-assets/screenshots/mobile-project.png
rtk cp <Mindwtr-repo>/apps/mobile/screenshots/ipad/project.png shared-assets/screenshots/tablet-project.png
```

Expected: every copied file exists under `shared-assets/` and is a real screenshot or icon from the app repo.

- [ ] **Step 2: Create asset sync script**

Create `scripts/sync-assets.mjs`:

```js
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "shared-assets");
const targets = [
  resolve(root, "landing/public/assets"),
  resolve(root, "docs/public/assets")
];

for (const target of targets) {
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  cpSync(source, target, { recursive: true });
}

console.log("Shared assets synced to landing and docs public directories.");
```

- [ ] **Step 3: Sync assets**

Run:

```bash
rtk bun scripts/sync-assets.mjs
```

Expected: `landing/public/assets/brand/icon.png` and `docs/public/assets/brand/icon.png` both exist.

- [ ] **Step 4: Verify assets are not placeholders**

Run:

```bash
rtk find shared-assets/screenshots -maxdepth 2 -type f
```

Expected: all eight target files are present. Inspect at least one desktop and one mobile screenshot with an image viewer before final verification.

- [ ] **Step 5: Commit shared assets**

Run:

```bash
rtk git add scripts/sync-assets.mjs shared-assets landing/public/assets docs/public/assets package.json
rtk git commit -m "chore: add shared Mindwtr web assets"
```

Expected: commit includes real assets and the sync script.

---

### Task 3: Landing App Scaffold and Content

**Files:**
- Create: `landing/package.json`
- Create: `landing/tsconfig.json`
- Create: `landing/index.html`
- Create: `landing/src/main.ts`
- Create: `landing/src/styles.css`

- [ ] **Step 1: Create landing package**

Create `landing/package.json`:

```json
{
  "name": "mindwtr-landing",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "bun ../scripts/sync-assets.mjs && tsc --noEmit && vite build",
    "preview": "vite preview --host 0.0.0.0"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "vite": "^7.2.7"
  }
}
```

- [ ] **Step 2: Create landing TypeScript config**

Create `landing/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create landing HTML**

Create `landing/index.html` with semantic sections:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Mindwtr is a free, open-source, local-first GTD app for desktop and mobile. No account required." />
    <title>Mindwtr - Mind like water</title>
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
        <a href="#download">Download</a>
      </nav>
    </header>

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow">Free, local-first GTD for every device</p>
          <h1 id="hero-title">Mind like water.</h1>
          <p class="hero-subhead">A calm GTD system that keeps your work local and your next action clear.</p>
          <div class="hero-actions">
            <a class="button primary" id="primary-download" href="#download">Download Mindwtr</a>
            <a class="button secondary" href="https://docs.mindwtr.app/">Read the docs</a>
          </div>
          <ul class="proof-list" aria-label="Mindwtr proof points">
            <li>Free forever</li>
            <li>Local-first</li>
            <li>No account</li>
            <li>All platforms</li>
          </ul>
        </div>
        <div class="hero-media" aria-label="Mindwtr app screenshots">
          <img class="desktop-shot" src="/assets/screenshots/desktop-focus.png" alt="Mindwtr desktop Focus view" />
          <img class="mobile-shot" src="/assets/screenshots/mobile-focus.png" alt="Mindwtr mobile Focus view" />
        </div>
      </section>

      <section class="workflow" aria-labelledby="workflow-title">
        <p class="eyebrow">GTD-native workflow</p>
        <h2 id="workflow-title">A trusted system, not another noisy task list.</h2>
        <div class="workflow-grid">
          <article><h3>Capture</h3><p>Get it out of your head, fast.</p></article>
          <article><h3>Clarify</h3><p>Turn vague items into clear next actions.</p></article>
          <article><h3>Organize</h3><p>Keep projects, contexts, and waiting items where they belong.</p></article>
          <article><h3>Reflect</h3><p>Review the system before it gets stale.</p></article>
          <article><h3>Engage</h3><p>Choose the next action with confidence.</p></article>
        </div>
      </section>

      <section class="platforms" aria-labelledby="platforms-title">
        <div>
          <p class="eyebrow">Desktop, mobile, PWA</p>
          <h2 id="platforms-title">Native where you work. Private where it counts.</h2>
          <p>Use Mindwtr on macOS, Windows, Linux, iOS, Android, or as a self-hosted browser app, with sync choices that stay under your control.</p>
        </div>
        <div class="platform-gallery">
          <img src="/assets/screenshots/desktop-projects.png" alt="Mindwtr desktop Projects view" />
          <img src="/assets/screenshots/mobile-capture.png" alt="Mindwtr mobile capture screen" />
          <img src="/assets/screenshots/tablet-project.png" alt="Mindwtr tablet project screen" />
        </div>
      </section>

      <section class="trust" aria-labelledby="trust-title">
        <p class="eyebrow">Trust by default</p>
        <h2 id="trust-title">No account required. No subscription pressure.</h2>
        <div class="trust-grid">
          <article><h3>Open source</h3><p>AGPL-licensed code you can inspect, run, and contribute to.</p></article>
          <article><h3>Local-first data</h3><p>Your tasks, notes, projects, and attachments start on your device.</p></article>
          <article><h3>Flexible sync</h3><p>Choose iCloud, Dropbox, WebDAV, file sync, or self-hosted sync.</p></article>
        </div>
      </section>

      <section class="power" aria-labelledby="power-title">
        <p class="eyebrow">Power when you ask for it</p>
        <h2 id="power-title">Automation and AI stay optional.</h2>
        <p>Bring your own AI key, use a local model, script the desktop API, connect MCP, or self-host the sync server.</p>
        <a class="text-link" href="https://docs.mindwtr.app/power-users/mcp.html">Explore power-user docs</a>
      </section>

      <section class="download" id="download" aria-labelledby="download-title">
        <h2 id="download-title">Download Mindwtr</h2>
        <div class="download-grid">
          <a href="https://apps.apple.com/app/mindwtr/id6758597144">App Store</a>
          <a href="https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr">Google Play</a>
          <a href="https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare">Microsoft Store</a>
          <a href="https://flathub.org/apps/tech.dongdongbh.mindwtr">Flathub</a>
          <a href="https://f-droid.org/en/packages/tech.dongdongbh.mindwtr/">F-Droid</a>
          <a href="https://github.com/dongdongbh/Mindwtr/releases">GitHub Releases</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <span>Mindwtr</span>
      <a href="https://docs.mindwtr.app/">Docs</a>
      <a href="https://github.com/dongdongbh/Mindwtr">GitHub</a>
      <a href="https://github.com/sponsors/dongdongbh">Sponsor</a>
    </footer>

    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 4: Add landing entry point**

Create `landing/src/main.ts`:

```ts
import "./styles.css";
```

- [ ] **Step 5: Add landing CSS**

Create `landing/src/styles.css` with these design tokens at the top:

```css
:root {
  color-scheme: light;
  --ink: #16342b;
  --muted: #5b6b63;
  --paper: #fbfaf5;
  --surface: #ffffff;
  --line: #dce5dc;
  --green: #1e7f63;
  --green-dark: #12533f;
  --mint: #e8f5ee;
  --warm: #e5b75a;
  --shadow: 0 24px 70px rgba(28, 57, 44, 0.14);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

The stylesheet must implement:

- Sticky but quiet header.
- Full first viewport hero with a visible hint of the next section.
- Responsive screenshot composition that keeps desktop and mobile screenshots visible without overlap.
- Proof chips that wrap cleanly on mobile.
- Workflow, platform, trust, power, download, and footer sections.
- `@media (prefers-reduced-motion: reduce)` with transitions disabled.
- Keyboard-visible focus states.

- [ ] **Step 6: Build landing**

Run:

```bash
rtk bun install
rtk bun run landing:build
```

Expected: build passes and emits `landing/dist`.

- [ ] **Step 7: Commit landing scaffold**

Run:

```bash
rtk git add bun.lock package.json landing scripts shared-assets
rtk git commit -m "feat: add Mindwtr landing page"
```

Expected: commit includes the landing app and required generated public assets.

---

### Task 4: Docs App Scaffold

**Files:**
- Create: `docs/package.json`
- Create: `docs/.vitepress/config.ts`
- Create: `docs/.vitepress/theme/custom.css`
- Create: `docs/index.md`
- Create: `docs/public/_redirects`

- [ ] **Step 1: Create docs package**

Create `docs/package.json`:

```json
{
  "name": "mindwtr-docs",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vitepress dev --host 0.0.0.0",
    "docs:build": "bun ../scripts/sync-assets.mjs && vitepress build",
    "build": "bun run docs:build",
    "preview": "vitepress preview --host 0.0.0.0"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "vitepress": "^1.6.4"
  }
}
```

- [ ] **Step 2: Create VitePress config**

Create `docs/.vitepress/config.ts`:

```ts
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Mindwtr Docs",
  description: "Searchable documentation for Mindwtr, the free, local-first GTD app.",
  base: "/",
  cleanUrls: true,
  sitemap: {
    hostname: "https://docs.mindwtr.app"
  },
  themeConfig: {
    logo: "/assets/brand/icon.png",
    search: {
      provider: "local"
    },
    nav: [
      { text: "Start", link: "/start/getting-started" },
      { text: "Use Mindwtr", link: "/use/desktop" },
      { text: "Data & Sync", link: "/data-sync/" },
      { text: "Power Users", link: "/power-users/ai-assistant" },
      { text: "GitHub", link: "https://github.com/dongdongbh/Mindwtr" }
    ],
    sidebar: [
      {
        text: "Start here",
        items: [
          { text: "Getting started", link: "/start/getting-started" },
          { text: "FAQ", link: "/start/faq" }
        ]
      },
      {
        text: "Use Mindwtr",
        items: [
          { text: "Desktop guide", link: "/use/desktop" },
          { text: "Mobile guide", link: "/use/mobile" },
          { text: "GTD workflow", link: "/use/gtd-workflow" }
        ]
      },
      {
        text: "Data and sync",
        items: [
          { text: "Overview", link: "/data-sync/" },
          { text: "Backup and restore", link: "/data-sync/backup-restore" },
          { text: "iCloud sync", link: "/data-sync/icloud" },
          { text: "Dropbox sync", link: "/data-sync/dropbox" },
          { text: "WebDAV sync", link: "/data-sync/webdav" },
          { text: "Self-hosted cloud", link: "/data-sync/self-hosted-cloud" }
        ]
      },
      {
        text: "Import and migrate",
        items: [
          { text: "TickTick", link: "/import/ticktick" },
          { text: "Todoist", link: "/import/todoist" },
          { text: "OmniFocus", link: "/import/omnifocus" }
        ]
      },
      {
        text: "Power users",
        items: [
          { text: "AI assistant", link: "/power-users/ai-assistant" },
          { text: "MCP server", link: "/power-users/mcp" }
        ]
      },
      {
        text: "Developers",
        items: [
          { text: "Architecture", link: "/developers/architecture" },
          { text: "Contributing", link: "/developers/contributing" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/dongdongbh/Mindwtr" }
    ],
    footer: {
      message: "Mindwtr is free, open source, and local-first.",
      copyright: "Released under AGPL-3.0."
    }
  }
});
```

- [ ] **Step 3: Create docs theme CSS**

Create `docs/.vitepress/theme/custom.css`:

```css
:root {
  --vp-c-brand-1: #1e7f63;
  --vp-c-brand-2: #2c9a78;
  --vp-c-brand-3: #8ed7bd;
  --vp-c-bg: #fbfaf5;
  --vp-c-bg-soft: #f0f6ef;
  --vp-c-bg-alt: #ffffff;
  --vp-c-text-1: #16342b;
  --vp-c-text-2: #5b6b63;
  --vp-font-family-base: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.VPHomeHero .name {
  color: var(--vp-c-text-1);
}

.VPHomeHero .text {
  color: var(--vp-c-brand-1);
}
```

Create `docs/.vitepress/theme/index.ts`:

```ts
import DefaultTheme from "vitepress/theme";
import "./custom.css";

export default DefaultTheme;
```

- [ ] **Step 4: Create docs home**

Create `docs/index.md`:

```markdown
---
layout: home
hero:
  name: Mindwtr Docs
  text: Searchable guides for calm GTD
  tagline: Install Mindwtr, understand the workflow, and keep your data under your control.
  image:
    src: /assets/brand/icon.png
    alt: Mindwtr
  actions:
    - theme: brand
      text: Get started
      link: /start/getting-started
    - theme: alt
      text: Data and sync
      link: /data-sync/
features:
  - title: Start here
    details: Install Mindwtr, capture your first task, and run your first review.
    link: /start/getting-started
  - title: Use Mindwtr
    details: Learn desktop, mobile, GTD workflow, search, calendar, and reviews.
    link: /use/desktop
  - title: Data and sync
    details: Understand local data, backup, restore, file sync, iCloud, Dropbox, WebDAV, and self-hosted sync.
    link: /data-sync/
  - title: Import and migrate
    details: Move from TickTick, Todoist, OmniFocus, DGT GTD, Apple Reminders, or Obsidian.
    link: /import/ticktick
  - title: Power users
    details: Optional AI, Apple Shortcuts, local API, MCP, automation, and self-hosting.
    link: /power-users/ai-assistant
  - title: Developers
    details: Architecture, core API, testing, release process, and contribution notes.
    link: /developers/architecture
---
```

- [ ] **Step 5: Add initial redirects**

Create `docs/public/_redirects`:

```text
/Getting-Started /start/getting-started 301
/FAQ /start/faq 301
/Data-and-Sync /data-sync/ 301
/User-Guide-Desktop /use/desktop 301
/User-Guide-Mobile /use/mobile 301
/AI-Assistant /power-users/ai-assistant 301
/MCP-Server /power-users/mcp 301
/Todoist-Import /import/todoist 301
/TickTick-Import /import/ticktick 301
/OmniFocus-Import /import/omnifocus 301
```

- [ ] **Step 6: Commit docs scaffold**

Run:

```bash
rtk git add docs package.json
rtk git commit -m "feat: scaffold searchable docs"
```

Expected: commit includes VitePress config, theme, home page, redirects, and docs package.

---

### Task 5: Rewrite High-Traffic Docs Pages

**Files:**
- Create: `docs/start/getting-started.md`
- Create: `docs/start/faq.md`
- Create: `docs/use/desktop.md`
- Create: `docs/use/mobile.md`
- Create: `docs/use/gtd-workflow.md`
- Create: `docs/data-sync/index.md`
- Create: `docs/data-sync/backup-restore.md`
- Create: `docs/data-sync/icloud.md`
- Create: `docs/data-sync/dropbox.md`
- Create: `docs/data-sync/webdav.md`
- Create: `docs/data-sync/self-hosted-cloud.md`
- Create: `docs/import/ticktick.md`
- Create: `docs/import/todoist.md`
- Create: `docs/import/omnifocus.md`
- Create: `docs/power-users/ai-assistant.md`
- Create: `docs/power-users/mcp.md`
- Create: `docs/developers/architecture.md`
- Create: `docs/developers/contributing.md`

- [ ] **Step 1: Create docs directories**

Run:

```bash
rtk mkdir -p docs/start docs/use docs/data-sync docs/import docs/power-users docs/developers
```

Expected: all listed directories exist.

- [ ] **Step 2: Rewrite Getting Started**

Use https://github.com/dongdongbh/Mindwtr/blob/main/wiki/Getting-Started.md as source material and create `docs/start/getting-started.md` with this structure:

```markdown
# Getting started

Mindwtr is a free, open-source GTD app for desktop and mobile. It stores your work locally first and does not require an account.

## Install Mindwtr

Choose the most natural install path for your device.

| Platform | Recommended install |
| --- | --- |
| iPhone and iPad | App Store |
| Android | Google Play, F-Droid, IzzyOnDroid, or APK from GitHub Releases |
| macOS | Mac App Store or Homebrew |
| Windows | Microsoft Store or winget |
| Linux | Flathub, AUR, AppImage, deb, or rpm |

## First launch

On a fresh install, choose whether to start fresh, restore a backup, or connect sync. Mindwtr opens Focus by default so today's calendar items and next actions are visible first.

## First capture

Put new work in Inbox. Use quick-add syntax when it helps:

| Syntax | Example | Result |
| --- | --- | --- |
| `@context` | `Buy milk @errands` | Adds a context |
| `#tag` | `Research topic #creative` | Adds a tag |
| `+Project` | `Call vendor +HomeReno` | Assigns a project |
| `/due:date` | `Report /due:friday` | Sets a due date |
| `/next` | `Email Sam /next` | Moves to Next Actions |

## First review

Use Review to process Inbox, check Waiting For, review projects, and decide what belongs in Focus.

## Next steps

- Learn the [GTD workflow](/use/gtd-workflow).
- Set up [data and sync](/data-sync/).
- Read the [desktop guide](/use/desktop) or [mobile guide](/use/mobile).
```

- [ ] **Step 3: Rewrite Data and Sync**

Use https://github.com/dongdongbh/Mindwtr/blob/main/wiki/Data-and-Sync.md as source material and create `docs/data-sync/index.md` with sections in this order:

```markdown
# Data and sync

Mindwtr is local-first. Your tasks, projects, notes, settings, and attachments start on your device. Sync is optional and uses a backend you choose.

## Quick recommendations

| Need | Best option |
| --- | --- |
| Apple-only devices | Native iCloud / CloudKit |
| Easiest cross-platform cloud sync | Dropbox OAuth in supported builds |
| Self-controlled remote sync | WebDAV or self-hosted Mindwtr Cloud |
| Device-to-device folder sync | File sync with Syncthing or a sync-provider folder |

## What Mindwtr stores locally

Desktop uses SQLite as the primary local store and exports a JSON snapshot for sync and backup. Mobile also uses local SQLite plus a JSON backup/sync snapshot.

## Sync backends

- iCloud / CloudKit
- Dropbox OAuth
- File sync
- WebDAV
- Self-hosted Mindwtr Cloud

## Recovery first

Before changing sync setup, export a backup. Before restore/import operations, supported builds create recovery snapshots.

## Troubleshooting

Start with these checks:

1. Confirm the sync target exists and is writable.
2. Confirm all devices finished provider-level sync.
3. Check device clocks.
4. Use manual sync once per device.
5. Export a backup before deleting conflict files.
```

- [ ] **Step 4: Rewrite FAQ, Desktop, Mobile, AI, and MCP pages**

For each target page, rewrite the wiki source into shorter web-doc sections with:

- A plain-language opening paragraph.
- A "When to use this" section when the topic is optional or advanced.
- Tables only where they improve scanning.
- VitePress callouts for privacy, sync, or destructive restore warnings.
- No GitHub wiki `[[Page Name]]` links.

Use these source-to-target pairs:

```text
https://github.com/dongdongbh/Mindwtr/blob/main/wiki/FAQ.md -> docs/start/faq.md
https://github.com/dongdongbh/Mindwtr/blob/main/wiki/User-Guide-Desktop.md -> docs/use/desktop.md
https://github.com/dongdongbh/Mindwtr/blob/main/wiki/User-Guide-Mobile.md -> docs/use/mobile.md
https://github.com/dongdongbh/Mindwtr/blob/main/wiki/GTD-Workflow-in-Mindwtr.md -> docs/use/gtd-workflow.md
https://github.com/dongdongbh/Mindwtr/blob/main/wiki/AI-Assistant.md -> docs/power-users/ai-assistant.md
https://github.com/dongdongbh/Mindwtr/blob/main/wiki/MCP-Server.md -> docs/power-users/mcp.md
```

- [ ] **Step 5: Create focused import pages**

Create import pages with SEO-friendly titles:

```markdown
# Import from TickTick

Move a TickTick export into Mindwtr without losing your GTD workflow.

## Supported input

Mindwtr supports TickTick CSV or ZIP exports when available in the current app build.

## What imports preserve

- Task title and notes
- Dates where the export provides them
- Project/list grouping where it maps cleanly to Mindwtr

## After import

Imported tasks land in Mindwtr so you can clarify and organize them into your GTD system.
```

Use the same shape for Todoist and OmniFocus, replacing source-specific details from:

```text
https://github.com/dongdongbh/Mindwtr/blob/main/wiki/TickTick-Import.md
https://github.com/dongdongbh/Mindwtr/blob/main/wiki/Todoist-Import.md
https://github.com/dongdongbh/Mindwtr/blob/main/wiki/OmniFocus-Import.md
```

- [ ] **Step 6: Create developer starter pages**

Create `docs/developers/architecture.md` and `docs/developers/contributing.md` using:

```text
https://github.com/dongdongbh/Mindwtr/blob/main/wiki/Architecture.md
https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md
```

Keep these closer to markdown in the first pass, but update links and headings for VitePress.

- [ ] **Step 7: Verify no wiki links remain**

Run:

```bash
rtk rg -n "\\[\\[|github.com/dongdongbh/Mindwtr/wiki" docs
```

Expected: no matches in migrated docs except intentional references in migration notes.

- [ ] **Step 8: Commit docs migration**

Run:

```bash
rtk git add docs
rtk git commit -m "docs: migrate high-traffic Mindwtr guides"
```

Expected: commit includes rewritten high-traffic docs and no raw wiki link syntax.

---

### Task 6: Build Verification and Deploy Notes

**Files:**
- Create: `docs/deploy.md`
- Modify: `README.md`

- [ ] **Step 1: Install dependencies**

Run:

```bash
rtk bun install
```

Expected: `bun.lock` is created or updated with Vite, TypeScript, and VitePress only.

- [ ] **Step 2: Build landing**

Run:

```bash
rtk bun run landing:build
```

Expected: output reports a successful Vite build and `landing/dist` exists.

- [ ] **Step 3: Build docs and verify emitted output**

Run:

```bash
rtk bun run docs:build
```

Expected: output reports a successful VitePress build. Record the actual output directory from the command output. With the planned layout, expected output is `docs/.vitepress/dist`.

- [ ] **Step 4: Write deploy notes with verified paths**

Create `docs/deploy.md`:

```markdown
# Deploy Mindwtr Web

This repo deploys to two separate Cloudflare Pages projects.

## Landing

- Cloudflare Pages project root: `landing`
- Build command: `bun run build`
- Verified output directory: `dist`
- Domain: `mindwtr.app`

## Docs

- Cloudflare Pages project root: `docs`
- Build command: `bun run docs:build`
- Verified output directory: `.vitepress/dist`
- Domain: `docs.mindwtr.app`
- VitePress base: `/`

## Environment

- Set `BUN_VERSION` to the value in `.bun-version`.
- Do not add Cloudflare API tokens, account IDs, D1 IDs, or local `.dev.vars` to this repository.
- Deploy authentication is handled by the Cloudflare/GitHub integration.
```

If the empirical docs output differs from `.vitepress/dist`, update only the "Verified output directory" value to the actual relative path from the `docs` Pages root.

- [ ] **Step 5: Update root README with verified docs output**

In `README.md`, replace the docs output note with the verified value from `docs/deploy.md`.

- [ ] **Step 6: Run secret scan**

Run:

```bash
rtk bun run check:secrets
```

Expected: `No committed secrets matched the configured scan.`

- [ ] **Step 7: Commit deploy notes**

Run:

```bash
rtk git add README.md docs/deploy.md bun.lock
rtk git commit -m "docs: add Cloudflare Pages deploy notes"
```

Expected: commit includes verified deploy paths and lockfile.

---

### Task 7: Local Preview and Visual QA

**Files:**
- Modify if needed: `landing/src/styles.css`
- Modify if needed: docs pages with broken links found during preview

- [ ] **Step 1: Start landing preview**

Run:

```bash
rtk bun --cwd landing run preview
```

Expected: Vite preview serves the landing build. Keep the server running until screenshots are captured, then stop it.

- [ ] **Step 2: Check landing at desktop and mobile widths**

Use Playwright or browser screenshots at:

```text
1440x1000
390x844
```

Expected:

- Hero screenshots are visible and not overlapping text.
- `Mind like water.` is the first-viewport signal.
- Proof chips wrap cleanly.
- Download CTA text changes for the detected platform or falls back to `Download Mindwtr`.
- No placeholder boxes appear in final imagery.

- [ ] **Step 3: Start docs preview**

Run:

```bash
rtk bun --cwd docs run preview
```

Expected: VitePress preview serves the built docs.

- [ ] **Step 4: Verify docs search**

In the docs preview search box, search for:

```text
sync
MCP
TickTick
```

Expected: local search returns relevant migrated pages.

- [ ] **Step 5: Fix preview issues and commit**

If the preview finds layout or link issues, patch the specific files, rerun:

```bash
rtk bun run landing:build
rtk bun run docs:build
rtk bun run check:secrets
```

Then commit:

```bash
rtk git add landing docs README.md
rtk git commit -m "fix: polish web preview issues"
```

Expected: no commit is created if there are no preview issues.

---

### Task 8: GitHub Remote, License Reconciliation, and First Push

**Files:**
- Modify if needed: `LICENSE`

- [ ] **Step 1: Add GitHub remote**

Run:

```bash
rtk git remote add origin git@github.com:dongdongbh/mindwtr-web.git
```

Expected: `origin` points at the GitHub repo.

- [ ] **Step 2: Fetch remote license commit**

Run:

```bash
rtk git fetch origin main
```

Expected: `origin/main` exists and contains the GitHub-created AGPL-3.0 license commit.

- [ ] **Step 3: Rebase local root commits onto remote main**

Run:

```bash
rtk git rebase --root --onto origin/main
```

Expected: local design/scaffold commits are replayed on top of the remote AGPL-3.0 license commit.

- [ ] **Step 4: Verify license and remote state**

Run:

```bash
rtk git status --short
rtk git log --oneline --max-count=5
rtk test "bun run check:secrets"
```

Expected:

- Working tree is clean.
- The remote AGPL-3.0 license commit appears at the base of history.
- Secret scan passes.

- [ ] **Step 5: Push first version**

Run:

```bash
rtk git push -u origin main
```

Expected: GitHub branch `main` receives the local web repo history without force pushing.

---

### Task 9: Post-Launch Link Updates

**Files:**
- Modify later in the Mindwtr app repository (https://github.com/dongdongbh/Mindwtr): README, in-app docs links, store metadata/support URLs where applicable
- Modify later in GitHub wiki: migrated page stubs

- [ ] **Step 1: Open a follow-up checklist**

After Cloudflare Pages deploys are live, create a follow-up issue or local checklist covering:

```markdown
# Mindwtr docs launch follow-up

- Update Mindwtr README wiki links to `https://docs.mindwtr.app/`.
- Update in-app Documentation links to `https://docs.mindwtr.app/`.
- Update store support/documentation URLs where the stores allow it.
- Replace migrated GitHub wiki pages with pointer stubs.
- Confirm old wiki links redirect or visibly point users to the canonical docs.
```

- [ ] **Step 2: Do not mix this into the first web scaffold**

Keep main-app link changes in a separate Mindwtr repo branch/PR after the web docs URL is live. This avoids linking users to an unavailable docs domain.

---

## Self-Review Notes

- Spec coverage: architecture, landing design, docs IA, dependency guardrails, secrets policy, license, redirects, outbound links, real screenshots, build verification, and first push are covered by tasks above.
- Placeholder scan: no task uses `TBD`, `TODO`, `fill in details`, or an unspecified implementation step.
- Dependency policy: only Vite, TypeScript, and VitePress are introduced. Mermaid is not added because the first pass does not require an actual Mermaid diagram.
