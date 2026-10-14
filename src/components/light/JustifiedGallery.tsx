"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { OverviewPhoto } from "@/data/light";

// Flickr/Google-Photos-style "justified" row layout: photos are packed
// into rows of a shared height (not a shared width), each image scaled to
// its own real aspect ratio so nothing gets cropped — this is what the
// masonry/column grid couldn't do cleanly. Row height is computed per row
// from the container's live width via ResizeObserver, so it stays exact
// across breakpoints and window resizes rather than relying on fixed
// Tailwind steps.
//
// The outer edge (left/right/top/bottom of the whole grid) uses the exact
// same `gap` value as the space between individual photos, so the frame
// around the grid reads as part of the same mesh rather than a mismatched
// page margin (this was the "spacing isn't cohesive" fix, 2026-10-13 —
// the outer padding used to come from the page's own px-* classes, which
// didn't match the inter-image gap).

const SCROLL_KEY = "overview-scroll-y";

interface Row {
  items: OverviewPhoto[];
  height: number;
}

function buildRows(
  photos: OverviewPhoto[],
  containerWidth: number,
  targetHeight: number,
  gap: number,
): Row[] {
  if (containerWidth <= 0) return [];

  const rows: Row[] = [];
  let current: OverviewPhoto[] = [];
  let aspectSum = 0;

  for (const photo of photos) {
    const ar = photo.width / photo.height;
    current.push(photo);
    aspectSum += ar;

    const widthAtTarget = aspectSum * targetHeight + (current.length - 1) * gap;
    if (widthAtTarget >= containerWidth) {
      const rowHeight = (containerWidth - (current.length - 1) * gap) / aspectSum;
      rows.push({ items: current, height: rowHeight });
      current = [];
      aspectSum = 0;
    }
  }

  // Leftover partial row (fewer photos than fit a full row): shown at the
  // target height rather than stretched to fill the container width, so
  // the last row doesn't blow up into a handful of oversized tiles.
  if (current.length > 0) {
    rows.push({ items: current, height: targetHeight });
  }

  return rows;
}

export default function JustifiedGallery({ photos }: { photos: OverviewPhoto[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [outerWidth, setOuterWidth] = useState(0);
  const hasRestoredScroll = useRef(false);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setOuterWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const gap = outerWidth < 640 ? 27 : outerWidth < 1024 ? 54 : 82;
  const targetHeight = outerWidth < 640 ? 110 : outerWidth < 1024 ? 170 : 238;
  // Left/right edges align to the same inset LightNav uses for "Reshma
  // Mulik" and "About" (Tailwind inset-x-1/sm:inset-x-4/lg:inset-x-6 —
  // 4px/16px/24px), so the first and last image in each row line up with
  // the nav text above. No top/bottom edge padding — only left/right.
  const edgeMargin = outerWidth < 640 ? 4 : outerWidth < 1024 ? 16 : 24;
  const innerWidth = Math.max(outerWidth - edgeMargin * 2, 0);

  const rows = buildRows(photos, innerWidth, targetHeight, gap);

  // Restore the scroll position saved when a photo was clicked (see the
  // Link below), once the grid actually has real rows/height to scroll
  // into — the container starts at zero height (outerWidth isn't known
  // until the ResizeObserver's first callback), so jumping to a saved Y
  // any earlier would just get clamped back to 0 by the browser and the
  // page would look like it reset to the top even though it didn't
  // (Reshma, 2026-10-13: "View Thumbnails" was landing at the top
  // instead of where she'd scrolled from). Runs once per mount.
  useEffect(() => {
    if (hasRestoredScroll.current) return;
    if (rows.length === 0) return;
    hasRestoredScroll.current = true;
    try {
      const saved = sessionStorage.getItem(SCROLL_KEY);
      if (saved) {
        window.scrollTo({ top: parseInt(saved, 10), behavior: "instant" });
        sessionStorage.removeItem(SCROLL_KEY);
      }
    } catch {
      // sessionStorage can throw in rare browser privacy modes — fine to
      // just skip restoring in that case.
    }
  }, [rows]);

  return (
    <div ref={outerRef}>
      <div className="flex flex-col" style={{ gap, paddingLeft: edgeMargin, paddingRight: edgeMargin }}>
        {rows.map((row, i) => (
          <div key={i} className="flex" style={{ gap }}>
            {row.items.map((photo) => {
              const ar = photo.width / photo.height;
              const itemWidth = ar * row.height;
              return (
                <Link
                  key={photo.id}
                  href={`/overview/${photo.id}`}
                  onClick={() => {
                    try {
                      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
                    } catch {
                      // Same as above — not worth failing the click over.
                    }
                  }}
                  className="relative block flex-shrink-0"
                  style={{ width: itemWidth, height: row.height }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={`${Math.ceil(itemWidth)}px`}
                    className="object-cover transition-opacity hover:opacity-80"
                  />
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
