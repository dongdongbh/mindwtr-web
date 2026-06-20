# Release process

Mindwtr releases span several runtimes and distribution channels.

## Release rule

A tagged release should be treated as immutable. Fix forward with a new version rather than changing what a tag means.

## Channels

- App Store.
- Google Play.
- Microsoft Store.
- Flathub.
- Snap Store.
- F-Droid and IzzyOnDroid.
- GitHub Releases.
- Homebrew, winget, AUR, and other downstream packaging where maintained.

## Checklist

1. Run relevant tests and builds.
2. Validate generated artifacts per channel.
3. Confirm store metadata and screenshots when needed.
4. Publish release notes.
5. Watch downstream build or packaging feedback.

## See also

- [Engineering principles](/developers/engineering-principles)
- [Testing strategy](/developers/testing-strategy)
- [Developer troubleshooting](/developers/troubleshooting)
