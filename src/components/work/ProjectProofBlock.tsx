import React from "react";
import Link from "next/link";

type ProjectProofBlockProps = {
  githubRepoUrl?: string;
  githubProfileUrl?: string;
  demoUrl?: string;
  responsibilities?: string[];
  engineeringNotes?: string[];
};

export function ProjectProofBlock({
  githubRepoUrl,
  githubProfileUrl,
  demoUrl,
  responsibilities,
  engineeringNotes,
}: ProjectProofBlockProps) {
  const cleanGithubRepoUrl = githubRepoUrl?.trim();
  const cleanGithubProfileUrl = githubProfileUrl?.trim();
  const cleanDemoUrl = demoUrl?.trim();
  const cleanResponsibilities = (responsibilities || [])
    .map((item) => item.trim())
    .filter(Boolean);
  const cleanEngineeringNotes = (engineeringNotes || [])
    .map((item) => item.trim())
    .filter(Boolean);

  const hasLinks = Boolean(
    cleanGithubRepoUrl || cleanGithubProfileUrl || cleanDemoUrl,
  );
  const hasResponsibilities = cleanResponsibilities.length > 0;
  const hasEngineeringNotes = cleanEngineeringNotes.length > 0;

  if (!hasLinks && !hasResponsibilities && !hasEngineeringNotes) return null;

  return (
    <div className="w-full border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 flex flex-col gap-4 my-6">
      {hasLinks && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
            Links
          </span>
          <div className="flex flex-col gap-1">
            {cleanGithubRepoUrl && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                •{" "}
                <Link
                  href={cleanGithubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  GitHub Repository
                </Link>
              </p>
            )}
            {!cleanGithubRepoUrl && cleanGithubProfileUrl && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                •{" "}
                <Link
                  href={cleanGithubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  GitHub Profile
                </Link>
              </p>
            )}
            {cleanDemoUrl && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                •{" "}
                <Link
                  href={cleanDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Live Demo
                </Link>
              </p>
            )}
          </div>
        </div>
      )}

      {hasResponsibilities && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
            Tech &amp; Responsibility
          </span>
          <div className="flex flex-col gap-1">
            {cleanResponsibilities.map((item) => (
              <p
                key={item}
                className="text-sm text-zinc-600 dark:text-zinc-400"
              >
                • {item}
              </p>
            ))}
          </div>
        </div>
      )}

      {hasEngineeringNotes && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
            Engineering Notes
          </span>
          <div className="flex flex-col gap-1">
            {cleanEngineeringNotes.map((item) => (
              <p
                key={item}
                className="text-sm text-zinc-600 dark:text-zinc-400"
              >
                • {item}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
