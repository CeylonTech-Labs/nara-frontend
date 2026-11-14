import { describe, expect, it } from "vitest";
import sharp from "sharp";
import { botanicalIngredients } from "@/data/ingredients";

describe("clean storefront assets", () => {
  for (const name of ["botanical-v2", "rosemary"]) {
    it(`preserves ${name} bottle pixels and removes its background`, async () => {
      const source = await sharp(`public/images/products/${name}-oil.webp`).raw().toBuffer({ resolveWithObject: true });
      const cutout = await sharp(`public/images/products/${name}-cutout.webp`).raw().toBuffer({ resolveWithObject: true });
      expect(cutout.info.channels).toBe(4);
      expect(cutout.info.width).toBe(source.info.width);
      expect(cutout.info.height).toBe(source.info.height);
      let opaque = 0, mismatches = 0;
      for (let pixel = 0; pixel < cutout.info.width * cutout.info.height; pixel++) {
        if (cutout.data[pixel * 4 + 3] !== 255) continue;
        opaque++;
        for (let channel = 0; channel < 3; channel++) if (cutout.data[pixel * 4 + channel] !== source.data[pixel * 3 + channel]) mismatches++;
      }
      expect(opaque).toBeGreaterThan(100000);
      expect(mismatches).toBe(0);
      expect(cutout.data[3]).toBe(0);
      expect(cutout.data[(cutout.info.width - 1) * 4 + 3]).toBe(0);
      expect(cutout.data[(Math.floor(cutout.info.height * .6) * cutout.info.width + Math.floor(cutout.info.width * .5)) * 4 + 3]).toBe(255);
    });
  }

  it("provides a transparent, nonempty image for every label ingredient", async () => {
    for (const ingredient of botanicalIngredients) {
      const { data, info } = await sharp(`public/images/ingredients/${ingredient.image}-illustration.webp`).raw().toBuffer({ resolveWithObject: true });
      expect(info.channels).toBe(4);
      expect(info.width).toBe(320);
      expect(info.height).toBe(320);
      expect(data[3]).toBe(0);
      let visible = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] > 128) visible++;
      expect(visible).toBeGreaterThan(1000);
    }
  });
});
