# Mindwtr Web

[![GEO Score](https://geoready.dev/badge?url=https%3A%2F%2Fmindwtr.app)](https://geoready.dev?utm_source=badge)

Automated technical and content readiness score from [GEO Optimizer](https://github.com/Auriti-Labs/geo-optimizer-skill); it is not a Google ranking or verified evidence of AI citations.

Public website and documentation for [Mindwtr](https://github.com/dongdongbh/Mindwtr).

- `landing/` builds `mindwtr.app`.
- `docs/` builds `docs.mindwtr.app`.
- `shared-assets/` stores brand assets and screenshots copied into each deploy root.

The docs publish complete English, German, Spanish, French, Simplified Chinese,
and Traditional Chinese page sets. English is the source language; each
translated page links to GitHub so readers can improve wording.

See [CONTRIBUTING.md](CONTRIBUTING.md) for documentation, translation, and
website contribution guidelines.

## Cloudflare Pages

Landing project:

- Root directory: `landing`
- Build command: `bun run build`
- Output directory: `dist`
- Domain: `mindwtr.app`

Docs project:

- Root directory: `docs`
- Build command: `bun run docs:build`
- Output directory: `.vitepress/dist`
- Domain: `docs.mindwtr.app`

Set `BUN_VERSION` to `1.3.3` in both Pages projects unless `.bun-version` changes.

Deploy authentication lives in the Cloudflare/GitHub integration. Do not commit Cloudflare tokens, account IDs, local `.dev.vars`, or Wrangler state.

## On-site videos

The homepage introduces Mindwtr, Features contains the feature tour, and the Handbook contains the GTD walkthrough. The docs video library at `/start/videos` brings these together with the desktop and mobile quick tours, with localized navigation and descriptions.

Players serve MP4s directly from each site's `/assets/videos/` path. They use deliberate poster covers and separate English captions, native controls, and `preload="none"` without autoplay or a third-party player. Only the poster is needed before the visitor chooses to play.

Curated delivery files live in `shared-assets/videos/`; original recordings and 4K masters stay in the separate video workspace. See that directory's README for source versions and replacement guidance. Run `bun run check` after changes; its link checks include video sources, caption tracks and posters.
