"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LightPhoto } from "@/data/light";

// A handful of preset placements (width, alignment, vertical offset, tilt)
// cycled per photo so the layout reads as scattered/scrapbook rather than a
// rigid grid, without needing absolute positioning or randomness.
const layouts = [
  { width: "w-[70%] sm:w-[26rem] lg:w-[30rem]", align: "self-start", mt: "mt-0", rotate: "-rotate-2" },
  { width: "w-[55%] sm:w-72 lg:w-80", align: "self-end", mt: "mt-16 sm:mt-28", rotate: "rotate-2" },
  { width: "w-[80%] sm:w-[30rem] lg:w-[34rem]", align: "self-center", mt: "mt-10 sm:mt-20", rotate: "rotate-1" },
  { width: "w-[45%] sm:w-60 lg:w-72", align: "self-start", mt: "mt-6 sm:mt-12", rotate: "-rotate-1" },
  { width: "w-[65%] sm:w-96 lg:w-[28rem]", align: "self-end", mt: "mt-20 sm:mt-32", rotate: "rotate-3" },
];

export default function ScatterGallery({ photos }: { photos: LightPhoto[] }) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col px-6 pb-32 pt-8 sm:px-12 lg:max-w-5xl lg:px-16">
      {photos.map((photo, i) => {
        const layout = layouts[i % layouts.length];
        return (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`relative aspect-[4/5] flex ${layout.width} ${layout.align} ${layout.mt} ${layout.rotate}`}
          >
            {photo.src ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="60vw"
                className="object-cover shadow-2xl"
              />
            ) : (
              // Deliberately neutral (not hue-matched to the story) so the
              // tile reads clearly as a photo slot against every story's
              // full-bleed background color, like a print pinned to a wall.
              <div className="flex h-full w-full items-center justify-center bg-white/90 text-xs text-black/50 shadow-2xl">
                Add photo
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
