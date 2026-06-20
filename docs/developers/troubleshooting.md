# Developer troubleshooting

Use this page when local development, builds, tests, or sync debugging get stuck.

## Workspace issues

If dependencies look out of sync, run the repository's package-manager install command from the repo root. Avoid fixing generated output by hand.

## Desktop issues

Linux desktop builds may need system packages for Tauri, WebKit, audio, and app packaging. If diagnostics are missing, confirm the app was built with the diagnostics feature.

## Mobile issues

Android and iOS bugs can depend on native permissions, emulators, and device-only APIs. Reproduce on the target platform before treating a Jest result as complete evidence.

## Sync and storage debugging

Export a backup first. Then check provider state, local logs, clock skew, and whether another device has pending changes.

## Tests

Prefer package-local test commands when debugging a specific area. Keep broad test runs for final verification.

## See also

- [Diagnostics and logs](/data-sync/diagnostics-logs)
- [Testing strategy](/developers/testing-strategy)
- [Architecture](/developers/architecture)
