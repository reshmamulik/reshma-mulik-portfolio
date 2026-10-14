export type PlanetStatus = "active" | "soon";

export interface PlanetData {
  id: string;
  name: string;
  tagline: string;
  /** Only needed when status is "active" */
  href?: string;
  status: PlanetStatus;
  /** Full Tailwind class names, e.g. "from-amber-200" */
  colorFrom: string;
  colorTo: string;
  /** Diameter, in vmin */
  size: number;
  /** Distance from the center, in vmin */
  orbitRadius: number;
  /** Position around the circle, in degrees (0 = right, 90 = bottom) */
  angle: number;
}

// This is the map of your universe. To add a new world once it's ready:
// 1. Build its page at src/app/<id>/page.tsx (copy the light folder as a starting point)
// 2. Add an entry below with status: "active" and href: "/<id>"
export const planets: PlanetData[] = [
  {
    id: "light",
    name: "Light",
    tagline: "Photography & visual art",
    href: "/light",
    status: "active",
    colorFrom: "from-amber-200",
    colorTo: "to-rose-400",
    size: 16,
    orbitRadius: 28,
    angle: 20,
  },
  {
    id: "painting",
    name: "Painting",
    tagline: "Color on canvas",
    status: "soon",
    colorFrom: "from-sky-300",
    colorTo: "to-indigo-500",
    size: 12,
    orbitRadius: 36,
    angle: 90,
  },
  {
    id: "editing-motion",
    name: "Editing & Motion Graphics",
    tagline: "Frames in motion",
    status: "soon",
    colorFrom: "from-fuchsia-300",
    colorTo: "to-purple-600",
    size: 13,
    orbitRadius: 33,
    angle: 155,
  },
  {
    id: "decor",
    name: "Decor Brand",
    tagline: "Spaces & objects",
    status: "soon",
    colorFrom: "from-emerald-300",
    colorTo: "to-teal-600",
    size: 12,
    orbitRadius: 34,
    angle: 220,
  },
  {
    id: "projects",
    name: "Personal Projects",
    tagline: "Ideas taking shape",
    status: "soon",
    colorFrom: "from-orange-200",
    colorTo: "to-red-400",
    size: 11,
    orbitRadius: 38,
    angle: 290,
  },
];
