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
  const DocumentIcon = iconLibrary["document"];

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
      className="w-full pt-4 pb-6 md:pt-6 md:pb-8 lg:pt-8 lg:pb-10"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6 lg:gap-8 xl:gap-12 items-start lg:items-stretch">
          {/* Left Column: Content */}
          <div
            ref={textRef}
            className="flex flex-col justify-center gap-6 lg:gap-8 order-2 lg:order-1"
          >
            {/* Featured Pill */}
            {home.featured.display && (
              <div
                className={
                  "transition-all duration-700 delay-100 " +
                  (isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4")
                }
              >
                <Link
                  href={home.featured.href || "/work"}
                  aria-label="Open featured work"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 ring-1 ring-zinc-200 dark:ring-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                  </span>
                  <span className="font-semibold">Featured Work</span>
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  <span className="text-zinc-600 dark:text-zinc-400 truncate max-w-[200px] sm:max-w-xs">
                    Solar Panel Segmentation
                  </span>
                  {ArrowRightIcon && (
                    <ArrowRightIcon className="w-4 h-4 text-zinc-400" />
                  )}
                </Link>
              </div>
            )}

            {/* Headline */}
            <h1
              className={
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05] transition-all duration-700 delay-200 " +
                (isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4")
              }
            >
              {home.headline}
            </h1>

            {/* Subline */}
            <div
              className={
                "transition-all duration-700 delay-300 " +
                (isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4")
              }
            >
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                {home.subline}
              </p>
            </div>

            {/* Buttons */}
            <div
              className={
                "flex flex-wrap items-center gap-3 pt-1 transition-all duration-700 delay-400 " +
                (isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4")
              }
            >
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 px-5 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium text-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-sm"
              >
                View Projects
                {ArrowRightIcon && (
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </Link>

              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-full font-medium text-sm ring-1 ring-zinc-200 dark:ring-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                {DocumentIcon && <DocumentIcon className="w-4 h-4" />}
                Download Resume
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2 text-zinc-700 dark:text-zinc-300 rounded-full font-medium text-sm ring-1 ring-zinc-200 dark:ring-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* Right Column: Profile Image */}
          <div
            className={
              "relative order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-700 " +
              (isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8")
            }
          >
            <div className="relative flex justify-center lg:justify-end w-full">
              <Image
                src="/images/avatar.png"
                alt={`${person.name} - ${person.role}`}
                width={550}
                height={550}
                priority
                className="rounded-3xl shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 bg-zinc-50 dark:bg-zinc-900 w-full max-w-s lg:max-w-90 h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
