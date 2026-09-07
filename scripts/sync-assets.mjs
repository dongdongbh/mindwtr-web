import { copyFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { sep, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "shared-assets");
// Only the docs link the diagram viewers, and they are megabytes each.
const docsOnly = [resolve(source, "diagrams")];
// The GTD explainer uses the loop diagram (CSP allows same-origin images only).
const landingAllowed = new Set([resolve(source, "diagrams", "gtd-workflow.svg")]);
const targets = [
  { path: resolve(root, "landing/public/assets"), skip: docsOnly },
  { path: resolve(root, "docs/public/assets"), skip: [] }
];

// Keep existing directories intact: replacing public/assets while another dev
// server is running can invalidate Vite's public-file registry and make MP4
// requests fall through to index.html. Prune only obsolete generated entries.
function syncDirectory(sourceDir, targetDir, allowed) {
  mkdirSync(targetDir, { recursive: true });
  const retained = new Set();
  for (const entry of readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = resolve(sourceDir, entry.name);
    if (!allowed(sourcePath)) continue;
    retained.add(entry.name);
    const targetPath = resolve(targetDir, entry.name);
    if (entry.isDirectory()) syncDirectory(sourcePath, targetPath, allowed);
    else copyFileSync(sourcePath, targetPath);
  }
  for (const entry of readdirSync(targetDir)) {
    if (!retained.has(entry)) rmSync(resolve(targetDir, entry), { recursive: true, force: true });
  }
}

for (const { path: target, skip } of targets) {
  syncDirectory(source, target, (sourcePath) =>
    !sourcePath.endsWith(".md")
    && (
      landingAllowed.has(sourcePath)
      || [...landingAllowed].some((allowed) => allowed.startsWith(sourcePath + sep))
      || !skip.some((dir) => sourcePath === dir || sourcePath.startsWith(dir + sep))
    )
  );
}

console.log("Shared assets synced to landing and docs public directories.");
