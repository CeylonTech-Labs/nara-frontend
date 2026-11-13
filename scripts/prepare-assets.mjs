import sharp from 'sharp';
(async () => {
 const sources = {
 botanical: '../WhatsApp Image 2026-10-27 at 9.11.56 PM.jpeg',
 rosemary: '../file_0000000096cc820bbf4874f016123f99.png',
 mockup: '../NARA Sri Lankan Heritage Beauty Homepage.png',
 heritage: '../IMG-20261027-WA0056.jpg.jpeg',
 };
 for (const [name,path] of Object.entries(sources)) console.log(name, await sharp(path).metadata().then(({width,height})=>({width,height})));
 await sharp(sources.botanical).extract({left:1210,top:165,width:325,height:790}).webp({quality:95}).toFile('public/images/products/botanical-oil.webp');
 await sharp(sources.rosemary).extract({left:605,top:0,width:335,height:960}).webp({quality:95}).toFile('public/images/products/rosemary-oil.webp');
 await sharp(sources.botanical).webp({quality:95}).toFile('public/images/products/botanical-label.webp');
 await sharp(sources.rosemary).resize({width:1536}).webp({quality:95}).toFile('public/images/products/rosemary-label.webp');
 await sharp(sources.heritage).extract({left:0,top:0,width:640,height:1067}).webp({quality:90}).toFile('public/images/heritage/fresco-detail.webp');
 await sharp(sources.mockup).extract({left:0,top:861,width:415,height:163}).webp({quality:90}).toFile('public/images/heritage/island-landscape.webp');
 await sharp(sources.mockup).extract({left:500,top:532,width:270,height:148}).webp({quality:90}).toFile('public/images/collections/hair-care.webp');
 await import('./prepare-clean-assets.mjs');
})();
