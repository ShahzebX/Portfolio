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
    <div className="max-w-4xl mx-auto px-4 pt-6">
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

      <h1 className="text-3xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
        {work.label}
      </h1>

      <Projects />
    </div>
  );
}
