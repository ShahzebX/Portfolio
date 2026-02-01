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
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
        selected
          ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white"
          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
      )}
    >
      {IconComponent && <IconComponent className="w-5 h-5" />}
      {label && <span>{label}</span>}
    </Link>
  );
};

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      {/* Top fade for desktop */}
      <div className="hidden sm:block fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-white dark:from-zinc-950 to-transparent z-[9] pointer-events-none" />

      {/* Bottom fade for mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent z-[9] pointer-events-none" />

      <header className="sticky top-0 sm:top-0 sm:fixed sm:bottom-auto fixed bottom-0 w-full p-2 flex justify-center z-[9]">
        {/* Left - Location (desktop only) */}
        <div className="hidden sm:flex flex-1 items-center pl-3 text-sm text-zinc-600 dark:text-zinc-400">
          {display.location && person.location}
        </div>

        {/* Center - Navigation */}
        <div className="flex justify-center">
          <nav
            className="flex items-center gap-1 p-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-lg"
            suppressHydrationWarning
          >
            {routes["/"] && (
              <NavButton href="/" icon="home" selected={pathname === "/"} />
            )}

            <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />

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
                <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />
                <ThemeToggle />
              </>
            )}
          </nav>
        </div>

        {/* Right - Time (desktop only) */}
        <div className="hidden sm:flex flex-1 items-center justify-end pr-3 text-sm text-zinc-600 dark:text-zinc-400">
          {display.time && <TimeDisplay timeZone={person.location} />}
        </div>
      </header>
    </>
  );
};
