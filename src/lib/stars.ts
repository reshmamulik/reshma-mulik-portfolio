// A tiny seeded pseudo-random generator (mulberry32).
// Using a seed instead of Math.random() means the server-rendered HTML
// and the client-rendered HTML always match exactly — no React hydration
// warnings, and the starfield looks the same on every visit.
function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates a CSS box-shadow value made of many small dots ("stars"),
 * scattered across a square area of `spread` x `spread` pixels.
 */
export function generateStarShadow(
  count: number,
  seed: number,
  spread: number
): string {
  const random = mulberry32(seed);
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(random() * spread);
    const y = Math.floor(random() * spread);
    shadows.push(`${x}px ${y}px #fff`);
  }
  return shadows.join(", ");
}
