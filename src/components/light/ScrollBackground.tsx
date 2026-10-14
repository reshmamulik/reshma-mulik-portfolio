"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

// A fixed, full-viewport color layer sitting behind the page content. As the
// user scrolls, it ramps between each project's signature color, hitting a
// project's exact color once that section's midpoint has scrolled to the
// middle of the viewport, and blending gradually in between.
//
// Sections aren't a fixed height anymore (some carry a full essay and grow
// taller than one screen), so the color breakpoints are measured directly
// from each matching element's actual position rather than assumed to be
// evenly spaced. `selector` must match one element per color, in the same
// top-to-bottom order as `colors`.
export default function ScrollBackground({ colors, selector }: { colors: string[]; selector: string }) {
  const { scrollYProgress } = useScroll();
  const [stops, setStops] = useState<number[] | null>(null);

  useEffect(() => {
    function measure() {
      const sections = Array.from(document.querySelectorAll<HTMLElement>(selector));
      if (sections.length === 0) return;
      const viewportHeight = window.innerHeight;
      const scrollable = Math.max(document.documentElement.scrollHeight - viewportHeight, 1);

      const next = sections.map((section) => {
        const mid = section.offsetTop + section.offsetHeight / 2 - viewportHeight / 2;
        return Math.min(Math.max(mid / scrollable, 0), 1);
      });
      // useTransform needs a strictly increasing input range.
      for (let i = 1; i < next.length; i += 1) {
        if (next[i] <= next[i - 1]) next[i] = next[i - 1] + 0.0001;
      }
      setStops(next);
    }

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [selector]);

  const fallbackStops = colors.map((_, i) => i / Math.max(colors.length - 1, 1));
  const background = useTransform(scrollYProgress, stops ?? fallbackStops, colors);

  // Mirror the live blended color onto a CSS variable on :root, so
  // LightNav's hover bar on this page can pick up "whatever color is
  // actually behind it right now" (Reshma, 2026-10-13) without the nav
  // needing its own scroll tracking — it just reads this var. The event
  // only fires on a subsequent change, so the effect below also sets it
  // once up front from the current value (otherwise the var is unset
  // until the first scroll tick).
  useMotionValueEvent(background, "change", (latest) => {
    document.documentElement.style.setProperty("--recent-work-bg", latest);
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--recent-work-bg", background.get());
  }, [background]);

  return <motion.div aria-hidden="true" className="fixed inset-0 z-0" style={{ background }} />;
}
