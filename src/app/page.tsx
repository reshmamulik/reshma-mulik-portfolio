import LightNav from "@/components/light/LightNav";
import Cascade from "@/components/light/Cascade";
import { cascadePhotos, cascadeSlideshowPhotos } from "@/data/light";

export default function HomePage() {
  return (
    <main className="relative w-full">
      <LightNav variant="light" />
      <Cascade photos={cascadePhotos} slideshowPhotos={cascadeSlideshowPhotos} />
    </main>
  );
}
