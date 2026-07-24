/* ============================================================
   UTM parameter tracking — invisible, backend-only.

   Marketing campaigns link to the site with standard UTM query
   params (utm_source, utm_medium, utm_campaign, utm_term,
   utm_content, utm_id). We capture them once on the landing page,
   persist them to localStorage so they survive navigation across
   the whole site, and merge them into every form submission sent
   to the Google Sheet backend (see lib/sheets.ts).

   No UI, no visible fields — purely additive to the lead payload.
   ============================================================ */

import type { ReadonlyURLSearchParams } from "next/navigation";

export const UTM_STORAGE_KEY = "utmParams";

export const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
] as const;

export type UtmField = (typeof UTM_FIELDS)[number];

export type UtmParams = Partial<Record<UtmField, string>>;

/* Parse a set of search params into a UtmParams object, keeping only
   the fields that are actually present and non-empty in the URL. */
export function readUtmFromParams(
  params: URLSearchParams | ReadonlyURLSearchParams,
): UtmParams {
  const out: UtmParams = {};
  for (const field of UTM_FIELDS) {
    const value = params.get(field);
    if (value) out[field] = value;
  }
  return out;
}

/* Read the stored object from localStorage. Returns {} if anything
   is missing/unavailable/unparseable so callers always get a usable
   object. */
export function readStoredUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const out: UtmParams = {};
    for (const field of UTM_FIELDS) {
      const v = (parsed as Record<string, unknown>)[field];
      if (typeof v === "string" && v) out[field] = v;
    }
    return out;
  } catch {
    return {};
  }
}

/* Merge incoming URL UTM params into whatever is already stored.

   Only values that are actually present in the new URL are written —
   a page visit with no UTM params in the URL never blanks values
   captured from an earlier landing page, and within a single merge a
   new non-empty value replaces the old one while fields absent from
   the URL are left untouched. */
export function mergeAndStoreUtm(incoming: UtmParams): UtmParams {
  const merged = { ...readStoredUtm(), ...incoming };
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));
    }
  } catch {
    // localStorage may be unavailable (private mode, etc.) — fail
    // silently; the params just won't persist across navigations.
  }
  return merged;
}

/* The 6 flat keys (always strings, never "undefined") ready to spread
   into a form payload. Missing params become "" so the Google Sheet
   columns are stable for every submission. */
export function getUtmPayloadFields(): Record<UtmField, string> {
  const stored = readStoredUtm();
  return {
    utm_source: stored.utm_source ?? "",
    utm_medium: stored.utm_medium ?? "",
    utm_campaign: stored.utm_campaign ?? "",
    utm_term: stored.utm_term ?? "",
    utm_content: stored.utm_content ?? "",
    utm_id: stored.utm_id ?? "",
  };
}
