export interface LightPhoto {
  id: string;
  alt: string;
  /** Path under /public, e.g. "/light/projects/ongoing/01.jpg". Leave empty for a placeholder tile. */
  src?: string;
  /** Real photos only — lets the slideshow pair verticals into diptychs and
   * keep horizontals as their own single slide, instead of guessing.
   * Placeholders leave this unset. */
  orientation?: "horizontal" | "vertical";
  /** CSS object-position override for object-cover crops, e.g. "50% 15%" —
   * for photos where the centered crop cuts off something that matters
   * (a raised foot, the top of a head). Defaults to centered. */
  objectPosition?: string;
  placeholderFrom: string;
  placeholderTo: string;
  /** Home-page cascade photos only: which Recent Work row and photo this
   * is also featured in, so clicking it on the home page can jump
   * straight to that exact photo on Recent Work instead of just the top
   * of the page (Reshma, 2026-10-14). "row" matches a project row key
   * (a story slug, or "ongoing-<sub-project name>" for an Ongoing
   * sub-project like Fashion) and "photoId" matches that photo's own id
   * within the project. */
  linkToProject?: { row: string; photoId: string };
}

export type StoryCategory = "STORIES" | "FASHION";

export interface LightStory {
  /** Used in the URL: /light/projects/[slug] */
  slug: string;
  /** Shown in the PROJECTS index nav, all-caps */
  navLabel: string;
  category: StoryCategory;
  /** Large all-caps hero title on the story page itself */
  title: string;
  /** Optional small caption shown under the title on Recent Work (e.g. "Phase I") */
  subheadline?: string;
  /** Full-bleed background color for this story's page */
  bg: string;
  /** Raw hex for this project's color, matching  — used by LightNav's hover bar on story pages. */
  bgColor?: string;
  /** Text color that reads on top of `bg` */
  text: "text-white" | "text-black";
  /** Essay-style intro paragraphs, first person. Placeholder copy where the
   * source recording didn't give legible text — see the note at the bottom
   * of this file before replacing. */
  intro: string[];
  /** Tint used for this story's preview tile (PROJECTS right column + filmstrip) */
  preview: { from: string; to: string };
  /** Scattered photo layout for the story page itself */
  photos: LightPhoto[];
  /** Only "Ongoing" uses this so far: separate in-progress projects, each
   * shown with its own name and its own slideshow, stacked one after
   * another on the page. */
  subProjects?: { name: string; photos: LightPhoto[] }[];
}

const placeholderIntro = (label: string) => [
  `[Add the essay for "${label}" here — Reshma's original copy from the Readymag site should be dropped in verbatim, not paraphrased.]`,
];

