"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ACCENT_HOVER = "hover:text-[#ff3b5c]";
const DEFAULT_BAR_COLOR = "#f5f5dc";

const NAV_LINKS = [
  { href: "/", label: "Reshma Mulik" },
  // Recent Work does its own scroll-to-"Ongoing" positioning on mount
  // (see src/app/projects/page.tsx) via an infinite-loop layout with a
  // clone of the LAST project (Fashion) sitting before the real content.
  // Next.js's default scroll-to-top-on-navigate was racing that effect
  // and winning, landing the page at the very top of the document — which
  // is the Fashion clone, not Ongoing (Reshma, 2026-10-15: "when i go to
  // recent work it shows fashion. It should show ongoing"). Same fix as
  // the home-page cascade links: scroll:false hands scroll control
  // entirely to the page's own effect. (That effect only runs on mount,
  // though — clicking this link while already on /projects is a no-op
  // navigation, so a click after scrolling down needs its own handler
  // below; see handleRecentWorkClick.)
  { href: "/projects", label: "Recent Work", scroll: false },
  { href: "/overview", label: "Overview" },
  { href: "/about", label: "About" },
];

export default function LightNav({
  variant = "light",
  backHref,
  hideInstagram = false,
  barColor,
}: {
  /** "dark" flips the inactive text to white, for full-bleed colored story pages. */
  variant?: "light" | "dark";
  /** On story pages, the bottom-left slot becomes a BACK link instead of Instagram. */
  backHref?: string;
  /** Drop the bottom-left Instagram link entirely (no BACK link either). */
  hideInstagram?: boolean;
  /** Color of the hover-reveal bar behind the nav (any CSS color, including
   * a `var(--...)` reference). Recent Work pages pass their own page color
   * here — 2026-10-13: Reshma wants the bar to match whatever background
   * is actually behind the nav there, not the site's usual off-white.
   * Defaults to that off-white everywhere else. */
  barColor?: string;
}) {
  const pathname = usePathname();
  const inactiveColor = variant === "dark" ? "text-white" : "text-black";

  // Clicking "Recent Work" while already on /projects: Next.js treats a
  // <Link> to the route you're already on as a no-op, so the page's own
  // mount effect (which scrolls to Ongoing) never runs again and the
  // click does nothing if she's scrolled down (Reshma, 2026-10-15: "after
  // someone scrolls down and click on recent work it should scroll back
  // itself to ongoing"). When that's the case, scroll to the Ongoing
  // section directly instead of letting the dead navigation happen.
  function handleNavClick(href: string) {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href !== "/projects" || pathname !== "/projects") return;
      const target = document.querySelector(
        '[data-project-section][data-row-key="ongoing"]',
      );
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top);
    };
  }

  // No active-page marker (no dot) — 2026-10-13: Reshma tried the
  // markmahaney.com-style dot-before-active-word treatment and asked for
  // it removed, but kept the red hover color. So: plain nav color at rest,
  // red only while actually hovering a word — no dot, no permanent
  // active-page highlight.
  //
  // On Recent Work pages the background can be any project color,
  // including reds/oranges the fixed pink-red accent disappears against
  // (Reshma, 2026-10-13: "Recent Work" text was unreadable hovered on the
  // Ahilya Fort red page). Two fixes were tried and both were rejected:
  // mix-blend-mode did nothing visually (the fixed/z-indexed wrapper this
  // nav sits in creates its own stacking context, so it only blended
  // against its own transparent layers, not the actual page color), and a
  // solid black/white pill behind the hovered word was functionally fine
  // but Reshma said "not good, undo it." So for now: plain red hover
  // everywhere, including Recent Work pages, even though that means the
  // red-on-red legibility problem on pages like Ahilya Fort is back. No
  // replacement has been requested yet.
  const linkClass = `relative inline-block px-4 py-3 -mx-4 -my-3 transition ${ACCENT_HOVER} ${inactiveColor}`;

  // Falls back to the site's off-white on ordinary (light-variant) pages;
  // on a dark-variant page with no explicit barColor there's nothing
  // sensible to default to, so the bar is skipped entirely there.
  const effectiveBarColor = barColor ?? (variant === "light" ? DEFAULT_BAR_COLOR : null);

  const navEl = (
    <nav className="absolute inset-x-1 top-1 z-10 flex items-baseline justify-between text-xs font-medium uppercase tracking-[0.15em] sm:inset-x-4 sm:top-4 sm:text-sm lg:inset-x-6 lg:top-5">
      {NAV_LINKS.map(({ href, label, scroll }) => (
        <Link key={href} href={href} scroll={scroll} onClick={handleNavClick(href)} className={linkClass}>
          {label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Hover-only bar behind the nav row: invisible by default, fades in
          only while the cursor is somewhere in this top band — Reshma
          didn't want it always on, just a hover reveal, so as content
          scrolls under the nav it only gets a backing when she's actually
          pointing at the menu. Flat 70% opacity (not a gradient fade-out —
          she tried the gradient and asked for a solid translucent bar
          instead), in `effectiveBarColor`: the page's own off-white
          everywhere by default, or each Recent Work page's own color when
          one is passed in. Two nested layers so the two opacities don't
          fight each other — the outer one toggles 0→100% on hover (the
          reveal), the inner one is a flat 70% (the color's own
          translucency) — multiplying together rather than overwriting.
          The whole band is one hoverable wrapper (not just the words) so
          hovering between links still triggers it; the bar sits behind
          `nav`, which stays on top so the links are always clickable. */}
      {effectiveBarColor ? (
        <div className="group fixed inset-x-0 top-0 z-30 h-12 sm:h-16 lg:h-20">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 opacity-70" style={{ backgroundColor: effectiveBarColor }} />
          </div>
          {navEl}
        </div>
      ) : (
        <nav className="fixed inset-x-1 top-1 z-40 flex items-baseline justify-between text-xs font-medium uppercase tracking-[0.15em] sm:inset-x-4 sm:top-4 sm:text-sm lg:inset-x-6 lg:top-5">
          {NAV_LINKS.map(({ href, label, scroll }) => (
            <Link key={href} href={href} scroll={scroll} onClick={handleNavClick(href)} className={linkClass}>
              {label}
            </Link>
          ))}
        </nav>
      )}

      {backHref ? (
        <Link
          href={backHref}
          className={`fixed bottom-3 left-1 z-40 inline-block px-4 py-3 -mx-4 -my-3 text-xs font-medium uppercase tracking-[0.15em] underline-offset-4 transition hover:underline ${ACCENT_HOVER} sm:bottom-7 sm:left-4 sm:text-sm lg:bottom-9 lg:left-6 ${inactiveColor}`}
        >
          BACK
        </Link>
      ) : hideInstagram ? null : (
        <a
          href="https://instagram.com/reshmaamulik"
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed bottom-3 left-1 z-40 inline-block px-4 py-3 -mx-4 -my-3 text-xs font-medium uppercase tracking-[0.15em] underline-offset-4 transition hover:underline ${ACCENT_HOVER} sm:bottom-7 sm:left-4 sm:text-sm lg:bottom-9 lg:left-6 ${inactiveColor}`}
        >
          Instagram
        </a>
      )}
    </>
  );
}
