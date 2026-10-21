"use client";

import FadeImage from "@/components/light/FadeImage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, easeInOut, type MotionValue } from "framer-motion";
import type { LightPhoto } from "@/data/light";

// The starting, evenly-spaced gap between images before the scroll
// animation begins (matches the reference: images laid out in a row with a
// modest gutter, not hidden off-screen).
const ENTRY_GAP_PX = 14;

// Gap between the second-to-last image and the last one (the final
// "slideshow" slot) — 0.75x the entry-row gutter, per feedback.
const FINAL_GAP_PX = ENTRY_GAP_PX * 0.75;

// How much of each image stays visible once the next one lands on top of
// it, expressed as a fraction of the tile's own width — per the reference
// breakdown (tile width = 10 units): images 2-4 reveal 2/10, 5-6 reveal
// 2.5/10, 7 reveals 4/10, 8 reveals 7/10, and from 9 on the images no
// longer overlap at all (full width, laid out like a normal row).
function revealFractionFor(position: number) {
  if (position <= 4) return 0.2;
  if (position <= 6) return 0.25;
  if (position === 7) return 0.4;
  return 0.7;
}

// Delay before each image starts moving, relative to the one before it.
// The first few images get a bit more space between their starts so the
// opening of the cascade reads clearly; later ones stay tighter for now
// (revisit once the early pacing is dialed in).
function startDelayFor(transitionIndex: number) {
  return transitionIndex < 4 ? 0.09 : 0.05;
}

function sideMarginFor(viewportWidth: number) {
  // Matches LightNav's left-1 / sm:left-4 / lg:left-6 (4 / 16 / 24px).
  if (viewportWidth >= 1024) return 24;
  if (viewportWidth >= 640) return 16;
  return 4;
}

const TILE_ASPECT = 3 / 4;
const MIN_TILE_HEIGHT = 374;
const MAX_TILE_HEIGHT = 704;

// The entry row should show exactly 4 full images plus a small sliver of
// the 5th one, as a fraction of one tile's own width — not a big peek,
// just enough to read as "there's more here."
const FIFTH_IMAGE_PEEK = 0.075;
const FULL_TILES_BEFORE_PEEK = 4;

// Overall images sized up 10% from the base "4 full + peek" fit, per
// feedback that they read a touch small.
const SIZE_SCALE = 1.1;

// Width-driven sizing: solve for the tile width where 4 full tiles (plus
// their gaps) and a small peek of the 5th exactly fill the available
// width, scale that up 10%, then clamp the resulting height to a sane
// range and re-derive the width so the 3:4 aspect ratio stays correct.
function tileSizeFor(availableWidth: number) {
  const rawWidth = Math.max(
    ((availableWidth - FULL_TILES_BEFORE_PEEK * ENTRY_GAP_PX) /
      (FULL_TILES_BEFORE_PEEK + FIFTH_IMAGE_PEEK)) * SIZE_SCALE,
    0
  );
  const rawHeight = rawWidth / TILE_ASPECT;
  const tileHeight = Math.min(MAX_TILE_HEIGHT, Math.max(MIN_TILE_HEIGHT, rawHeight));
  const tileWidth = tileHeight * TILE_ASPECT;
  return { tileWidth, tileHeight };
}

const TILE_CLASS = "absolute inset-y-0 left-0 my-auto";

// All images except the final "slideshow" tile dim slightly on hover, as a
// quick affordance that the cascade is interactive.
const HOVER_CLASS = "transition-opacity duration-200 hover:opacity-80";

