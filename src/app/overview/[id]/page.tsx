import { notFound } from "next/navigation";
import FadeImage from "@/components/light/FadeImage";
import Link from "next/link";
import LightNav from "@/components/light/LightNav";
import { overviewPhotos } from "@/data/light";

// Single-photo view for the Overview wall — click any photo in the
// justified grid and it opens here full-bleed, centered. Stepping through
// the set (wrapping at both ends) happens by clicking the left/right half
// of the photo itself — no visible prev/next arrows, just a double-headed
// cursor hint on hover. The project/shoot name (the part of the photo's
// alt text after the comma) sits bottom-left where Instagram normally
// goes; "View Thumbnails" bottom-right returns to the grid.
export function generateStaticParams() {
  return overviewPhotos.map((photo) => ({ id: photo.id }));
}

export default function OverviewPhotoPage({
  params,
}: {
  params: { id: string };
}) {
  const index = overviewPhotos.findIndex((p) => p.id === params.id);
  if (index === -1) notFound();

  const photo = overviewPhotos[index];
  const prev = overviewPhotos[(index - 1 + overviewPhotos.length) % overviewPhotos.length];
  const next = overviewPhotos[(index + 1) % overviewPhotos.length];

  // Alt text is "Reshma Mulik photograph, <shoot name>" — the label shown
  // bottom-left is just the shoot name after the comma.
  const commaIndex = photo.alt.indexOf(",");
  const label = commaIndex === -1 ? photo.alt : photo.alt.slice(commaIndex + 1).trim();

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#f5f5dc] text-black">
      <LightNav variant="light" hideInstagram />

      <div className="relative h-full w-full px-16 py-24 sm:px-24 sm:py-28 lg:px-32 lg:py-32">
        <div className="relative mx-auto h-full w-full max-w-5xl">
          <FadeImage
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 1024px, 90vw"
            className="object-contain"
            priority
          />
        </div>

        {/* No visible arrow buttons (Reshma, 2026-10-13: wanted the prev/
            next arrows replaced by a cursor hint instead) — the whole
            photo area is one click target, split invisibly in half. Plain
            native double-headed resize cursor (Reshma tried a custom SVG
            icon here and asked for this original one back, 2026-10-13).
            The Link components below use their replace prop so stepping
            through several photos with prev/next does not pile up extra
            history entries behind this page. */}
        <Link
          href={`/overview/${prev.id}`}
          replace
          aria-label="Previous photo"
          className="absolute inset-y-0 left-0 z-20 w-1/2 cursor-ew-resize"
        />
        <Link
          href={`/overview/${next.id}`}
          replace
          aria-label="Next photo"
          className="absolute inset-y-0 right-0 z-20 w-1/2 cursor-ew-resize"
        />
      </div>

      {/* Same small, uppercase, wide-tracked treatment as the "Phase I"
          subheadline under a project title on Recent Work (Reshma,
          2026-10-13), instead of the bigger nav-link styling this had
          before. */}
      <div className="fixed inset-x-1 bottom-3 z-40 flex items-baseline justify-between text-xs font-medium uppercase tracking-[0.15em] text-black/60 sm:inset-x-4 sm:bottom-7 sm:text-sm lg:inset-x-6 lg:bottom-9">
        <span>{label}</span>
        <Link href="/overview" className="transition hover:text-[#ff3b5c]">
          View Thumbnails
        </Link>
      </div>
    </main>
  );
}
