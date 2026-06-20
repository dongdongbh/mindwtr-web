# Mindwtr Web Design

Date: 2026-06-19
Status: Approved

## Goal

Create the public web presence for Mindwtr in this repository:

- `mindwtr.app`: a polished landing page that helps new users decide to install Mindwtr.
- `docs.mindwtr.app`: searchable documentation that replaces the GitHub wiki as the canonical user and developer docs surface.

The site should be richer, prettier, and more discoverable than GitHub wiki pages while staying low-maintenance for a solo maintainer.

## License

Use AGPL-3.0 to match the main Mindwtr application repository. If GitHub already created the repository with an AGPL-3.0 license file, keep that license when syncing the first local push.

## Repository and Deployment Architecture

Use one repository with two independently deployed Cloudflare Pages projects:

- `/landing`: landing page source for `mindwtr.app`.
- `/docs`: VitePress documentation source for `docs.mindwtr.app`.
- `/shared-assets`: shared icons, screenshots, badges, and brand assets consumed by both surfaces.

Cloudflare Pages projects:

- Landing project:
  - Root directory: `/landing`
  - Build command: `bun run build`
  - Output directory: `dist`
  - Domain: `mindwtr.app`
- Docs project:
  - Root directory: `/docs`
  - Build command: explicit docs build script, pinned during scaffolding
  - Output directory: must be verified by running the local VitePress build and reporting the actual emitted path
  - Domain: `docs.mindwtr.app`

Docs run on a dedicated subdomain, so VitePress `base` must remain `/`.

## Landing Page Design

The landing page optimizes for a new user deciding whether to install Mindwtr, while immediately surfacing proof that matters to GTD power users.

Hero:

- Headline: `Mind like water.`
- Subhead: `A calm GTD system that keeps your work local and your next action clear.`
- Use real Mindwtr desktop and mobile screenshots, not abstract illustrations.
- Primary CTA: smart install/download action that resolves to the most natural channel for the visitor's platform when possible.
- Secondary CTAs: documentation and GitHub.
- Proof chips high in the first screen:
  - `Free forever`
  - `Local-first`
  - `No account`
  - `All platforms`

Sections:

- GTD workflow:
  - Capture: get it out of your head, fast.
  - Clarify: turn vague items into clear next actions.
  - Organize: keep projects, contexts, and waiting items where they belong.
  - Reflect: review the system before it gets stale.
  - Engage: choose the next action with confidence.
- Platform breadth:
  - Use real screenshots from desktop, mobile, and tablet where available.
  - Show that Mindwtr is native across desktop and mobile without turning the hero into a badge wall.
- Trust:
  - Open source.
  - Private by default.
  - Local-first data.
  - Flexible sync options.
- Power users:
  - Optional BYOK/local AI.
  - Local API.
  - MCP server.
  - Self-hosted cloud sync.
- Final CTA:
  - Install/download.
  - Documentation.
  - Community/GitHub links.

Visual tone:

- Direction A: calm GTD product.
- Light, polished, product-first page.
- Restrained green/teal identity with one warm accent.
- No generic productivity gradients.
- No AI-first positioning.
- No decorative blobs/orbs.

## Documentation Design

The docs are not a raw wiki copy. They should be a searchable product manual organized by user intent.

Information architecture:

- Start here:
  - Install
  - First launch
  - First capture
  - First review
- Use Mindwtr:
  - Desktop guide
  - Mobile guide
  - GTD workflow
  - Quick add
  - Search
  - Reviews
  - Calendar
  - Attachments
- Data and sync:
  - Local data model
  - Backup and restore
  - File sync
  - iCloud
  - Dropbox
  - WebDAV
  - Self-hosted cloud
  - Troubleshooting
- Import and migrate:
  - TickTick
  - Todoist
  - OmniFocus
  - DGT GTD
  - Apple Reminders
  - Obsidian
- Power users:
  - AI assistant
  - Apple Shortcuts
  - Local API
  - MCP
  - Automation
  - Self-hosting
- Developers:
  - Architecture
  - Core API
  - Testing
  - Release process
  - Contributing

