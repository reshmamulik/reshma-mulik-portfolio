"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { PlanetData } from "@/data/planets";

export default function Planet({
  planet,
  index,
}: {
  planet: PlanetData;
  index: number;
}) {
  const { name, tagline, href, status, colorFrom, colorTo, size, orbitRadius, angle } =
    planet;

  // The one active planet distinguishes itself once the entrance settles:
  // a touch larger, a brighter glow, and raised above the others.
  const isFeatured = status === "active";

  // Positioned with CSS trig functions so it's fully responsive without
  // any JS measuring the window. sin/cos take the angle in degrees.
  const style: CSSProperties = {
    position: "absolute",
    top: `calc(50% + (sin(${angle}deg) * ${orbitRadius}vmin))`,
    left: `calc(50% + (cos(${angle}deg) * ${orbitRadius}vmin))`,
    width: `${size}vmin`,
    height: `${size}vmin`,
    transform: "translate(-50%, -50%)",
    zIndex: isFeatured ? 20 : 10,
  };

  const sphere = (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 6 + index,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={status === "active" ? { scale: 1.08 } : undefined}
      className="relative h-full w-full"
    >
      <div
        className={`h-full w-full rounded-full bg-gradient-to-br ${colorFrom} ${colorTo} ${
          isFeatured
            ? "shadow-[0_0_55px_rgba(255,255,255,0.45)]"
            : "shadow-[0_0_35px_rgba(255,255,255,0.25)]"
        }`}
      />
      {status === "soon" && (
        <div className="absolute inset-0 rounded-full bg-space-950/50" />
      )}
      <div className="pointer-events-none absolute left-1/2 top-full mt-3 w-max -translate-x-1/2 text-center opacity-0 transition duration-300 group-hover:opacity-100">
        <p className="font-display text-sm">{name}</p>
        <p className="text-xs text-white/50">
          {status === "active" ? tagline : "Coming soon"}
        </p>
      </div>
    </motion.div>
  );

  // Entrance: the whole planet drifts in from very far away — starting
  // tiny and transparent, easing up to full size, then (for the featured
  // planet only) settling a little larger than the rest. Staggered per
  // planet so the approach feels continuous rather than simultaneous.
  const entrance = (
    <motion.div
      initial={{ scale: 0.15, opacity: 0 }}
      animate={{ scale: [0.15, 1, isFeatured ? 1.08 : 1], opacity: [0, 1, 1] }}
      transition={{
        duration: 2,
        delay: index * 0.25,
        times: [0, 0.7, 1],
        ease: ["easeOut", "easeInOut"],
      }}
      className="h-full w-full"
    >
      {sphere}
    </motion.div>
  );

  if (status === "active" && href) {
    return (
      <Link
        href={href}
        style={style}
        className="group block cursor-pointer"
        aria-label={`Visit the ${name} planet`}
      >
        {entrance}
      </Link>
    );
  }

  return (
    <div
      style={style}
      className="group cursor-not-allowed opacity-60 grayscale-[20%]"
      title={`${name} — coming soon`}
    >
      {entrance}
    </div>
  );
}
