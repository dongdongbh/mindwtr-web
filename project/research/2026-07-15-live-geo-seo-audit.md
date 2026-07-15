# Mindwtr live GEO/SEO audit

Captured: **2026-07-15 21:57–22:00 UTC**

Scope: every page discoverable from [mindwtr.app/robots.txt](https://mindwtr.app/robots.txt), [mindwtr.app/sitemap.xml](https://mindwtr.app/sitemap.xml), [docs.mindwtr.app/robots.txt](https://docs.mindwtr.app/robots.txt), [docs.mindwtr.app/sitemap.xml](https://docs.mindwtr.app/sitemap.xml), plus recursive internal-link discovery across both hosts.

## Executive result

- The sitemaps declare **86 URLs**: 27 landing pages and 59 documentation pages. All 86 returned **200 HTML**, had no redirect, were indexable, had exactly one title, one H1, one self-referencing canonical, and no `noindex` directive.
- The crawl found **no real HTML page missing from a sitemap**. The only extra raw-source targets were Cloudflare's two `/cdn-cgi/l/email-protection` endpoints; both return 404, but the rendered browser correctly rewrites them to `mailto:` links.
- Every audited page had clean `<img>` alt coverage: no missing `alt` attributes and no unexplained empty alt values in main content.
- The shared social preview is healthy on both hosts: HTTP 200 JPEG, 1280×640.
- The largest technical defect is a **soft-404 wildcard on `mindwtr.app`**: arbitrary nonexistent URLs return the complete homepage with HTTP 200 and the homepage canonical.
- The largest page-scale metadata defect is the docs site: **all 59 pages share one generic description**, lack page-specific Open Graph title/description/URL, and have no structured data.
- One internal build note, [`/public/assets/fonts/README`](https://docs.mindwtr.app/public/assets/fonts/README), is in the docs sitemap, indexable, and has no non-self inbound link.

## Local remediation status

The live snapshot above remains the deployment baseline. The accompanying implementation now builds **85 intended indexable URLs** (27 landing and 58 docs) and resolves the actionable technical findings locally:

- removes the accidental Fonts README route and enforces exact sitemap parity;
- generates unique docs descriptions, complete page-specific social metadata, and conservative schema.org graphs on every indexable page;
- adds a real noindex landing 404 and keeps it out of the sitemap;
- replaces the 1.53 MB landing hero PNG with a 125 KB WebP, including preload priority and intrinsic dimensions in every locale;
- gives the landing home and GTD pages stronger query-oriented titles in all five languages, and removes the lone cross-page title duplicate;
- keeps the tablet hamburger navigation active through 959px, eliminating the measured 938px docs overflow at 768–780px;
- adds curated experimental `llms.txt` navigation files without treating them as required ranking signals; and
- expands the built-output verifier and adds a pinned, read-only GitHub Actions build/check workflow.

`bun run check` passes after these changes. They are not live until deployed, so the soft-404 status and all emitted metadata must be re-probed after deployment. Trustworthy page freshness, crawler-training policy, Search Console/Bing baselines, and field Core Web Vitals remain follow-up decisions or measurements rather than inferred build changes.

## Supplied-tool cross-check

The live sitemaps were also passed through the [Auriti GEO Optimizer CLI](https://github.com/Auriti-Labs/geo-optimizer-skill). It discovered all 27 landing and 59 docs URLs and reported advisory averages of **53.3/100** and **34.6/100**, respectively; both hosts scored zero for schema before remediation. One landing fetch timed out inside the tool even though the independent crawl returned 200, so its individual fetch result was treated as a scanner false negative. The tool independently surfaced the docs description/schema gaps and the accidental Fonts page.

Those numbers are vendor rubric coverage, not search rankings. The [marketplace action](https://github.com/marketplace/actions/geo-optimizer-audit) wraps the same package, so it was not added as a second authority or blocking gate. The [Aaron marketing skills](https://github.com/aaron-he-zhu/aaron-marketing-skills), [Codex SEO](https://github.com/AgriciDaniel/codex-seo), [geo-team-red optimizer](https://github.com/geo-team-red/geo-optimizer), and [awesome GEO collection](https://github.com/amplifying-ai/awesome-generative-engine-optimization) were reviewed as checklists and research indexes; recommendations were retained only when supported by primary search/platform documentation or clear user benefit. The source-by-source assessment is recorded in the accompanying research review.

## Prioritized findings

### P0 — `mindwtr.app` serves arbitrary nonexistent paths as the homepage with HTTP 200

Live probes for [`/llms.txt`](https://mindwtr.app/llms.txt) and [a deliberately nonexistent URL](https://mindwtr.app/definitely-not-a-real-page-geo-audit) returned the exact 44,185-byte homepage body, the same SHA-256 prefix (`5baf3282f4662506`), title, and canonical as [the homepage](https://mindwtr.app/):

| Probe | HTTP | Content type | Canonical | Result |
|---|---:|---|---|---|
| `/` | 200 | `text/html` | `https://mindwtr.app/` | expected homepage |
| `/llms.txt` | 200 | `text/html` | `https://mindwtr.app/` | soft 404 |
| `/definitely-not-a-real-page-geo-audit` | 200 | `text/html` | `https://mindwtr.app/` | soft 404 |

This creates an unbounded duplicate-URL surface, masks missing resources, and can waste crawler attention. Return a real 404 for unknown paths at the hosting/edge layer. Keep the existing redirects: HTTP→HTTPS and `www`→apex correctly return 301; unwanted trailing slashes correctly return 308 to the canonical path.

### P1 — every docs page has the same generic meta description

All 59 docs URLs use:

> **D0:** Searchable documentation for Mindwtr, the free, local-first GTD app.

This prevents search snippets and generative systems from distinguishing installation, import, sync, API, and workflow answers before parsing body content. Add a page-specific description in frontmatter, ideally a direct one-sentence answer or outcome. The FAQ, MCP, import, installation, sync-provider, and developer-reference pages are the first high-intent targets.

### P1 — an implementation asset README is sitemap-listed, indexable, and orphaned

[`/public/assets/fonts/README`](https://docs.mindwtr.app/public/assets/fonts/README) returns 200, self-canonicalizes, appears in the sitemap, and renders as a public “Fonts” article. It has **zero non-self internal links**; every other audited page has at least eight.

Move the source note outside VitePress content discovery or explicitly exclude it from the build/sitemap. If it must remain reachable, mark it `noindex` and remove it from the sitemap. A private build rationale is not a useful search landing page and dilutes topical focus.

### P1 — docs social metadata is not page-specific

Every docs page provides `og:site_name`, `og:type`, the shared `og:image` (plus dimensions/alt), `twitter:card`, and `twitter:image`, but omits `og:title`, `og:description`, `og:url`, `twitter:title`, and `twitter:description`.

The landing host is better: every page has page-specific OG title, description, URL, type, and image. It also omits Twitter title/description, but Twitter/X can fall back to OG there. Add page-specific OG title/description/URL to docs; explicit Twitter title/description are optional once the OG fallback is complete.

### P1 — no JSON-LD exists on any of the 86 pages

This is the clearest GEO/entity gap. Add only schema that matches visible content:

- homepage: `SoftwareApplication` plus `Organization` (or `Person`, if maintainer identity is the intended public entity) and `WebSite`;
- docs pages: `TechArticle` or `HowTo` where the page is genuinely procedural, plus `BreadcrumbList`;
- [FAQ](https://docs.mindwtr.app/start/faq): `FAQPage`;
- [What is GTD?](https://mindwtr.app/gtd) and [GTD Overview](https://docs.mindwtr.app/use/gtd-overview): article-style entity/topic markup if authorship and dates can be supplied honestly.

Validate generated markup and keep claims, platform availability, price, license, and application category synchronized with visible copy.

### P2 — docs lack page-level freshness and provenance signals

Representative volatile pages such as [MCP Server](https://docs.mindwtr.app/power-users/mcp), [Cloud API](https://docs.mindwtr.app/developers/cloud-api), and [beta channels](https://docs.mindwtr.app/start/beta-channels) expose no visible `<time>`, last-updated label, author/maintainer attribution, or corresponding JSON-LD. Neither sitemap contains `<lastmod>`.

Expose a trustworthy last-updated date from source history on change-sensitive docs, identify the project/maintainer as publisher, and emit accurate sitemap `lastmod` values. Do not manufacture dates on every build.

### P2 — the docs layout overflows at the browser harness's 780px viewport

Rendered checks showed a 780px viewport but a 938px document width on the docs homepage, Getting Started, and Fonts pages, producing a page-level horizontal scrollbar. The landing homepage stayed within 765px. This is a tablet/breakpoint usability defect and can undermine mobile usability signals; constrain the wide header/navigation/content element that forces the document width.

### P2 — metadata polish on the landing site

- **20 of 27** descriptions exceed 160 characters. This is not an indexing error, but it invites snippet truncation. Shorten while preserving the direct benefit and differentiator.
- [English Support](https://mindwtr.app/support) and [French Support](https://mindwtr.app/fr/support) share the title “Support Mindwtr.” Localize the French title to avoid the only title duplicate and make the result language obvious.
- The 25 translated marketing pages have a complete reciprocal six-entry hreflang cluster (`en`, `de`, `es`, `fr`, `zh-Hans`, `x-default`). Brand and privacy correctly remain English-only with no hreflang.

### P3 — no genuine `llms.txt` resource

[`docs.mindwtr.app/llms.txt`](https://docs.mindwtr.app/llms.txt) correctly returns 404. [`mindwtr.app/llms.txt`](https://mindwtr.app/llms.txt) is only the soft-404 homepage described above. `llms.txt` remains an emerging convention rather than a substitute for crawlable HTML, sitemap, schema, and good information architecture; add a concise file only after the higher-priority defects. It should identify canonical docs, product facts, license, platforms, privacy/local-first constraints, and high-value answer pages.

## GEO/content answerability

The visible content is generally strong. [What Mindwtr is](https://docs.mindwtr.app/start/what-mindwtr-is) defines product scope immediately; [FAQ](https://docs.mindwtr.app/start/faq) uses explicit questions followed by direct answers; [MCP Server](https://docs.mindwtr.app/power-users/mcp) states transport, setup, read/write safety, and its canonical source; [Getting Started](https://docs.mindwtr.app/start/getting-started) and provider pages use procedural headings, tables, and lists. The landing hero also answers “what is it?” and the differentiators without requiring interaction.

The opportunity is therefore mostly **machine-facing packaging and trust**, not a site-wide rewrite:

1. unique descriptions and social summaries;
2. accurate schema, publisher, and freshness signals;
3. remove the irrelevant asset page and soft-404 duplicates;
4. selectively strengthen short provider/troubleshooting pages with a one-sentence outcome, prerequisites, numbered steps, expected result, and “if this fails” answer.

## Crawl and indexation checks

| Check | Result |
|---|---|
| Robots | Both hosts return 200, `User-agent: *`, `Allow: /`, and declare the correct sitemap. No AI crawler is specially blocked. |
| Sitemap inventory | 27 landing + 59 docs = 86 URLs; all return 200 HTML. |
| Crawl reconciliation | No real internally linked page is absent from the sitemaps. |
| Canonical | 86/86 present, unique, and self-referencing. |
| Title / H1 | 86/86 have exactly one title and one H1. |
| Meta description | 86/86 present; all 59 docs descriptions are the same D0 value. |
| Index directives | No page-level robots or X-Robots-Tag restriction; all 86 are indexable. |
| Hreflang | Complete six-member reciprocal clusters on 25 translated landing pages; none on English-only legal pages or English-only docs. |
| Open Graph | Landing 27/27 complete for title/description/type/URL/image; docs 59/59 have type/site-name/image but no page title/description/URL. |
| Twitter | 86/86 have card + image; none has explicit Twitter title/description. |
| JSON-LD | 0/86. |
| Image alt | 0 missing-alt and 0 unexplained empty-alt issues. |
| Internal links | One true orphan: the Fonts README. All other pages have ≥8 distinct audited-page inbound sources. |
| Social image | Both host URLs return a 1280×640 JPEG with HTTP 200. |

The raw HTML contains Cloudflare email-obfuscation links that normalize to `/cdn-cgi/l/email-protection`; these endpoints return 404 on both hosts. Rendered browser checks confirmed they become working `mailto:` links, so they are not additional pages or user-visible broken links. Link-check tooling should recognize this Cloudflare transformation rather than add the endpoints to a sitemap.

## Exact page inventory

Each row records its page-specific title, meta description, H1, hreflang set, and non-self inbound count. The **Base** code supplies the remaining per-page fields:

- **L** — HTTP 200, no redirect, indexable; self-canonical; one title/H1/description; full page-specific OG title/description/type/URL/image; Twitter card/image (no explicit title/description); no JSON-LD; no image-alt issue.
- **D** — HTTP 200, no redirect, indexable; self-canonical; one title/H1; description **D0**; no hreflang; OG site-name/type/image only; Twitter card/image only; no JSON-LD; no image-alt issue.

`DESC>160` is a snippet-length warning, not an indexability failure. Inbound counts are distinct HTML source pages within the two audited hosts, excluding self-links.

### mindwtr.app — 27 pages

| URL | Base | Title | Meta description | H1 | hreflang | Inbound | Flags |
|---|---|---|---|---|---|---:|---|
| [/](https://mindwtr.app/) | L | Mindwtr - Mind like water | A free, open-source to-do app that gets everything out of your head and shows you the next step. Works offline, no account, your data stays yours. | Mind like water. | en,de,es,fr,zh-Hans,x-default | 69 | — |
| [/brand](https://mindwtr.app/brand) | L | Brand & Trademark — Mindwtr | How the Mindwtr name and logo may be used. The code is open source (AGPL-3.0); the name and logo are a separate trademark. Forking is welcome — redistributed builds should use their own name. | Using the Mindwtr name. | — | 26 | DESC>160 |
| [/de/](https://mindwtr.app/de/) | L | Mindwtr – Kopf frei, klar wie Wasser | Eine kostenlose Open-Source-To-do-App, die alles aus deinem Kopf holt und dir den nächsten Schritt zeigt. Funktioniert offline, ohne Konto, deine Daten gehören dir. | Kopf frei. Klar wie Wasser. | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/de/donate](https://mindwtr.app/de/donate) | L | An Mindwtr spenden | Unterstütze Mindwtr mit einer Spende. Keine Werbung, kein Tracking, keine Paywalls – nur eine App, die von den Menschen frei und unabhängig gehalten wird, die sie nützlich finden. Spende über Ko-fi (ohne Konto) oder GitHub Sponsors. | Halte Mindwtr frei und unabhängig. | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/de/features](https://mindwtr.app/de/features) | L | Mindwtr Funktionen | Alles, was Mindwtr kann: der GTD-Ablauf, Ansichten, Produktivitäts-Tiefe, Sync unter deiner Kontrolle und Apps für jedes Gerät. Ein schneller Überblick mit Links in die Doku. | Alles, was Mindwtr kann. | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/de/gtd](https://mindwtr.app/de/gtd) | L | Was ist GTD? | Eine einfache Einführung in Getting Things Done (GTD): warum dein Kopf eine schlechte To-do-Liste ist – und die fünf einfachen Gewohnheiten, die das ändern. Fünf Minuten, ohne Fachbegriffe, ohne Buch. | Was ist GTD? | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/de/support](https://mindwtr.app/de/support) | L | Mindwtr Support | Hol dir Hilfe zu Mindwtr, melde einen Fehler oder stell eine Frage. Fehler und Feature-Wünsche lassen sich am besten auf GitHub verfolgen; private Fragen gehen per E-Mail. | Brauchst du Hilfe mit Mindwtr? | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/donate](https://mindwtr.app/donate) | L | Donate to Mindwtr | Support Mindwtr with a donation. No ads, no tracking, no paywalls — just an app kept free and independent by the people who find it useful. Give via Ko-fi (no account needed) or GitHub Sponsors. | Keep Mindwtr free and independent. | en,de,es,fr,zh-Hans,x-default | 11 | DESC>160 |
| [/es/](https://mindwtr.app/es/) | L | Mindwtr - Mente como el agua | Una app de tareas gratuita y de código abierto que saca todo de tu cabeza y te muestra el siguiente paso. Funciona sin conexión, sin cuenta, y tus datos son tuyos. | Mente como el agua. | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/es/donate](https://mindwtr.app/es/donate) | L | Donar a Mindwtr | Apoya Mindwtr con una donación. Sin anuncios, sin rastreo, sin muros de pago: solo una app que se mantiene gratis e independiente gracias a la gente que la encuentra útil. Dona por Ko-fi (sin cuenta) o GitHub Sponsors. | Mantén Mindwtr gratis e independiente. | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/es/features](https://mindwtr.app/es/features) | L | Funciones de Mindwtr | Todo lo que hace Mindwtr: el flujo GTD, las vistas, la profundidad para ser productivo, la sincronización que tú controlas y apps para cada dispositivo. Un resumen claro con enlaces a la documentación. | Todo lo que hace Mindwtr. | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/es/gtd](https://mindwtr.app/es/gtd) | L | ¿Qué es GTD? | Una introducción sencilla a Getting Things Done (GTD): por qué tu cabeza es una mala lista de tareas y los cinco hábitos simples que lo arreglan. Cinco minutos, sin jerga, sin necesidad de leer el libro. | ¿Qué es GTD? | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/es/support](https://mindwtr.app/es/support) | L | Soporte de Mindwtr | Consigue ayuda con Mindwtr, informa de un error o haz una pregunta. Los errores y las peticiones de funciones se siguen mejor en GitHub; las preguntas privadas pueden ir por correo. | ¿Necesitas ayuda con Mindwtr? | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/features](https://mindwtr.app/features) | L | Mindwtr Features | Everything Mindwtr does: the GTD workflow, views, productivity depth, sync you control, and apps for every device. A scannable overview that links into the docs. | Everything Mindwtr does. | en,de,es,fr,zh-Hans,x-default | 10 | DESC>160 |
| [/fr/](https://mindwtr.app/fr/) | L | Mindwtr - L’esprit comme l’eau | Une appli de tâches gratuite et open source qui vide votre tête et vous montre la prochaine étape. Fonctionne hors ligne, sans compte, vos données restent à vous. | L’esprit comme l’eau. | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/fr/donate](https://mindwtr.app/fr/donate) | L | Faire un don à Mindwtr | Soutenez Mindwtr par un don. Pas de pub, pas de pistage, pas de murs payants — juste une appli maintenue gratuite et indépendante par les gens qui la trouvent utile. Donnez via Ko-fi (sans compte) ou GitHub Sponsors. | Gardez Mindwtr gratuit et indépendant. | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/fr/features](https://mindwtr.app/fr/features) | L | Fonctionnalités de Mindwtr | Tout ce que fait Mindwtr : le flux GTD, les vues, la profondeur pour être productif, la synchronisation que vous contrôlez et des applis pour chaque appareil. Un aperçu clair qui renvoie vers la documentation. | Tout ce que fait Mindwtr. | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/fr/gtd](https://mindwtr.app/fr/gtd) | L | C’est quoi, GTD ? | Une introduction simple à Getting Things Done (GTD) : pourquoi votre tête est une mauvaise liste de tâches, et les cinq habitudes simples qui y remédient. Cinq minutes, sans jargon, sans lire le livre. | C’est quoi, GTD ? | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160 |
| [/fr/support](https://mindwtr.app/fr/support) | L | Support Mindwtr | Obtenez de l'aide sur Mindwtr, signalez un bug ou posez une question. Les bugs et demandes de fonctionnalités se suivent le mieux sur GitHub ; les questions privées peuvent passer par e-mail. | Besoin d’aide avec Mindwtr ? | en,de,es,fr,zh-Hans,x-default | 8 | DESC>160, DUP-TITLE |
| [/gtd](https://mindwtr.app/gtd) | L | What is GTD? | A plain-language introduction to Getting Things Done (GTD): why your head is a bad place to keep a to-do list, and the five simple habits that fix it. Five minutes, no jargon, no book required. | What is GTD? | en,de,es,fr,zh-Hans,x-default | 10 | DESC>160 |
| [/privacy](https://mindwtr.app/privacy) | L | Privacy Policy — Mindwtr | Mindwtr is local-first and minimizes data collection by design. What stays on your device, the few things that touch the network when you opt in (sync, anonymous analytics, BYOK AI), and your choices. | Privacy Policy | — | 29 | DESC>160 |
| [/support](https://mindwtr.app/support) | L | Support Mindwtr | Get help with Mindwtr, report a bug, or ask a question. Bugs and feature requests are easiest to track on GitHub; private questions can go by email. | Need help with Mindwtr? | en,de,es,fr,zh-Hans,x-default | 11 | DUP-TITLE |
| [/zh/](https://mindwtr.app/zh/) | L | Mindwtr - 心静如水 | 一款免费开源的待办应用：把脑子里的一切放进系统，只看下一步该做什么。离线可用，无需账号，数据完全属于你。 | 心静如 水。 | en,de,es,fr,zh-Hans,x-default | 8 | — |
| [/zh/donate](https://mindwtr.app/zh/donate) | L | 捐赠支持 Mindwtr | 通过捐赠支持 Mindwtr。没有广告、没有跟踪、没有付费墙——这款应用靠觉得它有用的人保持免费和独立。可通过 Ko-fi（无需账号）或 GitHub Sponsors 捐赠。 | 让 Mindwtr 保持免费和独立。 | en,de,es,fr,zh-Hans,x-default | 8 | — |
| [/zh/features](https://mindwtr.app/zh/features) | L | Mindwtr 功能 | Mindwtr 的全部功能：GTD 工作流、各种视图、高效工具、由你掌控的同步方式，以及覆盖每台设备的应用。一页看清全貌，并链接到详细文档。 | Mindwtr 能做的一切。 | en,de,es,fr,zh-Hans,x-default | 8 | — |
| [/zh/gtd](https://mindwtr.app/zh/gtd) | L | 什么是 GTD？ | 用大白话介绍 Getting Things Done（GTD）：为什么脑子是很糟糕的待办清单，以及能解决这个问题的五个简单习惯。五分钟读完，没有术语，不用读原著。 | 什么是 GTD？ | en,de,es,fr,zh-Hans,x-default | 8 | — |
| [/zh/support](https://mindwtr.app/zh/support) | L | Mindwtr 支持 | 获取 Mindwtr 帮助、报告问题或提出疑问。问题和功能建议最适合在 GitHub 上跟进；私人问题可以发邮件。 | 需要 Mindwtr 的帮助吗？ | en,de,es,fr,zh-Hans,x-default | 8 | — |

### docs.mindwtr.app — 59 pages

All rows use the exact D0 description quoted above.

| URL | Base | Title | Meta description | H1 | hreflang | Inbound | Flags |
|---|---|---|---|---|---|---:|---|
| [/](https://docs.mindwtr.app/) | D | Mindwtr Docs | D0 | Mindwtr Docs Searchable docs for a calm GTD system | — | 29 | — |
| [/data-sync/](https://docs.mindwtr.app/data-sync/) | D | Data and Sync \| Mindwtr Docs | D0 | Data and Sync | — | 63 | — |
| [/data-sync/backup-restore](https://docs.mindwtr.app/data-sync/backup-restore) | D | Backup and Restore \| Mindwtr Docs | D0 | Backup and Restore | — | 62 | — |
| [/data-sync/cloud-deployment](https://docs.mindwtr.app/data-sync/cloud-deployment) | D | Cloud Deployment \| Mindwtr Docs | D0 | Cloud Deployment | — | 57 | — |
| [/data-sync/data-lifecycle](https://docs.mindwtr.app/data-sync/data-lifecycle) | D | Data Lifecycle \| Mindwtr Docs | D0 | Data Lifecycle | — | 57 | — |
| [/data-sync/diagnostics-logs](https://docs.mindwtr.app/data-sync/diagnostics-logs) | D | Diagnostics and Logs \| Mindwtr Docs | D0 | Diagnostics and Logs | — | 57 | — |
| [/data-sync/dropbox](https://docs.mindwtr.app/data-sync/dropbox) | D | Dropbox Sync \| Mindwtr Docs | D0 | Dropbox Sync | — | 57 | — |
| [/data-sync/icloud](https://docs.mindwtr.app/data-sync/icloud) | D | iCloud Sync \| Mindwtr Docs | D0 | iCloud Sync | — | 57 | — |
| [/data-sync/self-hosted-cloud](https://docs.mindwtr.app/data-sync/self-hosted-cloud) | D | Self-hosted Mindwtr Cloud \| Mindwtr Docs | D0 | Self-hosted Mindwtr Cloud | — | 57 | — |
| [/data-sync/sync-algorithm](https://docs.mindwtr.app/data-sync/sync-algorithm) | D | Sync Algorithm \| Mindwtr Docs | D0 | Sync Algorithm | — | 57 | — |
| [/data-sync/webdav](https://docs.mindwtr.app/data-sync/webdav) | D | WebDAV sync \| Mindwtr Docs | D0 | WebDAV sync | — | 57 | — |
| [/developers/architecture](https://docs.mindwtr.app/developers/architecture) | D | Architecture \| Mindwtr Docs | D0 | Architecture | — | 57 | — |
| [/developers/cloud-api](https://docs.mindwtr.app/developers/cloud-api) | D | Cloud API \| Mindwtr Docs | D0 | Cloud API | — | 57 | — |
| [/developers/contributing](https://docs.mindwtr.app/developers/contributing) | D | Contributing \| Mindwtr Docs | D0 | Contributing | — | 57 | — |
| [/developers/core-api](https://docs.mindwtr.app/developers/core-api) | D | Core API \| Mindwtr Docs | D0 | Core API | — | 57 | — |
| [/developers/database-schema](https://docs.mindwtr.app/developers/database-schema) | D | Database Schema \| Mindwtr Docs | D0 | Database Schema | — | 57 | — |
| [/developers/developer-guide](https://docs.mindwtr.app/developers/developer-guide) | D | Developer Guide \| Mindwtr Docs | D0 | Developer Guide | — | 58 | — |
| [/developers/engineering-principles](https://docs.mindwtr.app/developers/engineering-principles) | D | Engineering Principles \| Mindwtr Docs | D0 | Engineering Principles | — | 57 | — |
| [/developers/performance](https://docs.mindwtr.app/developers/performance) | D | Performance Guide \| Mindwtr Docs | D0 | Performance Guide | — | 57 | — |
| [/developers/release-process](https://docs.mindwtr.app/developers/release-process) | D | Release Process \| Mindwtr Docs | D0 | Release Process | — | 57 | — |
| [/developers/testing-strategy](https://docs.mindwtr.app/developers/testing-strategy) | D | Testing Strategy \| Mindwtr Docs | D0 | Testing Strategy | — | 57 | — |
| [/developers/troubleshooting](https://docs.mindwtr.app/developers/troubleshooting) | D | Developer Troubleshooting \| Mindwtr Docs | D0 | Developer Troubleshooting | — | 57 | — |
| [/import/](https://docs.mindwtr.app/import/) | D | Importing Data From Other Apps \| Mindwtr Docs | D0 | Importing Data From Other Apps | — | 63 | — |
| [/import/dgt-gtd](https://docs.mindwtr.app/import/dgt-gtd) | D | DGT GTD Import \| Mindwtr Docs | D0 | DGT GTD Import | — | 57 | — |
| [/import/omnifocus](https://docs.mindwtr.app/import/omnifocus) | D | OmniFocus Import \| Mindwtr Docs | D0 | OmniFocus Import | — | 57 | — |
| [/import/ticktick](https://docs.mindwtr.app/import/ticktick) | D | TickTick Import \| Mindwtr Docs | D0 | TickTick Import | — | 57 | — |
| [/import/todoist](https://docs.mindwtr.app/import/todoist) | D | Todoist Import \| Mindwtr Docs | D0 | Todoist Import | — | 57 | — |
| [/power-users/](https://docs.mindwtr.app/power-users/) | D | Power user integrations \| Mindwtr Docs | D0 | Power user integrations | — | 58 | — |
| [/power-users/ai-assistant](https://docs.mindwtr.app/power-users/ai-assistant) | D | AI Assistant (BYOK) \| Mindwtr Docs | D0 | AI Assistant (BYOK) | — | 63 | — |
| [/power-users/apple-shortcuts](https://docs.mindwtr.app/power-users/apple-shortcuts) | D | Apple Shortcuts \| Mindwtr Docs | D0 | Apple Shortcuts | — | 62 | — |
| [/power-users/docker-deployment](https://docs.mindwtr.app/power-users/docker-deployment) | D | Docker Deployment \| Mindwtr Docs | D0 | Docker Deployment | — | 62 | — |
| [/power-users/email-capture](https://docs.mindwtr.app/power-users/email-capture) | D | Email Capture \| Mindwtr Docs | D0 | Email Capture | — | 57 | — |
| [/power-users/local-api](https://docs.mindwtr.app/power-users/local-api) | D | Local API Server \| Mindwtr Docs | D0 | Local API Server | — | 62 | — |
| [/power-users/mcp](https://docs.mindwtr.app/power-users/mcp) | D | MCP Server \| Mindwtr Docs | D0 | MCP Server | — | 67 | — |
| [/power-users/obsidian](https://docs.mindwtr.app/power-users/obsidian) | D | Obsidian Integration \| Mindwtr Docs | D0 | Obsidian Integration | — | 62 | — |
| [/power-users/web-app-pwa](https://docs.mindwtr.app/power-users/web-app-pwa) | D | Web App (PWA) \| Mindwtr Docs | D0 | Web App (PWA) | — | 62 | — |
| [/public/assets/fonts/README](https://docs.mindwtr.app/public/assets/fonts/README) | D | Fonts \| Mindwtr Docs | D0 | Fonts | — | 0 | ASSET-INDEX, ORPHAN |
| [/start/beta-channels](https://docs.mindwtr.app/start/beta-channels) | D | Join the Beta Channels \| Mindwtr Docs | D0 | Join the Beta Channels | — | 57 | — |
| [/start/commitments](https://docs.mindwtr.app/start/commitments) | D | What you can count on \| Mindwtr Docs | D0 | What you can count on | — | 57 | — |
| [/start/desktop-installation](https://docs.mindwtr.app/start/desktop-installation) | D | Desktop Installation \| Mindwtr Docs | D0 | Desktop Installation | — | 67 | — |
| [/start/faq](https://docs.mindwtr.app/start/faq) | D | FAQ \| Mindwtr Docs | D0 | FAQ | — | 62 | — |
| [/start/getting-started](https://docs.mindwtr.app/start/getting-started) | D | Getting Started \| Mindwtr Docs | D0 | Getting Started | — | 58 | — |
| [/start/mobile-installation](https://docs.mindwtr.app/start/mobile-installation) | D | Mobile Installation \| Mindwtr Docs | D0 | Mobile Installation | — | 62 | — |
| [/start/what-mindwtr-is](https://docs.mindwtr.app/start/what-mindwtr-is) | D | What Mindwtr is \| Mindwtr Docs | D0 | What Mindwtr is | — | 57 | — |
| [/use/areas-people](https://docs.mindwtr.app/use/areas-people) | D | Areas and People \| Mindwtr Docs | D0 | Areas and People | — | 57 | — |
| [/use/attachments](https://docs.mindwtr.app/use/attachments) | D | Attachments (Files, Links, Audio) \| Mindwtr Docs | D0 | Attachments (Files, Links, Audio) | — | 62 | — |
| [/use/calendar-integration](https://docs.mindwtr.app/use/calendar-integration) | D | Calendar Integration (Hard + Soft Landscape) \| Mindwtr Docs | D0 | Calendar Integration (Hard + Soft Landscape) | — | 62 | — |
| [/use/contexts-tags](https://docs.mindwtr.app/use/contexts-tags) | D | Contexts and Tags \| Mindwtr Docs | D0 | Contexts and Tags | — | 62 | — |
| [/use/daily-review](https://docs.mindwtr.app/use/daily-review) | D | Daily Review \| Mindwtr Docs | D0 | Daily Review | — | 57 | — |
| [/use/desktop](https://docs.mindwtr.app/use/desktop) | D | User Guide: Desktop \| Mindwtr Docs | D0 | User Guide: Desktop | — | 63 | — |
| [/use/gtd-overview](https://docs.mindwtr.app/use/gtd-overview) | D | GTD Overview \| Mindwtr Docs | D0 | GTD Overview | — | 62 | — |
| [/use/gtd-workflow](https://docs.mindwtr.app/use/gtd-workflow) | D | GTD Workflow in Mindwtr \| Mindwtr Docs | D0 | GTD Workflow in Mindwtr | — | 62 | — |
| [/use/keyboard-shortcuts](https://docs.mindwtr.app/use/keyboard-shortcuts) | D | Desktop keyboard shortcuts \| Mindwtr Docs | D0 | Desktop keyboard shortcuts | — | 62 | — |
| [/use/markdown-links](https://docs.mindwtr.app/use/markdown-links) | D | Markdown Links \| Mindwtr Docs | D0 | Markdown Links | — | 57 | — |
| [/use/mobile](https://docs.mindwtr.app/use/mobile) | D | User Guide: Mobile \| Mindwtr Docs | D0 | User Guide: Mobile | — | 62 | — |
| [/use/pomodoro-focus](https://docs.mindwtr.app/use/pomodoro-focus) | D | Pomodoro Focus \| Mindwtr Docs | D0 | Pomodoro Focus | — | 62 | — |
| [/use/recurring-tasks](https://docs.mindwtr.app/use/recurring-tasks) | D | Recurring Tasks \| Mindwtr Docs | D0 | Recurring Tasks | — | 57 | — |
| [/use/reusable-lists](https://docs.mindwtr.app/use/reusable-lists) | D | Reusable Lists (Templates) \| Mindwtr Docs | D0 | Reusable Lists (Templates) | — | 62 | — |
| [/use/weekly-review](https://docs.mindwtr.app/use/weekly-review) | D | Weekly Review \| Mindwtr Docs | D0 | Weekly Review | — | 62 | — |

## Method and limits

1. Fetched both live robots files and their declared sitemaps.
2. Seeded all sitemap URLs, followed every same-scope HTML link recursively across both audited hosts, normalized query/fragment variants, and reconciled discoveries back to the sitemap inventories.
3. Recorded response status/history, content type, robots directives, title, description, canonical, hreflang, H1, Open Graph, Twitter, JSON-LD, image alt state, and inbound sources from raw live HTML.
4. Used an isolated Chromium profile for rendered checks of the landing homepage, docs homepage, Getting Started, the Fonts README, and French Support. This confirmed visible layout behavior and Cloudflare's runtime email-link rewrite without accessing a personal browser profile.
5. Tested HTTP, `www`, and trailing-slash variants separately.

This is a live technical/content audit, not proof of current Google/Bing index coverage or ranking. Search Console, Bing Webmaster Tools, server logs, field Core Web Vitals, backlink data, and actual generative-engine citations were not available. Character-length flags are heuristics; search engines generate snippets dynamically, and Chinese cannot be evaluated with English word-count rules.
