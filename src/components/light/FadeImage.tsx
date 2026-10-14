"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

// Every photo on the site fades in once its actual image data has arrived,
// rather than popping into place the instant the <img> tag exists — this
// matters because of the on-demand image optimization pipeline (see the
// "images loading slowly" fix, 2026-10-14): a just-resized source can still
// take a few hundred ms on a cold cache, and a hard pop-in during that wait
// reads as the page glitching, while a soft fade reads as intentional even
// when it's covering the exact same delay (Reshma, 2026-10-14: "can it be a
// little fade instead of directly appearing"). Drop-in replacement for
// next/image's <Image> — same props, used with `fill` everywhere on this
// site so far.
export default function FadeImage({ className = "", onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      className={`${className} transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
