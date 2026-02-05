"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { iconLibrary } from "@/resources/icons";
import {
  routes,
  display,
  person,
  about,
  blog,
  work,
  gallery,
} from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timeZone,
  locale = "en-GB",
}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

// NavButton component
interface NavButtonProps {
  href: string;
  icon: string;
  label?: string;
  selected?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
  href,
  icon,
  label,
  selected,
}) => {
  const IconComponent = iconLibrary[icon];

  return (
    <Link
      href={href}
      aria-label={label || href}
      aria-current={selected ? "page" : undefined}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900",
        selected
          ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm"
          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white",
      )}
    >
      {IconComponent && (
        <IconComponent className="w-5 h-5" aria-hidden="true" />
      )}
      {label && <span>{label}</span>}
    </Link>
  );
};

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      <header className="fixed top-4 left-0 right-0 w-full flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <nav
            className="flex items-center gap-1 p-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-700/80 rounded-full shadow-lg shadow-zinc-200/30 dark:shadow-black/30"
            suppressHydrationWarning
            aria-label="Main navigation"
          >
            {routes["/"] && (
              <NavButton
                href="/"
                icon="home"
                label="Home"
                selected={pathname === "/"}
              />
            )}

            <div
              className="w-px h-6 bg-zinc-200 dark:bg-zinc-700"
              aria-hidden="true"
            />

            {routes["/about"] && (
              <>
                <div className="hidden sm:block">
                  <NavButton
                    href="/about"
                    icon="person"
                    label={about.label}
                    selected={pathname === "/about"}
                  />
                </div>
                <div className="sm:hidden">
                  <NavButton
                    href="/about"
                    icon="person"
                    selected={pathname === "/about"}
                  />
                </div>
              </>
            )}

            {routes["/work"] && (
              <>
                <div className="hidden sm:block">
                  <NavButton
                    href="/work"
                    icon="grid"
                    label={work.label}
                    selected={pathname.startsWith("/work")}
                  />
                </div>
                <div className="sm:hidden">
                  <NavButton
                    href="/work"
                    icon="grid"
                    selected={pathname.startsWith("/work")}
                  />
                </div>
              </>
            )}

            {routes["/blog"] && (
              <>
                <div className="hidden sm:block">
                  <NavButton
                    href="/blog"
                    icon="book"
                    label={blog.label}
                    selected={pathname.startsWith("/blog")}
                  />
                </div>
                <div className="sm:hidden">
                  <NavButton
                    href="/blog"
                    icon="book"
                    selected={pathname.startsWith("/blog")}
                  />
                </div>
              </>
            )}

            {routes["/gallery"] && (
              <>
                <div className="hidden sm:block">
                  <NavButton
                    href="/gallery"
                    icon="gallery"
                    label={gallery.label}
                    selected={pathname.startsWith("/gallery")}
                  />
                </div>
                <div className="sm:hidden">
                  <NavButton
                    href="/gallery"
                    icon="gallery"
                    selected={pathname.startsWith("/gallery")}
                  />
                </div>
              </>
            )}

            {display.themeSwitcher && (
              <>
                <div className="w-px h-6 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                <ThemeToggle />
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};
