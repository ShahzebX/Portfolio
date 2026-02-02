import { home, routes } from "@/resources";
import { Hero, Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
};

export default function Home() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-12 py-8">
      <Hero />

      <div className="flex flex-col gap-4 px-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white whitespace-nowrap">
            Selected Projects
          </h2>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          A few end-to-end builds where I trained models, shipped APIs, and
          delivered product UX.
        </p>
      </div>

      <div>
        <Projects range={[1, 1]} />
      </div>

      {routes["/blog"] && (
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex pr-16">
            <div className="w-12 max-w-[48px] h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="flex flex-col sm:flex-row gap-6 mt-10">
            <div className="flex-1 pl-4 pt-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white text-balance">
                Latest from the blog
              </h2>
            </div>
            <div className="flex-[3] px-5">
              <Posts range={[1, 2]} columns="2" />
            </div>
          </div>
          <div className="flex pl-16 justify-end">
            <div className="w-12 max-w-[48px] h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      )}

      <Projects range={[2]} />
      <Mailchimp />
    </div>
  );
}
