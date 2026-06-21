# Deploy Mindwtr Web

This repo deploys to two separate Cloudflare Pages projects:

| Project | Pages root | Build command       | Output directory   | Domain             |
| ------- | ---------- | ------------------- | ------------------ | ------------------ |
| Landing | `landing`  | `bun run build`     | `dist`             | `mindwtr.app`      |
| Docs    | `docs`     | `bun run docs:build` | `.vitepress/dist` | `docs.mindwtr.app` |

Docs use VitePress with base `/`.

There are two ways to deploy. **Method 1 (Git integration) is the default** — pushing to `main` ships both sites automatically. Use Method 2 (Wrangler) only for manual or out-of-band deploys.

## Method 1 — Git integration (default)

Each Cloudflare Pages project is connected to this GitHub repo. On every push to `main`, Cloudflare builds the project from its Pages root using the build command above and publishes the output directory to the project's domain.

1. Run the pre-push checks: `bun run check` (secret scan + landing build + docs build).
2. Commit and push to `main`.
3. Cloudflare Pages builds and deploys each project automatically. Track progress in the Cloudflare dashboard under **Workers & Pages → the project → Deployments**.

Deploy authentication is handled entirely by the Cloudflare/GitHub integration — no tokens live in the repo or in your shell.

## Method 2 — Wrangler CLI (manual)

Use this to publish a local build directly, e.g. to ship without a push or to test a one-off build. It uploads prebuilt output and does **not** run Cloudflare's build pipeline.

Prerequisites:

- Wrangler installed (`wrangler --version`).
- Authenticate once with `wrangler login` (interactive OAuth), or set `CLOUDFLARE_API_TOKEN` (and `CLOUDFLARE_ACCOUNT_ID`) in your shell. **Never commit these** — keep them in your environment or a CI secret store.
- Know each project's Cloudflare Pages **project name** (from the dashboard; it may differ from the domain).

Landing:

```bash
cd landing
bun run build
wrangler pages deploy dist --project-name=<landing-project-name>
```

Docs:

```bash
cd docs
bun run docs:build
wrangler pages deploy .vitepress/dist --project-name=<docs-project-name>
```

A manual Wrangler deploy creates a new deployment on the same project and coexists with Git-integration deploys; a later push to `main` still triggers a fresh build.

## Environment

- Set `BUN_VERSION` to the value in `.bun-version` (in each Pages project's settings for Method 1; in your shell for Method 2).
- Do not add Cloudflare API tokens, account IDs, D1 IDs, local `.dev.vars`, or provider secrets to this repository.

## Local note

If this repo is nested under another JavaScript workspace, VitePress may warn about that parent workspace's `tsconfig.json`. The Cloudflare Pages projects should use the scoped project roots above, so the build runs from `landing` or `docs` rather than from a parent workspace.
