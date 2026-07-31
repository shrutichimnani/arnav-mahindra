"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogFilters, featuredPost, latestPosts, type BlogCategory } from "@/lib/blogs";
import { Clock, Calendar } from "./icons";

const PAGE_SIZE = 6;

export default function BlogsExplorer() {
  const [category, setCategory] = useState<"All" | BlogCategory>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filterBarRef = useRef<HTMLDivElement>(null);

  const filtered =
    category === "All" ? latestPosts : latestPosts.filter((p) => p.category === category);
  const visiblePosts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const selectCategory = (next: "All" | BlogCategory) => {
    setCategory(next);
    setVisibleCount(PAGE_SIZE);
    // Switching back to "All" should land on the featured story, not scroll
    // the page. For any other filter, bring the results into view while
    // keeping the filter bar itself on screen (scroll-mt-* on the bar
    // accounts for the fixed navbar so it doesn't end up hidden behind it).
    if (next !== "All") {
      requestAnimationFrame(() => {
        filterBarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  return (
    <>
      {/* FILTER BAR */}
      <div ref={filterBarRef} className="scroll-mt-[76px] flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {blogFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => selectCategory(filter)}
            aria-pressed={category === filter}
            className={`shrink-0 rounded-full border px-5 py-2 text-xs font-semibold transition-colors ${
              category === filter
                ? "border-brand bg-brand text-white"
                : "border-border bg-white text-muted hover:border-brand hover:text-brand"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* FEATURED STORY — only shown for the unfiltered "All" view */}
      {category === "All" && (
        <Link
          href={`/blogs/${featuredPost.slug}`}
          className="mt-8 lg:mt-12 group relative block w-full overflow-hidden rounded-2xl bg-black"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={featuredPost.image}
              alt={featuredPost.alt}
              title={featuredPost.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/50" />
          </div>

          <div className="relative z-10 flex h-full min-h-[400px] md:min-h-[480px] flex-col justify-end p-6 md:w-3/5 md:p-12 lg:p-16">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-wider text-brand">
              Featured Story
            </span>
            <h2 className="mb-4 font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {featuredPost.title}
            </h2>
            <p className="mb-8 text-sm md:text-base leading-relaxed text-white/80 max-w-lg">
              {featuredPost.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <span className="rounded-md bg-brand px-6 py-3 text-sm font-bold text-white shadow-md transition-colors group-hover:bg-brand-light">
                Read More
              </span>
              <div className="flex items-center gap-4 text-xs font-medium text-white/70">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featuredPost.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {featuredPost.date}
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* LATEST ARTICLES */}
      <section className={category === "All" ? "mt-16 lg:mt-20" : "mt-6 lg:mt-8"}>
        <div className="flex items-end justify-between mb-8 border-b border-border pb-4">
          <h3 className="font-display text-2xl font-bold text-text">
            {category === "All" ? "Latest Articles" : `${category} Articles`}
          </h3>
          <span className="text-sm font-medium text-muted">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted">
            No articles in this category yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visiblePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-2">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    title={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-brand">
                    {post.category}
                  </span>
                  <h4 className="mb-4 font-display text-lg font-bold leading-snug text-text group-hover:text-brand transition-colors">
                    {post.title}
                  </h4>
                  <div className="mt-auto flex items-center justify-between text-xs font-medium text-muted border-t border-border pt-4">
                    <span>{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center border-t border-border pt-12">
            <button
              type="button"
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="rounded-md border-2 border-brand/20 text-brand px-8 py-3 text-sm font-bold transition-colors hover:bg-brand hover:text-white"
            >
              Load More Articles
            </button>
          </div>
        )}
      </section>
    </>
  );
}
