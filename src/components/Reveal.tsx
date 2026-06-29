"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals children with a fade-up once they scroll into view.
 * `index` adds a stagger delay. Respects prefers-reduced-motion (shows
 * immediately). Content is always in the DOM, so SEO/no-JS is unaffected.
 */
export function Reveal({
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-shown={shown}
      style={{ ["--reveal-delay" as string]: `${(index % 8) * 70}ms` }}
    >
      {children}
    </div>
  );
}
