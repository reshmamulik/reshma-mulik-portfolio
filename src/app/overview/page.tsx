import LightNav from "@/components/light/LightNav";
import JustifiedGallery from "@/components/light/JustifiedGallery";
import { overviewPhotos } from "@/data/light";

// Reshma's curated "First Selects" photo wall, laid out as justified rows
// (shared row height, each photo at its own true aspect ratio) rather
// than a cropped grid — see JustifiedGallery for the layout algorithm.
export default function OverviewPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#f5f5dc] text-black">
      <LightNav variant="light" hideInstagram />

      <div className="pb-16 pt-20 sm:pt-28">
        <JustifiedGallery photos={overviewPhotos} />
      </div>
    </main>
  );
}
