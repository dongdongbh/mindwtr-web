import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Mindwtr Docs",
  description: "Searchable documentation for Mindwtr, the free, local-first GTD app.",
  base: "/",
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", href: "/assets/brand/icon.png" }],
    ["meta", { property: "og:site_name", content: "Mindwtr Docs" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:image", content: "https://docs.mindwtr.app/assets/screenshots/social-preview.jpg" }],
    ["meta", { property: "og:image:width", content: "1280" }],
    ["meta", { property: "og:image:height", content: "640" }],
    ["meta", { property: "og:image:alt", content: "Mindwtr — Get Things Done. Local & Open Source." }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: "https://docs.mindwtr.app/assets/screenshots/social-preview.jpg" }]
  ],
  vite: {
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          target: "ES2022"
        }
      }
    }
  },
  sitemap: {
    hostname: "https://docs.mindwtr.app"
  },
  // With cleanUrls each page is reachable at /path and /path.html; the
  // canonical tag tells crawlers which one to index.
  transformPageData(pageData) {
    const canonicalUrl = `https://docs.mindwtr.app/${pageData.relativePath}`
      .replace(/index\.md$/, "")
      .replace(/\.md$/, "");
    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(["link", { rel: "canonical", href: canonicalUrl }]);
  },
  themeConfig: {
    logo: "/assets/brand/icon.png",
    // The logo/title links back to the main marketing site; the nav row below
    // is doc sections only, and the source repo lives in socialLinks (icon).
    logoLink: "https://mindwtr.app/",
    search: {
      provider: "local"
    },
    nav: [
      { text: "Start", link: "/start/getting-started" },
      { text: "Use Mindwtr", link: "/use/desktop" },
      { text: "Data & Sync", link: "/data-sync/" },
      { text: "Import", link: "/import/" },
      { text: "Power Users", link: "/power-users/" },
      { text: "Developers", link: "/developers/developer-guide" }
    ],
    sidebar: [
      {
        text: "Start here",
        items: [
          { text: "Getting started", link: "/start/getting-started" },
          { text: "What Mindwtr is", link: "/start/what-mindwtr-is" },
          { text: "What you can count on", link: "/start/commitments" },
          { text: "Desktop installation", link: "/start/desktop-installation" },
          { text: "Mobile installation", link: "/start/mobile-installation" },
          { text: "Beta channels", link: "/start/beta-channels" },
          { text: "FAQ", link: "/start/faq" }
        ]
      },
      {
        text: "Use Mindwtr",
        items: [
          { text: "Desktop guide", link: "/use/desktop" },
          { text: "Keyboard shortcuts", link: "/use/keyboard-shortcuts" },
          { text: "Mobile guide", link: "/use/mobile" },
          { text: "GTD overview", link: "/use/gtd-overview" },
          { text: "GTD workflow", link: "/use/gtd-workflow" },
          { text: "Areas and People", link: "/use/areas-people" },
          { text: "Contexts and tags", link: "/use/contexts-tags" },
          { text: "Recurring tasks", link: "/use/recurring-tasks" },
          { text: "Daily review", link: "/use/daily-review" },
          { text: "Weekly review", link: "/use/weekly-review" },
          { text: "Calendar integration", link: "/use/calendar-integration" },
          { text: "Attachments", link: "/use/attachments" },
          { text: "Reusable lists", link: "/use/reusable-lists" },
          { text: "Pomodoro Focus", link: "/use/pomodoro-focus" },
          { text: "Markdown links", link: "/use/markdown-links" }
        ]
      },
      {
        text: "Data and sync",
        items: [
          { text: "Overview", link: "/data-sync/" },
          { text: "Backup and restore", link: "/data-sync/backup-restore" },
          { text: "Data lifecycle", link: "/data-sync/data-lifecycle" },
          { text: "Sync algorithm", link: "/data-sync/sync-algorithm" },
          { text: "iCloud sync", link: "/data-sync/icloud" },
          { text: "Dropbox sync", link: "/data-sync/dropbox" },
          { text: "WebDAV sync", link: "/data-sync/webdav" },
          { text: "Self-hosted cloud", link: "/data-sync/self-hosted-cloud" },
          { text: "Cloud deployment", link: "/data-sync/cloud-deployment" },
          { text: "Diagnostics and logs", link: "/data-sync/diagnostics-logs" }
        ]
      },
      {
        text: "Import and migrate",
        items: [
          { text: "Overview", link: "/import/" },
          { text: "TickTick", link: "/import/ticktick" },
          { text: "Todoist", link: "/import/todoist" },
          { text: "DGT GTD", link: "/import/dgt-gtd" },
          { text: "OmniFocus", link: "/import/omnifocus" }
        ]
      },
      {
        text: "Power users",
        items: [
          { text: "Overview", link: "/power-users/" },
          { text: "AI assistant", link: "/power-users/ai-assistant" },
          { text: "Apple Shortcuts", link: "/power-users/apple-shortcuts" },
          { text: "Email capture", link: "/power-users/email-capture" },
          { text: "Local API", link: "/power-users/local-api" },
          { text: "MCP server", link: "/power-users/mcp" },
          { text: "Obsidian integration", link: "/power-users/obsidian" },
          { text: "Web app and PWA", link: "/power-users/web-app-pwa" },
          { text: "Docker deployment", link: "/power-users/docker-deployment" }
        ]
      },
      {
        text: "Developers",
        items: [
          { text: "Developer guide", link: "/developers/developer-guide" },
          { text: "Architecture", link: "/developers/architecture" },
          { text: "Core API", link: "/developers/core-api" },
          { text: "Cloud API", link: "/developers/cloud-api" },
          { text: "Database schema", link: "/developers/database-schema" },
          { text: "Engineering principles", link: "/developers/engineering-principles" },
          { text: "Testing strategy", link: "/developers/testing-strategy" },
          { text: "Performance guide", link: "/developers/performance" },
          { text: "Release process", link: "/developers/release-process" },
          { text: "Troubleshooting", link: "/developers/troubleshooting" },
          { text: "Contributing", link: "/developers/contributing" }
        ]
      }
    ],
    editLink: {
      pattern: "https://github.com/dongdongbh/mindwtr-web/edit/main/docs/:path",
      text: "Edit this page on GitHub"
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/dongdongbh/Mindwtr" }
    ],
    footer: {
      message:
        "Mindwtr is free, open source, and local-first.<br>Getting Things Done and GTD are registered trademarks of the David Allen Company. Mindwtr is not affiliated with, endorsed by, or sponsored by the David Allen Company.",
      copyright: "Released under AGPL-3.0."
    }
  }
});
