"use client";

import { motion } from "framer-motion";

// A handful of kid-drawn, crayon-scribble style doodles that float gently
// behind the About page content. Mostly flowers (per feedback), plus a
// couple of scribbled circles and a squiggle for variety. Colors are a
// soft chalk-on-blackboard palette since the page background is now black.

const PALETTE = ["#ffffff", "#ff3b5c", "#ffd166", "#8ecae6", "#95d5b2"];

// One hand-wobbled petal loop, repeated 6x around a center scribble to
// build a flower. The asymmetric control points (rather than a perfect
// oval) are what sell the "drawn by hand" look.
function ScribbleFlower({ color }: { color: string }) {
  const petalAngles = [0, 60, 120, 180, 240, 300];
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {petalAngles.map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M50,50 C40,36 38,18 48,6 C56,4 64,18 58,34 C55,42 52,47 50,50 Z"
            stroke={color}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
      {/* center scribble: two overlapping imperfect circles */}
      <circle cx="50" cy="50" r="7" stroke={color} strokeWidth={2.2} />
      <circle cx="51.5" cy="48.5" r="5.5" stroke={color} strokeWidth={2} />
    </svg>
  );
}

function ScribbleCircle({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50,12 C70,10 90,28 88,50 C90,72 68,90 48,88 C26,90 10,70 12,50 C9,28 30,14 50,12 Z"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50,18 C66,17 82,32 80,49"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.6}
      />
    </svg>
  );
}

function Squiggle({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2,20 C12,4 22,36 32,20 C42,4 52,36 62,20 C72,4 82,36 92,20"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface DoodleSpec {
  Shape: ({ color }: { color: string }) => JSX.Element;
  top: string;
  left: string;
  size: string;
  color: string;
  floatX: number;
  floatY: number;
  floatRotate: number;
  duration: number;
  delay: number;
}

const DOODLES: DoodleSpec[] = [
  { Shape: ScribbleFlower, top: "10%", left: "8%", size: "5rem", color: PALETTE[1], floatX: 16, floatY: 22, floatRotate: 10, duration: 7, delay: 0 },
  { Shape: ScribbleFlower, top: "68%", left: "6%", size: "4rem", color: PALETTE[2], floatX: 20, floatY: 14, floatRotate: -12, duration: 8.5, delay: 0.4 },
  { Shape: ScribbleFlower, top: "14%", left: "82%", size: "6rem", color: PALETTE[3], floatX: -18, floatY: 20, floatRotate: 14, duration: 9, delay: 0.8 },
  { Shape: ScribbleFlower, top: "78%", left: "80%", size: "4.5rem", color: PALETTE[4], floatX: -14, floatY: -18, floatRotate: -10, duration: 7.5, delay: 1.2 },
  { Shape: ScribbleFlower, top: "44%", left: "90%", size: "3.5rem", color: PALETTE[0], floatX: 12, floatY: 16, floatRotate: 8, duration: 6.5, delay: 0.2 },
  { Shape: ScribbleCircle, top: "38%", left: "4%", size: "3rem", color: PALETTE[0], floatX: 10, floatY: -14, floatRotate: 12, duration: 8, delay: 0.6 },
  { Shape: ScribbleCircle, top: "88%", left: "40%", size: "2.75rem", color: PALETTE[1], floatX: -12, floatY: 10, floatRotate: -8, duration: 7, delay: 1 },
  { Shape: Squiggle, top: "6%", left: "42%", size: "5rem", color: PALETTE[2], floatX: 14, floatY: 6, floatRotate: 0, duration: 6, delay: 0.3 },
];

export default function CrayonDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {DOODLES.map(({ Shape, top, left, size, color, floatX, floatY, floatRotate, duration, delay }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top, left, width: size, height: size }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 0.55,
            scale: 1,
            x: [0, floatX, -floatX * 0.6, 0],
            y: [0, -floatY, floatY * 0.7, 0],
            rotate: [0, floatRotate, -floatRotate * 0.6, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay },
            scale: { duration: 0.8, delay },
            x: { duration, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay },
            y: { duration: duration * 1.2, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay },
            rotate: { duration: duration * 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay },
          }}
        >
          <Shape color={color} />
        </motion.div>
      ))}
    </div>
  );
}
