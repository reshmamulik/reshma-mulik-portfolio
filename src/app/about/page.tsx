"use client";

import LightNav from "@/components/light/LightNav";
import { about } from "@/data/light";

export default function AboutPage() {
  return (
    <main className={`relative h-screen w-full overflow-hidden ${about.bg} ${about.text}`}>
      <LightNav variant="light" />

      <div className="mx-auto flex h-screen max-w-2xl flex-col justify-center gap-8 px-6 sm:px-12 lg:max-w-3xl lg:px-16">
        <div className="space-y-5 text-left text-[12.6px] leading-relaxed text-black/80 sm:text-[14.4px] lg:text-[16.2px]">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <p className="text-left text-[12.6px] text-black/60 sm:text-[14.4px] lg:text-[16.2px]">
          <a
            href={`mailto:${about.email}`}
            className="underline underline-offset-4 transition hover:text-[#ff3b5c]"
          >
            {about.email}
          </a>
        </p>
      </div>
    </main>
  );
}
