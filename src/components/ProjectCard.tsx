"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { iconLibrary } from "@/resources/icons";

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
  layout?: "grid" | "list";
  technologies?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority = false,
  images,
  title,
  subtitle,
  description,
  layout = "grid",
  technologies = [],
}) => {
  const coverImage = images && images.length > 0 ? images[0] : null;
  const ArrowRightIcon = iconLibrary["arrowRight"];

  return (
    <Link
      href={href}
      className="group block w-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-zinc-950 rounded-2xl transition-all"
    >
      <article
        className={cn(
          "flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-200 dark:hover:border-brand-900 hover:-translate-y-1 transition-all duration-300",
        )}
      >
        {/* Image container with enhanced hover effect */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 overflow-hidden shrink-0">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={`${title} preview`}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400">
              <span className="text-sm font-medium">No Preview Available</span>
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-zinc-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Subtitle badge on image */}
          {subtitle && (
            <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-full">
              <p className="text-xs font-bold text-brand-700 dark:text-brand-400 uppercase tracking-wider">
                {subtitle}
              </p>
            </div>
          )}
        </div>

        {/* Content section with improved spacing and hierarchy */}
        <div className="flex flex-col gap-4 p-6 flex-1">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
              {title}
            </h3>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Technology tags */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 rounded-md"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 4 && (
                <span className="px-2.5 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-500">
                  +{technologies.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* View project CTA with enhanced animation */}
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            <span>View Project</span>
            {ArrowRightIcon && (
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};
