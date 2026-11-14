"use client";

import { useState } from "react";
import type { Product } from "@/types/catalog";
import { ProductImage } from "./product-image";

export function ProductGallery({ product }: { product: Product }) {
  const images = [{ src: product.image, alt: product.imageAlt, label: "The bottle", fullSize: false }, ...(product.gallery ?? []).map((image) => ({ label: "Label & ingredients", fullSize: false, ...image }))];
  const [active, setActive] = useState(0);
  const current = images[active];
  return <div className="product-gallery"><div className={`product-detail-image ${active > 0 ? "label-image" : ""}`}><ProductImage key={current.src} src={current.src} alt={current.alt} fill preload sizes="(max-width: 760px) 90vw, 580px" /></div>{images.length > 1 && <div className="gallery-thumbnails" aria-label="Product image gallery">{images.map((image, i) => <button key={image.src} aria-label={`Show ${image.label.toLowerCase()}`} aria-pressed={active === i} onClick={() => setActive(i)}><ProductImage src={image.src} alt="" width={80} height={80} /><span>{image.label}</span></button>)}</div>}{current.fullSize && <a className="text-link gallery-full-size" href={current.src} target="_blank" rel="noreferrer">View label at full size</a>}<p className="product-disclaimer">{product.imageryNote ?? "Product photography will be shared when available."}</p></div>;
}
