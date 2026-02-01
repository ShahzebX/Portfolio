import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { baseURL, about, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import React from "react";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
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

  const posts = getPosts(["src", "app", "blog", "posts"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${baseURL}${blog.path}/${post.slug}`,
      siteName: person.name,
      images: [
        post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
      ],
      type: "article",
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "blog", "posts"]).find(
    (post) => post.slug === slugPath,
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full flex">
      {/* Spacer for sidebar */}
      <div className="hidden lg:block w-48" />

      {/* Main content */}
      <div className="flex-1 flex justify-center">
        <section className="max-w-4xl w-full px-4 pt-6 flex flex-col items-center gap-8">
          {/* JSON-LD Schema */}
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.metadata.title,
                description: post.metadata.summary,
                datePublished: post.metadata.publishedAt,
                dateModified: post.metadata.publishedAt,
                url: `${baseURL}${blog.path}/${post.slug}`,
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
              href="/blog"
              className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              Blog
            </Link>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
              {post.metadata.publishedAt &&
                formatDate(post.metadata.publishedAt)}
            </span>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              {post.metadata.title}
            </h1>
            {post.metadata.subtitle && (
              <p className="text-lg text-zinc-500 dark:text-zinc-400 italic">
                {post.metadata.subtitle}
              </p>
            )}
          </div>

          {/* Author */}
          <div className="flex items-center gap-4 mb-8">
            <Image
              src={person.avatar}
              alt={person.name}
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="text-sm text-blue-600 dark:text-blue-400">
              {person.name}
            </span>
          </div>

          {/* Hero Image */}
          {post.metadata.image && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 mt-3 mb-2">
              <Image
                src={post.metadata.image}
                alt={post.metadata.title}
                fill
                priority
                sizes="(min-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <article className="prose prose-zinc dark:prose-invert max-w-xl w-full">
            <CustomMDX source={post.content} />
          </article>

          {/* Share Section */}
          <ShareSection
            title={post.metadata.title}
            url={`${baseURL}${blog.path}/${post.slug}`}
          />

          {/* Related Posts */}
          <div className="w-full flex flex-col gap-10 items-center mt-10">
            <hr className="w-40 border-zinc-200 dark:border-zinc-700" />
            <h2
              id="recent-posts"
              className="text-2xl font-bold text-zinc-900 dark:text-white mb-6"
            >
              Recent posts
            </h2>
            <Posts
              exclude={[post.slug]}
              range={[1, 2]}
              columns="2"
              thumbnail
              direction="column"
            />
          </div>

          <ScrollToHash />
        </section>
      </div>

      {/* Right sidebar - Heading Nav placeholder (can be implemented later) */}
      <div className="hidden lg:block w-48 pl-10 sticky top-20 self-start">
        {/* HeadingNav would go here if needed */}
      </div>
    </div>
  );
}
