"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";
import { cn } from "@/lib/utils";

interface PostProps {
  post: any;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group w-full flex p-1 rounded-xl transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
        direction === "column" ? "flex-col" : "flex-col sm:flex-row gap-6",
      )}
    >
      {post.metadata.image && thumbnail && (
        <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
          <Image
            src={post.metadata.image}
            alt={"Thumbnail of " + post.metadata.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>
      )}

      <div className="flex w-full">
        <div className="max-w-lg py-6 px-6 flex flex-col gap-5 justify-center">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <Image
                src={person.avatar}
                alt={person.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {person.name}
              </span>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {formatDate(post.metadata.publishedAt, false)}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white text-balance">
            {post.metadata.title}
          </h3>

          {post.metadata.tag && (
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              {post.metadata.tag}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
