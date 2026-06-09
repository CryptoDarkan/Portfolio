import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(root, "images", "dp-signature-source.png");
const output = path.join(root, "images", "dp-signature.png");
const letterGap = -14;

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const inkColumns = new Set();

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const i = (y * width + x) * channels;
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;

    if (lum > 210) {
      data[i + 3] = 0;
      continue;
    }

    const ink = Math.max(0, 255 - lum * 1.15);
    data[i] = ink;
    data[i + 1] = ink;
    data[i + 2] = ink;
    data[i + 3] = 255;
    inkColumns.add(x);
  }
}

const columns = [...inkColumns].sort((a, b) => a - b);
const minX = columns[0];
const maxX = columns[columns.length - 1];
const midX = Math.floor((minX + maxX) / 2);
const leftColumns = columns.filter((x) => x < midX);
const rightColumns = columns.filter((x) => x >= midX);
const leftMax = Math.max(...leftColumns);
const rightMin = Math.min(...rightColumns);

const inkBuffer = await sharp(data, { raw: { width, height, channels } })
  .png()
  .toBuffer();

const inkMeta = await sharp(inkBuffer).metadata();
const extractHeight = inkMeta.height - 1;

async function cropSide(left, cropWidth) {
  return sharp(data, { raw: { width, height, channels } })
    .extract({
      left,
      top: 0,
      width: cropWidth,
      height: extractHeight,
    })
    .png()
    .toBuffer();
}

const leftBuffer = await cropSide(minX, leftMax - minX + 1);
const rightBuffer = await cropSide(rightMin, maxX - rightMin + 1);

const leftMeta = await sharp(leftBuffer).metadata();
const rightMeta = await sharp(rightBuffer).metadata();
const canvasWidth = Math.max(1, leftMeta.width + rightMeta.width + letterGap);
const canvasHeight = Math.max(leftMeta.height, rightMeta.height);

await sharp({
  create: {
    width: canvasWidth,
    height: canvasHeight,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    {
      input: leftBuffer,
      left: 0,
      top: Math.floor((canvasHeight - leftMeta.height) / 2),
    },
    {
      input: rightBuffer,
      left: leftMeta.width + letterGap,
      top: Math.floor((canvasHeight - rightMeta.height) / 2),
    },
  ])
  .png()
  .toFile(output);

console.log(
  `Wrote ${output} (source gap ${rightMin - leftMax}px, target gap ${letterGap}px)`,
);
