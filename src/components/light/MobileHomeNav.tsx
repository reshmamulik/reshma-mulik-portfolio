"use client";

import Link from "next/link";

const ACCENT_HOVER = "hover:text-[#ff3b5c]";
const LINK_CLASS =
  "inline-block px-3 py-2 -mx-3 -my-2 text-xs font-medium uppercase tracking-[0.15em] text-black transition sm:text-sm";

// Mobile-only landing screen — a plain nav-only screen, no photos, below
// `lg` (desktop keeps the full scroll-driven cascade; see src/app/page.tsx).
//
// Originally 4 corners (Reshma, 2026-10-16: "Reshma Mulik on left hand
// side, Recent Work on right hand side, on bottom left instagram as it is
// and bottom right about"). Reshma, 2026-10-21: "Home page should be with
// all four menu names - Reshma Mulik below that Overview, Recent Work on
// right side below that About" — now the site's four standard nav names
// (same four as the desktop top bar: Reshma Mulik, Recent Work, Overview,
// About) stack two-by-two: Overview under Reshma Mulik on the left,
// About under Recent Work on the right. Instagram keeps its usual
// bottom-left spot, unchanged.
export default function MobileHomeNav() {
  return (
    <div className="lg:hidden">
      <div className="fixed left-1 top-1 z-40 flex flex-col items-start gap-3 sm:left-4 sm:top-4">
        <Link href="/overview" className={`${LINK_CLASS} ${ACCENT_HOVER}`}>
          Reshma Mulik
        </Link>
        <Link href="/overview" className={`${LINK_CLASS} ${ACCENT_HOVER}`}>
          Overview
        </Link>
      </div>

      <div className="fixed right-1 top-1 z-40 flex flex-col items-end gap-3 sm:right-4 sm:top-4">
        <Link href="/projects" scroll={false} className={`${LINK_CLASS} ${ACCENT_HOVER}`}>
          Recent Work
        </Link>
        <Link href="/about" className={`${LINK_CLASS} ${ACCENT_HOVER}`}>
          About
        </Link>
      </div>

      <a
        href="https://instagram.com/reshmaamulik"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-3 left-1 z-40 ${LINK_CLASS} ${ACCENT_HOVER} underline-offset-4 hover:underline sm:bottom-7 sm:left-4`}
      >
        Instagram
      </a>
    </div>
  );
}
