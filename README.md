# Mindwtr Web

[![GEO Score](https://geoready.dev/badge?url=https%3A%2F%2Fmindwtr.app)](https://geoready.dev?utm_source=badge)

Automated technical and content readiness score from [GEO Optimizer](https://github.com/Auriti-Labs/geo-optimizer-skill); it is not a Google ranking or verified evidence of AI citations.

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
- Output directory: `.vitepress/dist`
- Domain: `docs.mindwtr.app`

Set `BUN_VERSION` to `1.3.3` in both Pages projects unless `.bun-version` changes.

Deploy authentication lives in the Cloudflare/GitHub integration. Do not commit Cloudflare tokens, account IDs, local `.dev.vars`, or Wrangler state.
