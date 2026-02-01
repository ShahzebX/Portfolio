import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
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
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  const GlobeIcon = iconLibrary["globe"];
  const CalendarIcon = iconLibrary["calendar"];
  const ChevronRightIcon = iconLibrary["arrowRight"];

  return (
    <div className="max-w-4xl mx-auto px-4">
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

      {/* Table of Contents - desktop sidebar */}
      {about.tableOfContent.display && (
        <div className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 pl-6">
          <TableOfContents structure={structure} about={about} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center">
        {/* Avatar Sidebar */}
        {about.avatar.display && (
          <div className="flex flex-col items-center sm:sticky sm:top-16 sm:self-start min-w-[160px] px-6 pb-10 gap-4">
            <Image
              src={person.avatar}
              alt={person.name}
              width={120}
              height={120}
              className="rounded-full"
            />
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              {GlobeIcon && <GlobeIcon className="w-4 h-4 text-blue-500" />}
              {person.location}
            </div>
            {person.languages && person.languages.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {person.languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-700 dark:text-zinc-300"
                  >
                    {language}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 max-w-2xl">
          {/* Intro Section */}
          <div
            id={about.intro.title}
            className="w-full min-h-[160px] flex flex-col justify-center mb-8"
          >
            {/* Calendar CTA */}
            {about.calendar.display && (
              <div className="flex items-center w-fit border border-blue-500/30 bg-blue-500/10 rounded-full p-1 gap-2 mb-6 backdrop-blur-sm">
                {CalendarIcon && (
                  <CalendarIcon className="w-4 h-4 ml-3 text-blue-400" />
                )}
                <span className="px-2 text-sm">Schedule a call</span>
                <Link
                  href={about.calendar.link}
                  className="p-2 bg-zinc-200 dark:bg-zinc-700 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                >
                  {ChevronRightIcon && <ChevronRightIcon className="w-4 h-4" />}
                </Link>
              </div>
            )}

            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
              {person.name}
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400">
              {person.role}
            </p>

            {/* Social Links */}
            {social.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-5 pb-2">
                {social
                  .filter((item) => item.essential)
                  .map((item) => {
                    if (!item.link) return null;
                    const IconComponent = item.icon
                      ? iconLibrary[item.icon]
                      : null;
                    return (
                      <React.Fragment key={item.name}>
                        {/* Desktop: Button with label */}
                        <Link
                          href={item.link}
                          className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                        >
                          {IconComponent && (
                            <IconComponent className="w-4 h-4" />
                          )}
                          {item.name}
                        </Link>
                        {/* Mobile: Icon only */}
                        <Link
                          href={item.link}
                          className="sm:hidden p-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                        >
                          {IconComponent && (
                            <IconComponent className="w-5 h-5" />
                          )}
                        </Link>
                      </React.Fragment>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Intro Description */}
          {about.intro.display && (
            <div className="text-lg text-zinc-700 dark:text-zinc-300 space-y-4 mb-10">
              {about.intro.description}
            </div>
          )}

          {/* Work Experience */}
          {about.work.display && (
            <>
              <h2
                id={about.work.title}
                className="text-2xl font-bold text-zinc-900 dark:text-white mb-4"
              >
                {about.work.title}
              </h2>
              <div className="flex flex-col gap-8 mb-10">
                {about.work.experiences.map((experience, index) => (
                  <div
                    key={`${experience.company}-${experience.role}-${index}`}
                    className="w-full"
                  >
                    <div className="flex justify-between items-end mb-1">
                      <h3
                        id={experience.company}
                        className="text-lg font-semibold text-zinc-900 dark:text-white"
                      >
                        {experience.company}
                      </h3>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {experience.timeframe}
                      </span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                      {experience.role}
                    </p>
                    <ul className="space-y-4">
                      {experience.achievements.map(
                        (achievement: React.ReactNode, achIndex: number) => (
                          <li
                            key={`${experience.company}-${achIndex}`}
                            className="text-zinc-700 dark:text-zinc-300"
                          >
                            {achievement}
                          </li>
                        ),
                      )}
                    </ul>
                    {experience.images && experience.images.length > 0 && (
                      <div className="flex flex-wrap gap-3 pt-4 pl-10">
                        {experience.images.map((image, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden"
                            style={{ width: image.width, height: image.height }}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              width={image.width}
                              height={image.height}
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Studies */}
          {about.studies.display && (
            <>
              <h2
                id={about.studies.title}
                className="text-2xl font-bold text-zinc-900 dark:text-white mb-4"
              >
                {about.studies.title}
              </h2>
              <div className="flex flex-col gap-6 mb-10">
                {about.studies.institutions.map((institution, index) => (
                  <div key={`${institution.name}-${index}`} className="w-full">
                    <h3
                      id={institution.name}
                      className="text-lg font-semibold text-zinc-900 dark:text-white"
                    >
                      {institution.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {institution.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Technical Skills */}
          {about.technical.display && (
            <>
              <h2
                id={about.technical.title}
                className="text-2xl font-bold text-zinc-900 dark:text-white mb-10"
              >
                {about.technical.title}
              </h2>
              <div className="flex flex-col gap-8">
                {about.technical.skills.map((skill, index) => (
                  <div key={`${skill.title}-${index}`} className="w-full">
                    <h3
                      id={skill.title}
                      className="text-lg font-semibold text-zinc-900 dark:text-white"
                    >
                      {skill.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                      {skill.description}
                    </p>
                    {skill.tags && skill.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {skill.tags.map((tag, tagIndex) => {
                          const TagIcon = tag.icon
                            ? iconLibrary[tag.icon]
                            : null;
                          return (
                            <span
                              key={`${skill.title}-${tagIndex}`}
                              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300"
                            >
                              {TagIcon && <TagIcon className="w-4 h-4" />}
                              {tag.name}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    {skill.images && skill.images.length > 0 && (
                      <div className="flex flex-wrap gap-3 pt-4">
                        {skill.images.map((image, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden"
                            style={{ width: image.width, height: image.height }}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              width={image.width}
                              height={image.height}
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
