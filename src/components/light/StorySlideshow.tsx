"use client";

import { useEffect, useRef, useState } from "react";
import FadeImage from "@/components/light/FadeImage";
import type { LightPhoto } from "@/data/light";

// A slide is either one horizontal (5x7-ish) photo, or a diptych of two
// vertical photos shown side by side.
type Slide =
  | { type: "single"; photo: LightPhoto }
  | { type: "diptych"; photos: [LightPhoto, LightPhoto] };

function buildSlides(photos: LightPhoto[], forceSingle = false): Slide[] {
  const slides: Slide[] = [];
  let i = 0;

  // Mobile-only (Reshma, 2026-10-21: "the images should go like single
  // images and not dyptich") — every photo gets its own slide, never
  // paired side by side. Desktop keeps the diptych pairing below.
  if (forceSingle) {
    return photos.map((photo) => ({ type: "single", photo }));
  }

  // Once every photo's orientation is tagged, pair up consecutive
  // verticals into diptychs and let horizontals stand alone — this is
  // what keeps a vertical photo from getting cropped into the single
  // slide's horizontal frame.
  if (photos.length > 0 && photos.every((p) => p.orientation)) {
    while (i < photos.length) {
      const photo = photos[i];
      const next = photos[i + 1];
      if (photo.orientation === "vertical" && next?.orientation === "vertical") {
        slides.push({ type: "diptych", photos: [photo, next] });
        i += 2;
      } else {
        slides.push({ type: "single", photo });
        i += 1;
      }
    }
    return slides;
  }

  // Placeholders (orientation unset) fall back to a plain single/diptych
  // alternation, just to preview both slide shapes.
  let toggle = 0;
  while (i < photos.length) {
    if (toggle % 2 === 0) {
      slides.push({ type: "single", photo: photos[i] });
      i += 1;
    } else {
      const a = photos[i];
      const b = photos[i + 1] ?? photos[i];
      slides.push({ type: "diptych", photos: [a, b] });
      i += b === a ? 1 : 2;
    }
    toggle += 1;
  }
  return slides;
}

