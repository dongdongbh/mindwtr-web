import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "shared-assets");
// Only the docs link the diagram viewers, and they are megabytes each.
const docsOnly = [resolve(source, "diagrams")];
const targets = [
  { path: resolve(root, "landing/public/assets"), skip: docsOnly },
  { path: resolve(root, "docs/public/assets"), skip: [] }
];

for (const { path: target, skip } of targets) {
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  cpSync(source, target, {
    recursive: true,
    // Asset documentation belongs in the source tree, not at a public URL.
    filter: (sourcePath) =>
      !sourcePath.endsWith(".md") && !skip.some((dir) => sourcePath.startsWith(dir))
  });
}

console.log("Shared assets synced to landing and docs public directories.");
