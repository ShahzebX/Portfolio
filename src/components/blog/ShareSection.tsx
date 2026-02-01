"use client";

import { useState } from "react";
import Link from "next/link";
import { iconLibrary } from "@/resources/icons";
import { socialSharing } from "@/resources";
import { cn } from "@/lib/utils";

interface ShareSectionProps {
  title: string;
  url: string;
}

interface SocialPlatform {
  name: string;
  icon: string;
  label: string;
  generateUrl: (title: string, url: string) => string;
}

const socialPlatforms: Record<string, SocialPlatform> = {
  x: {
    name: "x",
    icon: "twitter",
    label: "X",
    generateUrl: (title, url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  linkedin: {
    name: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    generateUrl: (title, url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  facebook: {
    name: "facebook",
    icon: "facebook",
    label: "Facebook",
    generateUrl: (title, url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  pinterest: {
    name: "pinterest",
    icon: "pinterest",
    label: "Pinterest",
    generateUrl: (title, url) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
  },
  whatsapp: {
    name: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    generateUrl: (title, url) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  reddit: {
    name: "reddit",
    icon: "reddit",
    label: "Reddit",
    generateUrl: (title, url) =>
      `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  telegram: {
    name: "telegram",
    icon: "telegram",
    label: "Telegram",
    generateUrl: (title, url) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  email: {
    name: "email",
    icon: "email",
    label: "Email",
    generateUrl: (title, url) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this post: ${url}`)}`,
  },
};

export function ShareSection({ title, url }: ShareSectionProps) {
  const [copied, setCopied] = useState(false);

  // Don't render if sharing is disabled
  if (!socialSharing.display) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Get enabled platforms
  const enabledPlatforms = Object.entries(socialSharing.platforms)
    .filter(([key, enabled]) => enabled && key !== "copyLink")
    .map(([platformKey]) => ({
      key: platformKey,
      ...socialPlatforms[platformKey],
    }))
    .filter((platform) => platform.name);

  const LinkIcon = iconLibrary["openLink"];

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-4 mt-8 mb-4">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        Share this post:
      </span>
      <div className="flex flex-wrap items-center gap-4">
        {enabledPlatforms.map((platform, index) => {
          const IconComponent = iconLibrary[platform.icon];
          return (
            <Link
              key={index}
              href={platform.generateUrl(title, url)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              title={platform.label}
            >
              {IconComponent && <IconComponent className="w-5 h-5" />}
            </Link>
          );
        })}

        {socialSharing.platforms.copyLink && (
          <button
            onClick={handleCopy}
            className={cn(
              "p-2 rounded-lg transition-colors",
              copied
                ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700",
            )}
            title={copied ? "Copied!" : "Copy link"}
          >
            {LinkIcon && <LinkIcon className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
}
