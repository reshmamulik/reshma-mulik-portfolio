"use client";

import { useEffect } from "react";

// Landing on a specific project's URL (e.g. /projects/ongoing) still jumps
// straight to that project's section on the shared all-projects page,
// rather than always starting at the top.
export default function ScrollToSlug({ slug }: { slug: string }) {
  useEffect(() => {
    document.getElementById(slug)?.scrollIntoView({ block: "start" });
  }, [slug]);

  return null;
}
