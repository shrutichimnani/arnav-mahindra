"use client";

import { useEffect } from "react";
import { readUtmFromParams, mergeAndStoreUtm } from "@/lib/utm";

/* ============================================================
   Invisible backend-only UTM capture.

   Renders nothing. On every page load it reads the standard UTM
   query params from the current URL and merges them into the
   persisted UTM object in localStorage (lib/utm.ts handles the
   "don't overwrite earlier values with blanks" rule). Captured
   params then travel with the visitor across the whole site and
   are attached to every form submission in lib/sheets.ts.

   Mounted once in the root layout, so it runs on every route.
   ============================================================ */
export default function UtmCapture() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const incoming = readUtmFromParams(new URLSearchParams(window.location.search));
    // No-op write when there's nothing new — mergeAndStoreUtm still
    // preserves whatever is already stored.
    mergeAndStoreUtm(incoming);
  }, []);

  return null;
}
