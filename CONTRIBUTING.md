# Contributing to Mindwtr Web

Thanks for helping improve Mindwtr's public website and documentation. This
repository publishes:

- [mindwtr.app](https://mindwtr.app/) from `landing/`
- [docs.mindwtr.app](https://docs.mindwtr.app/) from `docs/`

Most contributions to this repository should improve public documentation,
translations, or the landing site. App code and interface strings belong in
the [Mindwtr app repository](https://github.com/dongdongbh/Mindwtr).

## Before you begin

- Follow the Mindwtr [Code of Conduct](https://github.com/dongdongbh/Mindwtr/blob/main/.github/CODE_OF_CONDUCT.md).
- Report security issues through the private process in
  [SECURITY.md](https://github.com/dongdongbh/Mindwtr/blob/main/.github/SECURITY.md).
- Open or confirm an issue before starting a new locale, reorganizing the docs,
  or changing shared landing or VitePress behavior. Small typo and broken-link
  fixes can go straight to a pull request.
- Check current app behavior before documenting it. Use the
  [Mindwtr repository](https://github.com/dongdongbh/Mindwtr) and a current app
  build as the source for product behavior.

## Choose the right source

| Change | Edit |
| --- | --- |
| Public user or developer documentation | `docs/` |
| Landing page content | `landing/*.html` or `landing/<locale>/*.html` |
| Shared landing navigation, footer, or metadata | `landing/chrome.ts` |
| Brand assets, screenshots, or badges | `shared-assets/` |
| Build and verification behavior | `scripts/` |
| App code or interface translations | [dongdongbh/Mindwtr](https://github.com/dongdongbh/Mindwtr) |

Do not edit generated files in `landing/public/assets/`,
`docs/public/assets/`, `landing/dist/`, or `docs/.vitepress/dist/`.

## Set up the repository

Use Bun `1.3.3`, as specified in `.bun-version`.

```bash
bun install
```

Run one site during editing:

```bash
bun run docs:dev
bun run landing:dev
```

Run the relevant build while you work:

```bash
bun run docs:build
bun run landing:build
```

For translation-only work, run the fast source-parity check before building:

```bash
bun run check:docs-sources
```

Before opening a pull request, run the full repository gate:

```bash
bun run check
```

The full check scans for secrets, builds both sites, and verifies links,
fragments, metadata, canonical URLs, social images, and sitemap coverage.

## Documentation contributions

Write pages around a reader's goal. A page such as "Import from TickTick" or
"Back up and restore your data" serves readers better than a list of related
features.

Follow these rules:

- Put the answer or required action near the beginning.
- Keep instructions accurate, ordered, and runnable.
- State platform limits and prerequisites where readers need them.
- Preserve Mindwtr's local-first, no-account, open-source, optional-sync, and
  optional-AI commitments.
- Keep GTD trademark and non-affiliation wording accurate.
- Use descriptive link text and accessible image alt text.
- Omit `.md` and `.html` extensions from internal links.
- Add a new page to the shared route registry in
  `docs/.vitepress/locales/base.mjs` so readers can reach it from every
  localized nav and sidebar.
- Put public documentation here. The app repository's `docs/` directory holds
  repository process documents, ADRs, and release notes. The retired GitHub
  Wiki does not accept new content pages.

Prefer focused pull requests. A new guide and the navigation entry that exposes
it belong together. An unrelated landing redesign does not.

## Documentation translations

Mindwtr publishes the complete docs in the languages shown on the landing
site, plus Traditional Chinese:

| Language menu label | Language tag | Directory and URL prefix |
| --- | --- | --- |
| English | `en-US` | English remains at the site root |
| Deutsch | `de` | `docs/de/` and `/de/` |
| Español | `es` | `docs/es/` and `/es/` |
| Français | `fr` | `docs/fr/` and `/fr/` |
| 简体中文 | `zh-Hans` | `docs/zh-Hans/` and `/zh-Hans/` |
| 繁體中文 | `zh-Hant` | `docs/zh-Hant/` and `/zh-Hant/` |

English remains the source language and the `x-default` version. Every locale
keeps the same filenames and page set as English. The build fails when a
translated page is missing or an extra translated page has no English source.

Maintainers can assign one language-focused coding agent to each locale. The
agent translates the static Markdown from English, follows terminology from the
app's locale file, and updates localized navigation and theme text. Do not use
a browser translator, translation API, runtime translation layer, or script
conversion to publish the docs.

Agent-authored translations can ship after they pass the repository checks and
a terminology review. They do not need to wait for a fluent reviewer. Each
translated page offers an "Edit this page" link, and readers should correct
wording that sounds wrong or open a GitHub issue. English settles questions
about the intended technical meaning.

An English documentation change should update all five translations in the
same pull request. For a large English rewrite, split the work by locale among
language agents, then integrate the results through one shared build and
review.

### Translation rules

- Match product terms used by the app's
  [`zh-Hans.ts`](https://github.com/dongdongbh/Mindwtr/blob/main/packages/core/src/i18n/locales/zh-Hans.ts),
  [`zh-Hant.ts`](https://github.com/dongdongbh/Mindwtr/blob/main/packages/core/src/i18n/locales/zh-Hant.ts),
  and other locale files.
- Translate Simplified and Traditional Chinese as separate locales. Do not use
  script conversion to create the Traditional Chinese version.
- Use **如水** as the reader-facing app name in both Chinese locales. Keep
  `Mindwtr` where it is part of a URL, repository name, package, command,
  protocol payload, code sample, or another technical identifier.
- Preserve Markdown structure, frontmatter keys, code, commands, URLs,
  placeholders, product names, protocol names, and file paths.
- Keep command tokens in English when parser behavior depends on them.
- Link to the translated page when it exists. If it does not, link to the
  English page and identify the link as English in the translated text.
- Reuse current screenshots unless the interface language affects the
  instruction. Add new screenshots to `shared-assets/`, never a generated
  public asset directory.
- Keep headings and anchors stable enough for inbound links. Run the full check
  after changing headings.

VitePress provides the underlying
[internationalization support](https://vitepress.dev/guide/i18n). Keep locale
configuration in the shared VitePress config rather than adding custom
client-side routing.

## Landing page translations

The landing site currently publishes English, German, Spanish, French, and
Simplified Chinese. When changing an English marketing page, update its `de`,
`es`, `fr`, and `zh` copies in the same pull request.

Keep review quotes verbatim in English and mark them with `lang="en"`. Privacy
and brand pages remain English-only so the legal wording does not drift.

Edit `landing/chrome.ts` for shared navigation, footer, canonical, social, or
language-menu behavior. Do not copy shared chrome into individual pages.

## Pull requests

1. Fork the repository and create a focused branch.
2. Make the source changes and run `bun run check`.
3. Open a pull request to `dongdongbh/mindwtr-web:main`.
4. Link the issue with `Fixes #...` when the pull request completes it.

Useful branch names include:

- `docs/translate-zh-hans-start`
- `docs/fix-webdav-steps`
- `fix/docs-language-menu`

Include these details in the pull request:

- the pages and locales changed
- the reason for the change
- the linked issue
- the commands you ran
- screenshots for visual or navigation changes
- any English-only links or translation follow-ups that remain

Use Conventional Commits when possible, such as:

- `docs: add Simplified Chinese getting-started guide`
- `docs: clarify backup and restore`
- `fix(docs): correct localized canonical URLs`

Mindwtr uses a
[Contributor License Agreement](https://gist.github.com/dongdongbh/0446c35e1d5c1a73c344b16cba4aeeaa).
CLA Assistant will prompt you on your first pull request if a signature is
needed.

## Need help?

Open a GitHub issue before a large documentation or translation contribution.
For translation work, state the locale, the section you plan to translate, and
whether you can help review future updates.

You can also join the Mindwtr community on
[Discord](https://discord.gg/gc4h5t58PR).
