# Web app and PWA

Mindwtr includes a web build for people who want browser access or a self-hosted PWA-style deployment.

## Run locally

Use the current repository instructions for the web app. Typical options are Docker for a packaged local deployment or Bun for development.

## Build for hosting

The web build is static or app-server hosted depending on the current package target. Put it behind HTTPS for installability and for APIs that require a secure context.

## PWA behavior

PWA behavior depends on browser support. Offline behavior, install prompts, file access, and notifications differ across desktop and mobile browsers.

## Limitations

The native desktop and mobile apps are the primary install targets. Use the web app when browser access or self-hosting matters more than native integration.

## See also

- [Docker deployment](/power-users/docker-deployment)
- [Self-hosted cloud](/data-sync/self-hosted-cloud)
