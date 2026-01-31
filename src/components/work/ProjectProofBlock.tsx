import React from "react";
import { Column, SmartLink, Text } from "@once-ui-system/core";

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

  const hasLinks = Boolean(cleanGithubRepoUrl || cleanGithubProfileUrl || cleanDemoUrl);
  const hasResponsibilities = cleanResponsibilities.length > 0;
  const hasEngineeringNotes = cleanEngineeringNotes.length > 0;

  if (!hasLinks && !hasResponsibilities && !hasEngineeringNotes) return null;

  return (
    <Column
      fillWidth
      border="neutral-alpha-weak"
      radius="l"
      padding="l"
      gap="16"
      marginTop="24"
      marginBottom="24"
    >
      {hasLinks && (
        <Column gap="8">
          <Text variant="label-strong-m">Links</Text>
          <Column gap="4">
            {cleanGithubRepoUrl && (
              <Text variant="body-default-s" onBackground="neutral-weak">
                •{" "}
                <SmartLink
                  href={cleanGithubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </SmartLink>
              </Text>
            )}
            {!cleanGithubRepoUrl && cleanGithubProfileUrl && (
              <Text variant="body-default-s" onBackground="neutral-weak">
                •{" "}
                <SmartLink
                  href={cleanGithubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Profile
                </SmartLink>
              </Text>
            )}
            {cleanDemoUrl && (
              <Text variant="body-default-s" onBackground="neutral-weak">
                •{" "}
                <SmartLink
                  href={cleanDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </SmartLink>
              </Text>
            )}
          </Column>
        </Column>
      )}

      {hasResponsibilities && (
        <Column gap="8">
          <Text variant="label-strong-m">Tech &amp; Responsibility</Text>
          <Column gap="4">
            {cleanResponsibilities.map((item) => (
              <Text
                key={item}
                variant="body-default-s"
                onBackground="neutral-weak"
              >
                • {item}
              </Text>
            ))}
          </Column>
        </Column>
      )}

      {hasEngineeringNotes && (
        <Column gap="8">
          <Text variant="label-strong-m">Engineering Notes</Text>
          <Column gap="4">
            {cleanEngineeringNotes.map((item) => (
              <Text
                key={item}
                variant="body-default-s"
                onBackground="neutral-weak"
              >
                • {item}
              </Text>
            ))}
          </Column>
        </Column>
      )}
    </Column>
  );
}
