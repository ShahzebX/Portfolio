import Link from "next/link";
import { person, social } from "@/resources";
import { iconLibrary } from "@/resources/icons";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center sm:text-left">
            <span className="text-zinc-400 dark:text-zinc-500">
              © {currentYear}
            </span>
            <span className="mx-2 text-zinc-300 dark:text-zinc-700">·</span>
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">
              {person.name}
            </span>
            <span className="hidden sm:inline">
              <span className="mx-2 text-zinc-300 dark:text-zinc-700">·</span>
              <span className="text-zinc-500 dark:text-zinc-500">
                Built with Next.js · Deployed on Vercel
              </span>
            </span>
          </p>

          <div className="flex items-center gap-2">
            {social.map((item) => {
              if (!item.link) return null;
              const IconComponent = iconLibrary[item.icon];
              return (
                <Link
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${item.name}`}
                  className="p-2.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950"
                >
                  {IconComponent && (
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile view tech stack */}
        <p className="sm:hidden text-center text-xs text-zinc-500 dark:text-zinc-500 mt-4">
          Built with Next.js · Deployed on Vercel
        </p>
      </div>

      {/* Spacer for mobile nav */}
      <div className="sm:hidden h-20" aria-hidden="true" />
    </footer>
  );
};
