"use client";

import React, { type ElementType } from "react";
import { iconLibrary } from "@/resources/icons";
import { cn } from "@/lib/utils";

interface HeadingLinkProps {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const HeadingLink: React.FC<HeadingLinkProps> = ({
  id,
  level,
  children,
  style,
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyURL = (id: string): void => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        console.error("Failed to copy link");
      },
    );
  };

  const sizeMap = {
    1: "text-3xl font-bold",
    2: "text-2xl font-bold",
    3: "text-xl font-semibold",
    4: "text-lg font-semibold",
    5: "text-base font-semibold",
    6: "text-sm font-semibold",
  } as const;

  const HeadingTag: ElementType = `h${level}`;
  const LinkIcon = iconLibrary["openLink"];

  return (
    <div
      style={style}
      onClick={() => copyURL(id)}
      className="group flex items-center gap-2 cursor-pointer"
    >
      <HeadingTag
        id={id}
        className={cn(
          sizeMap[level],
          "text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",
        )}
      >
        {children}
      </HeadingTag>
      <button
        className={cn(
          "p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity",
          copied
            ? "text-green-600 dark:text-green-400"
            : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300",
        )}
        title={copied ? "Copied!" : "Copy link"}
      >
        {LinkIcon && <LinkIcon className="w-4 h-4" />}
      </button>
    </div>
  );
};
