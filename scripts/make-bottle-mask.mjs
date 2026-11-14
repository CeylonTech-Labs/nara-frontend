import sharp from 'sharp';

// Builds a transparency mask for a bottle photographed on a plain background:
// background pixels connected to the image border are made transparent, and
// everything else (glass, cap and label) stays opaque. Only the mask is
// generated; the bottle's RGB pixels are never altered.
//   node scripts/make-bottle-mask.mjs <source> <mask.png> [tolerance]
export async function makeBottleMask(source, output, tolerance = 14) {
  const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const at = (x, y) => (y * width + x) * 3;
  // Background colour: median of the four corner pixels.
  const corners = [at(0, 0), at(width - 1, 0), at(0, height - 1), at(width - 1, height - 1)];
  const bg = [0, 1, 2].map((c) => corners.map((i) => data[i + c]).sort((a, b) => a - b)[2]);
  const distance = (i) => Math.max(Math.abs(data[i] - bg[0]), Math.abs(data[i + 1] - bg[1]), Math.abs(data[i + 2] - bg[2]));

  const background = new Uint8Array(width * height);
  const queue = [];
  const push = (x, y) => {
    const p = y * width + x;
    if (background[p] || distance(p * 3) > tolerance) return;
    background[p] = 1;
    queue.push(p);
  };
  for (let x = 0; x < width; x++) { push(x, 0); push(x, height - 1); }
  for (let y = 0; y < height; y++) { push(0, y); push(width - 1, y); }
  while (queue.length) {
    const p = queue.pop(), x = p % width, y = (p - x) / width;
    if (x > 0) push(x - 1, y);
    if (x < width - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < height - 1) push(x, y + 1);
  }

  // Opaque inside, transparent outside, with a one-pixel soft edge for
  // anti-aliasing. Only edge pixels are partially transparent.
  const alpha = Buffer.alloc(width * height);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const p = y * width + x;
    if (background[p]) continue;
    let bgNeighbours = 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < width && ny < height && background[ny * width + nx]) bgNeighbours++;
    }
    alpha[p] = bgNeighbours ? 170 : 255;
  }
  await sharp(alpha, { raw: { width, height, channels: 1 } }).png().toFile(output);
  return { width, height, background: bg };
}

if (process.argv[1]?.endsWith('make-bottle-mask.mjs')) {
  const [source, output, tolerance] = process.argv.slice(2);
  if (source && output) console.log(await makeBottleMask(source, output, tolerance ? Number(tolerance) : undefined));
}
