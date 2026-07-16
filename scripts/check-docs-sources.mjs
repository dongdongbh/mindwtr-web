import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { DOCS_LOCALE_ORDER } from "../docs/.vitepress/locales/index.mjs";

const root = resolve(import.meta.dirname, "..");
const docsRoot = resolve(root, "docs");
const localeKeys = new Set(DOCS_LOCALE_ORDER.filter((key) => key !== "root"));
const findings = [];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function relativeMarkdownFiles(dir) {
  if (!existsSync(dir)) return [];
  return walk(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => posix.join(...file.slice(dir.length + 1).split(/[\\/]/)))
    .sort();
}

function markdownStructure(source) {
  const headingLevels = [];
  let fenceCount = 0;
  let activeFence = null;
  const blockCounts = {
    unorderedLists: 0,
    orderedLists: 0,
    tableRows: 0,
    horizontalRules: 0,
    admonitionMarkers: 0,
    blockquotes: 0
  };

  for (const line of source.split("\n")) {
    const fence = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      const marker = fence[1][0];
      if (!activeFence) {
        activeFence = marker;
        fenceCount += 1;
      } else if (activeFence === marker) {
        activeFence = null;
        fenceCount += 1;
      }
      continue;
    }
    if (activeFence) continue;

    const heading = line.match(/^(#{1,6})\s/);
    if (heading) headingLevels.push(heading[1].length);
    if (/^\s*[-+*]\s+/.test(line)) blockCounts.unorderedLists += 1;
    if (/^\s*\d+[.)]\s+/.test(line)) blockCounts.orderedLists += 1;
    if (/^\s*\|.*\|\s*$/.test(line)) blockCounts.tableRows += 1;
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) blockCounts.horizontalRules += 1;
    if (/^\s*:::/.test(line)) blockCounts.admonitionMarkers += 1;
    if (/^\s*>/.test(line)) blockCounts.blockquotes += 1;
  }

  return { headingLevels, fenceCount, blockCounts };
}

function technicalCodeBlockLanguages(source) {
  const translatedFenceLanguages = new Set(["md", "markdown", "text", "plaintext"]);
  const blocks = [];
  let active = null;

  for (const line of source.split("\n")) {
    const fence = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (!active && fence) {
      active = {
        marker: fence[1][0],
        language: fence[2].trim().split(/\s+/, 1)[0].toLowerCase()
      };
      continue;
    }
    if (active && fence?.[1][0] === active.marker && fence[2].trim() === "") {
      if (!translatedFenceLanguages.has(active.language)) {
        blocks.push(active.language);
      }
      active = null;
    }
  }

  return blocks;
}

