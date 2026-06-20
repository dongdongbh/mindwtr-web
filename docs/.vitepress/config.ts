import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Mindwtr Docs",
  description: "Searchable documentation for Mindwtr, the free, local-first GTD app.",
  base: "/",
  cleanUrls: true,
  sitemap: {
    hostname: "https://docs.mindwtr.app"
  },
  themeConfig: {
    logo: "/assets/brand/icon.png",
    search: {
      provider: "local"
    },
    nav: [
      { text: "Start", link: "/start/getting-started" },
      { text: "Use Mindwtr", link: "/use/desktop" },
      { text: "Data & Sync", link: "/data-sync/" },
      { text: "Power Users", link: "/power-users/ai-assistant" },
      { text: "GitHub", link: "https://github.com/dongdongbh/Mindwtr" }
    ],
    sidebar: [
      {
        text: "Start here",
        items: [
          { text: "Getting started", link: "/start/getting-started" },
          { text: "FAQ", link: "/start/faq" }
        ]
      },
      {
        text: "Use Mindwtr",
        items: [
          { text: "Desktop guide", link: "/use/desktop" },
          { text: "Mobile guide", link: "/use/mobile" },
          { text: "GTD workflow", link: "/use/gtd-workflow" }
        ]
      },
      {
        text: "Data and sync",
        items: [
          { text: "Overview", link: "/data-sync/" },
          { text: "Backup and restore", link: "/data-sync/backup-restore" },
          { text: "iCloud sync", link: "/data-sync/icloud" },
          { text: "Dropbox sync", link: "/data-sync/dropbox" },
          { text: "WebDAV sync", link: "/data-sync/webdav" },
          { text: "Self-hosted cloud", link: "/data-sync/self-hosted-cloud" }
        ]
      },
      {
        text: "Import and migrate",
        items: [
          { text: "TickTick", link: "/import/ticktick" },
          { text: "Todoist", link: "/import/todoist" },
          { text: "OmniFocus", link: "/import/omnifocus" }
        ]
      },
      {
        text: "Power users",
        items: [
          { text: "AI assistant", link: "/power-users/ai-assistant" },
          { text: "MCP server", link: "/power-users/mcp" }
        ]
      },
      {
        text: "Developers",
        items: [
          { text: "Architecture", link: "/developers/architecture" },
          { text: "Contributing", link: "/developers/contributing" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/dongdongbh/Mindwtr" }
    ],
    footer: {
      message: "Mindwtr is free, open source, and local-first.",
      copyright: "Released under AGPL-3.0."
    }
  }
});
