import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Projects } from "@/components/work/Projects";
import { ProjectProofBlock } from "@/components/work/ProjectProofBlock";
import { ImageSlider } from "@/components/work/ImageSlider";
import { social } from "@/resources";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${baseURL}${work.path}/${post.slug}`,
      siteName: person.name,
      images: [
        post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
      ],
      type: "article",
    },
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find(
    (post) => post.slug === slugPath,
  );

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  const githubFallback = social.find((item) => item.name === "GitHub")?.link;
  const githubRepoUrl = post.metadata.github || "";
  const githubProfileUrl = githubFallback;
  const demoUrl = post.metadata.demo || post.metadata.link;

  return (
    <section className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-8">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.metadata.title,
            description: post.metadata.summary,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            url: `${baseURL}${work.path}/${post.slug}`,
            image:
              post.metadata.image ||
              `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            },
          }),
        }}
      />

      {/* Header */}
      <div className="max-w-lg flex flex-col gap-4 items-center text-center">
        <Link
          href="/work"
          className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
        >
          Projects
        </Link>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </span>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          {post.metadata.title}
        </h1>
      </div>

      {/* Team */}
      <div className="flex items-center gap-4 mb-8">
        {post.metadata.team && avatars.length > 0 && (
          <div className="flex -space-x-2">
            {avatars.slice(0, 4).map((avatar, index) => (
              <Image
                key={index}
                src={avatar.src}
                alt="Team member"
                width={28}
                height={28}
                className="rounded-full border-2 border-white dark:border-zinc-900"
              />
            ))}
          </div>
        )}
        <span className="text-sm text-blue-600 dark:text-blue-400">
          {post.metadata.team?.map((member, idx) => (
            <span key={idx}>
              {idx > 0 && <span className="text-zinc-400">, </span>}
              <Link href={member.linkedIn} className="hover:underline">
                {member.name}
              </Link>
            </span>
          ))}
        </span>
      </div>

      {/* Proof Block */}
      <ProjectProofBlock
        githubRepoUrl={githubRepoUrl}
        githubProfileUrl={githubProfileUrl}
        demoUrl={demoUrl}
        responsibilities={post.metadata.responsibilities}
        engineeringNotes={post.metadata.engineeringNotes}
      />

      {/* Hero Image / Slider */}
      <div className="w-full">
        <ImageSlider
          images={post.metadata.images}
          title={post.metadata.title}
        />
      </div>

      {/* Article Content */}
      <article className="prose prose-zinc dark:prose-invert max-w-xl mx-auto">
        <CustomMDX source={post.content} />
      </article>

      {/* Related Projects */}
      <div className="w-full flex flex-col gap-10 items-center mt-10">
        <hr className="w-40 border-zinc-200 dark:border-zinc-700" />
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Related projects
        </h2>
        <Projects exclude={[post.slug]} range={[2]} />
      </div>

      <ScrollToHash />
    </section>
  );
}
