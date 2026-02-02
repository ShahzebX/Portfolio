"use client";

import { home, person } from "@/resources";
import { iconLibrary } from "@/resources/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);

  const contactLink = useMemo(() => `mailto:${person.email}`, []);

  const ArrowRightIcon = iconLibrary["arrowRight"];

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = textRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      aria-label="Introduction"
      className="w-full flex flex-col items-center gap-8"
    >
      {home.featured.display && (
        <div className="w-full flex justify-center">
          <Link
            href={home.featured.href || "/work"}
            aria-label="Open featured work"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-lg">
              <span className="font-semibold">FYP</span>
              <span className="h-5 w-px bg-brand-500/50" />
              <span className="text-brand-600 dark:text-brand-400">
                Featured work
              </span>
            </div>
          </Link>
        </div>
      )}

      <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
        <div className="w-full md:w-60 flex justify-center md:justify-start">
          <div className="relative">
            <Image
              src="/images/avatar.png"
              alt={`Professional headshot of ${person.name}`}
              width={240}
              height={240}
              priority
              className="rounded-2xl shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800 bg-zinc-100 dark:bg-zinc-900"
            />
          </div>
        </div>

        <div
          ref={textRef}
          className={
            "w-full flex-1 text-center md:text-left transition-all duration-700 ease-out " +
            (isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3")
          }
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white text-balance">
            {person.name}
          </h1>
          <p className="mt-3 text-xl text-zinc-700 dark:text-zinc-300 text-balance">
            {person.role}
          </p>
          <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-400 text-balance">
            Full-Stack + AI engineering to ship production-ready, end-to-end
            AI-powered web applications.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
            <Link
              href="/work"
              aria-label="View projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
            >
              <span>View Projects</span>
              {ArrowRightIcon && <ArrowRightIcon className="w-4 h-4" />}
            </Link>

            <Link
              href={contactLink}
              aria-label="Contact via email"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-transparent text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
            >
              <span>Contact</span>
              {ArrowRightIcon && <ArrowRightIcon className="w-4 h-4" />}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
