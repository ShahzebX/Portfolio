import { getPosts } from "@/utils/utils";
import { ProjectCard } from "@/components";
import { cn } from "@/lib/utils";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  layout?: "grid" | "list";
}

export function Projects({ range, exclude, layout = "grid" }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  const isList = layout === "list";

  return (
    <div
      className={cn(
        "w-full mb-10",
        isList
          ? "flex flex-col gap-8"
          : "grid grid-cols-1 md:grid-cols-2 gap-6",
      )}
    >
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          subtitle={post.metadata.subtitle}
          description={post.metadata.summary}
          content={post.content}
          avatars={
            post.metadata.team?.map((member) => ({ src: member.avatar })) || []
          }
          link={post.metadata.link || ""}
          layout={layout}
          technologies={post.metadata.technologies || []}
        />
      ))}
    </div>
  );
}
