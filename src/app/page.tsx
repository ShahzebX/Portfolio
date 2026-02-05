import { home, routes } from "@/resources";
import { Hero, ContactForm } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
};

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-20 pb-16">
      <Hero />

      {/* Projects Section */}
      <section
        aria-labelledby="projects-heading"
        className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2
              id="projects-heading"
              className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white"
            >
              Selected Projects
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              End-to-end applications spanning computer vision, full-stack
              development, and ML deployment
            </p>
          </div>
          <div
            className="hidden lg:block h-px flex-1 bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800 dark:to-transparent ml-8"
            aria-hidden="true"
          />
        </div>

        <Projects range={[1, 4]} />

        <div className="flex justify-center mt-4">
          <a
            href="/work"
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            View All Projects
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Blog Section */}
      {routes["/blog"] && (
        <section
          aria-labelledby="blog-heading"
          className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2
                id="blog-heading"
                className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white"
              >
                Latest Writing
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400">
                Technical insights and lessons learned from building AI-powered
                systems
              </p>
            </div>
            <div
              className="hidden lg:block h-px flex-1 bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800 dark:to-transparent ml-8"
              aria-hidden="true"
            />
          </div>
          <Posts range={[1, 2]} columns="2" />
        </section>
      )}

      <div
        id="contact"
        className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full scroll-mt-24"
      >
        <ContactForm />
      </div>
    </div>
  );
}
