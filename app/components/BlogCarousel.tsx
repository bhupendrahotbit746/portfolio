"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BlogPost } from "@/lib/blog-types";
import { readingTimeFromContent } from "@/lib/blog-types";
import { formatDate } from "@/lib/format-date";

const VISIBLE = 3;
const AUTO_SLIDE_MS = 2000;

export default function BlogCarousel({ posts }: { posts: BlogPost[] }) {
  const count = posts.length;
  const canSlide = count > VISIBLE;

  // Loop illusion: duplicate a run of VISIBLE cards before and after the
  // real list, so the track can slide either direction and always land on
  // a duplicated card that looks identical to the real one it snaps back to.
  const slides = canSlide
    ? [...posts.slice(-VISIBLE), ...posts, ...posts.slice(0, VISIBLE)]
    : posts;
  const offset = canSlide ? VISIBLE : 0;

  // index is in "real post space": 0..count-1 during normal browsing,
  // and briefly -1 or count when animating past an edge before we snap back.
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoSlide = useCallback(() => {
    if (!canSlide) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setWithTransition(true);
      setIndex((i) => i + 1);
    }, AUTO_SLIDE_MS);
  }, [canSlide]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoSlide]);

  function goNext() {
    setWithTransition(true);
    setIndex((i) => i + 1);
    startAutoSlide();
  }

  function goPrev() {
    setWithTransition(true);
    setIndex((i) => i - 1);
    startAutoSlide();
  }

  // After sliding past the real range (into a duplicated run), snap back
  // into 0..count-1 with no transition so the loop looks seamless.
  function handleTransitionEnd() {
    if (index >= count) {
      setWithTransition(false);
      setIndex(0);
    } else if (index < 0) {
      setWithTransition(false);
      setIndex(count - 1);
    }
  }

  const slidePosition = index + offset;

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          onTransitionEnd={handleTransitionEnd}
          className="flex gap-4"
          style={{
            transform: `translateX(calc(-${slidePosition} * (100% / ${VISIBLE}) - ${slidePosition} * (1rem / ${VISIBLE})))`,
            transition: withTransition ? "transform 500ms ease-out" : "none",
          }}
        >
          {slides.map((post, i) => {
            const realIndex = ((i - offset) % count + count) % count;
            return (
            <Link
              key={`${post.id}-${i}`}
              href={`/blog/${post.slug}`}
              className="group relative block w-[calc((100%-2rem)/3)] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg shadow-black/20 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-dim/30 focus-visible:-translate-y-1 focus-visible:outline-none max-sm:w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-surface-2">
                {post.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.coverImage}
                    alt=""
                    className="h-full w-full object-cover opacity-85 transition-opacity duration-200 ease-out group-hover:opacity-100"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-mono text-xs tracking-widest text-muted">
                      {post.category.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="px-5 py-5">
                <span className="font-mono text-xs tracking-widest text-muted">
                  B&middot;{String(realIndex + 1).padStart(2, "0")} &middot;{" "}
                  {post.category.toUpperCase()}
                </span>

                <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-foreground transition-colors duration-200 ease-out group-hover:text-violet-bright">
                  {post.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/75">
                  {post.description}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-muted">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-mono text-[11px] tracking-widest">
                    {formatDate(post.createdAt)} &middot; {readingTimeFromContent(post.content).toUpperCase()}
                  </span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>

      {canSlide && (
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            aria-label="Previous posts"
            onClick={goPrev}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-violet hover:text-violet-bright focus-visible:border-violet focus-visible:text-violet-bright focus-visible:outline-none"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next posts"
            onClick={goNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-violet hover:text-violet-bright focus-visible:border-violet focus-visible:text-violet-bright focus-visible:outline-none"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
