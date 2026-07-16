export const NAV_ITEMS = [
  { key: "start", link: "/start/getting-started" },
  { key: "use", link: "/use/desktop" },
  { key: "dataSync", link: "/data-sync/" },
  { key: "import", link: "/import/" },
  { key: "powerUsers", link: "/power-users/" },
  { key: "developers", link: "/developers/developer-guide" }
];

export const SIDEBAR_SECTIONS = [
  {
    key: "start",
    items: [
      ["gettingStarted", "/start/getting-started"],
      ["whatMindwtrIs", "/start/what-mindwtr-is"],
      ["commitments", "/start/commitments"],
      ["desktopInstallation", "/start/desktop-installation"],
      ["mobileInstallation", "/start/mobile-installation"],
      ["betaChannels", "/start/beta-channels"],
      ["faq", "/start/faq"]
    ]
  },
  {
    key: "use",
    items: [
      ["desktopGuide", "/use/desktop"],
      ["keyboardShortcuts", "/use/keyboard-shortcuts"],
      ["mobileGuide", "/use/mobile"],
      ["gtdOverview", "/use/gtd-overview"],
      ["gtdWorkflow", "/use/gtd-workflow"],
      ["areasPeople", "/use/areas-people"],
      ["contextsTags", "/use/contexts-tags"],
      ["recurringTasks", "/use/recurring-tasks"],
      ["dailyReview", "/use/daily-review"],
      ["weeklyReview", "/use/weekly-review"],
      ["calendarIntegration", "/use/calendar-integration"],
      ["attachments", "/use/attachments"],
      ["reusableLists", "/use/reusable-lists"],
      ["pomodoroFocus", "/use/pomodoro-focus"],
      ["markdownLinks", "/use/markdown-links"]
    ]
  },
  {
    key: "dataSync",
    items: [
      ["overview", "/data-sync/"],
      ["backupRestore", "/data-sync/backup-restore"],
      ["dataLifecycle", "/data-sync/data-lifecycle"],
      ["syncAlgorithm", "/data-sync/sync-algorithm"],
      ["icloudSync", "/data-sync/icloud"],
      ["dropboxSync", "/data-sync/dropbox"],
      ["webdavSync", "/data-sync/webdav"],
      ["selfHostedCloud", "/data-sync/self-hosted-cloud"],
      ["cloudDeployment", "/data-sync/cloud-deployment"],
      ["diagnosticsLogs", "/data-sync/diagnostics-logs"]
    ]
  },
  {
    key: "import",
    items: [
      ["overview", "/import/"],
      ["ticktick", "/import/ticktick"],
      ["todoist", "/import/todoist"],
      ["dgtGtd", "/import/dgt-gtd"],
      ["omnifocus", "/import/omnifocus"]
    ]
  },
  {
    key: "powerUsers",
    items: [
      ["overview", "/power-users/"],
      ["aiAssistant", "/power-users/ai-assistant"],
      ["appleShortcuts", "/power-users/apple-shortcuts"],
      ["emailCapture", "/power-users/email-capture"],
      ["localApi", "/power-users/local-api"],
      ["mcpServer", "/power-users/mcp"],
      ["obsidian", "/power-users/obsidian"],
      ["webAppPwa", "/power-users/web-app-pwa"],
      ["dockerDeployment", "/power-users/docker-deployment"]
    ]
  },
  {
    key: "developers",
    items: [
      ["developerGuide", "/developers/developer-guide"],
      ["architecture", "/developers/architecture"],
      ["coreApi", "/developers/core-api"],
      ["cloudApi", "/developers/cloud-api"],
      ["databaseSchema", "/developers/database-schema"],
      ["engineeringPrinciples", "/developers/engineering-principles"],
      ["testingStrategy", "/developers/testing-strategy"],
      ["performanceGuide", "/developers/performance"],
      ["releaseProcess", "/developers/release-process"],
      ["troubleshooting", "/developers/troubleshooting"],
      ["contributing", "/developers/contributing"]
    ]
  }
];

const REQUIRED_UI_KEYS = [
  "outlineLabel",
  "editLinkText",
  "previousPage",
  "nextPage",
  "darkModeSwitchLabel",
  "lightModeSwitchTitle",
  "darkModeSwitchTitle",
  "sidebarMenuLabel",
  "returnToTopLabel",
  "langMenuLabel",
  "skipToContentLabel"
];

