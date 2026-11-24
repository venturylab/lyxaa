/**
 * Fails if a blocked civil name or given name appears outside this file,
 * or if the public-line marker appears outside the allowed copy files.
 * Blocked names and the official lines are stored encoded.
 * Do not decode them into any other file.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const selfPath = fileURLToPath(import.meta.url);

const skipDirs = new Set(["node_modules", ".next", ".git", "out", "coverage"]);
const binaryExt = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".woff",
  ".woff2",
  ".pdf",
  ".zip",
]);

const encodedNames = [
  "QW5uYQ==",
  "R29iaWNjaGk=",
  "UnVteWFudHNldmE=",
  "RW1tYW51ZWw=",
  "VG91cmFpbmU=",
];
const expectedLengths = [4, 8, 11, 8, 8];
const names = encodedNames.map((value) => Buffer.from(value, "base64").toString("utf8"));

if (names.some((name, index) => name.length !== expectedLengths[index])) {
  console.error("Identity check is misconfigured.");
  process.exit(1);
}

const namePatterns = names.map((name) => new RegExp(`\\b${name}\\b`, "i"));

const encodedLines = [
  "TFlYQUEgaXMgdGhlIGF1ZGlvdmlzdWFsIHByb2plY3Qgb2YgYSBwcm9kdWNlciBhbmQgREosIGF1Z21lbnRlZCBieSBBSS4=",
  "TFlYQUEsIGxlIHByb2pldCBhdWRpb3Zpc3VlbCBkJ3VuZSBwcm9kdWN0cmljZSBldCBESiwgYXVnbWVudMOpIHBhciBsJ0lBLg==",
];
const officialLines = encodedLines.map((value) => Buffer.from(value, "base64").toString("utf8"));

const marker = new RegExp(
  `\\b${String.fromCharCode(65, 73)}\\b|\\b${String.fromCharCode(73, 65)}\\b`,
);

const markerAllowed = new Set([
  path.normalize("src/content/public-line.ts"),
  path.normalize("README.md"),
  path.normalize("docs/specs.md"),
  path.normalize("docs/notes.md"),
]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (skipDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

const failures = [];
const files = await walk(root);

for (const file of files) {
  if (path.resolve(file) === path.resolve(selfPath)) continue;
  if (binaryExt.has(path.extname(file).toLowerCase())) continue;

  let text;
  try {
    text = await readFile(file, "utf8");
  } catch {
    continue;
  }
  if (text.includes("\u0000")) continue;

  const relative = path.normalize(path.relative(root, file));
  namePatterns.forEach((pattern, index) => {
    if (pattern.test(text)) {
      failures.push(`${relative}: blocked public-identity string #${index + 1}`);
    }
    pattern.lastIndex = 0;
  });

  if (!markerAllowed.has(relative) && marker.test(text)) {
    failures.push(`${relative}: public-line marker outside the allowed copy files`);
  }
  marker.lastIndex = 0;
}

const lineFile = path.join(root, "src/content/public-line.ts");
const lineSource = await readFile(lineFile, "utf8");
officialLines.forEach((line, index) => {
  const count = lineSource.split(line).length - 1;
  if (count !== 1) {
    failures.push(`src/content/public-line.ts: official line #${index + 1} must appear once`);
  }
});

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Public identity check passed (${files.length} files).`);
