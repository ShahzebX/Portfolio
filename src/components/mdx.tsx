import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import { slugify as transliterate } from "transliteration";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:underline"
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:underline"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline"
      {...props}
    >
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: { alt?: string; src: string }) {
  if (!src) {
    console.error("Image requires a valid 'src' property.");
    return null;
  }

  return (
    <div className="relative w-full my-4 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
      <Image
        src={src}
        alt={alt || ""}
        width={960}
        height={540}
        className="w-full h-auto object-cover"
        sizes="(max-width: 960px) 100vw, 960px"
        {...props}
      />
    </div>
  );
}

function slugify(str: string): string {
  const strWithAnd = str.replace(/&/g, " and ");
  return transliterate(strWithAnd, {
    lowercase: true,
    separator: "-",
  }).replace(/\-\-+/g, "-");
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const sizeMap = {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-bold",
    h3: "text-xl font-semibold",
    h4: "text-lg font-semibold",
    h5: "text-base font-semibold",
    h6: "text-sm font-semibold",
  };

  const CustomHeading = ({ children, ...props }: { children: ReactNode }) => {
    const slug = slugify(children as string);
    const HeadingTag = as;
    return (
      <HeadingTag
        id={slug}
        className={cn(sizeMap[as], "mt-6 mb-3 text-zinc-900 dark:text-white")}
        {...props}
      >
        <a
          href={`#${slug}`}
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          {children}
        </a>
      </HeadingTag>
    );
  };

  CustomHeading.displayName = `${as}`;
  return CustomHeading;
}

function createParagraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-zinc-700 dark:text-zinc-300 my-3 leading-7">
      {children}
    </p>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-sm font-mono text-zinc-800 dark:text-zinc-200">
      {children}
    </code>
  );
}

function createCodeBlock(props: any) {
  if (
    props.children &&
    props.children.props &&
    props.children.props.className
  ) {
    const { className, children } = props.children.props;
    const language = className.replace("language-", "");

    return (
      <div className="my-4 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">
            {language}
          </span>
        </div>
        <pre className="p-4 overflow-x-auto bg-zinc-50 dark:bg-zinc-900">
          <code className="text-sm font-mono text-zinc-800 dark:text-zinc-200">
            {children}
          </code>
        </pre>
      </div>
    );
  }

  return <pre {...props} />;
}

function createList(as: "ul" | "ol") {
  return ({ children }: { children: ReactNode }) => {
    const Tag = as;
    return (
      <Tag
        className={cn(
          "my-4 pl-6 text-zinc-700 dark:text-zinc-300",
          as === "ul" ? "list-disc" : "list-decimal",
        )}
      >
        {children}
      </Tag>
    );
  };
}

function createListItem({ children }: { children: ReactNode }) {
  return <li className="my-2 leading-7">{children}</li>;
}

function createHR() {
  return (
    <div className="w-full flex justify-center my-8">
      <hr className="w-40 border-zinc-200 dark:border-zinc-700" />
    </div>
  );
}

function createBlockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-4 pl-4 border-l-4 border-blue-500 italic text-zinc-600 dark:text-zinc-400">
      {children}
    </blockquote>
  );
}

function createTable({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-700">
        {children}
      </table>
    </div>
  );
}

function createTableHead({ children }: { children: ReactNode }) {
  return <thead className="bg-zinc-100 dark:bg-zinc-800">{children}</thead>;
}

function createTableRow({ children }: { children: ReactNode }) {
  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-700">
      {children}
    </tr>
  );
}

function createTableCell({ children }: { children: ReactNode }) {
  return (
    <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">{children}</td>
  );
}

function createTableHeaderCell({ children }: { children: ReactNode }) {
  return (
    <th className="px-4 py-2 text-left font-semibold text-zinc-900 dark:text-white">
      {children}
    </th>
  );
}

const components = {
  p: createParagraph as any,
  h1: createHeading("h1") as any,
  h2: createHeading("h2") as any,
  h3: createHeading("h3") as any,
  h4: createHeading("h4") as any,
  h5: createHeading("h5") as any,
  h6: createHeading("h6") as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  ol: createList("ol") as any,
  ul: createList("ul") as any,
  li: createListItem as any,
  hr: createHR as any,
  blockquote: createBlockquote as any,
  table: createTable as any,
  thead: createTableHead as any,
  tr: createTableRow as any,
  td: createTableCell as any,
  th: createTableHeaderCell as any,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
