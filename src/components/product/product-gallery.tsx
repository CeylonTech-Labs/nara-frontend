"use client";

import { useState } from "react";
import type { Product } from "@/types/catalog";
import { ProductImage } from "./product-image";

export function ProductGallery({ product }: { product: Product }) {
  const images = [{ src: product.image, alt: product.imageAlt }, ...(product.gallery ?? [])];
  const [active, setActive] = useState(0);
  return <div className="product-gallery"><div className={`product-detail-image ${active > 0 ? "label-image" : ""}`}><ProductImage key={images[active].src} src={images[active].src} alt={images[active].alt} fill preload sizes="(max-width: 760px) 90vw, 580px" /></div>{images.length > 1 && <div className="gallery-thumbnails" aria-label="Product image gallery">{images.map((image, i) => <button key={image.src} aria-label={i === 0 ? "Show bottle" : "Show full label artwork"} aria-pressed={active === i} onClick={() => setActive(i)}><ProductImage src={image.src} alt="" width={80} height={80} /><span>{i === 0 ? "The bottle" : "Label & ingredients"}</span></button>)}</div>}{active > 0 && <a className="text-link gallery-full-size" href={images[active].src} target="_blank" rel="noreferrer">View label at full size</a>}<p className="product-disclaimer">{product.imageryNote ?? "Product photography will be shared when available."}</p></div>;
}
