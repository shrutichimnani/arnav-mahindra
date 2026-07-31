"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "./icons";

export default function BackLink() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mb-6 inline-flex w-fit cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-xs font-semibold text-muted transition-colors hover:text-text"
    >
      {/* An SVG icon (not the Unicode ← glyph) — the character's vertical
          metrics vary by font/fallback and can visually sit above the
          text's baseline even when the two are geometrically centered in
          the same flex row. An icon has a fixed, predictable box. */}
      <ArrowLeft className="h-3.5 w-3.5" />
      <span>Back</span>
    </button>
  );
}
