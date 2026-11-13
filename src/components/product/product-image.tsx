"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import { useState } from "react";

export function ProductImage({ src, alt, ...props }: ImageProps) {
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);
  const failed = failedSrc === src;
  return <Image {...props} src={failed ? "/images/brand/nara-logo.jpeg" : src} alt={failed ? `${alt} — image unavailable; NARA brand emblem shown` : alt} onError={() => setFailedSrc(src)} />;
}
