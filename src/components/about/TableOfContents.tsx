"use client";

import React from "react";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  structure,
  about,
}) => {
  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!about.tableOfContent.display) return null;

  return (
    <nav className="hidden lg:flex flex-col gap-8 whitespace-nowrap">
      {structure
        .filter((section) => section.display)
        .map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-3">
            <button
              className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left"
              onClick={() => scrollTo(section.title, 80)}
            >
              <span className="w-4 h-px bg-zinc-400 dark:bg-zinc-600" />
              <span>{section.title}</span>
            </button>
            {about.tableOfContent.subItems && (
              <div className="hidden xl:flex flex-col gap-2">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="flex items-center gap-3 pl-6 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer text-left"
                    onClick={() => scrollTo(item, 80)}
                  >
                    <span className="w-2 h-px bg-zinc-400 dark:bg-zinc-600" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
    </nav>
  );
};

export default TableOfContents;