function PhotoTile({ photo, fit = "cover" }: { photo: LightPhoto; fit?: "cover" | "contain" }) {
  // Wrapped in its own gradient-filled box (the same placeholderFrom/To
  // used for a missing photo) instead of handing FadeImage a bare parent,
  // so a cold-loading image has something to fade in OVER rather than a
  // blank gap the size of the frame — on a slow/first load that blank gap
  // sat there long enough to read as broken (Reshma, 2026-10-15: "when i
  // start scrolling first sec on recent work - there is some glitch" /
  // confirmed it was the Ongoing photo staying blank before it faded in).
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${photo.placeholderFrom} ${photo.placeholderTo}`}
    >
      {photo.src ? (
        <FadeImage
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="60vw"
          className={fit === "contain" ? "object-contain" : "object-cover"}
          style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-black/40">
          Add photo
        </div>
      )}
    </div>
  );
}

export default function StorySlideshow({
  photos,
  initialPhotoId,
}: {
  photos: LightPhoto[];
  /** Opens the slideshow already on the slide containing this photo id,
   * instead of the first slide — used when arriving here from a home
   * page cascade photo that is also featured in this project (Reshma,
   * 2026-10-14), so the slideshow opens on the exact photo that was
   * clicked rather than making her hunt for it. Falls back to the first
   * slide if the id is not found (or not given). */
  initialPhotoId?: string;
}) {
  // Below `lg`, every photo is its own slide instead of being paired into
  // a diptych (Reshma, 2026-10-21, mobile-only). Starts false so the
  // server-rendered and first-paint markup match (same pattern as the
  // mobile-home-link check in LightNav.tsx), then flips after mount once
  // the real viewport is known.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    setIsMobile(query.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const slides = buildSlides(photos, isMobile);
  const [index, setIndex] = useState(() => {
    if (!initialPhotoId) return 0;
    const found = slides.findIndex((slide) =>
      slide.type === "single"
        ? slide.photo.id === initialPhotoId
        : slide.photos.some((p) => p.id === initialPhotoId),
    );
    return found === -1 ? 0 : found;
  });
  const current = slides[index];

  function goPrev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }
  function goNext() {
    setIndex((i) => (i + 1) % slides.length);
  }

  // Touch swipe, alongside the existing tap zones below (Reshma,
  // 2026-10-16, mobile-only request: "make sure people can swipe or tap
  // to see the next image"). A horizontal swipe past SWIPE_THRESHOLD_PX
  // steps the slideshow; anything shorter, or more vertical than
  // horizontal, is left alone so an ordinary page scroll on a touch
  // device isn't hijacked into a slide change.
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const SWIPE_THRESHOLD_PX = 40;

  function handleTouchStart(e: React.TouchEvent) {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }
  function handleTouchEnd(e: React.TouchEvent) {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) {
      goNext();
    } else {
      goPrev();
    }
  }

  if (!current) return null;

  return (
    // No visible prev/next buttons — same treatment as the Overview
    // single-photo page (Reshma, 2026-10-13 there: "wanted the prev/next
    // arrows replaced by a cursor hint instead"; 2026-10-16 here: "remove
    // current arrows from recent work and use the arrow from overview to
    // recent work"). The click zones (and the cursor hint) span this
    // whole outer area — the full column, not just the photo's own
    // pixels — same as Overview's full-page click zones (Reshma,
    // 2026-10-16: "if you see overview for full page the cursor acts as
    // an arrow, do the same for recent work"), so the dead space beside a
    // narrower (e.g. portrait) photo still steps the slideshow instead of
    // only the image itself responding.
    <div
      className="relative mx-auto flex w-full max-w-[90rem] items-center justify-center lg:h-[calc(100vh-11rem)]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Below lg: same as always, full column width, height follows
          from aspect ratio — fine on a stacked mobile layout where the
          row can simply be taller than one screen.

          At lg+: the box's HEIGHT is fixed (a share of the viewport),
          not its width. Two things were wrong with the old width-first
          box (Reshma, 2026-10-15: "on some big screens its not showing
          correctly" / "its still showing like this" on Rootbound and
          Fashion, both single verticals):
          1. A generic aspect-[7/5] reference box rarely matches a real
             photo's own ratio, so object-contain inside it always left
             bare page-color gutters on whichever side the photo was
             narrower than 7:5 — visible as the purple/mint margins in
             her screenshots. (A wider max-width doesn't fix this —
             object-contain already renders at the largest size that
             fits, so a bigger box just moves the same gap around, it
             doesn't shrink it; confirmed live, see git history.)
          2. A width-first box derives its height from the column width,
             which on some screens comes out taller than the row's own
             available height, so the photo ran off the bottom of the
             screen instead of being fully visible.
          Fixing the single photo's box to its OWN real width/height
          (from light.ts) instead of the generic 7:5 solves #1 — the box
          shape now matches the photo, so object-contain has no gap left
          to show. Driving that from a capped, viewport-relative HEIGHT
          instead of width solves #2 — the box can never be taller than
          the screen — and also keeps the row's height constant across
          slides (so the arrows still don't drift), since it no longer
          depends on which photo's ratio is showing. */}
      <div
        className="relative aspect-[7/5] w-full lg:h-full lg:w-auto"
        style={
          current.type === "single" && current.photo.width && current.photo.height
            ? { aspectRatio: `${current.photo.width} / ${current.photo.height}` }
            : undefined
        }
      >
        {current.type === "single" ? (
          <PhotoTile photo={current.photo} fit="contain" />
        ) : (
          <div className="flex h-full w-full gap-3 sm:gap-4">
            <div className="relative h-full flex-1">
              <PhotoTile photo={current.photos[0]} />
            </div>
            <div className="relative h-full flex-1">
              <PhotoTile photo={current.photos[1]} />
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous"
        className="absolute inset-y-0 left-0 z-20 w-1/2 cursor-ew-resize outline-none"
      />
      <button
        type="button"
        onClick={goNext}
        aria-label="Next"
        className="absolute inset-y-0 right-0 z-20 w-1/2 cursor-ew-resize outline-none"
      />
    </div>
  );
}
