import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "og-image.svg"));

await sharp(svg).resize(1200, 630).png().toFile(join(root, "og-image.png"));
await sharp(svg)
  .resize(1200, 630)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(join(root, "og-image.jpg"));

console.log("Wrote og-image.png and og-image.jpg (1200x630)");
