import type { Metadata } from "next";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: work.title,
    description: work.description,
    openGraph: {
      title: work.title,
      description: work.description,
      url: `${baseURL}${work.path}`,
      siteName: person.name,
      images: [`/api/og/generate?title=${encodeURIComponent(work.title)}`],
      type: "website",
    },
  };
}

export default function Work() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-12">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: work.title,
            description: work.description,
            url: `${baseURL}${work.path}`,
            author: {
              "@type": "Person",
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            },
          }),
        }}
      />

      {/* Header Section */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
          {work.label}
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          A collection of projects demonstrating full-stack engineering,
          computer vision research, and production ML deployment
        </p>
      </header>

      {/* Projects Grid */}
      <Projects layout="list" />
    </div>
  );
}
