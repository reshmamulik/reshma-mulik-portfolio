"use client";

import { useRouter } from "next/navigation";

// Goes back in browser history instead of navigating to "/overview" fresh
// — a fresh navigation always lands at the top of the grid, but Reshma
// wants it to return to wherever she'd scrolled to when she clicked the
// photo (2026-10-13). router.back() lets the browser restore that exact
// scroll position, the same way pressing the browser's own back button
// would. Prev/Next on the photo itself use `replace` (see page.tsx) so
// browsing through several photos doesn't stack extra history entries
// between here and the grid — one "back" always lands on the grid.
export default function ViewThumbnailsLink({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.back()} className={className}>
      View Thumbnails
    </button>
  );
}
