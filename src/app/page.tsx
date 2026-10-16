import LightNav from "@/components/light/LightNav";
import Cascade from "@/components/light/Cascade";
import MobileHomeNav from "@/components/light/MobileHomeNav";
import { cascadePhotos, cascadeSlideshowPhotos } from "@/data/light";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full">
      {/* Mobile landing (below lg): a plain 4-corner nav, no photos — Reshma,
          2026-10-16: "On landing page you'll see Reshma Mulik on left hand
          side, Recent Work on right hand side, on bottom left instagram as
          it is and bottom right about." Desktop keeps the full scroll-driven
          cascade with the usual top nav, completely unchanged below. */}
      <MobileHomeNav />

      <div className="hidden lg:contents">
        <LightNav variant="light" />
      </div>
      <div className="hidden lg:block">
        <Cascade photos={cascadePhotos} slideshowPhotos={cascadeSlideshowPhotos} />
      </div>
    </main>
  );
}
