"use client";

import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import LightNav from "@/components/light/LightNav";
import ScrollBackground from "@/components/light/ScrollBackground";
import StorySlideshow from "@/components/light/StorySlideshow";
import { stories, type LightPhoto } from "@/data/light";

interface Row {
  key: string;
  /** Identity used for ROW_ORDER / PROJECT_COLORS lookups — stays "Ahilya
   * Fort" etc. even when the displayed label reads differently. */
  name: string;
  /** The text actually shown on the page. */
  label: string;
  /** Small caption shown under the title, e.g. "Phase I". */
  subheadline?: string;
  photos: LightPhoto[];
  /** Full essay text, shown beside the slideshow. Ongoing's sub-projects
   * (Mumbai, Satara, Fashion) don't have essay copy, so this is omitted
   * for them. */
  intro?: string[];
}

// The order Reshma wants these shown in on Recent Work — independent of
// how the stories/sub-projects are defined in light.ts.
const ROW_ORDER = [
  "Ongoing",
  "Ahilya Fort",
  "Senses X Lune",
  "We Live In A Tank",
  "Hostel",
  "Rootbound",
  "Metamorphosis",
  "Vidushi",
  "Fashion",
];

// Each project's signature background color. Ahilya Fort, Senses X Lune,
// Hostel, Rootbound and Metamorphosis are Reshma's exact hex values; the
// rest are picked in a similar tonality until she gives final colors.
const PROJECT_COLORS: Record<string, string> = {
  Ongoing: "#38448D",
  "Ahilya Fort": "#FF1717",
  "Senses X Lune": "#FFD500",
  Hostel: "#626262",
  Fashion: "#F0EAD6",
  Metamorphosis: "#FFEACD",
  Rootbound: "#7771A9",
  "We Live In A Tank": "#F97316",
  Vidushi: "#1300A4",
};

// Ongoing's in-progress sub-projects (Mumbai, Satara, Fashion) each get
// their own row here, same as everywhere else — Ongoing itself doesn't
// get a separate row on top of them.
function buildRows(): Row[] {
  const rows: Row[] = [];
  for (const story of stories) {
    if (story.slug === "ongoing") {
      // "Ongoing" now gets its own row (real photos), plus a row for each
      // remaining sub-project (just Fashion, as of 2026-09-13 — Mumbai and
      // Satara were folded into "Ongoing" itself and removed as separate
      // projects, per Reshma's request).
      rows.push({
        key: story.slug,
        name: story.navLabel,
        label: story.title,
        subheadline: story.subheadline,
        photos: story.photos,
        intro: story.intro,
      });
      if (story.subProjects) {
        for (const sub of story.subProjects) {
          rows.push({ key: `ongoing-${sub.name}`, name: sub.name, label: sub.name, photos: sub.photos });
        }
      }
    } else {
      rows.push({
        key: story.slug,
        name: story.navLabel,
        // Ahilya Fort's title ("Staying With The Narmada") reads better on
        // Recent Work than its short nav label — every other story's title
        // matches its navLabel anyway, so this only changes Ahilya Fort.
        label: story.title,
        subheadline: story.subheadline,
        photos: story.photos,
        intro: story.intro,
      });
    }
  }
  rows.sort((a, b) => ROW_ORDER.indexOf(a.name) - ROW_ORDER.indexOf(b.name));
  return rows;
}

