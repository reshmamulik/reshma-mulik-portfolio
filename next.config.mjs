/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Trimmed from Next's default 8-bucket list (640-3840px) down to the
    // widths this site actually renders at, so Vercel's on-demand image
    // optimizer has fewer distinct size variants to ever cold-transcode
    // for the first visitor to hit a given breakpoint (Reshma, 2026-10-28:
    // "images are loading slower need this fixed its important" — this
    // doesn't speed up any single transcode, but cuts how often one has
    // to happen at all). Covers common phone/tablet/laptop/desktop widths;
    // largest kept at 1920 since no image on this site is ever rendered
    // wider than the viewport itself.
    deviceSizes: [375, 640, 828, 1080, 1280, 1536, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },
  async redirects() {
    return [
      {
        source: "/photography",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
