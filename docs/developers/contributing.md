# Contributing

Mindwtr welcomes focused contributions that preserve the product's local-first
GTD direction.

Use the guide for the repository you plan to change:

- [Website and documentation contribution guide](https://github.com/dongdongbh/mindwtr-web/blob/main/CONTRIBUTING.md)
- [App and interface contribution guide](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)

## Good first contributions

- Improve a confusing doc page
- Fix an inaccurate or broken instruction
- Translate a coherent documentation section
- Add a tested example for an existing workflow

## Product constraints

Before proposing a change, check it against these constraints:

- No account required for core use
- Local-first by default
- GTD concepts stay coherent
- AI and automation remain optional
- Sync choices stay user-controlled

## Documentation workflow

1. Open an issue before starting a new locale or reorganizing a section.
2. Edit the source under `docs/` in the
   [mindwtr-web repository](https://github.com/dongdongbh/mindwtr-web).
3. Keep each pull request focused on one guide, section, or locale.
4. Run `bun run check` from the repository root.
5. Explain which pages and locales changed in the pull request.

## Documentation changes

Write docs for user intent. Prefer pages such as "Import from TickTick" or
"WebDAV sync" over one long feature inventory.

Public user and developer docs live under `docs/` and publish to
https://docs.mindwtr.app/. Keep process docs, ADRs, and release notes in the
[app repository docs](https://github.com/dongdongbh/Mindwtr/tree/main/docs).
The GitHub Wiki is retired and does not accept new content pages.

The web contribution guide defines the supported documentation locales,
translation rollout, terminology sources, link fallback rules, and pull
request checks.

English is the source for the complete German, Spanish, French, Simplified
Chinese, and Traditional Chinese docs. Maintainers use language-focused coding
agents to update each static Markdown set, then run the shared build and link
checks. If translated wording sounds wrong, use the page's edit link or open an
issue with the corrected wording.

## License

Mindwtr is AGPL-3.0. Contributions are accepted under the same license.
