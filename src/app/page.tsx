import LightNav from "@/components/light/LightNav";
import Cascade from "@/components/light/Cascade";
import MobileHomeNav from "@/components/light/MobileHomeNav";
import { cascadePhotos, cascadeSlideshowPhotos } from "@/data/light";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full">
      {/* Mobile landing (below lg): the 4-corner nav overlaid on top of
          Cascade's own mobile swipe row (Reshma, 2026-10-16: "Reshma Mulik
          on left hand side, Recent Work on right hand side..."; 2026-10-21:
          "bring back photos on mobile landing" alongside those links).
          Desktop keeps the full scroll-driven cascade with the usual top
          nav, completely unchanged below — Cascade itself picks desktop vs
          mobile internally now, same `lg` cutoff as everything else here. */}
      <MobileHomeNav />

      <div className="hidden lg:contents">
        <LightNav variant="light" />
      </div>
      <Cascade photos={cascadePhotos} slideshowPhotos={cascadeSlideshowPhotos} />
    </main>
  );
}