// One project's section: its name/essay beside its own slideshow. Used both
// for the real, scrollable rows and (as an exact duplicate) for the loop
// clones below, so they never drift apart.
function ProjectRow({
  row,
  clone = false,
  initialPhotoId,
}: {
  row: Row;
  clone?: boolean;
  /** Passed through to this row’s StorySlideshow — see its own prop doc.
   * Only ever set on the one real row a home-page cascade link points at. */
  initialPhotoId?: string;
}) {
  return (
    <section
      {...(clone ? { "data-project-clone": true } : { "data-project-section": true })}
      data-row-key={row.key}
      aria-hidden={clone || undefined}
      // Both columns were self-start (pinned to the top of this min-h-screen
      // row), which left a slab of bare background below the title/photo on
      // any row whose content didn't happen to fill a full screen - most
      // visible right after landing from a home-page cascade link, since
      // there's no scrolling motion to distract from it (Reshma, 2026-10-15:
      // "it just should be aligned in center right now there's too much
      // empty space" / confirmed: "Below the photo, within that row").
      // self-center on the photo column splits that leftover space evenly
      // above and below instead. The scroll targets below aim at this
      // section's top edge, not the content itself, so centering the photo
      // inside an unchanged, full-screen-tall section still lands it in the
      // middle of the viewport rather than pushed to the top.
      //
      // The title column went back to self-start (Reshma, 2026-10-16:
      // "ongoing should be aligned at the top of the image") — so the title
      // sits level with the photo's own top edge instead of floating at
      // the row's vertical middle, while the photo itself stays centered.
      //
      // grid-cols-3 used to apply at every width, which on a phone squeezed
      // the title/essay into a ~1/3-width sliver beside an equally squeezed
      // photo - unreadable and the photo far too small (Reshma, 2026-10-15:
      // "make the site mobile friendly too - its not working right in
      // mobile"). Below lg it's a single stacked column (title/essay, then
      // the photo, full width); the 3-column side-by-side layout only
      // kicks in at lg and up, where there's room for it.
      className="grid min-h-screen w-full grid-cols-1 gap-y-8 pb-10 pt-10 sm:gap-y-10 sm:pb-14 sm:pt-14 lg:grid-cols-3 lg:gap-y-0 lg:pb-20 lg:pt-20"
    >
      <div className="flex flex-col items-start justify-start gap-4 self-start px-6 text-left sm:px-8 lg:col-start-1 lg:col-end-2">
        <div className="w-full text-[2rem] font-thin uppercase tracking-[-0.3px] sm:text-[2.25rem] lg:text-[2.5rem]">
          <span>{row.label}</span>
        </div>

        {row.subheadline ? (
          <div className="w-full text-xs uppercase tracking-[0.15em] text-black/60 sm:text-sm">
            {row.subheadline}
          </div>
        ) : null}

        {row.intro ? (
          <div className="w-full space-y-3 text-left text-xs normal-case leading-relaxed tracking-normal sm:text-sm">
            {row.intro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        ) : null}
      </div>

      {/* Symmetric left/right padding while stacked (matching the title
          block's own px-6/sm:px-8 above it) so the photo doesn't sit flush
          against the screen edge on one side only; back to the old
          right-only padding at lg, where the title column's own padding
          already provides the gap between it and the photo. gap-y on the
          section above (not padding here) is what spaces this block from
          the title/essay above it when stacked. */}
      <div className="self-center px-6 sm:px-8 lg:col-span-2 lg:px-0 lg:pr-4">
        <StorySlideshow photos={row.photos} initialPhotoId={initialPhotoId} />
      </div>
    </section>
  );
}

function ProjectsPageInner() {
  const rows = buildRows();
  // Set when arriving from a home-page cascade photo that is also
  // featured in a specific project (Reshma, 2026-10-14) — ?row is a Row
  // key (see buildRows above) and ?photo is that photo’s own id. When
  // both match a real row, the mount effect below scrolls straight to
  // that row instead of the usual "land on Ongoing" default, and that
  // row’s StorySlideshow opens already on the right slide.
  const searchParams = useSearchParams();
  const targetRowKey = searchParams.get("row");
  const targetPhotoId = searchParams.get("photo");
  const colors = rows.map((row) => PROJECT_COLORS[row.name] ?? "#f5f5dc");
  const firstRow = rows[0];
  const lastRow = rows[rows.length - 1];
  // The loop clones sit in the document before/after the real sections (see
  // the effect below), so their colors need to bookend the real color list
  // in the same order for ScrollBackground's blend to stay continuous
  // across the wrap point instead of jumping.
  const colorsWithClones = [colors[colors.length - 1], ...colors, colors[0]];

  const startCloneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const endCloneRef = useRef<HTMLDivElement>(null);

  function docTop(el: HTMLElement) {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  // Infinite scroll, both directions: a duplicate of the last project
  // sits right before the first (Ongoing), and a duplicate of the first
  // sits right after the last. Scrolling down past the real last
  // project crosses into the trailing clone; scrolling up past the real
  // first project crosses into the leading clone. Either way we jump by
  // exactly one content-height — same content, same height, so the jump
  // itself is imperceptible — landing on the equivalent real position, and
  // the loop continues forever in both directions.
  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Arrived from a home-page cascade photo that points at a specific
    // project row — jump straight to that row instead of the usual
    // Ongoing landing spot. Scoped to [data-project-section] so this only
    // ever matches a real row, never one of the aria-hidden loop clones.
    if (targetRowKey) {
      const target = content.querySelector(
        '[data-project-section][data-row-key="' + targetRowKey + '"]',
      );
      if (target) {
        window.scrollTo(0, docTop(target as HTMLElement));
        return;
      }
    }

    // Land on the real first project on load, skipping past the leading
    // clone (a duplicate of the last project) that sits above it in the
    // document. This used to target `content` itself and nudge 2% of the
    // viewport height higher (Reshma, 2026-10-14), but `content` is the
    // wrapper that also carries the nav's own top clearance padding
    // (pt-[88px]/lg:pt-20) — its top sits ~80-90px ABOVE Ongoing's actual
    // section, not at it. Combined with the nudge, landing was ~100px
    // above a true alignment, which pushed Ongoing's photo down inside
    // the viewport by that same amount and ran its bottom off-screen on
    // open (Reshma, 2026-10-16: "recent work opens like this" / "it
    // should open like this - see the placement" — full photo visible,
    // nothing cut off). Targeting the real first row's own section lands
    // exactly on it, same as the Recent Work nav link already does.
    const ongoingSection = content.querySelector("[data-project-section]");
    if (ongoingSection) {
      window.scrollTo(0, docTop(ongoingSection as HTMLElement));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // The page lands only ~2% of a screen height above contentTop (see the
    // mount effect above), so with no slack here, an ordinary small
    // upward wiggle right after landing — trackpad overshoot, a bit of
    // scroll momentum bouncing back — immediately crossed below
    // contentTop and fired the wrap, teleporting all the way around the
    // loop. That was the glitch Reshma saw right at the start of
    // scrolling on Ongoing (2026-10-16: "the glitch at the beginning of
    // scroll with ongoing"). Only wrapping once the scroll has gone a
    // real distance (not a sliver) past either edge keeps the loop from
    // firing on that kind of small, ordinary jitter near the boundary —
    // it still wraps the moment you've genuinely scrolled into a clone.
    const WRAP_BUFFER_PX = 150;
    function onScroll() {
      const content = contentRef.current;
      const endClone = endCloneRef.current;
      if (!content || !endClone) return;
      const contentTop = docTop(content);
      const endCloneTop = docTop(endClone);
      const loopHeight = endCloneTop - contentTop;
      if (loopHeight <= 0) return;
      if (window.scrollY >= endCloneTop + WRAP_BUFFER_PX) {
        window.scrollTo(0, window.scrollY - loopHeight);
      } else if (window.scrollY < contentTop - WRAP_BUFFER_PX) {
        window.scrollTo(0, window.scrollY + loopHeight);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative w-full text-black">
      <ScrollBackground
        colors={colorsWithClones}
        selector="[data-project-section], [data-project-clone]"
      />

      {/* Everything else stacks above the fixed color layer. */}
      <div className="relative z-10">
        <LightNav variant="light" hideInstagram barColor="var(--recent-work-bg, #f5f5dc)" />

        {/* Leading loop clone: a duplicate of the last project (currently
            Fashion — whichever row ROW_ORDER puts last), for scrolling up
            past the top of the real first project. Every row renders with
            identical padding now, so it matches the real last row exactly
            and the backward jump is seamless. Tagged data-project-clone
            (not data-project-section) so ScrollBackground tracks it under
            its own "with clones" color list, keeping the blend continuous
            across the wrap instead of jumping. */}
        <div ref={startCloneRef}>
          <ProjectRow row={lastRow} clone />
        </div>

        {/* Every project, one after another: its name beside its own
            slideshow, then the next below it. The extra top padding here
            (on top of the first row's own normal padding) is the nav's
            clearance space — see the comment on ProjectRow above for why
            it lives here instead of on the row itself. */}
        <div ref={contentRef} className="pt-[88px] lg:pt-20">
          {rows.map((row) => (
            <ProjectRow
              key={row.key}
              row={row}
              initialPhotoId={row.key === targetRowKey ? (targetPhotoId ?? undefined) : undefined}
            />
          ))}
        </div>

        {/* Trailing loop clone: a duplicate of the first project (Ongoing),
            same deal as the leading clone above — data-project-clone keeps
            it out of the real row count while still letting the color
            blend carry smoothly from the last project into Ongoing across
            the wrap. */}
        <div ref={endCloneRef}>
          <ProjectRow row={firstRow} clone />
        </div>
      </div>
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsPageInner />
    </Suspense>
  );
}