const scatterPlaceholders = (slug: string, from: string, to: string, count = 5): LightPhoto[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${slug}-${String(i + 1).padStart(2, "0")}`,
    alt: `${slug} photograph ${i + 1}`,
    placeholderFrom: from,
    placeholderTo: to,
  }));

export const stories: LightStory[] = [
  {
    slug: "ongoing",
    navLabel: "Ongoing",
    category: "STORIES",
    title: "Ongoing",
    intro: [],
    // Sampled from the dusky blue sky in the first Ongoing photo
    // (ongoing-01, the windswept-tree silhouette), per Reshma's request.
    // (Briefly tried white per her 2026-10-06 request, reverted same day
    // after she said it wasn't looking good.)
    bg: "bg-[#38448D]",
    bgColor: "#38448D",
    text: "text-white",
    preview: { from: "from-[#6A73AA]/40", to: "to-[#242C5C]/40" },
    // Real photos Reshma dropped into the ongoing folder 2026-09-13,
    // trimmed 2026-09-13 after she deleted several from "Images to use" —
    // only what's still there gets wired in. Landscape-shaped photos are
    // kept as singles; verticals are either singles or paired into
    // diptychs where they visually rhyme.
    photos: [
      {
        id: "ongoing-01",
        alt: "Silhouette of a windswept tree against a dusky blue sky",
        src: "/light/projects/ongoing/01.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-sky-200/30",
        placeholderTo: "to-sky-400/30",
      },
      {
        id: "ongoing-02",
        alt: "Silhouetted profile against a blue sky, palm fronds framing the edge",
        src: "/light/projects/ongoing/02.jpg",
        orientation: "vertical",
        placeholderFrom: "from-sky-200/30",
        placeholderTo: "to-sky-400/30",
      },
      {
        id: "ongoing-03",
        alt: "Close-up of a frosted, ice-encrusted glass block in cool blue light",
        src: "/light/projects/ongoing/03.jpg",
        orientation: "vertical",
        placeholderFrom: "from-sky-200/30",
        placeholderTo: "to-sky-400/30",
      },
      {
        id: "ongoing-04",
        alt: "Close-up of a hand and wrist lit in warm golden light",
        src: "/light/projects/ongoing/04.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-sky-200/30",
        placeholderTo: "to-sky-400/30",
      },
      {
        id: "ongoing-05",
        alt: "Blurred orange-toned silhouette of a figure",
        src: "/light/projects/ongoing/05.jpg",
        orientation: "vertical",
        placeholderFrom: "from-sky-200/30",
        placeholderTo: "to-sky-400/30",
      },
      {
        id: "ongoing-06",
        alt: "Close-up of a hand decorated with intricate henna",
        src: "/light/projects/ongoing/06.jpg",
        orientation: "vertical",
        placeholderFrom: "from-sky-200/30",
        placeholderTo: "to-sky-400/30",
      },
      {
        id: "ongoing-07",
        alt: "Hand holding a slice of watermelon on a textured floor",
        src: "/light/projects/ongoing/07.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-sky-200/30",
        placeholderTo: "to-sky-400/30",
      },
      {
        id: "ongoing-08",
        alt: "Crumpled yellow and pink paper flowers against black",
        src: "/light/projects/ongoing/08.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-sky-200/30",
        placeholderTo: "to-sky-400/30",
      },
      {
        id: "ongoing-09",
        alt: "Blurred purple bokeh lights, abstract",
        src: "/light/projects/ongoing/09.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-sky-200/30",
        placeholderTo: "to-sky-400/30",
      },
      {
        id: "ongoing-10",
        alt: "Two figures embracing closely, lit in cool blue tones",
        src: "/light/projects/ongoing/10.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-sky-200/30",
        placeholderTo: "to-sky-400/30",
      },
    ],
    subProjects: [
      {
        name: "Fashion",
        // Real photos from Reshma's fashion folder, matched against her
        // reference screenshots 2026-09-14. Several photos in the folder
        // (Amrita, Issheeta at Satra, Laukik, Prax Bandra, Prax Tribal)
        // weren't shown in any reference pairing, so they're left out for
        // now rather than guessing an order — see portfolio-setup.md.
        photos: [
          {
            id: "fashion-01",
            alt: "Close-up portrait resting chin on hand, dramatic eye makeup and layered ethnic jewelry",
            src: "/light/projects/fashion/01.jpg",
            orientation: "horizontal",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-02",
            alt: "Full-length portrait in an olive utility cape and pink tights, seated on a striped pedestal",
            src: "/light/projects/fashion/02.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-03",
            alt: "Close-up of legs kicked up in heels and pink tights on a striped pedestal",
            src: "/light/projects/fashion/03.jpg",
            orientation: "vertical",
            // The kicked-up heel reaches almost to the top of the frame —
            // a centered crop was cutting the shoe off, so shift the crop
            // up to keep it in frame. 2026-09-19.
            objectPosition: "50% 10%",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-05",
            alt: "Close-up portrait in a black leather bustier with a studded glove and ruffled collar, black-and-white",
            src: "/light/projects/fashion/05.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-06",
            alt: "Full-length bent-forward pose in a black leather bustier and gloves, black-and-white",
            src: "/light/projects/fashion/06.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-07",
            alt: "Seated portrait in a fringe cardigan, leaning against a wooden block",
            src: "/light/projects/fashion/07.jpg",
            orientation: "horizontal",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-10",
            alt: "Dance pose in a satin wrap skirt, one leg raised, black-and-white",
            src: "/light/projects/fashion/10.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-12",
            alt: "Motion-blurred dance pose in a satin wrap skirt, hair in motion, black-and-white",
            src: "/light/projects/fashion/12.jpg",
            orientation: "horizontal",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          // The remaining real photos in the fashion folder, paired into
          // diptychs by visual/tonal fit (no reference screenshots existed
          // for these) per Reshma's request 2026-09-13.
          {
            id: "fashion-13",
            alt: "Close-up profile portrait with fringe bangs, teal drop earrings and deep pink lipstick, teal background",
            src: "/light/projects/fashion/13.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-20",
            alt: "Hands raised with rings catching the light, colorful sleeve, teal background",
            src: "/light/projects/fashion/20.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-22",
            alt: "Backlit silhouette profile in warm golden light, eyes closed",
            src: "/light/projects/fashion/22.jpg",
            orientation: "horizontal",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-23",
            alt: "Portrait against a mustard-yellow wall, looking to the side",
            src: "/light/projects/fashion/23.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-24",
            alt: "Figure in a brown jacket seen from behind, hands clasped, looking over the shoulder",
            src: "/light/projects/fashion/24.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-26",
            alt: "Close-up of tailored black trousers and loafers",
            src: "/light/projects/fashion/26.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-25",
            alt: "Minimalist shadow cast on a wall as a figure walks past",
            src: "/light/projects/fashion/25.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          // "Anchal Retro" shoot, added 2026-09-19 — regrouped same day
          // per Reshma's follow-up: 29+30 as a diptych, 31+32 as a diptych,
          // 33 (the abstract motion-streak shot) kept as its own single.
          {
            id: "fashion-29",
            alt: "Silhouette of a figure dancing with arms raised overhead, sequined dress",
            src: "/light/projects/fashion/29.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-30",
            alt: "Close-up portrait resting chin on hand, ornate earrings and headpiece, warm sepia tone",
            src: "/light/projects/fashion/30.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-31",
            alt: "Black-and-white close-up profile portrait, eyes closed, lace headpiece",
            src: "/light/projects/fashion/31.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-32",
            alt: "Close-up of a sequined halter top in golden-olive light",
            src: "/light/projects/fashion/32.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
          {
            id: "fashion-33",
            alt: "Abstract blurred motion streaks in iridescent teal and gold light",
            src: "/light/projects/fashion/33.jpg",
            orientation: "vertical",
            placeholderFrom: "from-teal-500/30",
            placeholderTo: "to-teal-900/30",
          },
        ],
      },
    ],
  },
  {
    slug: "ahilya-fort",
    navLabel: "Ahilya Fort",
    category: "STORIES",
    title: "Staying With The Narmada",
    bg: "bg-red-600",
    bgColor: "#DC2626",
    text: "text-white",
    intro: [
      "By the banks of the Narmada stands a palace called Ahilya Fort. I got the chance to stay there, capture the beauty of the place and meet the lovely people who continue to carry the grace and legacy of Devi Ahilyabai Holkar. It was something I had the privilege of capturing for Brown Paper Bags.",
      "You see history in the present moment because of the way the fort has been preserved. Built around the vision of Ahilyabai Holkar it doesn't feel like a monument frozen in time, it still feels lived in. The place reveals itself over time rather than all at once.",
      "The sunset from the top of the fort is incredible. The light falls gently over the Narmada, every reflection glowing in the colours of the evening sun. It's the kind of view that makes you stop for a while.",
      "I met Emy there, who came to Maheshwar from a faraway land. Somehow what began as a visit turned into a lifetime and Maheshwar became her home. After hearing her story it was easy to understand why people choose to stay.",
      "Maybe that's what this place does to you. The everyday objects around the fort, the ghats, the diyas, the evening aarti and the folk songs the boatmen sing as they row you across the river gently remind you to slow down to really see, absorb and be present. It all feels quietly magical and it's something I'll cherish for the rest of my life.",
    ],
    preview: { from: "from-red-400/40", to: "to-red-700/40" },
    // Real photos from Reshma. Diptych pairings (01+02, 03+04, 06+07, 08+09)
    // come from her reference screenshots; the horizontals (10, 11, 05, 12,
    // 13) are each their own single slide, spaced one between every diptych
    // per her request, rather than bunched at the end.
    photos: [
      {
        id: "ahilya-fort-01",
        alt: "Orange flowers glowing in warm backlight at Ahilya Fort",
        src: "/light/projects/ahilya-fort/01.jpg",
        orientation: "vertical",
        placeholderFrom: "from-red-300/30",
        placeholderTo: "to-red-700/30",
      },
      {
        id: "ahilya-fort-02",
        alt: "Portrait of a woman lit warmly against a dark background at Ahilya Fort",
        src: "/light/projects/ahilya-fort/02.jpg",
        orientation: "vertical",
        placeholderFrom: "from-red-300/30",
        placeholderTo: "to-red-700/30",
      },
      {
        id: "ahilya-fort-03",
        alt: "A white wicker chair and table on the fort's rooftop terrace",
        src: "/light/projects/ahilya-fort/03.jpg",
        orientation: "vertical",
        placeholderFrom: "from-red-300/30",
        placeholderTo: "to-red-700/30",
      },
      {
        id: "ahilya-fort-04",
        alt: "View of the Narmada through a red archway window at the fort",
        src: "/light/projects/ahilya-fort/04.jpg",
        orientation: "vertical",
        placeholderFrom: "from-red-300/30",
        placeholderTo: "to-red-700/30",
      },
      {
        id: "ahilya-fort-05",
        alt: "Sunset over the Narmada with a temple spire and boats silhouetted",
        src: "/light/projects/ahilya-fort/05.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-red-300/30",
        placeholderTo: "to-red-700/30",
      },
      {
        id: "ahilya-fort-06",
        alt: "A glass jar of dried red chillies in oil, sitting in the sun",
        src: "/light/projects/ahilya-fort/06.jpg",
        orientation: "vertical",
        placeholderFrom: "from-red-300/30",
        placeholderTo: "to-red-700/30",
      },
      {
        id: "ahilya-fort-07",
        alt: "A goldfish beneath the rippling surface of the river",
        src: "/light/projects/ahilya-fort/07.jpg",
        orientation: "vertical",
        placeholderFrom: "from-red-300/30",
        placeholderTo: "to-red-700/30",
      },
      {
        id: "ahilya-fort-10",
        alt: "A framed line drawing of a tree hanging on a wall at the fort",
        src: "/light/projects/ahilya-fort/10.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-red-300/30",
        placeholderTo: "to-red-700/30",
      },
      {
        id: "ahilya-fort-11",
        alt: "Aerial view of boats moored along the Narmada, seen through flowering branches",
        src: "/light/projects/ahilya-fort/11.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-red-300/30",
        placeholderTo: "to-red-700/30",
      },
      {
        id: "ahilya-fort-08",
        alt: "A figure lying down, softly blurred in warm golden light",
        src: "/light/projects/ahilya-fort/08.jpg",
        orientation: "vertical",
        placeholderFrom: "from-red-300/30",
        placeholderTo: "to-red-700/30",
      },
      {
        id: "ahilya-fort-09",
        alt: "Two hands touching, lit in blue against a dark background",
        src: "/light/projects/ahilya-fort/09.jpg",
        orientation: "vertical",
        placeholderFrom: "from-red-300/30",
        placeholderTo: "to-red-700/30",
      },
      {
        id: "ahilya-fort-13",
        alt: "A small boat in the distance under a pink sunset sky",
        src: "/light/projects/ahilya-fort/13.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-red-300/30",
        placeholderTo: "to-red-700/30",
      },
    ],
  },
  {
    slug: "hostel",
    navLabel: "Hostel",
    category: "STORIES",
    title: "Hostel",
    bg: "bg-neutral-900",
    bgColor: "#171717",
    text: "text-white",
    intro: [
      "I always knew I'd leave my nest and go see the world. The first time I came to Bombay and got into the Military Girls Hostel, little did I know it would become the place where I'd discover myself and heal the unknown by people from completely different places, cultures and upbringings.",
      "Instead of being just a place to stay, it became a place where we nurtured one another. We saw each other cry, learned how to be adults together and fought over the lights being on late at night because someone was studying, finishing a project or simply didn't want to switch them off.",
      "We had what felt like three tiny rooms inside one room - our beds being the only personal space we had. And somehow, within those small boundaries there was complete transparency. We could see each other clearly.",
      "We shared stories, traumas, abuse, heartbreaks and all the little things we carried with us. We all wanted the same things to love, to find joy, to make our parents proud and to become something. We were just a bunch of girls with dreams, trying to figure life out together.",
      "It was the peak of girlhood.",
      "Leaving after two years was one of the hardest things I've done, but I didn't leave empty-handed. I left with the kind of friendships that stay with you for life. Forever grateful to them.",
    ],
    preview: { from: "from-neutral-600/40", to: "to-neutral-900/40" },
    // Real photos from Reshma, restructured again 2026-09-13: the
    // hands-clasped-behind-back photo now pairs with a new extreme
    // laugh-closeup crop (previously an unused leftover) instead of the
    // b&w mid-laugh portrait, which moves back to being a standalone
    // single. Glass macro + clay face-mask diptych unchanged.
    photos: [
      {
        id: "hostel-01",
        alt: "A girl lying down with her hand resting over her face",
        src: "/light/projects/hostel/08.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-neutral-500/30",
        placeholderTo: "to-neutral-900/30",
      },
      {
        id: "hostel-02",
        alt: "Extreme close-up of a girl laughing, teeth bared",
        src: "/light/projects/hostel/11.jpg",
        orientation: "vertical",
        placeholderFrom: "from-neutral-500/30",
        placeholderTo: "to-neutral-900/30",
      },
      {
        id: "hostel-03",
        alt: "A girl's hands clasped behind her back, seen from behind",
        src: "/light/projects/hostel/05.jpg",
        orientation: "vertical",
        placeholderFrom: "from-neutral-500/30",
        placeholderTo: "to-neutral-900/30",
      },
      {
        id: "hostel-04",
        alt: "Extreme close-up of amber and green light through glass",
        src: "/light/projects/hostel/04.jpg",
        orientation: "vertical",
        placeholderFrom: "from-neutral-500/30",
        placeholderTo: "to-neutral-900/30",
      },
      {
        id: "hostel-05",
        alt: "Portrait of a girl with a painted clay face mask",
        src: "/light/projects/hostel/06.jpg",
        orientation: "vertical",
        placeholderFrom: "from-neutral-500/30",
        placeholderTo: "to-neutral-900/30",
      },
      {
        id: "hostel-06",
        alt: "Black-and-white close-up portrait with eyes closed, mid-laugh",
        src: "/light/projects/hostel/03.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-neutral-500/30",
        placeholderTo: "to-neutral-900/30",
      },
      {
        id: "hostel-07",
        alt: "Extreme close-up of an eye behind glasses",
        src: "/light/projects/hostel/09.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-neutral-500/30",
        placeholderTo: "to-neutral-900/30",
      },
      {
        id: "hostel-08",
        alt: "Portrait of a girl in a guitar-print t-shirt, warmly lit",
        src: "/light/projects/hostel/01.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-neutral-500/30",
        placeholderTo: "to-neutral-900/30",
      },
      {
        id: "hostel-09",
        alt: "Silhouette of a girl standing at a balcony railing at dusk",
        src: "/light/projects/hostel/02.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-neutral-500/30",
        placeholderTo: "to-neutral-900/30",
      },
      {
        id: "hostel-10",
        alt: "A glowing terracotta cup lit warmly from within",
        src: "/light/projects/hostel/07.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-neutral-500/30",
        placeholderTo: "to-neutral-900/30",
      },
      {
        id: "hostel-11",
        alt: "Portrait of a girl laughing, in a purple t-shirt",
        src: "/light/projects/hostel/10.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-neutral-500/30",
        placeholderTo: "to-neutral-900/30",
      },
    ],
  },
  {
    slug: "senses-x-lune",
    navLabel: "Senses X Lune",
    category: "STORIES",
    title: "Senses X Lune",
    bg: "bg-yellow-400",
    bgColor: "#FACC15",
    text: "text-black",
    intro: [
      "'Senses' is a visual project developed for LUNE, centred around the idea of experiencing design through all five senses.",
      "The series interprets the collection through a restrained visual language, focusing on texture, material and form. Each image is constructed to reflect the quiet and considered nature of the objects, emphasising subtle beauty over spectacle.",
      "Beyond sight, the project extends into the sensory imagination of touch, smell, taste and sound. This approach positions the collection as an experience rather than a product, inviting a deeper and more immersive engagement.",
      "The work translates LUNE's design philosophy into a visual narrative that is calm, tactile and intentional.",
    ],
    preview: { from: "from-yellow-200/40", to: "to-yellow-500/40" },
    // Real photos from Reshma, ordered per her reference PDF (Senses_Shoplune.pdf):
    // 4 diptychs + 4 singles, in the exact sequence and pairing it shows.
    photos: [
      {
        id: "senses-x-lune-01",
        alt: "Black-and-white image of a hand cradling a lit candle against bare skin",
        src: "/light/projects/senses-x-lune/01.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-yellow-200/30",
        placeholderTo: "to-yellow-500/30",
      },
      {
        id: "senses-x-lune-02",
        alt: "Silhouette of a woman with one arm raised, standing in shallow water at dusk",
        src: "/light/projects/senses-x-lune/02.jpg",
        orientation: "vertical",
        placeholderFrom: "from-yellow-200/30",
        placeholderTo: "to-yellow-500/30",
      },
      {
        id: "senses-x-lune-03",
        alt: "A chocolate box and a gold bracelet arranged against an orange and black background",
        src: "/light/projects/senses-x-lune/03.jpg",
        orientation: "vertical",
        placeholderFrom: "from-yellow-200/30",
        placeholderTo: "to-yellow-500/30",
      },
      {
        id: "senses-x-lune-04",
        alt: "Close-up of a gold earring against a soft blue-lit background",
        src: "/light/projects/senses-x-lune/04.jpg",
        orientation: "vertical",
        placeholderFrom: "from-yellow-200/30",
        placeholderTo: "to-yellow-500/30",
      },
      {
        id: "senses-x-lune-05",
        alt: "Golden light rippling across a textured water surface",
        src: "/light/projects/senses-x-lune/05.jpg",
        orientation: "vertical",
        placeholderFrom: "from-yellow-200/30",
        placeholderTo: "to-yellow-500/30",
      },
      {
        id: "senses-x-lune-06",
        alt: "Black-and-white close-up of the back of a woman's head and neck",
        src: "/light/projects/senses-x-lune/06.jpg",
        orientation: "vertical",
        placeholderFrom: "from-yellow-200/30",
        placeholderTo: "to-yellow-500/30",
      },
      {
        id: "senses-x-lune-09",
        alt: "Portrait of a woman with eyes closed, warmly lit",
        src: "/light/projects/senses-x-lune/09.jpg",
        orientation: "vertical",
        placeholderFrom: "from-yellow-200/30",
        placeholderTo: "to-yellow-500/30",
      },
      {
        id: "senses-x-lune-07",
        alt: "A hand resting on a chocolate box against a black background",
        src: "/light/projects/senses-x-lune/07.jpg",
        orientation: "vertical",
        placeholderFrom: "from-yellow-200/30",
        placeholderTo: "to-yellow-500/30",
      },
      {
        id: "senses-x-lune-08",
        alt: "Black-and-white image of a woman with one arm raised by the water",
        src: "/light/projects/senses-x-lune/08.jpg",
        orientation: "vertical",
        placeholderFrom: "from-yellow-200/30",
        placeholderTo: "to-yellow-500/30",
      },
      {
        id: "senses-x-lune-10",
        alt: "Black-and-white image of a lit candle and a bracelet resting on rocks",
        src: "/light/projects/senses-x-lune/10.jpg",
        orientation: "vertical",
        placeholderFrom: "from-yellow-200/30",
        placeholderTo: "to-yellow-500/30",
      },
      {
        id: "senses-x-lune-11",
        alt: "Close-up portrait with hair falling across the face in warm light",
        src: "/light/projects/senses-x-lune/11.jpg",
        orientation: "vertical",
        placeholderFrom: "from-yellow-200/30",
        placeholderTo: "to-yellow-500/30",
      },
      {
        id: "senses-x-lune-12",
        alt: "Profile portrait of a woman wearing a gold hoop earring",
        src: "/light/projects/senses-x-lune/12.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-yellow-200/30",
        placeholderTo: "to-yellow-500/30",
      },
    ],
  },
  {
    slug: "rootbound",
    navLabel: "Rootbound",
    category: "STORIES",
    title: "Rootbound",
    bg: "bg-purple-700",
    bgColor: "#7E22CE",
    text: "text-white",
    intro: [
      "A tree stands under a single light. It becomes a constant. Something watched, returned to, and slowly understood.",
      "The work imagines a figure coming back to it after time. Not as a stranger, but with a sense of having always belonged there. The tree, still in place, holds that familiarity. Its rough bark, its overgrown form, unchanged.",
      "What unfolds is not an encounter, but a recognition. A quiet meeting between the body and something that has outlasted it.",
      "Rootbound stays within this space. Where memory, presence, and place remain closely tied.",
    ],
    preview: { from: "from-purple-400/40", to: "to-purple-800/40" },
    photos: [
      {
        id: "rootbound-01",
        alt: "Close-up of blue fabric scattered with gold flecks and a reaching hand",
        src: "/light/projects/rootbound/01.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-purple-300/30",
        placeholderTo: "to-purple-800/30",
      },
      {
        id: "rootbound-02",
        alt: "Close-up of a blue silk saree with hands crossed at the waist",
        src: "/light/projects/rootbound/02.jpg",
        orientation: "vertical",
        placeholderFrom: "from-purple-300/30",
        placeholderTo: "to-purple-800/30",
      },
      {
        id: "rootbound-03",
        alt: "A woman's face glimpsed behind glowing green fern fronds",
        src: "/light/projects/rootbound/03.jpg",
        orientation: "vertical",
        placeholderFrom: "from-purple-300/30",
        placeholderTo: "to-purple-800/30",
      },
      {
        id: "rootbound-04",
        alt: "Profile portrait of a woman with eyes closed, softly lit",
        src: "/light/projects/rootbound/04.jpg",
        orientation: "vertical",
        placeholderFrom: "from-purple-300/30",
        placeholderTo: "to-purple-800/30",
      },
      {
        id: "rootbound-05",
        alt: "Close-up portrait, wide-eyed, half in shadow",
        src: "/light/projects/rootbound/05.jpg",
        orientation: "vertical",
        placeholderFrom: "from-purple-300/30",
        placeholderTo: "to-purple-800/30",
      },
      {
        id: "rootbound-06",
        alt: "A woman in a purple saree seen from behind, swirling under palm fronds",
        src: "/light/projects/rootbound/06.jpg",
        orientation: "vertical",
        placeholderFrom: "from-purple-300/30",
        placeholderTo: "to-purple-800/30",
      },
      {
        id: "rootbound-07",
        alt: "Aerial view of a figure lying down, wrapped in blue fabric",
        src: "/light/projects/rootbound/07.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-purple-300/30",
        placeholderTo: "to-purple-800/30",
      },
      {
        id: "rootbound-08",
        alt: "A woman glimpsed through a leaf, smiling softly at the camera",
        src: "/light/projects/rootbound/08.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-purple-300/30",
        placeholderTo: "to-purple-800/30",
      },
      {
        id: "rootbound-09",
        alt: "A woman in a purple saree reaching out to touch a fern frond, under palm trees",
        src: "/light/projects/rootbound/09.jpg",
        orientation: "vertical",
        placeholderFrom: "from-purple-300/30",
        placeholderTo: "to-purple-800/30",
      },
      {
        id: "rootbound-10",
        alt: "Close-up of a shoulder and collarbone with a pearl necklace and saree border",
        src: "/light/projects/rootbound/10.jpg",
        orientation: "vertical",
        placeholderFrom: "from-purple-300/30",
        placeholderTo: "to-purple-800/30",
      },
      {
        id: "rootbound-11",
        alt: "Extreme close-up of an eye peering through fern fronds",
        src: "/light/projects/rootbound/11.jpg",
        orientation: "vertical",
        placeholderFrom: "from-purple-300/30",
        placeholderTo: "to-purple-800/30",
      },
    ],
  },
  {
    slug: "metamorphasis",
    navLabel: "Metamorphosis",
    category: "STORIES",
    title: "Metamorphosis",
    bg: "bg-orange-100",
    bgColor: "#FFEDD5",
    text: "text-black",
    intro: [
      "A figure moves through the frame like a passing presence. Draped in dyed fabric that recalls the form of a butterfly, the body becomes suspended between transformation and memory.",
      "The work draws a connection between movement and becoming. Between the instinctive motion of a dancer and the migration of a creature carrying traces of where it has been. Each gesture holds both repetition and change.",
      "As the body contracts and expands, it moves through older forms of itself while slowly arriving at something new. The images stay with this process. Not as performance, but as evolution in motion.",
      "Metamorphosis looks at transformation as something ongoing, fragile and deeply embodied.",
      "Concept & Styling by Varshika Uchil.",
    ],
    preview: { from: "from-orange-100/60", to: "to-rose-200/60" },
    // Real photos from Reshma/Varshika, REORDERED 2026-09-10 per her
    // explicit sequence and pairing choice (she picked the "arched face +
    // stepping figure" diptych over the "arched face + leg crop" one, and
    // the "portrait + both-legs-raised" diptych over "portrait + fabric
    // above head"). Numbered filenames stay from the earlier matching
    // pass; only the array order/pairing changed. 2 of the 11 candidate
    // photos (Varshika 3 2.jpg, Varshika 5 2.jpg) never appeared in any
    // reference and remain unused leftovers.
    photos: [
      {
        id: "metamorphasis-01",
        alt: "A crouched pose with one knee raised, fabric held to the side",
        src: "/light/projects/metamorphasis/07.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-orange-100/40",
        placeholderTo: "to-rose-200/40",
      },
      {
        id: "metamorphasis-02",
        alt: "Close crop of a bent-over pose with fabric draped over the head",
        src: "/light/projects/metamorphasis/08.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-orange-100/40",
        placeholderTo: "to-rose-200/40",
      },
      {
        id: "metamorphasis-03",
        alt: "A figure arched backward, face obscured by draped green fabric",
        src: "/light/projects/metamorphasis/01.jpg",
        orientation: "vertical",
        placeholderFrom: "from-orange-100/40",
        placeholderTo: "to-rose-200/40",
      },
      {
        id: "metamorphasis-04",
        alt: "A figure stepping forward with fabric draped over the head and back",
        src: "/light/projects/metamorphasis/05.jpg",
        orientation: "vertical",
        placeholderFrom: "from-orange-100/40",
        placeholderTo: "to-rose-200/40",
      },
      {
        id: "metamorphasis-05",
        alt: "Standing portrait in a black bodysuit, short auburn hair, looking aside",
        src: "/light/projects/metamorphasis/04.jpg",
        orientation: "vertical",
        placeholderFrom: "from-orange-100/40",
        placeholderTo: "to-rose-200/40",
      },
      {
        id: "metamorphasis-06",
        alt: "Both legs raised, one bent, one hand gripping draped fabric",
        src: "/light/projects/metamorphasis/09.jpg",
        orientation: "vertical",
        placeholderFrom: "from-orange-100/40",
        placeholderTo: "to-rose-200/40",
      },
      {
        id: "metamorphasis-07",
        alt: "Close crop of a hip and thigh with fabric flowing past a hand",
        src: "/light/projects/metamorphasis/06.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-orange-100/40",
        placeholderTo: "to-rose-200/40",
      },
      {
        id: "metamorphasis-08",
        alt: "A hand holding fabric above the head, torso hidden beneath it",
        src: "/light/projects/metamorphasis/03.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-orange-100/40",
        placeholderTo: "to-rose-200/40",
      },
      {
        id: "metamorphasis-09",
        alt: "Close crop of a raised leg and hand gripping draped fabric",
        src: "/light/projects/metamorphasis/02.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-orange-100/40",
        placeholderTo: "to-rose-200/40",
      },
    ],
  },
  {
    slug: "we-live-in-a-tank",
    navLabel: "We Live In A Tank",
    category: "STORIES",
    title: "We Live In A Tank",
    subheadline: "Phase I",
    intro: [],
    bg: "bg-orange-500",
    bgColor: "#F97316",
    text: "text-white",
    preview: { from: "from-orange-300/40", to: "to-orange-700/40" },
    // Real photos from Reshma's "We live in a tank" folder, added
    // 2026-09-13. She named the files with a leading number, same number
    // = a diptych; single numbers stand alone.
    photos: [
      { id: "tank-01", alt: "Silhouetted figure standing on a rooftop terrace against a dusky orange sky", src: "/light/projects/we-live-in-a-tank/01.jpg", orientation: "horizontal", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-02", alt: "Abstract blurred reflection with glowing pink foliage and a bright flare", src: "/light/projects/we-live-in-a-tank/02.jpg", orientation: "horizontal", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-03", alt: "Close-up portrait with dramatic shadow across the face, warm light", src: "/light/projects/we-live-in-a-tank/03.jpg", orientation: "horizontal", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-04", alt: "Blurred motion close-up in warm orange tones", src: "/light/projects/we-live-in-a-tank/04.jpg", orientation: "vertical", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-05", alt: "Close-up portrait with arms crossed overhead, warm skin tones", src: "/light/projects/we-live-in-a-tank/05.jpg", orientation: "vertical", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-06", alt: "Full-length figure bent forward in a teal ruffled dress on a plant-lined terrace", src: "/light/projects/we-live-in-a-tank/06.jpg", orientation: "vertical", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-07", alt: "Full-length figure in a teal ruffled dress standing among potted plants", src: "/light/projects/we-live-in-a-tank/07.jpg", orientation: "vertical", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-08", alt: "Figure captured mid-motion in silhouette against a deep red wall", src: "/light/projects/we-live-in-a-tank/08.jpg", orientation: "horizontal", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-09", alt: "Figure in a teal ruffled dress, arm raised overhead, against a concrete wall", src: "/light/projects/we-live-in-a-tank/09.jpg", orientation: "horizontal", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-10", alt: "Close-up portrait in red light, hair falling forward", src: "/light/projects/we-live-in-a-tank/10.jpg", orientation: "vertical", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-11", alt: "Close-up of an orange koi fish against a dark background", src: "/light/projects/we-live-in-a-tank/11.jpg", orientation: "vertical", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-12", alt: "Black-and-white portrait, hair flowing, reclined", src: "/light/projects/we-live-in-a-tank/12.jpg", orientation: "vertical", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-13", alt: "Black-and-white split image of bare trees over a figure in a white dress against a wall", src: "/light/projects/we-live-in-a-tank/13.jpg", orientation: "vertical", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-14", alt: "Close-up portrait lit by colorful string lights overhead", src: "/light/projects/we-live-in-a-tank/14.jpg", orientation: "horizontal", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-15", alt: "Abstract close-up of a red fish glimpsed through murky water", src: "/light/projects/we-live-in-a-tank/15.jpg", orientation: "horizontal", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-16", alt: "Red duotone image of silhouetted trees over a dancing figure against a red wall", src: "/light/projects/we-live-in-a-tank/16.jpg", orientation: "horizontal", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
      { id: "tank-17", alt: "Abstract close-up of magenta coral-like foliage against darkness", src: "/light/projects/we-live-in-a-tank/17.jpg", orientation: "horizontal", placeholderFrom: "from-orange-400/30", placeholderTo: "to-orange-700/30" },
    ],
  },
  {
    slug: "vidushi",
    navLabel: "Vidushi",
    category: "STORIES",
    title: "Vidushi",
    intro: [],
    bg: "bg-[#1300A4]",
    bgColor: "#1300A4",
    text: "text-white",
    preview: { from: "from-[#6659C4]/40", to: "to-[#0C006B]/40" },
    // New project added 2026-09-19, placeholder photos until Reshma drops
    // real ones into public/light/projects/vidushi/.
    // Real photos matched against Reshma's reference screenshots
    // (reference/Vidushi/01-06.png) 2026-09-19: 01+02 and 04+05 are the
    // two-up spreads from her old site, 03/06/07/08 were shown as their
    // own full page there, which is also how they land here once the
    // vertical/horizontal pairing rule runs. Vidushi 6.jpg, Extras 7.jpg
    // and Extras 8.jpg weren't shown in any reference, so left out for now.
    photos: [
      {
        id: "vidushi-01",
        alt: "Close-up portrait with a triangular shadow crossing the face, greenery backdrop",
        src: "/light/projects/vidushi/01.jpg",
        orientation: "vertical",
        placeholderFrom: "from-teal-500/30",
        placeholderTo: "to-teal-900/30",
      },
      {
        id: "vidushi-02",
        alt: "Leaping figure in a blue dress, arm raised, hair covering the face, against a stone wall",
        src: "/light/projects/vidushi/02.jpg",
        orientation: "vertical",
        placeholderFrom: "from-teal-500/30",
        placeholderTo: "to-teal-900/30",
      },
      {
        id: "vidushi-03",
        alt: "Close-up smiling portrait lit in warm pink light",
        src: "/light/projects/vidushi/03.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-teal-500/30",
        placeholderTo: "to-teal-900/30",
      },
      {
        id: "vidushi-04",
        alt: "Full-length portrait on coastal rocks, eyes closed and laughing, blue dress, ocean backdrop",
        src: "/light/projects/vidushi/04.jpg",
        orientation: "vertical",
        placeholderFrom: "from-teal-500/30",
        placeholderTo: "to-teal-900/30",
      },
      {
        id: "vidushi-05",
        alt: "Close-up laughing portrait, both hands framing the face",
        src: "/light/projects/vidushi/05.jpg",
        orientation: "vertical",
        placeholderFrom: "from-teal-500/30",
        placeholderTo: "to-teal-900/30",
      },
      {
        id: "vidushi-06",
        alt: "Warm hazy portrait walking outdoors with a bird in the sky, vintage-toned",
        src: "/light/projects/vidushi/06.jpg",
        orientation: "vertical",
        placeholderFrom: "from-teal-500/30",
        placeholderTo: "to-teal-900/30",
      },
      {
        id: "vidushi-07",
        alt: "Arm reaching into a wall of pink bougainvillea flowers",
        src: "/light/projects/vidushi/07.jpg",
        orientation: "horizontal",
        placeholderFrom: "from-teal-500/30",
        placeholderTo: "to-teal-900/30",
      },
      {
        id: "vidushi-08",
        alt: "Figure arching backward with hair in motion, red duotone light",
        src: "/light/projects/vidushi/08.jpg",
        orientation: "vertical",
        placeholderFrom: "from-teal-500/30",
        placeholderTo: "to-teal-900/30",
      },
    ],
  },
];

export const storyCategories: { label: StoryCategory; slugs: string[] }[] = [
  { label: "STORIES", slugs: stories.filter((s) => s.category === "STORIES").map((s) => s.slug) },
  { label: "FASHION", slugs: stories.filter((s) => s.category === "FASHION").map((s) => s.slug) },
];

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}

// The HOME cascade — a curated taste of everything, no captions. Uniformly
// sized cards; the stacking/reveal geometry lives in the Cascade component,
// not here. ~9 images, matching how Reshma laid out the Readymag original.
// Placeholder gradients are fully opaque (no /30, /40 opacity suffix) —
// each stacked image must fully hide the one behind it, not let its
// "Add photo" label bleed through.
export const cascadePhotos: LightPhoto[] = [
  { id: "cs-01", alt: "Cascade photograph 1", src: "/light/home/01.jpg", placeholderFrom: "from-amber-200", placeholderTo: "to-rose-400", linkToProject: { row: "ahilya-fort", photoId: "ahilya-fort-01" } },
  { id: "cs-02", alt: "Cascade photograph 2", src: "/light/home/02.jpg", placeholderFrom: "from-teal-300", placeholderTo: "to-teal-700", linkToProject: { row: "hostel", photoId: "hostel-09" } },
  { id: "cs-03", alt: "Cascade photograph 3", src: "/light/home/03.jpg", placeholderFrom: "from-red-300", placeholderTo: "to-red-700", linkToProject: { row: "ongoing", photoId: "ongoing-03" } },
  { id: "cs-04", alt: "Cascade photograph 4", src: "/light/home/04.jpg", placeholderFrom: "from-neutral-500", placeholderTo: "to-neutral-900", linkToProject: { row: "rootbound", photoId: "rootbound-02" } },
  { id: "cs-05", alt: "Cascade photograph 5", src: "/light/home/05.jpg", placeholderFrom: "from-yellow-200", placeholderTo: "to-yellow-500", linkToProject: { row: "ongoing", photoId: "ongoing-09" } },
  { id: "cs-06", alt: "Cascade photograph 6", src: "/light/home/06.jpg", placeholderFrom: "from-purple-300", placeholderTo: "to-purple-800", linkToProject: { row: "ongoing", photoId: "ongoing-05" } },
  { id: "cs-07", alt: "Cascade photograph 7", src: "/light/home/07.jpg", placeholderFrom: "from-orange-200", placeholderTo: "to-rose-300", linkToProject: { row: "ongoing", photoId: "ongoing-10" } },
  { id: "cs-08", alt: "Cascade photograph 8", src: "/light/home/08.jpg", placeholderFrom: "from-blue-300", placeholderTo: "to-blue-800", linkToProject: { row: "ongoing", photoId: "ongoing-06" } },
  { id: "cs-09", alt: "Cascade photograph 9", src: "/light/home/09.jpg", placeholderFrom: "from-fuchsia-300", placeholderTo: "to-purple-700", linkToProject: { row: "vidushi", photoId: "vidushi-01" } },
];

// The final cascade slot cycles through these instead of showing a single
// static image — Reshma's dedicated "Slideshow" folder, in file order.
export const cascadeSlideshowPhotos: LightPhoto[] = [
  { id: "cs-slide-01", alt: "Home slideshow photograph 1", src: "/light/home/slideshow/1.jpg", placeholderFrom: "from-fuchsia-300", placeholderTo: "to-purple-700", linkToProject: { row: "ongoing-Fashion", photoId: "fashion-30" } },
  { id: "cs-slide-02", alt: "Home slideshow photograph 2", src: "/light/home/slideshow/2.jpg", placeholderFrom: "from-fuchsia-300", placeholderTo: "to-purple-700", linkToProject: { row: "metamorphasis", photoId: "metamorphasis-01" } },
  { id: "cs-slide-03", alt: "Home slideshow photograph 3", src: "/light/home/slideshow/3.jpg", placeholderFrom: "from-fuchsia-300", placeholderTo: "to-purple-700", linkToProject: { row: "ongoing-Fashion", photoId: "fashion-06" } },
  { id: "cs-slide-04", alt: "Home slideshow photograph 4", src: "/light/home/slideshow/4.jpg", placeholderFrom: "from-fuchsia-300", placeholderTo: "to-purple-700", linkToProject: { row: "ongoing-Fashion", photoId: "fashion-03" } },
];

// Reshma's curated "First Selects" set for the Overview photo wall, added
// 2026-10-13 and re-curated/reordered 2026-10-14 (91 -> 82 photos, new
// sequence). Order and selection are hers (originals in
// public/light/overview/First Selects/, left untouched). Real width/height
// captured per photo so the wall can lay out each tile at its true aspect
// ratio without cropping.
export interface OverviewPhoto {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const overviewPhotos: OverviewPhoto[] = [
  { id: "ov-01", src: "/light/overview/01.jpg", alt: "Reshma Mulik photograph, Kolhapur", width: 2048, height: 1536 },
  { id: "ov-02", src: "/light/overview/02.jpg", alt: "Reshma Mulik photograph, Kolhapur", width: 1536, height: 2048 },
  { id: "ov-03", src: "/light/overview/03.jpg", alt: "Reshma Mulik photograph, Kolhapur", width: 2048, height: 1638 },
  { id: "ov-04", src: "/light/overview/04.jpg", alt: "Reshma Mulik photograph, Kolhapur", width: 1536, height: 2048 },
  { id: "ov-05", src: "/light/overview/05.jpg", alt: "Reshma Mulik photograph, Kolhapur", width: 1543, height: 2048 },
  { id: "ov-06", src: "/light/overview/06.jpg", alt: "Reshma Mulik photograph, Kolhapur", width: 1536, height: 2048 },
  { id: "ov-07", src: "/light/overview/07.jpg", alt: "Reshma Mulik photograph, We Live In A Tank - Phase I", width: 1536, height: 2048 },
  { id: "ov-08", src: "/light/overview/08.jpg", alt: "Reshma Mulik photograph, We Live In A Tank - Phase I", width: 1536, height: 2048 },
  { id: "ov-09", src: "/light/overview/09.jpg", alt: "Reshma Mulik photograph, We Live In A Tank - Phase I", width: 2048, height: 1463 },
  { id: "ov-10", src: "/light/overview/10.jpg", alt: "Reshma Mulik photograph, We Live In A Tank - Phase I", width: 2048, height: 1463 },
  { id: "ov-11", src: "/light/overview/11.jpg", alt: "Reshma Mulik photograph, We Live In A Tank - Phase I", width: 1536, height: 2048 },
  { id: "ov-12", src: "/light/overview/12.jpg", alt: "Reshma Mulik photograph, We Live In A Tank - Phase I", width: 2048, height: 1638 },
  { id: "ov-13", src: "/light/overview/13.jpg", alt: "Reshma Mulik photograph, We Live In A Tank - Phase I", width: 1536, height: 2048 },
  { id: "ov-14", src: "/light/overview/14.jpg", alt: "Reshma Mulik photograph, We Live In A Tank - Phase I", width: 1536, height: 2048 },
  { id: "ov-15", src: "/light/overview/15.jpg", alt: "Reshma Mulik photograph, We Live In A Tank - Phase I", width: 1536, height: 2048 },
  { id: "ov-16", src: "/light/overview/16.jpg", alt: "Reshma Mulik photograph, Ahilya Fort", width: 2048, height: 1365 },
  { id: "ov-17", src: "/light/overview/17.jpg", alt: "Reshma Mulik photograph, Ahilya Fort", width: 2048, height: 1365 },
  { id: "ov-18", src: "/light/overview/18.jpg", alt: "Reshma Mulik photograph, Ahilya Fort", width: 1365, height: 2048 },
  { id: "ov-19", src: "/light/overview/19.jpg", alt: "Reshma Mulik photograph, Ahilya Fort", width: 1365, height: 2048 },
  { id: "ov-20", src: "/light/overview/20.jpg", alt: "Reshma Mulik photograph, Ahilya Fort", width: 1365, height: 2048 },
  { id: "ov-21", src: "/light/overview/21.jpg", alt: "Reshma Mulik photograph, Ahilya Fort", width: 1365, height: 2048 },
  { id: "ov-22", src: "/light/overview/22.jpg", alt: "Reshma Mulik photograph, Ahilya Fort", width: 1365, height: 2048 },
  { id: "ov-23", src: "/light/overview/23.jpg", alt: "Reshma Mulik photograph, Ahilya Fort", width: 2048, height: 1365 },
  { id: "ov-24", src: "/light/overview/24.jpg", alt: "Reshma Mulik photograph, Ahilya Fort", width: 1365, height: 2048 },
  { id: "ov-25", src: "/light/overview/25.jpg", alt: "Reshma Mulik photograph, Ahilya Fort", width: 1365, height: 2048 },
  { id: "ov-26", src: "/light/overview/26.jpg", alt: "Reshma Mulik photograph, Limbs", width: 2048, height: 1365 },
  { id: "ov-27", src: "/light/overview/27.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 2048, height: 1365 },
  { id: "ov-28", src: "/light/overview/28.jpg", alt: "Reshma Mulik photograph, Limbs", width: 2048, height: 1365 },
  { id: "ov-29", src: "/light/overview/29.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 2048, height: 1543 },
  { id: "ov-30", src: "/light/overview/30.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 2048, height: 1365 },
  { id: "ov-31", src: "/light/overview/31.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-32", src: "/light/overview/32.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-33", src: "/light/overview/33.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-34", src: "/light/overview/34.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-35", src: "/light/overview/35.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 2048, height: 1365 },
  { id: "ov-36", src: "/light/overview/36.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-37", src: "/light/overview/37.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 2048, height: 1463 },
  { id: "ov-38", src: "/light/overview/38.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-39", src: "/light/overview/39.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-40", src: "/light/overview/40.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-41", src: "/light/overview/41.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-42", src: "/light/overview/42.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-43", src: "/light/overview/43.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-44", src: "/light/overview/44.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 2048, height: 1365 },
  { id: "ov-45", src: "/light/overview/45.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-46", src: "/light/overview/46.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 2048, height: 1365 },
  { id: "ov-47", src: "/light/overview/47.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1365, height: 2048 },
  { id: "ov-48", src: "/light/overview/48.jpg", alt: "Reshma Mulik photograph, Mumbai", width: 1536, height: 2048 },
  { id: "ov-49", src: "/light/overview/49.jpg", alt: "Reshma Mulik photograph, Satara", width: 1365, height: 2048 },
  { id: "ov-50", src: "/light/overview/50.jpg", alt: "Reshma Mulik photograph, Satara", width: 2048, height: 1365 },
  { id: "ov-51", src: "/light/overview/51.jpg", alt: "Reshma Mulik photograph, Satara", width: 1365, height: 2048 },
  { id: "ov-52", src: "/light/overview/52.jpg", alt: "Reshma Mulik photograph, Satara", width: 2048, height: 1365 },
  { id: "ov-53", src: "/light/overview/53.jpg", alt: "Reshma Mulik photograph, Devyani at hostel", width: 1365, height: 2048 },
  { id: "ov-54", src: "/light/overview/54.jpg", alt: "Reshma Mulik photograph, Rootbound", width: 2048, height: 1365 },
  { id: "ov-55", src: "/light/overview/55.jpg", alt: "Reshma Mulik photograph, Rootbound", width: 1365, height: 2048 },
  { id: "ov-56", src: "/light/overview/56.jpg", alt: "Reshma Mulik photograph, Amrita", width: 1365, height: 2048 },
  { id: "ov-57", src: "/light/overview/57.jpg", alt: "Reshma Mulik photograph, Hostel", width: 1543, height: 2048 },
  { id: "ov-58", src: "/light/overview/58.jpg", alt: "Reshma Mulik photograph, Hostel", width: 2048, height: 1365 },
  { id: "ov-59", src: "/light/overview/59.jpg", alt: "Reshma Mulik photograph, Hostel", width: 1543, height: 2048 },
  { id: "ov-60", src: "/light/overview/60.jpg", alt: "Reshma Mulik photograph, Hostel", width: 2048, height: 1463 },
  { id: "ov-61", src: "/light/overview/61.jpg", alt: "Reshma Mulik photograph, Hostel", width: 1638, height: 2048 },
  { id: "ov-62", src: "/light/overview/62.jpg", alt: "Reshma Mulik photograph, Fashion", width: 1365, height: 2048 },
  { id: "ov-63", src: "/light/overview/63.jpg", alt: "Reshma Mulik photograph, Fashion", width: 1365, height: 2048 },
  { id: "ov-64", src: "/light/overview/64.jpg", alt: "Reshma Mulik photograph, Fashion", width: 1365, height: 2048 },
  { id: "ov-65", src: "/light/overview/65.jpg", alt: "Reshma Mulik photograph, Fashion", width: 2048, height: 1365 },
  { id: "ov-66", src: "/light/overview/66.jpg", alt: "Reshma Mulik photograph, Fashion", width: 1365, height: 2048 },
  { id: "ov-67", src: "/light/overview/67.jpg", alt: "Reshma Mulik photograph, Jaya Ahsan", width: 2048, height: 1365 },
  { id: "ov-68", src: "/light/overview/68.jpg", alt: "Reshma Mulik photograph, Prax", width: 1365, height: 2048 },
  { id: "ov-69", src: "/light/overview/69.jpg", alt: "Reshma Mulik photograph, Metamorphosis", width: 1365, height: 2048 },
  { id: "ov-70", src: "/light/overview/70.jpg", alt: "Reshma Mulik photograph, Metamorphosis", width: 1365, height: 2048 },
  { id: "ov-71", src: "/light/overview/71.jpg", alt: "Reshma Mulik photograph, Metamorphosis", width: 1365, height: 2048 },
  { id: "ov-72", src: "/light/overview/72.jpg", alt: "Reshma Mulik photograph, Shoplune", width: 1365, height: 2048 },
  { id: "ov-73", src: "/light/overview/73.jpg", alt: "Reshma Mulik photograph, Shoplune", width: 1365, height: 2048 },
  { id: "ov-74", src: "/light/overview/74.jpg", alt: "Reshma Mulik photograph, Shoplune", width: 1365, height: 2048 },
  { id: "ov-75", src: "/light/overview/75.jpg", alt: "Reshma Mulik photograph, Shoplune", width: 1365, height: 2048 },
  { id: "ov-76", src: "/light/overview/76.jpg", alt: "Reshma Mulik photograph, Shoplune", width: 1365, height: 2048 },
  { id: "ov-77", src: "/light/overview/77.jpg", alt: "Reshma Mulik photograph, Shoplune", width: 1365, height: 2048 },
  { id: "ov-78", src: "/light/overview/78.jpg", alt: "Reshma Mulik photograph, Shoplune", width: 1365, height: 2048 },
  { id: "ov-79", src: "/light/overview/79.jpg", alt: "Reshma Mulik photograph, Shoplune", width: 1365, height: 2048 },
  { id: "ov-80", src: "/light/overview/80.jpg", alt: "Reshma Mulik photograph, Vidushi", width: 1365, height: 2048 },
  { id: "ov-81", src: "/light/overview/81.jpg", alt: "Reshma Mulik photograph, Vidushi", width: 1365, height: 2048 },
  { id: "ov-82", src: "/light/overview/82.jpg", alt: "Reshma Mulik photograph, Vidushi", width: 1365, height: 2048 },
];

export const about = {
  bg: "bg-[#f5f5dc]",
  text: "text-black" as const,
  portrait: {
    src: "/light/about/01.jpg" as string | undefined,
    alt: "Close-up portrait of Reshma Mulik, dramatic side lighting across the face",
  },
  // Final typed bio copy supplied by Reshma, 2026-10-13.
  paragraphs: [
    "Drawn to the colours, textures, and rhythms of everyday life, Reshma\u2019s practice explores the search for self, the nuances of human experience, and the ways memory shapes our perception of the world.",
    "Reshma is a documentary photographer based in Mumbai, India. Having grown up in the Western Ghats of Maharashtra, her surroundings have shaped the way she observes and engages with the world. Her practice continues to expand through cross disciplinary collaborations, creating work that feels raw and immersive.",
  ],
  // Added to the About page per Reshma's request, 2026-10-06.
  email: "contact.reshmamulik@gmail.com",
};

// NOTE ON COPY: Ahilya Fort ("Staying with the Narmada"), Senses x Lune,
// Hostel, Rootbound and Metamorphosis all now have their real essay text.
// The ABOUT bio was already real. Ongoing, Fashion and We Live In A Tank
// are still on placeholder copy — ask Reshma for real text before
// publishing, rather than inventing narrative copy on her behalf.
