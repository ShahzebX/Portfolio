"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { iconLibrary } from "@/resources/icons";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  subtitle?: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

// Simple Carousel component
const Carousel: React.FC<{ images: string[]; title: string }> = ({
  images,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
      <Image
        src={images[currentIndex]}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 960px) 100vw, 960px"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
            aria-label="Previous image"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
            aria-label="Next image"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75",
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  subtitle,
  content,
  description,
  avatars,
  link,
}) => {
  const ArrowRightIcon = iconLibrary["arrowRight"];
  const ExternalLinkIcon = iconLibrary["arrowUpRightFromSquare"];

  return (
    <div className="w-full flex flex-col gap-4">
      <Carousel images={images} title={title} />

      <div className="flex flex-col sm:flex-row w-full px-3 pt-3 pb-6 gap-6">
        {/* Title & Subtitle */}
        {(title || subtitle?.trim()) && (
          <div className="flex-[5] flex flex-col gap-1">
            {title && (
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white text-balance">
                {title}
              </h2>
            )}
            {subtitle?.trim() && (
              <p
                className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap overflow-hidden text-ellipsis"
                title={subtitle}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Description & Links */}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <div className="flex-[7] flex flex-col gap-4">
            {/* Avatar group */}
            {avatars?.length > 0 && (
              <div className="flex -space-x-2">
                {avatars.slice(0, 4).map((avatar, index) => (
                  <Image
                    key={index}
                    src={avatar.src}
                    alt="Team member"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white dark:border-zinc-900"
                  />
                ))}
                {avatars.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-xs font-medium">
                    +{avatars.length - 4}
                  </div>
                )}
              </div>
            )}

            {description?.trim() && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400 text-balance">
                {description}
              </p>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-6">
              {content?.trim() && (
                <Link
                  href={href}
                  className="flex items-center gap-2 text-sm text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  Read case study
                  {ArrowRightIcon && (
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </Link>
              )}
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  View project
                  {ExternalLinkIcon && (
                    <ExternalLinkIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
