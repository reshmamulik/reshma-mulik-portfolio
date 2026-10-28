// One-off / rerunnable generator: computes an average color for every photo
// referenced in src/data/light.ts, so the loading placeholder can match
// each photo's own colors instead of a shared per-story gradient (Reshma,
// 2026-10-28: "can the preview be like colors of the images used instead
// of the color of the background"). Rerun with `node scripts/generate-photo-colors.mjs`
// whenever photos are added/replaced; output is committed so the site
// doesn't need sharp at runtime or build time on Vercel.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const lightTsPath = path.join(root, "src/data/light.ts");
const outPath = path.join(root, "src/data/photo-colors.generated.json");

const lightTs = readFileSync(lightTsPath, "utf8");
const srcSet = new Set();
for (const match of lightTs.matchAll(/src:\s*"([^"]+)"/g)) {
  srcSet.add(match[1]);
}
const sources = Array.from(srcSet).sort();
console.log(`Found ${sources.length} distinct photo sources.`);

let existing = {};
try {
  existing = JSON.parse(readFileSync(outPath, "utf8"));
} catch {
  // no existing file yet, start fresh
}

const result = {};
let computed = 0;
for (const src of sources) {
  const filePath = path.join(root, "public", src.replace(/^\//, ""));
  try {
    const { data } = await sharp(filePath)
      .resize(8, 8, { fit: "cover" })
      .raw()
      .toBuffer({ resolveWithObject: true });
    let r = 0, g = 0, b = 0;
    const pixelCount = data.length / 3;
    for (let i = 0; i < data.length; i += 3) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    r = Math.round(r / pixelCount);
    g = Math.round(g / pixelCount);
    b = Math.round(b / pixelCount);
    const hex = "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
    result[src] = hex;
    computed += 1;
  } catch (err) {
    console.warn(`Skipping ${src}: ${err.message}`);
    if (existing[src]) result[src] = existing[src];
  }
}

writeFileSync(outPath, JSON.stringify(result, null, 1) + "\n");
console.log(`Wrote ${computed} colors to ${path.relative(root, outPath)}`);
