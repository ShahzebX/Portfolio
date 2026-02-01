import { home, about, person, baseURL, routes, social } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import Link from "next/link";
import type { Metadata } from "next";
import { iconLibrary } from "@/resources/icons";

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
};

function Hero() {
  const githubLink =
    social.find((item) => item.name === "GitHub")?.link ??
    "https://github.com/ShahzebX";

  const PytorchIcon = iconLibrary["pytorch"];
  const EyeIcon = iconLibrary["eye"];
  const FlaskIcon = iconLibrary["flask"];
  const ReactIcon = iconLibrary["react"];
  const NodeIcon = iconLibrary["node"];
  const VercelIcon = iconLibrary["vercel"];
  const GithubIcon = iconLibrary["github"];
  const ArrowRightIcon = iconLibrary["arrowRight"];

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="max-w-lg flex flex-col items-center text-center">
        {home.featured.display && (
          <div className="w-full flex justify-center pt-4 pb-8">
            <Link href={home.featured.href || "/work"}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                <span className="font-semibold">FYP</span>
                <span className="h-5 w-px bg-brand-500/50" />
                <span className="text-brand-600 dark:text-brand-400">
                  Featured work
                </span>
              </div>
            </Link>
          </div>
        )}

        <div className="w-full flex justify-center pb-4">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white text-center text-balance">
            Full-Stack & Computer Vision Engineer
          </h1>
        </div>

        <div className="w-full flex justify-center pb-8">
          <p className="text-xl text-zinc-600 dark:text-zinc-400 text-center text-balance">
            I train computer vision models
            <br />
            and ship them as production-ready web applications.
          </p>
        </div>

        <div className="flex justify-center pt-3">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              <span>View Projects</span>
              {ArrowRightIcon && <ArrowRightIcon className="w-4 h-4" />}
            </Link>
            <Link
              href={githubLink}
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              title="Models · inference APIs · frontend"
            >
              {GithubIcon && <GithubIcon className="w-4 h-4" />}
              <span>GitHub</span>
              {ArrowRightIcon && <ArrowRightIcon className="w-4 h-4" />}
            </Link>
            <Link
              href="/resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-transparent text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <span>Download Resume</span>
              {ArrowRightIcon && <ArrowRightIcon className="w-4 h-4" />}
            </Link>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <div className="flex flex-wrap gap-6 justify-center mt-6">
            <div
              title="PyTorch"
              className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {PytorchIcon && <PytorchIcon className="w-6 h-6" />}
            </div>
            <div
              title="Computer Vision"
              className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {EyeIcon && <EyeIcon className="w-6 h-6" />}
            </div>
            <div
              title="Flask"
              className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {FlaskIcon && <FlaskIcon className="w-6 h-6" />}
            </div>
            <div
              title="React"
              className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {ReactIcon && <ReactIcon className="w-6 h-6" />}
            </div>
            <div
              title="Node.js"
              className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {NodeIcon && <NodeIcon className="w-6 h-6" />}
            </div>
            <div
              title="Vercel"
              className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {VercelIcon && <VercelIcon className="w-6 h-6" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
