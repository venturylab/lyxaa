/**
 * Build gate. Blocked strings are stored encoded.
 * The stage name is read from src/site.config.ts and may appear only there,
 * in tests, and in brand-asset file names.
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
  ".ttf",
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

const encodedPhrases = [
  "cmVhbCB2b2ljZQ==",
  "dnJhaWUgdm9peA==",
  "cmVhbCB2b2NhbHM=",
  "T25seUZhbnM=",
  "RmFuc2x5",
  "dmVpbA==",
  "dmVpbGVk",
  "dm9pbGU=",
  "dm9pbMOp",
  "VGhlIHNldHMgYXJlIHJlYWw=",
  "TGVzIHNldHMgc29udCByw6llbHM=",
];
const phrases = encodedPhrases.map((value) => Buffer.from(value, "base64").toString("utf8"));
const phrasePatterns = phrases.map((phrase) => {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "iu");
});

const domainPattern = /\b(?:lyxaa|lixaa)\.[a-z]{2,}\b/i;

const configPath = path.join(root, "src/site.config.ts");
const configSource = await readFile(configPath, "utf8");
const nameMatch = configSource.match(/export const artistName = "([^"]+)"/);
if (!nameMatch) {
  console.error("src/site.config.ts: artistName must be one quoted value.");
  process.exit(1);
}
const artistName = nameMatch[1];
const nameCount = configSource.split(artistName).length - 1;
if (nameCount !== 1) {
  console.error("src/site.config.ts: the stage name must appear exactly once.");
  process.exit(1);
}

const linesSource = await readFile(path.join(root, "src/content/lines.ts"), "utf8");
const requiredLines = [
  "Producer and DJ. Black and white. AI is one of the instruments.",
  "Music and visuals made using AI.",
  "Productrice et DJ. Noir et blanc. L'IA fait partie des instruments.",
  "Musique et visuels réalisés au moyen de l'IA.",
  "AI is one of the instruments. The light is real.",
  "© 2026 [titulaire à confirmer]",
];
for (const line of requiredLines) {
  if (!linesSource.includes(line)) {
    console.error("src/content/lines.ts: a required public line is missing.");
    process.exit(1);
  }
}

function brandAssetName(relative) {
  return relative.startsWith("public/brand/") && path.basename(relative).includes(artistName);
}

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
for (const file of await walk(root)) {
  if (path.resolve(file) === path.resolve(selfPath)) continue;
  const relative = path.normalize(path.relative(root, file));
  if (relative.includes(artistName) && !brandAssetName(relative) && !relative.startsWith("tests/")) {
    failures.push(`${relative}: stage name in a file name outside brand assets`);
  }
  if (binaryExt.has(path.extname(file).toLowerCase())) continue;

  let text;
  try {
    text = await readFile(file, "utf8");
  } catch {
    continue;
  }
  if (text.includes("\u0000")) continue;

  namePatterns.forEach((pattern, index) => {
    if (pattern.test(text)) failures.push(`${relative}: blocked public-identity string #${index + 1}`);
    pattern.lastIndex = 0;
  });
  phrasePatterns.forEach((pattern, index) => {
    if (pattern.test(text)) failures.push(`${relative}: blocked phrase #${index + 1}`);
    pattern.lastIndex = 0;
  });
  if (domainPattern.test(text)) failures.push(`${relative}: blocked domain`);
  domainPattern.lastIndex = 0;

  const nameAllowed = relative === "src/site.config.ts" || relative.startsWith(`tests${path.sep}`);
  if (!nameAllowed && text.includes(artistName)) {
    failures.push(`${relative}: stage name must be read from the config`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Public identity check passed.");