function assertString(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Docs locale is missing ${label}`);
  }
}

export function withLocale(localeKey, path) {
  if (!path.startsWith("/")) throw new Error(`Docs route must start with "/": ${path}`);
  return localeKey === "root" ? path : `/${localeKey}${path}`;
}

export function validateLocaleMessages(localeKey, messages) {
  for (const key of [
    "label",
    "lang",
    "hreflang",
    "ogLocale",
    "title",
    "description",
    "siteTitle",
    "socialImageAlt",
    "footerMessage",
    "copyright"
  ]) {
    assertString(messages[key], `${localeKey}.${key}`);
  }

  for (const { key } of NAV_ITEMS) {
    assertString(messages.nav?.[key], `${localeKey}.nav.${key}`);
  }

  for (const section of SIDEBAR_SECTIONS) {
    assertString(messages.groups?.[section.key], `${localeKey}.groups.${section.key}`);
    for (const [itemKey] of section.items) {
      assertString(messages.pages?.[section.key]?.[itemKey], `${localeKey}.pages.${section.key}.${itemKey}`);
    }
  }

  for (const key of REQUIRED_UI_KEYS) {
    assertString(messages.ui?.[key], `${localeKey}.ui.${key}`);
  }

  for (const key of ["title", "quote", "linkLabel", "linkText"]) {
    assertString(messages.notFound?.[key], `${localeKey}.notFound.${key}`);
  }

  for (const key of [
    "buttonText",
    "buttonAriaLabel",
    "displayDetails",
    "resetButtonTitle",
    "backButtonTitle",
    "noResultsText",
    "selectText",
    "selectKeyAriaLabel",
    "navigateText",
    "navigateUpKeyAriaLabel",
    "navigateDownKeyAriaLabel",
    "closeText",
    "closeKeyAriaLabel"
  ]) {
    assertString(messages.search?.[key], `${localeKey}.search.${key}`);
  }

  return messages;
}

function localSearchTranslations(search) {
  return {
    button: {
      buttonText: search.buttonText,
      buttonAriaLabel: search.buttonAriaLabel
    },
    modal: {
      displayDetails: search.displayDetails,
      resetButtonTitle: search.resetButtonTitle,
      backButtonTitle: search.backButtonTitle,
      noResultsText: search.noResultsText,
      footer: {
        selectText: search.selectText,
        selectKeyAriaLabel: search.selectKeyAriaLabel,
        navigateText: search.navigateText,
        navigateUpKeyAriaLabel: search.navigateUpKeyAriaLabel,
        navigateDownKeyAriaLabel: search.navigateDownKeyAriaLabel,
        closeText: search.closeText,
        closeKeyAriaLabel: search.closeKeyAriaLabel
      }
    }
  };
}

export function createLocaleConfig(localeKey, rawMessages) {
  const messages = validateLocaleMessages(localeKey, rawMessages);

  return {
    label: messages.label,
    lang: messages.lang,
    link: withLocale(localeKey, "/"),
    title: messages.title,
    description: messages.description,
    themeConfig: {
      siteTitle: messages.siteTitle,
      nav: NAV_ITEMS.map(({ key, link }) => ({
        text: messages.nav[key],
        link: withLocale(localeKey, link)
      })),
      sidebar: SIDEBAR_SECTIONS.map((section) => ({
        text: messages.groups[section.key],
        items: section.items.map(([itemKey, link]) => ({
          text: messages.pages[section.key][itemKey],
          link: withLocale(localeKey, link)
        }))
      })),
      outline: { label: messages.ui.outlineLabel },
      editLink: {
        pattern: "https://github.com/dongdongbh/mindwtr-web/edit/main/docs/:path",
        text: messages.ui.editLinkText
      },
      docFooter: {
        prev: messages.ui.previousPage,
        next: messages.ui.nextPage
      },
      darkModeSwitchLabel: messages.ui.darkModeSwitchLabel,
      lightModeSwitchTitle: messages.ui.lightModeSwitchTitle,
      darkModeSwitchTitle: messages.ui.darkModeSwitchTitle,
      sidebarMenuLabel: messages.ui.sidebarMenuLabel,
      returnToTopLabel: messages.ui.returnToTopLabel,
      langMenuLabel: messages.ui.langMenuLabel,
      skipToContentLabel: messages.ui.skipToContentLabel,
      search: {
        provider: "local",
        options: {
          translations: localSearchTranslations(messages.search)
        }
      },
      notFound: messages.notFound,
      footer: {
        message: messages.footerMessage,
        copyright: messages.copyright
      }
    }
  };
}
