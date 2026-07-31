"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blogs";
import { Clock, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

const byDateDesc = (a: (typeof blogPosts)[number], b: (typeof blogPosts)[number]) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const recentBlogs = [...blogPosts].sort(byDateDesc).slice(0, 4);

function BlogCard({ post, i }: { post: (typeof recentBlogs)[number]; i: number }) {
  return (
    <Reveal key={`${post.slug}-${i}`} delay={(i % recentBlogs.length) * 70} className="w-[calc(100vw-2.5rem)] shrink-0 snap-center sm:w-[calc(100vw-4rem)] lg:w-auto lg:shrink">
      <Link
        href={`/blogs/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.06)] transition-[transform,box-shadow] duration-300 lg:hover:-translate-y-1 lg:hover:shadow-[0_8px_28px_0_rgba(0,0,0,0.12)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image}
            alt={post.alt}
            title={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out lg:group-hover:scale-110"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-brand">
            {post.category}
          </span>
          <h3 className="mb-3 flex-1 text-sm font-bold leading-snug text-text transition-colors lg:group-hover:text-brand sm:text-base">
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
  );
}

export default function Blogs() {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  const len = recentBlogs.length;

  const realToClone = (realIndex: number) => realIndex + 1;

  useEffect(() => {
    setMounted(true);
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const w = card.offsetWidth + 20;
    el.scrollTo({ left: w, behavior: "instant" as ScrollBehavior });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const cardW = card.offsetWidth + 20;

    const onScroll = () => {
      if (!el) return;
      const sw = el.scrollWidth;
      const sl = el.scrollLeft;
      const cw = el.clientWidth;

      if (sl <= 0) {
        const target = sw - 2 * cardW - cw;
        el.scrollTo({ left: target, behavior: "instant" as ScrollBehavior });
        activeIndexRef.current = len - 1;
        return;
      }
      if (sl + cw >= sw - 1) {
        el.scrollTo({ left: cardW, behavior: "instant" as ScrollBehavior });
        activeIndexRef.current = 0;
        return;
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [mounted, len]);

  const scrollToIndex = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const cardW = card.offsetWidth + 20;
    activeIndexRef.current = i;
    el.scrollTo({ left: realToClone(i) * cardW, behavior: "smooth" });
  }, []);

  const scroll = useCallback((dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const currentReal = activeIndexRef.current;
    const nextReal = (currentReal + dir + len) % len;
    const cardW = card.offsetWidth + 20;

    let targetPos: number;
    if (dir > 0 && currentReal === len - 1) {
      targetPos = (len + 1) * cardW;
    } else if (dir < 0 && currentReal === 0) {
      targetPos = 0;
    } else {
      targetPos = realToClone(nextReal) * cardW;
    }

    activeIndexRef.current = nextReal;
    el.scrollTo({ left: targetPos, behavior: "smooth" });
  }, [len]);


  const carouselCards = mounted
    ? [recentBlogs[len - 1], ...recentBlogs, recentBlogs[0]]
    : recentBlogs;

  return (
    <section id="blogs" className="scroll-mt-24 bg-bg-2 py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
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

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden"
        >
          {carouselCards.map((post, i) => (
            <BlogCard key={`${post.slug}-${i}`} post={post} i={i} />
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-4 gap-5">
          {recentBlogs.map((post, i) => (
            <BlogCard key={post.slug} post={post} i={i} />
          ))}
        </div>

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
