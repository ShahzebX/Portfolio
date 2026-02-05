import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  github?: string;
  demo?: string;
  responsibilities?: string[];
  engineeringNotes?: string[];
  technologies?: string[];
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  try {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
  } catch (e) {
    console.error(`getMDXFiles error reading directory ${dir}:`, e);
    return [];
  }
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    const fallbackMetadata: Metadata = {
      title: "",
      subtitle: "",
      publishedAt: "",
      summary: "",
      image: "",
      images: [],
      tag: "",
      team: [],
      link: "",
      github: "",
      demo: "",
      responsibilities: [],
      engineeringNotes: [],
    };

    return { metadata: fallbackMetadata, content: "" };
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");

  let data: any = {};
  let content = "";

  try {
    const parsed = matter(rawContent);
    data = parsed.data || {};
    content = parsed.content || "";
  } catch (err) {
    console.error(`Failed to parse frontmatter for ${filePath}:`, err);
    // Return a safe default metadata object so build does not fail
    const fallbackMetadata: Metadata = {
      title: "",
      subtitle: "",
      publishedAt: "",
      summary: "",
      image: "",
      images: [],
      tag: "",
      team: [],
      link: "",
      github: "",
      demo: "",
      responsibilities: [],
      engineeringNotes: [],
      technologies: [],
    };

    return { metadata: fallbackMetadata, content: rawContent };
  }

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt || "",
    summary: data.summary || "",
    image: data.image || "",
    images: Array.isArray(data.images)
      ? data.images
      : data.images
        ? [data.images]
        : [],
    tag: data.tag || [],
    team: Array.isArray(data.team) ? data.team : data.team ? [data.team] : [],
    link: data.link || "",
    github: typeof data.github === "string" ? data.github : "",
    demo: typeof data.demo === "string" ? data.demo : "",
    responsibilities: Array.isArray(data.responsibilities)
      ? data.responsibilities.filter(
          (item: unknown) => typeof item === "string",
        )
      : typeof data.responsibilities === "string"
        ? [data.responsibilities]
        : [],
    engineeringNotes: Array.isArray(data.engineeringNotes)
      ? data.engineeringNotes.filter(
          (item: unknown) => typeof item === "string",
        )
      : typeof data.engineeringNotes === "string"
        ? [data.engineeringNotes]
        : [],
    technologies: Array.isArray(data.technologies)
      ? data.technologies.filter((item: unknown) => typeof item === "string")
      : typeof data.technologies === "string"
        ? [data.technologies]
        : [],
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles
    .map((file) => {
      try {
        const { metadata, content } = readMDXFile(path.join(dir, file));
        const slug = path.basename(file, path.extname(file));

        return {
          metadata,
          slug,
          content,
        };
      } catch (e) {
        console.error(`Error reading MDX file ${file} in ${dir}:`, e);
        return null;
      }
    })
    .filter(Boolean) as Array<{
    metadata: Metadata;
    slug: string;
    content: string;
  }>;
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
