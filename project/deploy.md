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
- Do not add Cloudflare API tokens, account IDs, D1 IDs, local `.dev.vars`, or provider secrets to this repository.
- Deploy authentication is handled by the Cloudflare/GitHub integration.

## Local note

If this repo is nested under another JavaScript workspace, VitePress may warn about that parent workspace's `tsconfig.json`. The Cloudflare Pages projects should use the scoped project roots above, so the build runs from `landing` or `docs` rather than from a parent workspace.
