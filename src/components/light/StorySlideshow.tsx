"use client";

import { useState } from "react";
import FadeImage from "@/components/light/FadeImage";
import type { LightPhoto } from "@/data/light";

// A slide is either one horizontal (5x7-ish) photo, or a diptych of two
// vertical photos shown side by side.
type Slide =
  | { type: "single"; photo: LightPhoto }
  | { type: "diptych"; photos: [LightPhoto, LightPhoto] };

function buildSlides(photos: LightPhoto[]): Slide[] {
  const slides: Slide[] = [];
  let i = 0;

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
  const slides = buildSlides(photos);
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

  if (!current) return null;

  return (
    // Arrows are laid out as normal flex siblings right beside the image
    // (not absolutely positioned over it), so they always sit just outside
    // its edges with a small, consistent gap — never on top of the photo.
    <div className="relative flex h-full w-full items-center justify-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous"
        className="z-10 shrink-0 text-3xl transition hover:opacity-60"
      >
        &#8249;
      </button>

      {/* This box is always the 7:5 ratio, single photo or diptych, so its
          height only ever depends on width — never on which slide is
          showing. That keeps the row height constant as slides change,
          which is what keeps the arrows locked in place instead of
          drifting up/down between a single photo and a diptych. */}
      <div className="relative aspect-[7/5] w-full max-w-[66rem]">
        {current.type === "single" ? (
          // Singles show centered and fully within the frame (no crop/zoom) —
          // diptych halves still fill their column since those are sized
          // to match a vertical photo's own aspect ratio.
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
        onClick={goNext}
        aria-label="Next"
        className="z-10 shrink-0 text-3xl transition hover:opacity-60"
      >
        &#8250;
      </button>
    </div>
  );
}
