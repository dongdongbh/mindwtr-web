# Contributing

Mindwtr welcomes focused contributions that preserve the product's local-first GTD direction.

## Good first contributions

- Fix a small bug with a clear reproduction
- Improve a confusing doc page
- Add a test for an existing behavior
- Polish copy or accessibility in an existing flow
- Improve an importer for a real exported file format

## Product constraints

Before proposing a change, check it against these constraints:

- No account required for core use
- Local-first by default
- GTD concepts stay coherent
- AI and automation remain optional
- Sync choices stay user-controlled

## Development workflow

1. Open an issue or discussion for behavior changes.
2. Keep the first pull request narrow.
3. Add tests for shared logic or regressions.
4. Verify the platform you changed.
5. Explain user-visible behavior in the pull request.

## Documentation changes

Docs should be written for user intent, not as a raw feature list. Prefer clear pages like "Import from TickTick" or "WebDAV sync" over dumping every related detail into one long page.

Public user and developer docs live in this repo under `docs/` and publish to https://docs.mindwtr.app/. The public source is https://github.com/dongdongbh/mindwtr-web/tree/main/docs. Keep repository-local process docs, ADRs, and release notes in the Mindwtr app repo docs source at https://github.com/dongdongbh/Mindwtr/tree/main/docs. The GitHub Wiki is retired: `wiki/` in the app repo holds only a landing page that points readers to this docs site. Do not add wiki content pages — documentation changes go to the two locations above.

## License

Mindwtr is AGPL-3.0. Contributions are accepted under the same license.