// Home-page photos that are also featured in a specific Recent Work
// project (see linkToProject on LightPhoto, and the cascadePhotos /
// cascadeSlideshowPhotos entries in light.ts) link straight to that exact
// photo there instead of just sitting inert (Reshma, 2026-10-14). Handled
// once here so every place CascadeTile is used — the main cascade, the
// first tile, the mobile snap row, and each photo inside the auto-cycling
// slideshow slot — gets it for free.
function CascadeTile({ photo, hoverable = true }: { photo: LightPhoto; hoverable?: boolean }) {
  const content = photo.src ? (
    <FadeImage
      src={photo.src}
      alt={photo.alt}
      fill
      sizes="30vw"
      className={`object-cover ${hoverable ? HOVER_CLASS : ""}`}
    />
  ) : (
    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${photo.placeholderFrom} ${photo.placeholderTo} text-xs text-black/40 ${hoverable ? HOVER_CLASS : ""}`}>
      Add photo
    </div>
  );

  if (!photo.linkToProject) return content;

  const { row, photoId } = photo.linkToProject;
  return (
    <Link
      href={`/projects?row=${encodeURIComponent(row)}&photo=${encodeURIComponent(photoId)}`}
      // Next.js's <Link> scrolls to the top of the destination page by
      // default on navigation, which races with (and usually wins
      // against) the manual scroll-to-row effect in /projects — the
      // target row briefly flashes into view, then gets reset to 0 once
      // that stock scroll-to-top kicks in. scroll={false} turns the
      // built-in behavior off so our own effect is the only thing
      // moving the scroll position (Reshma, 2026-10-14 — "clicked a
      // home photo and landed on the wrong project").
      scroll={false}
      className="relative block h-full w-full"
      aria-label={`View ${photo.alt} in Recent Work`}
    >
      {content}
    </Link>
  );
}

// How long each slide holds before the final cascade slot cross-fades to
// the next one.
const SLIDESHOW_INTERVAL_MS = 3000;

// The final cascade slot: instead of one static image, auto-advances
// through a small set of photos, cross-fading between them.
function CascadeSlideshowTile({ photos }: { photos: LightPhoto[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % photos.length);
    }, SLIDESHOW_INTERVAL_MS);
    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {photos.map((photo, i) => (
        <div
          key={photo.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          // Only the currently-shown slide should be clickable — without
          // this, every slide stacks fully on top of each other (just
          // invisible via opacity), so whichever one happens to render
          // last in the DOM would silently swallow every click regardless
          // of which photo is actually visible (Reshma’s 2026-10-14
          // request to make these clickable is what surfaced this).
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
        >
          <CascadeTile photo={photo} hoverable={false} />
        </div>
      ))}
    </div>
  );
}

function CascadeCard({ photo, zIndex, restX, entryX, segment, tileWidth, tileHeight, scrollYProgress, hoverable, slideshowPhotos }: {
  photo: LightPhoto; zIndex: number; restX: number; entryX: number; segment: [number, number];
  tileWidth: number; tileHeight: number; scrollYProgress: MotionValue<number>; hoverable: boolean;
  slideshowPhotos?: LightPhoto[];
}) {
  const x = useTransform(scrollYProgress, segment, [entryX, restX], { ease: easeInOut });
  return (
    <motion.div style={{ x, zIndex, width: tileWidth, height: tileHeight }} className={TILE_CLASS}>
      {slideshowPhotos && slideshowPhotos.length > 0 ? (
        <CascadeSlideshowTile photos={slideshowPhotos} />
      ) : (
        <CascadeTile photo={photo} hoverable={hoverable} />
      )}
    </motion.div>
  );
}

export default function Cascade({ photos, slideshowPhotos }: { photos: LightPhoto[]; slideshowPhotos?: LightPhoto[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    function measure() {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const sideMargin = sideMarginFor(viewport.width);
  const availableWidth = Math.max(viewport.width - sideMargin * 2, 200);

  const { tileWidth, tileHeight } = tileSizeFor(availableWidth);

  // Final (rest) positions: tiered reveal fractions per the reference,
  // cumulatively summed, then uniformly scaled so the second-to-last
  // image's right edge lines up correctly. The last image isn't part of
  // that scaled system — it sits a fixed ENTRY_GAP_PX past the
  // second-to-last image, the same gutter used in the starting row, so the
  // final "slideshow" slot reads as a clearly separate space rather than
  // just another overlapped tile.
  const baseRestX: number[] = [0];
  for (let i = 1; i < photos.length - 1; i++) {
    const position = i + 1;
    baseRestX.push(baseRestX[i - 1] + revealFractionFor(position) * tileWidth);
  }

  const baseSecondLast = baseRestX[baseRestX.length - 1] || 1;
  const targetSecondLast = Math.max(availableWidth - 2 * tileWidth - FINAL_GAP_PX, 0);
  const spreadScale = targetSecondLast / baseSecondLast;
  const restX = baseRestX.map((value) => value * spreadScale);
  if (photos.length > 1) {
    restX.push(restX[restX.length - 1] + tileWidth + FINAL_GAP_PX);
  }

  const stackWidth = restX[restX.length - 1] + tileWidth;

  // Starting positions: a normal evenly-spaced row, gutter-width apart.
  const entryX = photos.map((_, i) => i * (tileWidth + ENTRY_GAP_PX));

  // Stagger each moving image's own scroll window so they animate one
  // after another (with a slight overlap for smoothness) instead of all at
  // once, and give the whole section enough scroll length for that to
  // breathe rather than feeling rushed.
  const numMoving = Math.max(photos.length - 1, 1);
  const segments: [number, number][] = [];
  if (numMoving <= 1) {
    segments.push([0, 1]);
  } else {
    const starts = [0];
    for (let k = 1; k < numMoving; k++) {
      starts.push(starts[k - 1] + startDelayFor(k - 1));
    }
    const totalDelay = starts[starts.length - 1];
    const windowDuration = Math.max(1 - totalDelay, 0.05);
    for (let k = 0; k < numMoving; k++) {
      segments.push([starts[k], Math.min(starts[k] + windowDuration, 1)]);
    }
  }

  const sectionHeightVh = 100 + 60 * numMoving;

  return (
    <>
      {/* Desktop-only full cascade (Reshma, 2026-10-16/21: the `lg` cutoff
          the rest of the mobile work this session uses, not the old `sm`
          one — below `lg` the simple swipe row right below takes over
          instead, alongside the 4-corner mobile nav from page.tsx). */}
      <section ref={sectionRef} className="relative hidden lg:block" style={{ height: `${sectionHeightVh}vh` }}>
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden" style={{ paddingLeft: sideMargin, paddingRight: sideMargin }}>
          <div className="relative h-full" style={{ width: stackWidth }}>
            {photos.map((photo, i) =>
              i === 0 ? (
                <div key={photo.id} style={{ zIndex: 1, width: tileWidth, height: tileHeight }} className={TILE_CLASS}>
                  <CascadeTile photo={photo} hoverable={i !== photos.length - 1} />
                </div>
              ) : (
                <CascadeCard
                  key={photo.id}
                  photo={photo}
                  zIndex={i + 1}
                  restX={restX[i]}
                  entryX={entryX[i]}
                  segment={segments[i - 1]}
                  tileWidth={tileWidth}
                  tileHeight={tileHeight}
                  scrollYProgress={scrollYProgress}
                  hoverable={i !== photos.length - 1}
                  slideshowPhotos={i === photos.length - 1 ? slideshowPhotos : undefined}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* Mobile landing photos (Reshma, 2026-10-21: "bring back photos on
          mobile landing... smooth out its scroll animation") — a plain
          horizontal swipe row instead of the scroll-driven desktop cascade
          (that one leans on Framer Motion tied to vertical page scroll,
          which doesn't translate to a touch swipe gesture). Native
          scroll-snap plus explicit momentum/overscroll handling keeps the
          swipe itself smooth without any JS driving it. Sits underneath
          the fixed mobile nav rendered by LightNav.tsx. */}
      <div className="flex h-screen snap-x snap-mandatory items-center gap-3 overflow-x-auto overscroll-x-contain px-4 [-webkit-overflow-scrolling:touch] lg:hidden">
        {photos.map((photo, i) => (
          <div key={photo.id} className="relative h-[60vh] aspect-[3/4] shrink-0 snap-center">
            {i === photos.length - 1 && slideshowPhotos && slideshowPhotos.length > 0 ? (
              <CascadeSlideshowTile photos={slideshowPhotos} />
            ) : (
              <CascadeTile photo={photo} hoverable={i !== photos.length - 1} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