Docs home:

- Use cards by user intent rather than a flat page list.
- Put search and common first tasks up front.
- Link high-risk sync and data recovery paths clearly.

Migration rules:

- Use `/home/dd/code/Mindwtr/wiki` as source material, but rewrite high-traffic pages into web docs first.
- First rewrite pass:
  - Getting Started
  - Data and Sync
  - Desktop guide
  - Mobile guide
  - FAQ
  - AI Assistant
  - MCP Server
- Lower-traffic developer pages can migrate closer to markdown initially.
- Once a wiki page is migrated, `docs.mindwtr.app` becomes canonical.
- The old GitHub wiki page should become a pointer/stub to the new docs page and must not be maintained in parallel.
- Import pages should use clean SEO-friendly routes, such as `/import/ticktick`, `/import/todoist`, and `/import/omnifocus`.
- Add Cloudflare Pages `_redirects` for common renamed docs routes so existing inbound links have a durable target.
- Update outbound links after launch:
  - Main Mindwtr README documentation links.
  - In-app documentation links.
  - Store listing support/documentation URLs where applicable.
  - GitHub wiki stubs that point to the new canonical docs pages.

## Tooling and Dependencies

Keep the dependency surface small.

Allowed initial dependencies:

- Root/shared tooling:
  - `vite`
  - `typescript`
- Landing:
  - Plain Vite app with custom CSS.
  - No component library.
  - No animation framework.
  - No Tailwind unless implementation shows real benefit.
- Docs:
  - `vitepress`
  - Built-in local search: `themeConfig.search.provider = "local"`
  - Built-in sitemap with `hostname: "https://docs.mindwtr.app"`
  - `vitepress-plugin-mermaid` only if Mermaid diagrams are actually included in the first migration pass.

Skip for now:

- Algolia or external search.
- External analytics.
- Comments.
- i18n plugins.
- PWA plugins.
- Image optimization plugins.
- Component libraries.
- Animation frameworks.

## Build and Deployment Guardrails

- Do not commit secrets, tokens, or infrastructure identifiers.
- Do not commit Cloudflare API tokens, deploy tokens, account IDs, D1 IDs, rate-limit namespace IDs, `FLATHUB_TOKEN`-style release secrets, or local `.dev.vars` values.
- Cloudflare Pages deploy authentication must live in the Cloudflare/GitHub integration, not in this repository.
- Keep `.gitignore` covering `.env*`, `.dev.vars*`, local Wrangler/Cloudflare state, dependency folders, build outputs, `.vitepress/dist`, and `.bun`.
- Before the first push and before release handoff, scan committed files for common secret names and known account identifiers.
- Pin Bun for local and Cloudflare builds using a repo-level version file or equivalent Pages environment setting.
- Define explicit scripts instead of relying on ambiguous `build` commands across the monorepo.
- Run the landing build locally and verify the emitted output directory.
- Run the docs build locally and verify the actual VitePress emitted output directory before writing final Cloudflare Pages instructions.
- Keep docs `base: "/"` because docs deploy to `docs.mindwtr.app`, not to a subpath.

## Verification Plan

Before claiming the implementation is complete:

- Run landing build.
- Run docs build.
- Report actual output directories for both builds.
- Run any available typecheck or lint commands introduced by the scaffold.
- Preview landing and docs locally.
- Check desktop and mobile screenshots for the landing page using real current Mindwtr screenshots from the app repo or shared assets. Do not ship placeholder boxes as final product imagery.
- Verify VitePress local search works.
- Verify migrated internal links resolve.
- Verify no old wiki link syntax remains in migrated pages.
- Verify no committed file contains secrets, tokens, Cloudflare account identifiers, or local Wrangler/Cloudflare state.
- Verify `_redirects` covers the migrated high-traffic docs routes.
- Verify README, in-app docs links, and relevant store/support URLs point at `docs.mindwtr.app` after the new docs are live.

## Open Questions

None. The architecture, landing direction, docs information architecture, dependency policy, and deployment guardrails are approved.
