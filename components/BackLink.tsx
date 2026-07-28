"use client";

import { useRouter } from "next/navigation";

export default function BackLink() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mb-6 inline-flex w-fit cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-xs font-semibold text-muted transition-colors hover:text-text"
    >
      &larr; Back
    </button>
  );
}
