"use client";

import React, { useEffect, useState } from "react";
import { iconLibrary } from "@/resources/icons";
import { cn } from "@/lib/utils";

export const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
    const theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setCurrentTheme(theme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = currentTheme === "light" ? "dark" : "light";

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", nextTheme);
    setCurrentTheme(nextTheme);
  };

  const iconName = currentTheme === "dark" ? "light" : "dark";
  // Use sun/moon icons - we'll use the calendar icon as fallback since we don't have sun/moon
  const SunIcon = iconLibrary["globe"]; // placeholder - shows in dark mode to switch to light
  const MoonIcon = iconLibrary["eye"]; // placeholder - shows in light mode to switch to dark

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg" aria-label="Toggle theme">
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex items-center justify-center p-2 rounded-lg transition-colors",
        "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
      )}
      aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
    >
      {currentTheme === "dark" ? (
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
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
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
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};
