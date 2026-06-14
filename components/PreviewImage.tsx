"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders `fallback` until the real screenshot at `src` loads, then
 * crossfades to it. Lets a card ship with a designed placeholder that
 * auto-upgrades the moment the PNG lands in /public/projects — no code
 * change needed. The parent element must be position:relative.
 */
export default function PreviewImage({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: ReactNode;
}) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imageVisible, setImageVisible] = useState(false);

  // onLoad never fires for images cached before hydration
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setImageVisible(true);
  }, []);

  return (
    <>
      {!imageVisible && fallback}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setImageVisible(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          imageVisible ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
