import sharp from 'sharp';
import { makeBottleMask } from './make-bottle-mask.mjs';

// Recreates the served crops from the supplied originals, which live one level
// above the checkout (J:\Nara). Botanical Hair Oil uses the updated packaging
// in ../nara-updated-img/. See docs/asset-manifest.md for provenance.
const sources = {
  botanicalViews: '../nara-updated-img/IMG-20261102-WA0029.jpg.jpeg', // four bottle views on a plain background
  botanicalLabel: '../nara-updated-img/IMG-20261102-WA0027.jpg.jpeg', // flat label artwork
  botanicalPhoto: '../nara-updated-img/IMG-20261102-WA0028.jpg.jpeg', // styled bottle photograph
  rosemary: '../file_0000000096cc820bbf4874f016123f99.png',
  heritage: '../IMG-20261027-WA0056.jpg.jpeg',
  sigiriya: 'scripts/asset-sources/sigiriya-pidurangala.jpg', // CC BY-SA 4.0, C.J.Hatton, Wikimedia Commons
};
for (const [name, path] of Object.entries(sources)) console.log(name, await sharp(path).metadata().then(({ width, height }) => ({ width, height })));

// Botanical: front view becomes the bottle (cut out in prepare-clean-assets),
// the back view and both supplied images go to the product gallery.
const views = sources.botanicalViews;
await sharp(views).extract({ left: 285, top: 61, width: 263, height: 725 }).webp({ quality: 95 }).toFile('public/images/products/botanical-v2-oil.webp');
await sharp(views).extract({ left: 979, top: 801, width: 264, height: 725 }).webp({ quality: 95 }).toFile('public/images/products/botanical-back.webp');
await sharp(sources.botanicalLabel).webp({ quality: 92 }).toFile('public/images/products/botanical-v2-label.webp');
await sharp(sources.botanicalPhoto).webp({ quality: 88 }).toFile('public/images/products/botanical-lifestyle.webp');
await sharp(sources.botanicalPhoto).extract({ left: 0, top: 430, width: 1122, height: 641 }).webp({ quality: 85 }).toFile('public/images/collections/hair-care-v2.webp');
await makeBottleMask('public/images/products/botanical-v2-oil.webp', 'scripts/asset-masks/botanical-v2.png', 14);

await sharp(sources.rosemary).extract({ left: 605, top: 0, width: 335, height: 960 }).webp({ quality: 95 }).toFile('public/images/products/rosemary-oil.webp');
await sharp(sources.rosemary).resize({ width: 1536 }).webp({ quality: 95 }).toFile('public/images/products/rosemary-label.webp');

await sharp(sources.heritage).extract({ left: 0, top: 0, width: 640, height: 1067 }).webp({ quality: 90 }).toFile('public/images/heritage/fresco-detail.webp');
// Sigiriya cropped to the heritage frame's 1.2 ratio, centred on the rock.
await sharp(sources.sigiriya).extract({ left: 190, top: 0, width: 1920, height: 1600 }).resize({ width: 1440 }).webp({ quality: 84 }).toFile('public/images/heritage/sigiriya.webp');

await import('./prepare-clean-assets.mjs');
