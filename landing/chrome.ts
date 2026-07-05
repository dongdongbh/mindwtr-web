import { basename } from "node:path";
import type { Plugin } from "vite";

// Page chrome for the landing: the head boilerplate, header, and footer that
// every page shares, injected at build/serve time so each page file carries
// only its own content and a small head (title, description, og:title,
// og:description). The canonical URL, og:url, and nav aria-current state are
// derived from the page's filename, so they cannot drift per page. Pages are
// flat under landing/ — index.html serves "/", <name>.html serves "/<name>".

const ORIGIN = "https://mindwtr.app";

const HEADER_LINKS = [
  { href: "/features", label: "Features" },
  { href: "https://docs.mindwtr.app/", label: "Docs" },
  { href: "https://github.com/dongdongbh/Mindwtr", label: "GitHub" },
  { href: "/support", label: "Support" }
];

const FOOTER_LINKS = [
  ...HEADER_LINKS,
  { href: "/donate", label: "Donate" },
  { href: "/brand", label: "Brand" },
  { href: "/privacy", label: "Privacy" }
];

function anchor(link: { href: string; label: string }, pagePath: string): string {
  const current = link.href === pagePath ? ' aria-current="page"' : "";
  return `<a href="${link.href}"${current}>${link.label}</a>`;
}

function sharedHeadMeta(pagePath: string): string {
  const url = `${ORIGIN}${pagePath}`;
  return `    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ORIGIN}/assets/screenshots/social-preview.jpg" />
    <meta property="og:image:width" content="1280" />
    <meta property="og:image:height" content="640" />
    <meta property="og:image:alt" content="Mindwtr — Get Things Done. Local &amp; Open Source." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${ORIGIN}/assets/screenshots/social-preview.jpg" />
    <link rel="icon" href="/assets/brand/icon.png" />
    <link rel="canonical" href="${url}" />
`;
}

function header(pagePath: string): string {
  // The homepage scrolls to its own download grid; other pages link back.
  const download = pagePath === "/" ? "#download" : "/#download";
  const links = HEADER_LINKS.map((link) => `        ${anchor(link, pagePath)}`).join("\n");
  return `    <header class="site-header">
      <a class="brand" href="/" aria-label="Mindwtr home">
        <img src="/assets/brand/icon.png" alt="" />
        <span>Mindwtr</span>
      </a>
      <nav aria-label="Primary navigation">
${links}
        <a class="nav-download" href="${download}">Download</a>
      </nav>
    </header>

`;
}

function footer(pagePath: string): string {
  const links = FOOTER_LINKS.map((link) => `        ${anchor(link, pagePath)}`).join("\n");
  return `    <footer class="site-footer">
      <nav class="footer-nav" aria-label="Footer">
        <span>Mindwtr</span>
${links}
      </nav>
      <p class="footer-copyright">
        &copy; 2025&ndash;2026 Dongda Li &middot; Free and open source (AGPL-3.0)
      </p>
      <p class="footer-legal">
        Mindwtr and the Mindwtr logo are trademarks of the Mindwtr project.
        Getting Things Done and GTD are registered trademarks of the David Allen
        Company. Mindwtr is not affiliated with, endorsed by, or sponsored by the
        David Allen Company.
      </p>
    </footer>

    <script type="module" src="/src/main.ts"></script>
`;
}

export function chrome(): Plugin {
  return {
    name: "mindwtr:chrome",
    transformIndexHtml: {
      // "pre" so the injected main.ts script tag goes through Vite's own HTML
      // processing and gets bundled like a hand-written one.
      order: "pre",
      handler(html, ctx) {
        const page = basename(ctx.filename);
        const pagePath = page === "index.html" ? "/" : `/${page.replace(/\.html$/, "")}`;
        return html
          .replace(/[ \t]*<!-- chrome:.*?-->\n/gs, "")
          .replace(
            "<head>",
            `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />`
          )
          .replace(/[ \t]*<\/head>/, `${sharedHeadMeta(pagePath)}  </head>`)
          .replace("<body>", `<body>\n${header(pagePath)}`)
          .replace(/[ \t]*<\/body>/, `${footer(pagePath)}  </body>`);
      }
    }
  };
}