function protectedCommandCodeBlocks(source) {
  const protectedLanguages = new Set([
    "bash",
    "batch",
    "cmd",
    "console",
    "powershell",
    "ps1",
    "sh",
    "shell",
    "zsh"
  ]);
  const blocks = [];
  let active = null;

  for (const line of source.split("\n")) {
    const fence = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (!active && fence) {
      active = {
        marker: fence[1][0],
        language: fence[2].trim().split(/\s+/, 1)[0].toLowerCase(),
        commands: []
      };
      continue;
    }
    if (active && fence?.[1][0] === active.marker && fence[2].trim() === "") {
      if (protectedLanguages.has(active.language)) blocks.push(active.commands);
      active = null;
      continue;
    }
    if (!active || !protectedLanguages.has(active.language)) continue;

    const command = line.trim();
    if (command !== "" && !/^(?:#|REM(?:\s|$))/i.test(command)) {
      active.commands.push(command);
    }
  }

  return blocks;
}

function inlineCodeSpans(source) {
  const withoutFences = source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ");
  return [...withoutFences.matchAll(/(?<!`)`([^`\n]+)`(?!`)/g)].map((match) =>
    match[1].trim()
  );
}

function isProtectedTechnicalCode(value) {
  return (
    /^https?:\/\//i.test(value) ||
    /^(?:\.{0,2}\/|~\/|\/|[A-Za-z]:[\\/])/.test(value) ||
    /^(?:[\w.*{}<>@+-]+\/)+[\w.*{}<>@+-]+\/?$/.test(value) ||
    /(?:^|[/\\])[\w.*{}<>@+-]+\.(?:db|env|html|ini|js|json|lock|md|mjs|plist|sh|sqlite|toml|ts|tsx|txt|xml|ya?ml)(?:$|[/?#\s])/i.test(
      value
    ) ||
    /^(?:git|gh|bun|npm|npx|pnpm|yarn|cargo|docker|curl|sudo|python3?|node|flatpak|winget|choco|brew|chmod|cp|mv|mkdir|cd|export)\b/.test(
      value
    ) ||
    /^[A-Z][A-Z0-9_]*(?:=\S+)?$/.test(value) ||
    /^--[\w-]+(?:[=\s]\S+)?$/.test(value) ||
    /^@[\w.-]+\/[\w.-]+$/.test(value) ||
    /^[a-z0-9]+(?:-[a-z0-9]+){2,}$/.test(value) ||
    /^[a-z]+(?:[A-Z][A-Za-z0-9]*)+$/.test(value) ||
    /^v?(?:\d+|X)\.(?:\d+|Y)\.(?:\d+|Z)(?:-[\w.]+)?$/.test(value) ||
    /^[\w.-]+\.\.[\w.-]+$/.test(value) ||
    /^(?:Ctrl|Cmd|Shift|Alt|Option|Meta)(?:\+(?:[A-Za-z0-9]+|F\d+))+$/.test(value) ||
    /^(?:main|HEAD|internal|beta|none)$/.test(value)
  );
}

function requiresExactOccurrenceCount(value) {
  return (
    /^https?:\/\//i.test(value) ||
    /^(?:\.github|apps|config|docs\/release-notes|metadata|packages|scripts|wiki)\//.test(
      value
    ) ||
    /^(?:\/|\.{1,2}\/|~\/|[A-Za-z]:[\\/])/.test(value) ||
    /^(?:git|gh|bun|npm|npx|pnpm|yarn|cargo|docker|curl|sudo|python3?|node|flatpak|winget|choco|brew|chmod|cp|mv|mkdir|cd|export)\b/.test(
      value
    ) ||
    /^[A-Z][A-Z0-9_]*(?:=\S+)?$/.test(value) ||
    /^--[\w-]+(?:[=\s]\S+)?$/.test(value) ||
    /^@[\w.-]+\/[\w.-]+$/.test(value) ||
    /^[a-z0-9]+(?:-[a-z0-9]+){2,}$/.test(value) ||
    /^v?(?:\d+|X)\.(?:\d+|Y)\.(?:\d+|Z)(?:-[\w.]+)?$/.test(value) ||
    /^[\w.-]+\.\.[\w.-]+$/.test(value)
  );
}

function countValues(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

function protectedTechnicalCode(source) {
  return countValues(inlineCodeSpans(source).filter(isProtectedTechnicalCode));
}

function protectedCommandTokens(source) {
  const tokens = new Set();
  for (const span of inlineCodeSpans(source)) {
    for (const match of span.matchAll(/(?<![\w])([/@#+][A-Za-z][\w:.-]*)/g)) {
      tokens.add(match[1]);
    }
    for (const match of span.matchAll(/(?<![\w-])(-?[A-Za-z][\w-]*:)/g)) {
      tokens.add(match[1]);
    }
  }
  return tokens;
}

const englishFiles = relativeMarkdownFiles(docsRoot).filter((file) => {
  const first = file.split("/", 1)[0];
  return ![".vitepress", "node_modules", "public"].includes(first) && !localeKeys.has(first);
});

for (const key of localeKeys) {
  const localeDir = join(docsRoot, key);
  const translatedFiles = relativeMarkdownFiles(localeDir);
  const translatedSet = new Set(translatedFiles);
  const englishSet = new Set(englishFiles);

  for (const file of englishFiles) {
    if (!translatedSet.has(file)) findings.push(`docs/${key}: missing translated page ${file}`);
  }
  for (const file of translatedFiles) {
    if (!englishSet.has(file)) findings.push(`docs/${key}: unexpected translated page ${file}`);
  }

  for (const file of translatedFiles) {
    const source = readFileSync(join(localeDir, file), "utf8");
    const englishSource = readFileSync(join(docsRoot, file), "utf8");
    const translatedStructure = markdownStructure(source);
    const englishStructure = markdownStructure(englishSource);
    const translatedCodeBlocks = technicalCodeBlockLanguages(source);
    const englishCodeBlocks = technicalCodeBlockLanguages(englishSource);
    const translatedCommandBlocks = protectedCommandCodeBlocks(source);
    const englishCommandBlocks = protectedCommandCodeBlocks(englishSource);
    const translatedTechnicalCode = protectedTechnicalCode(source);
    const translatedCommandTokens = protectedCommandTokens(source);

    if (
      translatedStructure.headingLevels.join(",") !==
      englishStructure.headingLevels.join(",")
    ) {
      findings.push(`docs/${key}/${file}: heading structure differs from English`);
    }
    if (translatedStructure.fenceCount !== englishStructure.fenceCount) {
      findings.push(
        `docs/${key}/${file}: code fence count ${translatedStructure.fenceCount} differs from English ${englishStructure.fenceCount}`
      );
    }
    for (const blockType of Object.keys(englishStructure.blockCounts)) {
      const expected =
        file === "index.md" && blockType === "blockquotes"
          ? englishStructure.blockCounts[blockType] + 1
          : englishStructure.blockCounts[blockType];
      if (translatedStructure.blockCounts[blockType] !== expected) {
        findings.push(
          `docs/${key}/${file}: ${blockType} count ${translatedStructure.blockCounts[blockType]} differs from expected ${expected}`
        );
      }
    }
    if (translatedCodeBlocks.length !== englishCodeBlocks.length) {
      findings.push(
        `docs/${key}/${file}: technical code block count ${translatedCodeBlocks.length} differs from English ${englishCodeBlocks.length}`
      );
    } else {
      for (let index = 0; index < englishCodeBlocks.length; index += 1) {
        if (translatedCodeBlocks[index] !== englishCodeBlocks[index]) {
          findings.push(
            `docs/${key}/${file}: technical code block ${index + 1} language differs from English`
          );
        }
      }
    }
    if (translatedCommandBlocks.length !== englishCommandBlocks.length) {
      findings.push(
        `docs/${key}/${file}: protected command block count ${translatedCommandBlocks.length} differs from English ${englishCommandBlocks.length}`
      );
    } else {
      for (let index = 0; index < englishCommandBlocks.length; index += 1) {
        if (
          translatedCommandBlocks[index].join("\n") !==
          englishCommandBlocks[index].join("\n")
        ) {
          findings.push(
            `docs/${key}/${file}: protected command block ${index + 1} differs from English`
          );
        }
      }
    }

    for (const [value, expectedCount] of protectedTechnicalCode(englishSource)) {
      const actualCount = translatedTechnicalCode.get(value) ?? 0;
      if (
        actualCount === 0 ||
        (requiresExactOccurrenceCount(value) && actualCount !== expectedCount)
      ) {
        findings.push(
          `docs/${key}/${file}: protected inline code ${JSON.stringify(value)} occurs ${actualCount} times; expected ${requiresExactOccurrenceCount(value) ? expectedCount : "at least 1"}`
        );
      }
    }
    for (const token of protectedCommandTokens(englishSource)) {
      if (!translatedCommandTokens.has(token)) {
        findings.push(
          `docs/${key}/${file}: protected command token ${JSON.stringify(token)} is missing`
        );
      }
    }

    const absoluteTargets = [
      ...source.matchAll(/\]\((\/[^)\s]*)\)/g),
      ...source.matchAll(/<a\b[^>]*\shref="(\/[^"]*)"/gi),
      ...source.matchAll(/^\s*link:\s*(\/\S+)\s*$/gm)
    ].map((match) => match[1].split(/[?#]/, 1)[0]);

    for (const target of absoluteTargets) {
      if (
        target === "" ||
        target.startsWith("/assets/") ||
        target === `/${key}` ||
        target.startsWith(`/${key}/`)
      ) {
        continue;
      }
      findings.push(`docs/${key}/${file}: absolute docs link "${target}" leaves the ${key} locale`);
    }
  }
}

if (findings.length > 0) {
  console.error(findings.join("\n"));
  process.exit(1);
}

console.log(
  "Documentation locale sources verified: page sets, structure, protected technical code and commands, code fences, and links."
);
