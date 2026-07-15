import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "shared-assets");
const targets = [
  resolve(root, "landing/public/assets"),
  resolve(root, "docs/public/assets")
];

for (const target of targets) {
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  cpSync(source, target, {
    recursive: true,
    // Asset documentation belongs in the source tree, not at a public URL.
    filter: (sourcePath) => !sourcePath.endsWith(".md")
  });
}

console.log("Shared assets synced to landing and docs public directories.");
