import type { Metadata } from "next";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `${baseURL}${blog.path}`,
      siteName: person.name,
      images: [`/api/og/generate?title=${encodeURIComponent(blog.title)}`],
      type: "website",
    },
  };
}

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-6">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: blog.title,
            description: blog.description,
            url: `${baseURL}${blog.path}`,
            author: {
              "@type": "Person",
              name: person.name,
              url: `${baseURL}/blog`,
              image: `${baseURL}${person.avatar}`,
            },
          }),
        }}
      />

      <h1 className="text-3xl font-bold mb-8 ml-6 text-zinc-900 dark:text-white">
        {blog.title}
      </h1>

      <div className="w-full flex flex-col gap-10">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        <Mailchimp />
        <h2 className="text-2xl font-bold ml-6 text-zinc-900 dark:text-white">
          Earlier posts
        </h2>
        <Posts range={[4]} columns="2" />
      </div>
    </div>
  );
}
