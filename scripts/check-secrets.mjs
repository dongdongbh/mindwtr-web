import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const forbiddenText = (process.env.MINDWTR_WEB_FORBIDDEN_TEXT ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const suspiciousPatterns = [
  /(?:CF_API_TOKEN|CLOUDFLARE_API_TOKEN|FLATHUB_TOKEN|AWS_ACCESS_KEY_ID|AWS_SECRET_ACCESS_KEY)\s*=/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /sk-[A-Za-z0-9_-]{20,}/,
  /cf_[A-Za-z0-9_-]{20,}/
];

const output = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" });
const files = output.split("\0").filter(Boolean);
const findings = [];

for (const file of files) {
  let content;

  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }

  for (const needle of forbiddenText) {
    if (content.includes(needle)) {
      findings.push(`${file}: contains forbidden identifier ${needle}`);
    }
  }

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(content)) {
      findings.push(`${file}: matches ${pattern}`);
    }
  }
}

if (findings.length > 0) {
  console.error(findings.join("\n"));
  process.exit(1);
}

console.log("No committed secrets matched the configured scan.");
