"use client";

import { useRef } from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/blogs";
import { Clock, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

// Parse "15 Jul 2026" style dates so posts sort newest-first by actual date
// rather than their position in the data file.
const byDateDesc = (a: (typeof blogPosts)[number], b: (typeof blogPosts)[number]) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const recentBlogs = [...blogPosts].sort(byDateDesc).slice(0, 4);

export default function Blogs() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const w = card.offsetWidth + 20; // card width + gap
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section id="blogs" className="scroll-mt-24 bg-bg-2 py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
            Latest from our Blog
          </h2>
          <Link
            href="/blogs"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
          >
            View All Blogs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        {/* Horizontal scroll on mobile/tablet, 4-col grid on desktop — same format as reviews */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
        >
          {recentBlogs.map((post, i) => (
            <Reveal key={post.slug} delay={i * 70} className="w-[85vw] shrink-0 snap-start sm:w-[360px] lg:w-auto lg:shrink">
              <Link
                href={`/blogs/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,0,0,0.12)]"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.alt}
                    title={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-brand">
                    {post.category}
                  </span>
                  <h3 className="mb-3 flex-1 text-sm font-bold leading-snug text-text transition-colors group-hover:text-brand sm:text-base">
                    {post.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-3 border-t border-border pt-3 text-[11px] font-medium text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Arrows — only on mobile/tablet where the track scrolls */}
        <div className="mt-4 flex justify-center gap-2 lg:hidden">
          <button
            aria-label="Previous blog"
            onClick={() => scroll(-1)}
            className="grid h-10 w-10 place-items-center rounded border border-border bg-white text-text transition-colors hover:bg-bg-2 hover:text-brand"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next blog"
            onClick={() => scroll(1)}
            className="grid h-10 w-10 place-items-center rounded border border-border bg-white text-text transition-colors hover:bg-bg-2 hover:text-brand"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
