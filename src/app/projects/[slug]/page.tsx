import { notFound } from "next/navigation";
import LightNav from "@/components/light/LightNav";
import ScatterGallery from "@/components/light/ScatterGallery";
import StorySlideshow from "@/components/light/StorySlideshow";
import { getStory, stories } from "@/data/light";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export default function StoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const story = getStory(params.slug);
  if (!story) notFound();

  // "Ongoing" is the one project getting the new sidebar + slideshow
  // layout so far. Every other project keeps its original design (title,
  // essay intro, scattered photo wall, its own background color) until
  // this new layout is approved and rolled out further.
  if (story.slug === "ongoing" && story.subProjects) {
    return (
      <main className="relative w-full bg-[#f5f5dc] text-black">
        <LightNav variant="light" backHref="/projects" />

        {/* Each in-progress project, one after another: its own name
            beside its own slideshow, then the next below it. */}
        {story.subProjects.map((sub) => (
          <section
            key={sub.name}
            className="grid h-screen w-full grid-cols-4 border-b border-black/10 last:border-b-0"
          >
            <div className="flex flex-col items-center justify-center px-4 text-xs uppercase tracking-[-0.3px]">
              {sub.name}
            </div>

            <div className="col-span-3 h-full">
              <StorySlideshow photos={sub.photos} />
            </div>
          </section>
        ))}
      </main>
    );
  }

  const navVariant = story.text === "text-white" ? "dark" : "light";

  return (
    <main className={`relative min-h-screen w-full ${story.bg} ${story.text}`}>
      <LightNav variant={navVariant} backHref="/projects" barColor={story.bgColor} />

      <div className="mx-auto max-w-4xl px-6 pb-8 pt-32 sm:px-12 lg:max-w-5xl lg:px-16">
        <h1 className="font-bold text-3xl tracking-tight sm:text-5xl lg:text-6xl">
          {story.title}
        </h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed sm:text-base lg:max-w-3xl lg:text-lg">
          {story.intro.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <ScatterGallery photos={story.photos} />
    </main>
  );
}
