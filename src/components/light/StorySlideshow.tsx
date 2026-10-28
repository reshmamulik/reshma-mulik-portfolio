"use client";

import { useEffect, useRef, useState } from "react";
import FadeImage from "@/components/light/FadeImage";
import photoColors from "@/data/photo-colors.generated.json";
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

const colorLookup = photoColors as Record<string, string>;

function PhotoTile({
  photo,
  fit = "cover",
  priority = false,
}: {
  photo: LightPhoto;
  fit?: "cover" | "contain";
  /** Hints this is the image shown on initial page load (only ever the
   * first row's opening slide, which Recent Work scrolls to immediately
   * on mount) so Next preloads it instead of lazy-loading like every
   * other slide — a small, targeted piece of the "images loading slower"
   * fix (Reshma, 2026-10-28). */
  priority?: boolean;
}) {
  // Wrapped in its own color-filled box instead of handing FadeImage a
  // bare parent, so a cold-loading image has something to fade in OVER
  // rather than a blank gap the size of the frame (Reshma, 2026-10-15:
  // "when i start scrolling first sec on recent work - there is some
  // glitch"). The fill color comes from the photo's OWN average color
  // (scripts/generate-photo-colors.mjs, committed as
  // photo-colors.generated.json) rather than one gradient shared across
  // every photo in the story (Reshma, 2026-10-28: "can the preview be
  // like colors of images used instead of the color of the background")
  // — falls back to the old shared gradient for a placeholder photo with
  // no src (and so no generated color).
  const bgColor = photo.src ? colorLookup[photo.src] : undefined;
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${
        bgColor ? "" : `bg-gradient-to-br ${photo.placeholderFrom} ${photo.placeholderTo}`
      }`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {photo.src ? (
        <FadeImage
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="60vw"
          priority={priority}
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

// A small left/right chevron, used for both the fixed side arrows below.
function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StorySlideshow({
  photos,
  initialPhotoId,
  priority = false,
}: {
  photos: LightPhoto[];
  /** Opens the slideshow already on the slide containing this photo id,
   * instead of the first slide — used when arriving here from a home
   * page cascade photo that is also featured in this project (Reshma,
   * 2026-10-14), so the slideshow opens on the exact photo that was
   * clicked rather than making her hunt for it. Falls back to the first
   * slide if the id is not found (or not given). */
  initialPhotoId?: string;
  /** Only ever set on the one row Recent Work lands on by default
   * (Ongoing) — see the doc on PhotoTile's own priority prop. */
  priority?: boolean;
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
    // No visible prev/next buttons here used to be the whole story
    // (Reshma, 2026-10-13/16) — the full-column invisible click zones
    // with the cursor hint are still exactly that. She also wants a
    // visible, always-there option too (2026-10-28: "Add arrows
    // alongside the photos on sides fixed. Keep the hovering arrow too,
    // so people have option") — but a first version placed those arrows
    // at the outer edges of this whole centering row, so wherever the
    // photo box itself ran close to those edges (full-bleed on mobile,
    // or a wide box on desktop — "We Live In A Tank") they sat directly
    // on top of the image instead of beside it (Reshma, phone
    // screenshots: "the arrows shouldn't be on top of image"; then
    // desktop screenshots: "on website chrome also this... arrow...
    // problem is there specifically for... we live in a tank"). Making
    // the arrows flex siblings of the photo box — instead of absolutely
    // positioned against this outer row — gives them their own
    // dedicated gutter beside the box no matter how wide it renders.
    // Below lg there's no gutter to give them beside a full-width photo,
    // so they're hidden there entirely; the invisible tap zones (now
    // scoped to the box itself, see below) plus the touch-swipe handler
    // above already cover mobile navigation.
    <div
      className="relative mx-auto flex w-full max-w-[90rem] items-center justify-center gap-1 sm:gap-3 lg:h-[calc(100vh-11rem)] lg:gap-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous photo"
        className="z-30 hidden shrink-0 rounded-full p-2 text-black/50 transition hover:text-black lg:flex"
      >
        <ChevronIcon direction="left" />
      </button>

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
          depends on which photo's ratio is showing.

          This used to switch to a single shared box ratio (the row's
          tallest photo) below lg instead of each slide's own ratio
          (Reshma, 2026-10-28: "keep a fix space what's needed for
          largest vertical image..."), but a horizontal photo squeezed
          into a box sized for the row's tallest vertical one left thick
          bars of the new solid per-photo placeholder color down the
          sides — her phone screenshots: "extra border". Reverted: every
          slide, on every breakpoint, sizes the box to its OWN real
          ratio again — the one thing that's fully eliminated the
          placeholder-color border showing through anywhere. */}
      <div
        className="relative aspect-[7/5] w-full lg:h-full lg:w-auto"
        style={
          current.type === "single" && current.photo.width && current.photo.height
            ? { aspectRatio: `${current.photo.width} / ${current.photo.height}` }
            : undefined
        }
      >
        {current.type === "single" ? (
          // Keyed by photo id so switching slides mounts a fresh FadeImage
          // instead of reusing the old one in place — without this, the
          // previous photo's already-loaded <img> stayed visible (fully
          // opaque, stretched into the new slide's box) until the new
          // image finished loading, since FadeImage's own "loaded" state
          // only resets on mount, not on a changed src. That's what read
          // as a leftover color block / wrong-ratio border from the prior
          // slide (Reshma, 2026-10-28: "if a vertical image comes after
          // horizontal it loads as horizontal color block..."). Keying
          // forces a clean remount, so the new slide's own placeholder
          // color shows immediately in its own correctly-shaped box.
          <PhotoTile key={current.photo.id} photo={current.photo} fit="contain" priority={priority} />
        ) : (
          <div className="flex h-full w-full gap-3 sm:gap-4">
            <div className="relative h-full flex-1">
              <PhotoTile key={current.photos[0].id} photo={current.photos[0]} />
            </div>
            <div className="relative h-full flex-1">
              <PhotoTile key={current.photos[1].id} photo={current.photos[1]} />
            </div>
          </div>
        )}

        {/* Tap zones scoped to the box itself (not the outer row, which
            now also has the visible arrow buttons as flex siblings on
            either side of it) so clicking in that side gutter doesn't
            also step the slideshow. */}
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

      <button
        type="button"
        onClick={goNext}
        aria-label="Next photo"
        className="z-30 hidden shrink-0 rounded-full p-2 text-black/50 transition hover:text-black lg:flex"
      >
        <ChevronIcon direction="right" />
      </button>
    </div>
  );
}
