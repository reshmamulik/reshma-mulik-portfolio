"use client";

import Link from "next/link";

const ACCENT_HOVER = "hover:text-[#ff3b5c]";
const LINK_BASE =
  "fixed z-40 inline-block px-4 py-3 -mx-4 -my-3 text-xs font-medium uppercase tracking-[0.15em] text-black transition";

// Mobile-only landing screen (Reshma, 2026-10-16: "On landing page you'll
// see Reshma Mulik on left hand side, Recent Work on right hand side, on
// bottom left instagram as it is and bottom right about") — a plain
// 4-corner nav with no photos, replacing both the usual top nav and the
// scroll/swipe cascade below `lg`. Desktop is untouched; see src/app/page.tsx.
export default function MobileHomeNav() {
  return (
    <div className="lg:hidden">
      <Link
        href="/overview"
        className={`${LINK_BASE} ${ACCENT_HOVER} left-1 top-1 sm:left-4 sm:top-4 sm:text-sm`}
      >
        Reshma Mulik
      </Link>

      <Link
        href="/projects"
        scroll={false}
        className={`${LINK_BASE} ${ACCENT_HOVER} right-1 top-1 sm:right-4 sm:top-4 sm:text-sm`}
      >
        Recent Work
      </Link>

      <a
        href="https://instagram.com/reshmaamulik"
        target="_blank"
        rel="noopener noreferrer"
        className={`${LINK_BASE} ${ACCENT_HOVER} bottom-3 left-1 underline-offset-4 hover:underline sm:bottom-7 sm:left-4 sm:text-sm`}
      >
        Instagram
      </a>

      <Link
        href="/about"
        className={`${LINK_BASE} ${ACCENT_HOVER} bottom-3 right-1 sm:bottom-7 sm:right-4 sm:text-sm`}
      >
        About
      </Link>
    </div>
  );
}
