import LightNav from "@/components/light/LightNav";
import Cascade from "@/components/light/Cascade";
import { cascadePhotos, cascadeSlideshowPhotos } from "@/data/light";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full">
      {/* LightNav now renders its own mobile-only stacked-corner layout
          below lg (Reshma, 2026-10-21: "keep the menu layout like this
          for all pages") — no separate mobile-only component needed here
          anymore. Cascade still picks its own desktop-cascade vs
          mobile-swipe-row variant internally at the same lg cutoff. */}
      <LightNav variant="light" />
      <Cascade photos={cascadePhotos} slideshowPhotos={cascadeSlideshowPhotos} />
    </main>
  );
}
