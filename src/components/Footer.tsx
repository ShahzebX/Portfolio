import Link from "next/link";
import { person, social } from "@/resources";
import { iconLibrary } from "@/resources/icons";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-2 py-2 flex justify-center">
      <div className="max-w-4xl w-full px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center sm:text-left">
          <span className="text-zinc-400 dark:text-zinc-500">
            © {currentYear} /
          </span>
          <span className="px-1 text-zinc-700 dark:text-zinc-300">
            {person.name} · Built with Next.js · Deployed on Vercel
          </span>
        </p>

        <div className="flex items-center gap-4">
          {social.map((item) => {
            if (!item.link) return null;
            const IconComponent = iconLibrary[item.icon];
            return (
              <Link
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title={item.name}
              >
                {IconComponent && <IconComponent className="w-5 h-5" />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Spacer for mobile nav */}
      <div className="sm:hidden h-20" />
    </footer>
  );
};
