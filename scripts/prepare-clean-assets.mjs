import sharp from 'sharp';
import fs from 'node:fs/promises';

// AI-assisted silhouettes are used only as masks: bottle RGB pixels remain original.
for (const name of ['botanical', 'rosemary']) {
  const source = `public/images/products/${name}-oil.webp`;
  const { width, height } = await sharp(source).metadata();
  const alpha = await sharp(`scripts/asset-masks/${name}.png`).greyscale().raw().toBuffer();
  if (name === 'botanical') {
    for (let y = 300; y < height; y++) for (let x = 0; x < 70; x++) alpha[y * width + x] = 0;
  }
  const cutout = await sharp(source).joinChannel(alpha, { raw: { width, height, channels: 1 } }).webp({ lossless: true }).toBuffer();
  await fs.writeFile(`public/images/products/${name}-cutout.webp`, cutout);
}

const ingredients = [...(await fs.readFile('src/data/ingredients.ts', 'utf8')).matchAll(/image: "([^"]+)"/g)].map(match => match[1]);
// Per-column row boundaries keep taller sprigs intact without including neighbours.
const boundaries = [[0, 340, 666, 1024], [0, 344, 688, 1024], [0, 340, 677, 1024], [0, 350, 645, 1024]];
for (const [i, name] of ingredients.entries()) {
  const column = i % 4, row = Math.floor(i / 4);
  const top = boundaries[column][row], bottom = boundaries[column][row + 1];
  const inset = name === "fenugreek" ? 32 : ["almond-oil", "curry-leaves"].includes(name) ? 16 : 0;
  const cell = await sharp('scripts/asset-sources/ingredient-atlas.png')
    .extract({ left: column * 384 + inset, top, width: 384 - inset, height: bottom - top }).png().toBuffer();
  await sharp(cell)
    .trim({ threshold: 10 })
    .resize({ width: 288, height: 288, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 16, bottom: 16, left: 16, right: 16, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(`public/images/ingredients/${name}-illustration.webp`);
}
console.log(`Prepared 2 original-pixel cutouts and ${ingredients.length} transparent ingredient illustrations.`);
