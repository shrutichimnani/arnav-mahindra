"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blogs";
import { Search } from "./icons";

export default function BlogsSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q),
    );
  }, [query]);

  const showDropdown = open && query.trim().length > 0;

  useEffect(() => setMounted(true), []);

  // A pending blur callback retains this component after a route change.
  // Clear it when the search unmounts so it cannot update stale state.
  useEffect(() => {
    return () => {
      if (blurTimeout.current) clearTimeout(blurTimeout.current);
    };
  }, []);

  // The hero section clips overflow for its background image, so an
  // absolutely positioned dropdown inside it gets cut off. Portal the
  // dropdown to <body> instead and track the input's own position with
  // fixed coordinates, so it renders above everything and follows the
  // input on scroll/resize.
  useEffect(() => {
    if (!showDropdown) return;
    const updateRect = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRect({ top: r.bottom, left: r.left, width: r.width });
    };
    updateRect();
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [showDropdown]);

  // A plain onBlur would close the dropdown before a click on a result
  // link registers, since blur fires first. Delaying the close lets the
  // click go through; a click or focus back on the input cancels it.
  const scheduleClose = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    blurTimeout.current = setTimeout(() => {
      setOpen(false);
      blurTimeout.current = null;
    }, 150);
  };
  const cancelClose = () => {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
      blurTimeout.current = null;
    }
  };

  return (
    <div ref={wrapperRef} className="relative max-w-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={scheduleClose}
        placeholder="Search for articles, topics or models..."
        className="w-full rounded-full bg-white/95 py-3.5 pl-5 pr-12 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand shadow-lg"
      />
      <button
        type="button"
        aria-label="Search"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-brand hover:bg-bg-2 transition-colors"
      >
        <Search className="h-5 w-5" />
      </button>

      {mounted &&
        showDropdown &&
        rect &&
        createPortal(
          <div
            onMouseDown={cancelClose}
            style={{ position: "fixed", top: rect.top + 8, left: rect.left, width: rect.width }}
            className="z-[100] max-h-80 overflow-y-auto rounded-2xl border border-border bg-white shadow-xl"
          >
            {results.length === 0 ? (
              <p className="px-5 py-4 text-sm text-muted">
                No articles found for &ldquo;{query}&rdquo;.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {results.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-bg-2"
                    >
                      <Image
                        src={post.image}
                        alt={post.alt}
                        title={post.title}
                        width={64}
                        height={48}
                        className="h-12 w-16 shrink-0 rounded-lg object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-brand">
                          {post.category}
                        </span>
                        <span className="block truncate text-sm font-semibold text-text">
                          {post.title}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
