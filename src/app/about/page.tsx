import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { baseURL, about, person, social } from "@/resources";
import { iconLibrary } from "@/resources/icons";
import { cn } from "@/lib/utils";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: about.title,
    description: about.description,
    openGraph: {
      title: about.title,
      description: about.description,
      url: `${baseURL}${about.path}`,
      siteName: person.name,
      images: [`/api/og/generate?title=${encodeURIComponent(about.title)}`],
      type: "profile",
    },
  };
}

export default function About() {
  const GlobeIcon = iconLibrary["globe"];

  return (
    <div className="w-full">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            name: about.title,
            description: about.description,
            url: `${baseURL}${about.path}`,
            mainEntity: {
              "@type": "Person",
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            },
          }),
        }}
      />

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 xl:gap-20">
          {/* Sidebar */}
          <aside className="flex flex-col justify-center gap-4 lg:sticky lg:top-8 h-fit">
            {/* Avatar */}
            <div className="relative w-32 h-32 lg:w-56 lg:h-56 mx-auto">
              <Image
                src={person.avatar}
                alt={`${person.name} - ${person.role}`}
                fill
                priority
                className="w-full h-full rounded-full object-cover object-top ring-2 ring-zinc-100 dark:ring-zinc-800"
              />
            </div>

            {/* Location */}
            <div className="flex items-center justify-center gap-1 text-zinc-600 dark:text-zinc-400">
              {GlobeIcon && <GlobeIcon className="w-4 h-4" />}
              <span className="text-sm font-medium">{person.location}</span>
            </div>

            {/* Languages */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {person.languages?.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 pointer-events-none"
                >
                  {lang}
                </span>
              ))}
            </div>

            {/* Navigation & Details */}
            <div className="flex flex-col gap-6">
              {/* Navigation Links */}
              <nav className="hidden lg:block">
                <ul className="flex flex-col gap-3">
                  {[
                    { label: "Introduction", href: "#introduction" },
                    { label: "Work Experience", href: "#work-experience" },
                    { label: "Education", href: "#education" },
                    { label: "Technical Skills", href: "#technical-skills" },
                  ].map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                      >
                        <span className="w-8 h-px bg-zinc-200 dark:bg-zinc-800 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-600 transition-colors" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex flex-col gap-16 lg:gap-24">
            {/* Header */}
            <header className="flex flex-col gap-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {person.name}
              </h1>
              <h2 className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
                {person.role}
              </h2>
              {/* Socials */}
              <div className="flex flex-wrap gap-2">
                {social
                  .filter((item) => item.essential)
                  .map((item) => {
                    const IconComponent = item.icon
                      ? iconLibrary[item.icon]
                      : null;
                    if (!item.link) return null;
                    return (
                      <Link
                        key={item.name}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm text-zinc-700 dark:text-zinc-300 font-medium"
                      >
                        {IconComponent && <IconComponent className="w-4 h-4" />}
                        {item.name}
                      </Link>
                    );
                  })}
              </div>
            </header>

            {/* Introduction */}
            {about.intro.display && (
              <section
                id="introduction"
                className="scroll-mt-24 flex flex-col gap-8"
              >
                <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
                <div className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-4">
                  {about.intro.description}
                </div>
              </section>
            )}

            {/* Work Experience */}
            {about.work.display && (
              <section
                id="work-experience"
                className="scroll-mt-24 flex flex-col gap-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    Work Experience
                  </h3>
                </div>
                <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 space-y-12">
                  {about.work.experiences.map((experience, index) => (
                    <article key={index} className="relative pl-8 sm:pl-12">
                      <div
                        className="absolute -left-1.25 top-2 w-2.5 h-2.5 rounded-full bg-brand-500 dark:bg-brand-400 ring-4 ring-white dark:ring-zinc-950"
                        aria-hidden="true"
                      />

                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                        <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                          {experience.company}
                        </h4>
                        <time className="text-xs font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-widest">
                          {experience.timeframe}
                        </time>
                      </div>

                      <div className="text-brand-600 dark:text-brand-400 font-medium text-sm mb-4">
                        {experience.role}
                      </div>

                      <ul className="list-disc leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-2 pl-4 marker:text-zinc-300 dark:marker:text-zinc-600">
                        {experience.achievements.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>

                      {experience.images && experience.images.length > 0 && (
                        <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                          {experience.images.map((img, i) => (
                            <div
                              key={i}
                              className="relative shrink-0 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800"
                            >
                              <Image
                                src={img.src}
                                alt={img.alt || "Work image"}
                                width={img.width || 200}
                                height={img.height || 120}
                                className="w-auto h-24 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {about.studies.display && (
              <section
                id="education"
                className="scroll-mt-24 flex flex-col gap-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    Education
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {about.studies.institutions.map((institution, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50"
                    >
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-100">
                        {institution.name}
                      </h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                        {institution.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technical Skills */}
            {about.technical.display && (
              <section
                id="technical-skills"
                className="scroll-mt-24 flex flex-col gap-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    Technical Skills
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {about.technical.skills.map((skill, index) => (
                    <div key={index} className="flex flex-col gap-3">
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                        {skill.title}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.tags?.map((tag, tagIndex) => {
                          const TagIcon = tag.icon
                            ? iconLibrary[tag.icon]
                            : null;
                          return (
                            <div
                              key={tagIndex}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700/50"
                            >
                              {TagIcon && <TagIcon className="w-3.5 h-3.5" />}
                              {tag.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
